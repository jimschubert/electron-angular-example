'use strict';
var path = require('path');

var source = path.normalize(__dirname + '/../');
var clientSource = source + 'client/app/';
var typings = source + 'tools/types/';

module.exports = {
    root: source,
    typings: typings,
    jspmLocation: source + 'client/jspm_packages/',
    tsOutputPath: source,
    allJavaScript: [clientSource + '**/*.js'],
    allTypeScript: [clientSource + '**/*.ts'],
    libraryTypeScriptDefinitions: typings + '**/*.ts',
    appTypeScriptReferences: typings + 'typescriptApp.d.ts'
};
