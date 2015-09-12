/* Controllers */

(function() {
  'use strict';

  var app = angular.module('tgController', ['ngRoute']);

  app.controller('HomeController', ['$scope', '$log', function($scope, $log){
    $scope.page = 'home';
  }]);

  app.controller('DatasetsController', ['$scope', 'api2', function($scope, api) {
    $scope.datasets = {};
    $scope.status = 'loading';

    api.getDatasetsAndAnalyses()
      .then(function(result) {
        console.log(result);
        $scope.datasets = result.data;
        $scope.status = $scope.datasets? 'datasets': 'no-datasets';
      }, function(reason) {
        console.log(reason);
        $scope.status = 'error';
      });
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
