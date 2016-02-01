
'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('oseamil:app', function () {
	describe('default', function () {
		before(function (done) {
			helpers.run(path.join(__dirname, '../app'))
				.withArguments(['testEmail'])
				// .withOptions({ skipInstall: true })
				.on('end', done);
		});

		it('creates files', function () {
			assert.file([
				'package.json',
				'src/index.html'
			])
		});

		it('adds email app', function () {

		});
	});
});