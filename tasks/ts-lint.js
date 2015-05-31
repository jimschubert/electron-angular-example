'use strict';

// This file was taken mostly from Dan Wahlin's example at https://github.com/DanWahlin/AngularIn20TypeScript
var gulp = require('gulp'),
    tslint = require('gulp-tslint'),
    args = require('minimist')(process.argv.slice(2)),
    gulpif = require('gulp-if'),
    debug = require('gulp-debug'),
    Config = require('../gulpfile.config'),
    config = new Config();

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript)
        .pipe(gulpif(args.debug, debug()))
        .pipe(tslint())
        .pipe(tslint.report('prose'));
});
