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

  app.controller('DatasetsController', ['$scope', 'api2', 'strLib', 'selections', 'jsLib', function(scope, api, str, selections, js) {
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
