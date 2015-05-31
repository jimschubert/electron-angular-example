'use strict';

// This file was taken mostly from Dan Wahlin's example at https://github.com/DanWahlin/AngularIn20TypeScript
var path = require('path'),
    gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    args = require('minimist')(process.argv.slice(2)),
    gulpif = require('gulp-if'),
    debug = require('gulp-debug'),
    sourcemaps = require('gulp-sourcemaps'),
    Config = require('../gulpfile.config'),
    config = new Config();

var tsProject = tsc.createProject(path.normalize(__dirname+'/../tsconfig.json'), {
    typescript: require('typescript')
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
        .pipe(gulpif(args.debug, debug()))
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.tsOutputPath));
})
