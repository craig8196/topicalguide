/* Controllers */

(function() {
  'use strict';

  var mod = angular.module('tgController', [
    'ngRoute',
    'tgLibrary'
  ]);

  mod.controller('HomeController', ['$scope', '$log', function($scope, $log){
    $scope.page = 'home';
  }]);

  mod.controller('DatasetsController', ['$scope', 'api2', 'strLib', 'selections', 'jsLib', function(scope, api, str, selections, js) {
    scope.datasets = {};
    scope.status = 'loading';
    scope.selections = selections;

    api.getDatasetsAndAnalyses()
      .then(function(result) {
        scope.datasets = result.data;
        scope.status = scope.datasets? 'datasets': 'no-datasets';
      }, function(reason) {
        scope.status = 'error';
      });

    function clickSelectDataset(dataset) {
      selections.selectDataset(dataset);
    }

    function clickSelectAnalysis(analysis) {
      selections.selectAnalysis(analysis);
    }

    function clickExploreAnalysis(analysis) {
      alert('hurray '+analysis);
    }

    scope.clickSelectDataset = clickSelectDataset;
    scope.clickSelectAnalysis = clickSelectAnalysis;
    scope.clickExploreAnalysis = clickExploreAnalysis;
    scope.isMapEmpty = js.isMapEmpty;
  }]);

  mod.controller('AllTopicsController', ['$scope', 'selections', 'api2', function(scope, selections, api) {
    scope.analysisMetrics = {};
    scope.topicMetrics = [];
    scope.status = 'loading';
    scope.header = ['', '#', 'Name', '% of Corpus', 'Word Entropy', 'Document Entropy', 'Temperature', ''];
    scope.headerSort = [false, true, true, true, true, true, true, false];

    api.getAnalysisAndTopicMetrics(selections.dataset, selections.analysis)
      .then(success, failure);
    function success(result) {
      var analysisMetrics = result.data.metrics;
      var topics = result.data.topics;
      var topicMetrics = [];
      for(var topicId in topics) {
        topics[topicId].topicId = topicId;
        topicMetrics.push(topics[topicId]);
      }
      scope.analysisMetrics = analysisMetrics;
      scope.topicMetrics = topicMetrics;
      console.log(scope.analysisMetrics);
      console.log(scope.topicMetrics);
      scope.status = 'show';
    }
    function failure(reason) {
      scope.status = 'error';
    }
  }]);

  mod.controller('TempController', ['$scope', '$log', '$routeParams', '$location', function(scope, log, routeParams, location){
    console.log(routeParams);
    scope.page = routeParams.page;
    routeParams.page = 'k';
    location.search('hi', 'there');
  }]);

  mod.controller('SignInController', ['$scope', 'authentication', function(scope, authentication) {
    scope.signedIn = authentication.signedIn;
  }]);

  mod.controller('SignInLinkController', ['$scope', 'authentication', function(scope, authentication) {
    scope.signedIn = authentication.signedIn;
  }]);

})();
