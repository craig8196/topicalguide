"use strict";

var DatasetView = DefaultView.extend({
    
    readableName: "Datasets",
    shortName: "datasets",
    
    compiledTemplate: _.template(
        "<% if(hasDatasets) { %>"+
        "    <h3>Getting Started</h3>"+
        "    <p>Welcome to the Topical Guide! If you need help click on the help icon on the navigation bar.</p>"+
        "    <div id=\"accordion\" class=\"panel-group\"></div>"+
        "<% } else { %>"+
        "    <div class=\"panel\"><p>No datasets yet. Import one using <code>python topicalguide.py -h</code>.</p></div>"+
        "<% } %>"
    ),
    
    initialize: function() {
        this.initialized = 
        this.listenTo(this.selectionModel, "change:dataset", this.updateDataset);
        this.listenTo(this.selectionModel, "change:analysis", this.updateAnalysis);
    },
    
    render: function() {
        this.selectionModel.selectFirst(false);
        this.$el.html("");
        var datasets = this.dataModel.getDatasetsAndAnalyses();
        var that = this;
        
        function getMetadataValue(key, object, defaultValue) {
            if(!(key in object)) {
                return defaultValue;
            } else {
                return object[key];
            }
        }
        
        // Create basic outline
        this.$el.html(this.compiledTemplate({ "hasDatasets": (_.size(datasets) !== 0) }));
        var accordion = d3.select("#accordion");
        
        // Create panels for each dataset.
        var panels = accordion.selectAll("div")
            .data(d3.entries(datasets))
            .enter()
            .append("div")
            .classed("panel panel-default", true);
        this.panels = panels;
        
        // Create the panel title.
        var bold = panels.append("div")
            .attr("data-tg-dataset-name", function(d, i) {
                return d.key;
            })
            .classed("tg-select pointer", true)
            .classed("panel-heading text-center", true)
            .attr("data-toggle", "collapse")
            .attr("data-parent", "#accordion")
            .attr("href", function(d, i) { return "#collapse-"+d.key; })
            .append("h3")
            .classed("panel-title", true)
            .append("b");
        bold.append("a") // Add dataset name.
            //~ .attr("data-tg-dataset-name", function(d, i) {
                //~ return d.key;
            //~ })
            //~ .classed("tg-select pointer", true)
            .classed("nounderline black-text-blue-hover", true)
            //~ .attr("data-toggle", "collapse")
            //~ .attr("data-parent", "#accordion")
            //~ .attr("href", function(d, i) { return "#collapse-"+d.key; })
            //~ .style("color", "black")
            .text(function(d, i) {
                return that.dataModel.getReadableDatasetName(d.key);
            });
        bold.append("span") // Add a space between the name and the favicon.
            .text(" ");
        bold.append("a") // Add favs icon.
            .html(icons.emptyStar)
            .select("span")
            .attr("data-tg-dataset-name", function(d, i) {
                return d.key;
            })
            .classed("tg-fav", true)
            .each(function(d, i) {
                tg.site.initFav(this, that.favsModel);
            });
        
        // Create div for dataset content.
        var panel = panels.append("div")
            .attr("id", function(d, i) { return "collapse-"+d.key; })
            .classed("panel-collapse collapse", true)
            .classed("in", function(d, i) {
                return d.key === that.selectionModel.get("dataset");
            })
            .append("div")
            .classed("panel-body", true)
            .append("div")
            .classed("container-fluid", true);
        var analyses = panel.append("div")
            .classed("col-xs-4", true);
        analyses.each(function(d, i) {
            var el = d3.select(this);
            var datasetName = d.key;
            if(_.size(d.value.analyses) === 0) {
                el.html("<p>No analyses available for this dataset. Import one using <code>python topicalguide.py -h</code>.</p>");
            } else {
                // Create analysis list.
                el.append("h4").text("Analyses");
                var ul = el.append("ul")
                    .classed("nav nav-pills nav-stacked", true);
                var li = ul.selectAll("li")
                    .data(d3.entries(d.value.analyses))
                    .enter()
                    .append("li")
                    .attr("data-tg-analysis-name", function(d, i) {
                        return d.key;
                    })
                    .classed("pointer tg-select", true)
                    .classed("datasets-analysis-active-element", true) // Used to reselect the selection.
                    .classed("active", function(d, i) {
                        return d.key === that.selectionModel.get("analysis");
                    });
                var a = li.append("a");
                // Create favs icons.
                a.append("span")
                    .attr("data-tg-analysis-name", function(d, i) {
                        return d.key;
                    })
                    .classed("tg-fav", true)
                    .each(function(d, i) {
                        createFavsIcon(d3.select(this), "analyses", d.key, that);
                    });
                // Create analysis text.
                a.append("span")
                    .text(" ");
                a.append("span")
                    //~ .attr("data-tg-analysis-name", function(d, i) {
                        //~ return d.key;
                    //~ })
                    //~ .classed("pointer tg-select", true)
                    .text(function(d, i) {
                        return that.dataModel.getReadableAnalysisName(datasetName, d.key);
                    })
                    .style("cursor", "pointer");
                a.append("button")
                    .attr("type", "button")
                    .classed("btn btn-success", true)
                    .attr("data-tg-analysis-name", function(d, i) {
                        return d.key;
                    })
                    .classed("tg-select datasets-explore", true)
                    .style({ "float": "right", "padding": "1px 4px" })
                    .text("Explore!");
            }
        });
        
        var body = panel.append("div")
            .classed("col-xs-8", true);
        // Create description.
        body.append("h4")
            .text("Description");
        body.append("p")
            .text(function(d, i) { return getMetadataValue("description", d.value.metadata, "No description available."); });
        // Create metadata table.
        var metadata = body.append("div");
        metadata.each(function(d, i) {
            var el = d3.select(this);
            var datasetMetadata = _.reduce(d.value.metadata, function(result, value, key) {
                var newKey = tg.str.toTitleCase(key.replace(/_/g, " "));
                result[newKey] = value;
                return result;
            }, {});
            if(_.size(d.value.metadata) === 0) {
                el.html("<p>No metadata available for this dataset.</p>");
            } else {
                createTableFromHash(el, datasetMetadata, ["Metadata", "Value"], "metadata");
            }
        });
        // Create metrics table.
        var metrics = body.append("div");
        metrics.each(function(d, i) {
            var el = d3.select(this);
            if(_.size(d.value.metrics) === 0) {
                el.html("<p>No metrics available for this dataset.</p>");
            } else {
                createTableFromHash(el, d.value.metrics, ["Metric", "Value"], "metrics");
            }
        });
    },
    
    events: {
        "click .datasets-explore": "clickExplore",
    },
    
    clickExplore: function(e) {
        // This is a way to allow the event to propagate before switching views.
        setTimeout(function() {
            console.log('htere');
            this.viewModel.set({ "currentView": "topics" });
        }.bind(this), 100);
    },
    
    updateDataset: function() {
        if(this.panels !== undefined) {
            console.log("change dataset");
            var datasetName = this.selectionModel.get("dataset");
            $(".collapse.in").collapse('hide');
            this.panels.selectAll(".collapse")
                .each(function(d, i) {
                    if(d.key === datasetName) {
                        $(this).collapse('show');
                    }
                });
        }
    },
    
    updateAnalysis: function(msg) {
        console.log(msg)
        var datasetName = this.selectionModel.get("dataset");
        var analysisName = this.selectionModel.get("analysis");
        if(datasetName !== "") {
            if(this.panels !== undefined) {
                var panel = this.panels.filter(function(d, i) {
                    return d.key === datasetName;
                });
                
                panel.selectAll(".datasets-analysis-active-element")
                    .classed("active", function(d, i) {
                        return d.key === analysisName;
                    });
            }
        }
    },
    
    renderHelpAsHtml: function() {
        return "<p>To get started click on a dataset name. "+
        "As the panel shows up select an analysis by clicking on it. "+
        "Once clicked you'll be redirected to the Topics page where you can begin exploring. Enjoy!</p>";
    },
});

// Add the Datasets View as the root view
addViewClass([], DatasetView);
