/* Controllers */

(function() {
  'use strict';

  var app = angular.module('tgController', [
    'ngRoute',
    'tgLibrary'
  ]);

  app.controller('HomeController', ['$scope', '$log', function($scope, $log){
    $scope.page = 'home';
  }]);

  app.controller('DatasetsController', ['$scope', 'api2', 'strLib', 'selections', function($scope, api, str, selections) {
    $scope.datasets = {};
    $scope.status = 'loading';
    $scope.selections = selections;

    api.getDatasetsAndAnalyses()
      .then(function(result) {
        console.log(result);
        $scope.datasets = result.data;
        $scope.status = $scope.datasets? 'datasets': 'no-datasets';
      }, function(reason) {
        console.log(reason);
        $scope.status = 'error';
      });

    function getReadableName(datasetKey, metadata) {
      if('readableName' in metadata) {
        return metadata.readableName;
      } else {
        return str.toTitleCase(datasetKey.replace(/_/g, ' '));
      }
    }

    function clickExploreAnalysis(analysis) {
      alert('hurray '+analysis);
    }

    function isAnalysisSelected(analysis) {
      return analysis === selections.analysis;
    }

    function selectAnalysis(analysis) {
      selections.analysis = analysis;
    }

    $scope.getReadableName = getReadableName;
    $scope.clickExploreAnalysis = clickExploreAnalysis;
    $scope.isAnalysisSelected = isAnalysisSelected;
    $scope.selectAnalysis = selectAnalysis;
  }]);

  app.controller('TempController', ['$scope', '$log', '$routeParams', '$location', function($scope, $log, $routeParams, $location){
    console.log($routeParams);
    $scope.page = $routeParams.page;
    $routeParams.page = 'k';
    $location.search('hi', 'there');
  }]);

  app.controller('SignInController', ['$scope', 'authentication', function($scope, authentication) {
    $scope.signedIn = authentication.signedIn;
  }]);

  app.controller('SignInLinkController', ['$scope', 'authentication', function($scope, authentication) {
    $scope.signedIn = authentication.signedIn;
  }]);

})();
