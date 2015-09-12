/* Directives */

(function() {
  'use strict';

  var app = angular.module('tgDirective', ['tgApi2', 'ngRoute']);

  app.directive('tgNavbar', function() {
    return {
      restrict: 'AE',
      templateUrl: 'partial/tg-navbar.html'
    };
  });

  app.directive('tgWell', function() {
    return {
      restrict: 'AE',
      templateUrl: 'partial/tg-well.html'
    };
  });

  app.directive('tgFooter', function() {
    return {
      restrict: 'AE',
      templateUrl: 'partial/tg-footer.html',
      controller: ['$scope', 'api2', function($scope, api) {
        console.log('hello');
        $scope.version = 'Loading...';
        $scope.lastUpdated = 'Loading...';
        api.getServerInfo()
          .then(function(response) {
            var info = response.data;
            $scope.version = info.version;
            $scope.lastUpdated = info.lastUpdated;
          }, function(reason) {
            $scope.version = '';
            $scope.lastUpdated = '';
          });
      }]
    };
  });

  app.directive('tgError', function() {
    return {
      restrict: 'E',
      templateUrl: 'partial/tg-error.html'
    };
  });

  app.directive('tgSignIn', function() {
    return {
      restrict: 'E',
      templateUrl: 'partial/tg-sign-in.html',
      controller: 'SignInController'
    };
  });

  app.directive('tgLoading', function() {
    return {
      restrict: 'E',
      template: '<p class="text-center"><img src="img/large-spinner.gif"/></p><p class="text-center">Loading...</p>'
    };
  });

})();
