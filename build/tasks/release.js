'use strict';
var gulp = require('gulp');

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
