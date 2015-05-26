'use strict';
// This file was taken from Dan Wahlin's example at https://github.com/DanWahlin/AngularIn20TypeScript
var gulp = require('gulp'),
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
gulp.task('gen-ts-refs', function() {
  var target = gulp.src(config.appTypeScriptReferences);
  var sources = gulp.src([config.allTypeScript], {
    read: false
  });
  return target.pipe(inject(sources, {
    starttag: '//{',
    endtag: '//}',
    transform: function(filepath) {
      return '/// <reference path="../..' + filepath + '" />';
    }
  })).pipe(gulp.dest(config.typings));
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function() {
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
gulp.task('compile-ts', function() {
  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.tsOutputPath));
})

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function(cb) {
  var typeScriptGenFiles = [
    config.clientSource + '**/*.js', // path to all JS files auto gen'd by editor
    config.clientSource + '**/*.js.map' // path to all sourcemap files auto gen'd by editor
  ];

  // delete the files
  del(typeScriptGenFiles, cb);
});

gulp.task('watch', function() {
  gulp.watch([config.allTypeScript], ['ts-lint', 'compile-ts',
    'gen-ts-refs'
  ]);
});

gulp.task('default', ['ts-lint', 'compile-ts', 'gen-ts-refs', 'watch']);
