

(function() {
  'use strict';

  var mod = angular.module('widgets', []);

  mod.directive('tgError', function() {
    return {
      restrict: 'E',
      templateUrl: 'partial/tg-error.html'
    };
  });

  mod.directive('tgLoading', function() {
    function link(scope, element, attrs) {
      try { // Try to vertically center the loading symbol.
        var wrapper = element.parents('.wrapper');
        var header = wrapper.find('header');
        var footer = wrapper.find('.footer');
        var totalHeight = wrapper[0].clientHeight - header[0].clientHeight - footer[0].clientHeight;
        var loadingHeight = 128;
        var offset = (totalHeight - loadingHeight)/2;
        element.find('#tg-loading').css('margin-top', offset);
      } catch(err) {}
    }

    return {
      restrict: 'E',
      template: '<p id="tg-loading" class="text-center"><img src="img/large-spinner.gif"/></p>',
      link: link
    };
  });

  /**
   * Creates a simple table from a map where the strings and values are keys.
   */
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

  mod.directive('tgSortableTable', function() {
    return {
      restrict: 'E',
      scope: {

      },
      templateUrl: 'partial/tg-sortable-table.html',
      controller: [function() {

      }]
    };
  });

  /**
   * Currently uses text to force the base div to expand to the full width
   * of the page (or containing element); this is hackish, but works well.
   */
  mod.directive('tgForceWidth', function() {
    var template =
      '<p class="text-center white">'+
      'a    a    a    a    a    a    a    a    a    a    a    a    a    a    a'+
      'a    a    a    a    a    a    a    a    a    a    a    a    a    a    a'+
      'a    a    a    a    a    a    a    a    a    a    a    a    a    a    a'+
      'a    a    a    a    a    a    a    a    a    a    a    a    a    a    a'+
      'a    a    a    a    a    a    a    a    a    a    a    a    a    a    a'+
      'a    a    a    a    a    a    a    a    a    a    a    a    a    a    a'+
      'a    a    a    a    a    a    a    a    a    a    a    a    a    a    a'+
      'a    a    a    a    a    a    a    a    a    a    a    a    a    a    a'+
      'a    a    a    a    a    a    a    a    a    a    a    a    a    a    a'+
      'a    a    a    a    a    a    a    a    a    a    a    a    a    a    a'+
      '</p>';

    return {
      restrict: 'E',
      template: template
    };
  });

})();
