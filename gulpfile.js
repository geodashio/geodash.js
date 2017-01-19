var gulp = require('gulp');
var gutil = require('gulp-util');
var pkg = require('./package.json');
var fs = require('fs');
var jsdoc = require('gulp-jsdoc3');
var child_process = require('child_process');
var Server = require('karma').Server;

gulp.task('docs', function (cb) {
  var src = ['README.md', './src/geodash/**/*.js'];
  var theme = "lumen";
  var config = {
    "opts": {
        "recurse": true,
        "destination": "docs"
    },
    "allowUnknownTags": true,
    "plugins": [
        "node_modules/jsdoc/plugins/markdown"
    ],
    "markdown": {
        "parser": "gfm"
    },
    "templates": {
      "cleverLinks": false,
      "monospaceLinks": false,
      "default": {
        "outputSourceFiles": true
      },
      "path": "ink-docstrap",
      "theme": theme,
      "navType": "vertical",
      "linenums": true,
      "dateFormat": "MMMM Do YYYY, h:mm:ss a",
      "outputSourceFiles": true,
      "outputSourcePath": true
    }
  };
  gulp.src(src, {read: false}).pipe(jsdoc(config, cb));
});

// See https://github.com/karma-runner/gulp-karma/pull/23#issuecomment-232313832
gulp.task('tests', function (done) {
  /*new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();*/
  var server = new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true
  });
  server.on('run_complete', function (browsers, results) {
      if (results.error || results.failed) {
          done(new Error('There are test failures'));
      }
      else {
          done();
      }
  });
  server.start();
});

gulp.task('default', [
  'docs',
  'tests'
]);
