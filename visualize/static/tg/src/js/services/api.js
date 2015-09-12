/* Selection Service */

(function() {
  'use strict';

  var api2 = angular.module('tgApi2', ['ngRoute']);

  api2.factory('api2', ['$http', '$q', function($http, $q) {
      var api = {};

      function getServerInfo() {
        return $http.get('api/2/server-info.json');
      }

      function getDatasetsAndAnalyses() {
        return $http.get('api/2/datasets-and-analyses.json');
      }

      api.getServerInfo = getServerInfo;
      api.getDatasetsAndAnalyses = getDatasetsAndAnalyses;
      return api;
    }]);
})();
