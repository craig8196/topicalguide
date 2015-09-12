module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'src/bower_components/angular/angular.js',
      'src/bower_components/angular-route/angular-route.js',
      'src/bower_components/angular-resource/angular-resource.js',
      'src/bower_components/angular-animate/angular-animate.js',
      'src/bower_components/angular-mocks/angular-mocks.js',
      'src/js/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome', 'Firefox'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
