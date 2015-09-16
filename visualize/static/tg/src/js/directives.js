/* Directives */

(function() {
  'use strict';

  var mod = angular.module('tgDirective', ['tgApi2', 'ngRoute']);

  mod.directive('tgNavbar', function() {
    return {
      restrict: 'AE',
      templateUrl: 'partial/tg-navbar.html',
      controller: ['$scope', '$location', function(scope, location) {
        scope.page = location.url();
        scope.$watch(function() { return location.url(); }, function(newVal, oldVal) {
          scope.page = location.url();
        });
      }]
    };
  });

  mod.directive('tgWell', function() {
    return {
      restrict: 'AE',
      templateUrl: 'partial/tg-well.html',
      controller: ['$scope', 'selections', function(scope, selections) {
        scope.selections = selections;
      }]
    };
  });

  mod.directive('tgFooter', function() {
    return {
      restrict: 'AE',
      templateUrl: 'partial/tg-footer.html',
      controller: ['$scope', 'api2', function($scope, api) {
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

})();
