'use strict';

// This file was taken mostly from Dan Wahlin's example at https://github.com/DanWahlin/AngularIn20TypeScript
var gulp = require('gulp'),
    del = require('del'),
    Config = require('../gulpfile.config'),
    config = new Config();

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function (cb) {
    var typeScriptGenFiles = [
        config.clientSource + '**/*.js', // path to all JS files auto gen'd by editor
        config.clientSource + '**/*.js.map' // path to all sourcemap files auto gen'd by editor
    ];

    // delete the files
    del(typeScriptGenFiles, cb);
});
