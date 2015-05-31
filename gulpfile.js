'use strict';
var gulp = require('gulp'),
    taskListing = require('gulp-task-listing');

var requireDir = require('require-dir');
var tasks = requireDir('./tasks');

gulp.task('default', ['ts-lint', 'compile-ts', 'gen-ts-refs', 'watch']);

gulp.task('release', [
    'ts-lint',
    'compile-ts',
    'gen-ts-refs',
    'build:linux:32',
    'build:linux:64',
    'build:darwin:64',
    'build:windows:32',
    'build:windows:64'
]);

// Add a task to render the output
gulp.task('help', taskListing);
