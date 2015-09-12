/* Selection Service */

(function() {
  'use strict';

  angular.module('tgClientServices', ['ngRoute'])
    .factory('selections', function() {
      return {};
    })
    .factory('authentication', function() {
      var auth = {};
      auth.signedIn = false;
      return auth;
    });
})();
