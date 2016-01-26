
var generators = require('yeoman-generator'),
	yosay = require('yosay'),
	chalk = require('chalk'),
	_ = require('lodash');

module.exports = generators.Base.extend({

	constructor: function() {
		generators.Base.apply(this, arguments);

		this.argument('yzname', {
			Type: 'String',
			required: false
		});
		
		// this.yzname = _.startCase(this.yzname);

		this.log(this.yzname);

		// this.option('testbool', {
		// 	desc: 'True or False?',
		// 	type: Boolean,
		// 	default: false
		// });

		// if ( this.options.testbool ) {
		// 	this.log('was included')
		// } else {
		// 	this.log('wasnt included')
		// }
	},
	
	initializing: function () {

	},

	prompting: function () {
		this.log(yosay('Welcome to the ' + chalk.blue('Onside Youth Zone Email') + ' generator'));

		var done = this.async();

		this.prompt([
		{
			type: 'input',
			name: 'colourBodyCopy',
			message: 'What is the colour of the body copy (hex value)?',
			default: '#000000'
		},
		{
			type: 'input',
			name: 'colourHeadingCopy',
			message: 'What is the colour of the main heading (hex value)?',
			default: '#ff0000'
		},
		{
			type: 'checkbox',
			name: 'layoutSections',
			message: 'Which types of layout would you like to include?',
			choices: [
				{
					name: 'Single Wide Column',
					value: 'layoutSingleWideColumn',
					checked: true
				}
			]
		}], function(answers) {
			this.colourBodyCopy = answers.colourBodyCopy;
			this.layoutSingleWideColumn = _.includes(answers.layoutSections, 'layoutSingleWideColumn');
			done();
		}.bind(this));

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
					yzname: this.yzname,
					colourBodyCopy: this.colourBodyCopy,
					layoutSingleWideColumn: this.layoutSingleWideColumn
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