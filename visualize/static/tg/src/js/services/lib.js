/* Collection of services for managing the client side */

(function() {
  'use strict';

  var lib = angular.module('tgLibrary', []);

  /**
   * Basic text manipulation functions.
   */
  lib.factory('strLib', function() {
    var strLib = {};

    /**
     * Returns a new string with the start of each word capitalized.
     */
    function toTitleCase(s) {
      return s.replace(/\w\S*/g, function(substr){ return substr.charAt(0).toUpperCase() + substr.slice(1); });
    }

    /**
     * Returns a new string to lowercase with all white space replaced with underscores.
     */
    function toSlugFormat(s) {
      return s.toLowerCase().replace(/\s+/g, '_');
    }

    strLib.toTitleCase = toTitleCase;
    strLib.toSlugFormat = toSlugFormat;

    return strLib;
  });
})();
