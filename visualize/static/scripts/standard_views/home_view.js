"use strict";

var HomeView = DefaultView.extend({
    
    readableName: "Home Page",
    shortName: "home",
    
    homePageHtml: 
"<div id=\"home-page-intro\" class=\"col-xs-6\"></div>"+
"<div id=\"home-page-video\" class=\"col-xs-6\"></div>",

    topicalGuideText: "The <span style=\"color: green\">Topic</span>al Guide",
    
    initialize: function() {
    },
    
    cleanup: function() {
    },
    
    events: {
        "click #get-started": "clickGetStarted",
    },
    
    //++++++++++++++++++++++++++++++++++++++++++++++++++    RENDER    ++++++++++++++++++++++++++++++++++++++++++++++++++\\
    
    render: function() {
        var welcomeHtml = "<h3>Welcome to " + this.topicalGuideText + "!</h3>";
        var introHtml = 
            "<p>" + 
            this.topicalGuideText + " is a web tool developed to help you explore your corpora using topic modeling. " +
            "Click on the \"Datasets\" tab to get started, then select a dataset (this is your corpus, or collection of text documents) and an analysis (the result of running a topic model on your corpus). " +
            "Once you do that start exploring!" + 
            "</p>";
        var introVideoEmbedHtml = "<iframe width=\"420\" height=\"315\" src=\"https://www.youtube.com/embed/qfdFbtJJGx0\" frameborder=\"0\" allowfullscreen></iframe>";
        
        var needHelpHtml = "<h3>Need More Help?</h3>" + 
            "<p>" + 
            "Some visualizations need additional explanation to use them to their full extent. " +
            "Click on the help (" + icons.help + ") icon on the menu bar for video tutorials and more. " +
            "The help content will change depending on what page you're looking at. " +
            "</p>";
        
        var getStartedButtonHtml = "<button id=\"get-started\" type=\"button\" class=\"btn btn-success btn-lg\">Get Started!</button>";
        
        
        var el = d3.select(this.el);
        el.html(this.homePageHtml);
        el.select("#home-page-intro").html(welcomeHtml + introHtml + needHelpHtml + getStartedButtonHtml);
        el.select("#home-page-video").html(introVideoEmbedHtml);
    },
    
    renderHelpAsHtml: function() {
        return "<p>Hurray! You found the help icon.</p><p>Remember to check back here for help on any page.</p>";
    },
    
    //++++++++++++++++++++++++++++++++++++++++++++++++++    EVENTS    ++++++++++++++++++++++++++++++++++++++++++++++++++\\
    
    clickGetStarted: function(e) {
        this.selectionModel.selectRandom();
        // Redirect user accordingly.
        if(this.selectionModel.get("dataset") !== "" && this.selectionModel.get("dataset") !== "") {
            this.viewModel.set({ currentView: "metadata_map" });
        } else {
            this.viewModel.set({ currentView: "datasets" });
        }
    },
    
});

// Add the Home View as the root view
$(function startApplication() {
    globalTopicalGuideView.viewModel.setRootViewClass(HomeView);
});
