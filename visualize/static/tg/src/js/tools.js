

(function() {
  'use strict';

  var mod = angular.module('tools', []);

  mod.directive('tgKeyValueTable', function() {
    var template =
      '<table class="table table-hover table-condensed">'+
      '<thead><tr><th>{{ tgKeyHeader }}</th><th>{{ tgValueHeader }}</th></tr></thead>'+
      '<tbody><tr ng-repeat="(k, v) in tgMap" ><td>{{ k }}</td><td>{{ v }}</td></tr></tbody>'+
      '</table>';

    return {
      restrict: 'E',
      scope: {
        tgMap: '=',
        tgKeyHeader: '@',
        tgValueHeader: '@'
      },
      template: template,
      controller: function($scope) {
        console.log($scope);
        console.log($scope.tgMap);
      }
    };
  });

})();
