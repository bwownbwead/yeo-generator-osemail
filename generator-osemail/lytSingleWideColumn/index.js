
var generators = require('yeoman-generator'),
	_ = require('lodash');

module.exports = generators.Base.extend({
	constructor: function () {
		generators.Base.apply(this, arguments);
		this.argument('name', { type: String, required: true });
	},

	writing: function () {
		this.fs.copyTpl(
			this.templatePath('layout-single-wide-column.html'),
			this.destinationPath('src/layout-snippets/layout-single-wide-column.html'),
			{
				colourBodyCopy: this.config.get('colourBodyCopy')
			}
		)
	}
});