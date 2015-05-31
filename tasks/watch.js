'use strict';

var gulp = require('gulp'),
    Config = require('../gulpfile.config'),
    config = new Config();

gulp.task('watch', function () {
    gulp.watch(config.allTypeScript, ['ts-lint', 'compile-ts',
        'gen-ts-refs'
    ]);
});
