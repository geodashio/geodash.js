var gulp = require('gulp');
var gutil = require('gulp-util');
var pkg = require('./package.json');
var fs = require('fs');
var jsdoc = require('gulp-jsdoc3');

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

gulp.task('default', [
  'docs'
]);
