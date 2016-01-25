
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
	method1: function () {
    	console.log('Hello');
  	},
  	method2: function () {
    	console.log('World!');
  	}
});