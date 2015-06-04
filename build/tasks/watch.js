'use strict';

var gulp = require('gulp'),
    config = require('../paths');

gulp.task('watch', function () {
    gulp.watch(config.allTypeScript, ['ts-lint', 'compile-ts',
        'gen-ts-refs'
    ]);
});
