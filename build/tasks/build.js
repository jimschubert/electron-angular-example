'use strict';

var gulp = require('gulp'),
    exec = require('child_process').exec,
    args = require('../args'),
    del = require('del'),
    path = require('path'),
    config = require('../paths');

/** Performs a build.
 *
 * This takes any parameters passed into gulp and includes them in the build command.
 * May need to revisit this to allow for parameterized builds
 */
gulp.task('build', ['compile-ts'], function (cb) {
    var command = [
        'node build.js'
    ];

    var sw = '-';
    for (var arg in args) {
        if (arg !== '_' && args.hasOwnProperty(arg)) {
            if (arg.length == 1) {
                sw = '-';
            } else {
                sw = '--'
            }

            if (typeof args[arg] !== 'undefined' && args[arg] !== null) {
                // switches with values
                command.push(sw + arg + '=' + args[arg])
            } else {
                // boolean switches
                command.push(sw + arg)
            }
        }
    }

    var commandText = command.join(' ');
    console.log('Executing build: %s', commandText);
    exec(commandText, {
        cwd: config.root
    }, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

/**
 * Factory for creating a gulp task to build a specific output
 */
var runBuild = function (os, arch, asar) {
    return function (cb) {
        var command = [
            'node build.js'
        ];

        if (asar) command.push('--asar');
        if (arch) command.push('--arch ' + arch);
        if (os) command.push('--platform ' + os);

        var commandText = command.join(' ');
        exec(commandText, {
            cwd: config.root
        }, function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
    }
};

gulp.task('build:linux:32', ['compile-ts'], runBuild('linux', 'ia32'));
gulp.task('build:linux:64', ['compile-ts'], runBuild('linux', 'x64'));
gulp.task('build:darwin:64', ['compile-ts'], runBuild('darwin', 'x64'));
gulp.task('build:windows:32', ['compile-ts'], runBuild('win32', 'ia32'));
gulp.task('build:windows:64', ['compile-ts'], runBuild('win32', 'x64'));
