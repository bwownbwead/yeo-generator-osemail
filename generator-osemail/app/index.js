
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
			name: 'charityNumber',
			message: 'What is the registered charity number?',
			default: 'XXXXXXX',
			store: true
		},
		{
			type: 'input',
			name: 'colourBodyCopy',
			message: 'What is the colour of the body copy (hex value)?',
			default: '#444444'

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
				},
				{
					name: 'Two Columns',
					value: 'layoutTwoColumns',
					checked: true
				},
				{
					name: 'Three Columns',
					value: 'layoutThreeColumns',
					checked: true
				},
				{
					name: 'Image Left, Text Right',
					value: 'layoutImageLeftTextRight',
					checked: true
				},
				{
					name: 'Image Right, Text Left',
					value: 'layoutImageRightTextLeft',
					checked: true
				}
			]
		}], function(answers) {
			this.charityNumber = answers.charityNumber;
			// this.colourBodyCopy = answers.colourBodyCopy;
			this.config.set('colourBodyCopy', answers.colourBodyCopy);
			this.config.save();

			this.layoutSingleWideColumn = _.includes(answers.layoutSections, 'layoutSingleWideColumn');
			this.layoutTwoColumns = _.includes(answers.layoutSections, 'layoutTwoColumns');
			this.layoutThreeColumns = _.includes(answers.layoutSections, 'layoutThreeColumns');
			this.layoutImageLeftTextRight = _.includes(answers.layoutSections, 'layoutImageLeftTextRight');
			this.layoutImageRightTextLeft = _.includes(answers.layoutSections, 'layoutImageRightTextLeft');
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
					charityNumber: this.charityNumber,
					colourBodyCopy: this.config.get('colourBodyCopy'),
					layoutSingleWideColumn: this.layoutSingleWideColumn,
					layoutTwoColumns: this.layoutTwoColumns,
					layoutThreeColumns: this.layoutThreeColumns,
					layoutImageLeftTextRight: this.layoutImageLeftTextRight,
					layoutImageRightTextLeft: this.layoutImageRightTextLeft
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