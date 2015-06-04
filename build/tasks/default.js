'use strict';
var gulp = require('gulp');

gulp.task('default', [
    'ts-lint',
    'compile-ts',
    'gen-ts-refs',
    'watch'
]);
