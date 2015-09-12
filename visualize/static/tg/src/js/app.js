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
        .when('/topics/all-topics', {
          templateUrl: 'page/all-topics.html',
          controller: 'AllTopicsController'
        })
        .when('/topics/single-topic', {
          templateUrl: 'page/single-topic.html',
          controller: 'SingleTopicController'
        })
        .when('/topics/topic-words', {
          templateUrl: 'page/topic-words.html',
          controller: 'TopicWordsController'
        })
        .when('/:menu/:page', {
          template: '<div ng-switch="page"><div ng-switch-when="p">Hi</div><div ng-switch-when="k">There</div></div>',
          controller: 'TempController'
        })
        .otherwise({
          redirectTo: '/home'
        });
    }
  ]);


})();
