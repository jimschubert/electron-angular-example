'use strict';
// This file was taken mostly from Dan Wahlin's example at https://github.com/DanWahlin/AngularIn20TypeScript
var exec = require('child_process').exec,
    args = require('minimist')(process.argv.slice(2)),
    gulp = require('gulp'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    Config = require('./gulpfile.config');

var tsProject = tsc.createProject('./tsconfig.json', {
    typescript: require('typescript')
});

var config = new Config();

/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
gulp.task('gen-ts-refs', function () {
    var target = gulp.src(config.appTypeScriptReferences);
    var sources = gulp.src(config.allTypeScript, {
        read: false
    });
    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="../..' + filepath + '" />';
        }
    })).pipe(gulp.dest(config.typings));
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript).pipe(tslint()).pipe(tslint.report(
        'prose'));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
// gulp.task('compile-ts', function() {
// 	var sourceTsFiles = [
// 		config.allTypeScript, //path to typescript files
// 		config.libraryTypeScriptDefinitions, //reference to library .d.ts files
// 		config.appTypeScriptReferences
// 	]; //reference to app.d.ts files
//
// 	var tsResult = gulp.src(sourceTsFiles)
// 		.pipe(sourcemaps.init())
// 		.pipe(tsc({
// 			typescript: require('typescript'),
// 			target: 'ES5',
// 			declarationFiles: false,
// 			noExternalResolve: true
// 		}));
//
// 	tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
// 	return tsResult.js
// 		.pipe(sourcemaps.write('.'))
// 		.pipe(gulp.dest(config.tsOutputPath));
// });

/**
 * Compile TypeScript
 */
gulp.task('compile-ts', function () {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.tsOutputPath));
})

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

gulp.task('watch', function () {
    gulp.watch(config.allTypeScript, ['ts-lint', 'compile-ts',
        'gen-ts-refs'
    ]);
});

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
        if (object.hasOwnProperty(arg)) {
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

    var command = command.join(' ');
    console.log('Executing build: %s', command);
    exec(command, {
        cwd: __dirname
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

        var command = command.join(' ');
        exec(command, {
            cwd: __dirname
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
