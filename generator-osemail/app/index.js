
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

	// constructor: function() {

	// },
	
	initializing: function () {

	},

	prompting: function () {
		
	},

	configuring: function () {
		
	},

	default: function () {
		
	},

	writing: {
		appStaticFiles: function () {
			this.directory('images', 'src/images');
		},

		html: function () {
			this.fs.copyTpl(
				this.templatePath('_index.html'),
				this.destinationPath('src/index.html'),
				{
					yzname: 'Test Youth Zone'
				}
			)
		}
	},

	conflicts: function () {
		
	},

	install: function () {

	},

	end: function () {

	}
});