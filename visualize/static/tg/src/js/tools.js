

(function() {
  'use strict';

  var mod = angular.module('tools', []);

  mod.directive('tgKeyValueTable', function() {
    var template =
      '<table ng-show="show" class="table table-hover table-condensed">'+
      '<thead><tr><th>{{ keyHeader }}</th><th>{{ valueHeader }}</th></tr></thead>'+
      '<tbody><tr ng-repeat="(k, v) in map" ><td>{{ k }}</td><td>{{ v }}</td></tr></tbody>'+
      '</table>';

    return {
      restrict: 'E',
      scope: {
        map: '=tgMap',
        keyHeader: '@tgKeyHeader',
        valueHeader: '@tgValueHeader'
      },
      template: template,
      controller: ['$scope', 'jsLib', function(scope, js) {
        scope.show = !js.isMapEmpty(scope.map);
      }]
    };
  });

})();
