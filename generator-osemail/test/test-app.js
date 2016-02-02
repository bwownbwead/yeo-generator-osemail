
'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('oseamil:app', function () {
	describe('default', function () {
		before(function (done) {
			helpers.run(path.join(__dirname, '../app'))
				.withArguments(['testOnsideYouthZone'])
				// .withOptions({ skipInstall: true })
				.on('end', done);
		});

		it('creates files', function () {
			assert.file([
				'src/index.html'
			]);
		});

		it('adds the youth zone name', function () {
			assert.fileContent('src/index.html', /Test Onside Youth Zone/);
		});
	});

	describe('oseamil prompt', function () {
		before(function (done) {
			helpers.run(path.join(__dirname, '../app'))
				.withPrompts({
					'charityNumber': '12345ABCD',
					'primaryBrandColourName': 'Orange',
					'secondaryBrandColourName': 'Blue'
				})
				.on('end', done);
		});

		it('adds coloured headings', function () {
			assert.fileContent('src/index.html', /\.HeadlineOne[A-Z]*[a-z]*/);
			assert.fileContent('src/index.html', /\.HeadlineTwo[A-Z]*[a-z]*/);
		});

		it('adds the registered charity number', function () {
			assert.fileContent('src/index.html', /Registered Charity No:\s*[0-9|a-z|A-Z]+/);
		});
	});
});