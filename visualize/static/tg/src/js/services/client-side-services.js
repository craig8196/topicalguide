/* Collection of services for managing the client side */

(function() {
  'use strict';

  var services = angular.module('tgClientServices', ['ngRoute']);

  services.factory('selections', function() {
      return {
        dataset: '',
        analysis: '',
        topic: '',
        document: ''
      };
    });

  services.factory('authentication', function() {
      var auth = {};
      auth.signedIn = false;
      return auth;
    });
})();
