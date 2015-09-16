/* Application Configuration */

(function () {
  'use strict';

  var app = angular.module('tgMain', [
    'ngAnimate',
    'ngRoute',
    'tgDirective',
    'tgController',
    'tgApi2',
    'tgClientServices',
    'tgLibrary',
    'widgets'
  ]);

  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/home', {
          templateUrl: 'page/home.html',
          controller: 'HomeController'
        })
        .when('/datasets', {
          templateUrl: 'page/datasets.html',
          controller: 'DatasetsController'
        })
        .when('/sign-in', {
          templateUrl: 'page/sign-in.html',
          controller: 'SignInController'
        })
        .when('/terms', {
          templateUrl: 'page/terms.html'
        })
        .when('/topic-all', {
          templateUrl: 'page/topic/all-topics.html',
          controller: 'AllTopicsController'
        })
        .when('/topic-information', {
          templateUrl: 'page/topic/topic-information.html',
          controller: 'SingleTopicController'
        })
        .when('/topic-words', {
          templateUrl: 'page/topic/topic-words.html',
          controller: 'TopicWordsController'
        })
        .when('/document-all', {
          templateUrl: 'page/document/all-documents.html',
          controller: 'AllDocumentsController'
        })
        .when('/document-information', {
          templateUrl: 'page/document/document-information.html',
          controller: 'DocumentInformationController'
        })
        .when('/document-metadata', {
          templateUrl: 'page/document/metadata.html',
          controller: 'DocumentMetadataController'
        })
        .when('/visualization-2d-plots', {
          templateUrl: 'page/visualization/2d-plots.html',
          controller: 'Visualization2DPlotsController'
        })
        .when('/visualization-chord-diagram', {
          templateUrl: 'page/visualization/chord-diagram.html',
          controller: 'VisualizationChordController'
        })
        .when('/visualization-topics-over-time', {
          templateUrl: 'page/visualization/topics-over-time.html',
          controller: 'VisualizationTopicsOverTimeController'
        })
        .when('/visualization-metadata-map', {
          templateUrl: 'page/visualization/metadata-map.html',
          controller: 'VisualizationMetadataMapController'
        })
        .when('/visualization-tree-map', {
          templateUrl: 'page/visualization/tree-map.html',
          controller: 'VisualizationTreeMapController'
        })
        .when('/itm-analysis-word-constraints', {
          templateUrl: 'page/itm/analysis-word-constraints.html',
          controller: 'VisualizationTreeMapController'
        })
        .otherwise({
          redirectTo: '/home'
        });
    }
  ]);


})();
