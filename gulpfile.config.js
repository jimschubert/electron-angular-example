'use strict';
// This file was taken from Dan Wahlin's example at https://github.com/DanWahlin/AngularIn20TypeScript
var GulpConfig = (function () {
	function GulpConfig() {
		this.source = '';
		this.clientSource = this.source + 'client/app/';
		this.jspmLocation = this.source + 'client/jspm_packages/';

		this.tsOutputPath = this.source;
		this.allJavaScript = [this.clientSource + '**/*.js'];
		this.allTypeScript = [this.clientSource + '**/*.ts'];

		this.typings = './tools/types/';
		this.libraryTypeScriptDefinitions = this.typings + '**/*.ts';
		this.appTypeScriptReferences = this.typings + 'typescriptApp.d.ts';
	}
	return GulpConfig;
})();
module.exports = GulpConfig;
