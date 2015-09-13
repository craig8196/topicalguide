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
    'tools'
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
        .when('/topic/all-topics', {
          templateUrl: 'page/topic/all-topics.html',
          controller: 'AllTopicsController'
        })
        .when('/topic/single-topic', {
          templateUrl: 'page/topic/single-topic.html',
          controller: 'SingleTopicController'
        })
        .when('/topic/topic-words', {
          templateUrl: 'page/topic/topic-words.html',
          controller: 'TopicWordsController'
        })
        .otherwise({
          redirectTo: '/home'
        });
    }
  ]);


})();
