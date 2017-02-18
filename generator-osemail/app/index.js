
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
		
		if ( this.yzname ) {
			this.yzname = _.startCase(this.yzname);
		}
		
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

		var defaultAnswers = {
			twitterUrl: 'Youth zone doesn\'t use Twitter',
			linkedInUrl: 'Youth zone doesn\'t use LinkedIn',
			flickrUrl: 'Youth zone doesn\'t use Flickr',
			youtubeUrl: 'Youth zone doesn\'t use Youtube'
		}

		this.log(yosay('Welcome to the ' + chalk.blue('Onside Youth Zone Email') + ' generator'));

		var done = this.async();

		this.prompt([
		{
			type: 'input',
			name: 'charityNumber',
			message: 'What is the registered charity number?',
			default: 'XXXXXXX',
		},
		{
			type: 'input',
			name: 'yzSiteUrl',
			message: 'What is the URL of the youth zone\'s website?',
			default: 'http://www.onsideyouthzones.org/',
		},
		{
			type: 'input',
			name: 'footerBgColour',
			message: 'What is the colour of the footer\'s background?',
			default: '#e4e4e4'
		},
		{
			type: 'input',
			name: 'colourBodyCopy',
			message: 'What is the colour of the body copy?',
			default: '#444444'
		},
		{
			type: 'input',
			name: 'primaryBrandColourName',
			message: 'What is the primary brand colour name?',
			default: 'Green'
		},
		{
			type: 'input',
			name: 'primaryBrandColour',
			message: 'What is the primary brand colour?',
			default: '#cedf00'
		},
		{
			type: 'input',
			name: 'secondaryBrandColourName',
			message: 'What is the secondary brand colour name?',
			default: 'Purple'
		},
		{
			type: 'input',
			name: 'secondaryBrandColour',
			message: 'What is the secondary brand colour?',
			default: '#592c82'
		},
		{
			type: 'input',
			name: 'linkColourName',
			message: 'What is the link colour name?',
			default: 'Black'
		},
		{
			type: 'input',
			name: 'linkColour',
			message: 'What is the link colour (this is also the button background colour)?',
			default: '#000'
		},
		{
			type: 'input',
			name: 'darkBgColour',
			message: 'What is the dark background colour (image-left, text-right section)?',
			default: '#592c82'
		},
		{
			type: 'input',
			name: 'twitterUrl',
			message: 'Does the youth zone have a twitter account? If so what is the profile URL?',
			default: defaultAnswers.twitterUrl
		},
		{
			type: 'input',
			name: 'linkedInUrl',
			message: 'Does the youth zone have a LinkedIn account? If so what is the profile URL?',
			default: defaultAnswers.linkedInUrl
		},
		{
			type: 'input',
			name: 'flickrUrl',
			message: 'Does the youth zone have a Flickr account? If so what is the profile URL?',
			default: defaultAnswers.flickrUrl
		},
		{
			type: 'input',
			name: 'youtubeUrl',
			message: 'Does the youth zone have a Youtube account? If so what is the profile URL?',
			default: defaultAnswers.youtubeUrl
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

			// basic information
			this.yzSiteUrl = answers.yzSiteUrl;
			this.charityNumber = answers.charityNumber;

			// urls
			this.twitterUrl = ( defaultAnswers.twitterUrl === answers.twitterUrl ) ? false : answers.twitterUrl;
			this.linkedInUrl = ( defaultAnswers.linkedInUrl === answers.linkedInUrl ) ? false : answers.linkedInUrl;
			this.flickrUrl = ( defaultAnswers.flickrUrl === answers.flickrUrl ) ? false : answers.flickrUrl;
			this.youtubeUrl = ( defaultAnswers.youtubeUrl === answers.youtubeUrl ) ? false : answers.youtubeUrl;
			
			// colours
			this.config.set('colourBodyCopy', answers.colourBodyCopy);
			this.config.set('darkBgColour', answers.darkBgColour);
			this.config.set('linkColour', answers.linkColour);
			this.config.set('linkColourName', answers.linkColourName);

			this.footerBgColour = answers.footerBgColour;
			this.primaryBrandColour = answers.primaryBrandColour;
			this.primaryBrandColourName = answers.primaryBrandColourName;
			this.secondaryBrandColour = answers.secondaryBrandColour;
			this.secondaryBrandColourName = answers.secondaryBrandColourName;

			// layout
			this.layoutSingleWideColumn = _.includes(answers.layoutSections, 'layoutSingleWideColumn');
			this.layoutTwoColumns = _.includes(answers.layoutSections, 'layoutTwoColumns');
			this.layoutThreeColumns = _.includes(answers.layoutSections, 'layoutThreeColumns');
			this.layoutImageLeftTextRight = _.includes(answers.layoutSections, 'layoutImageLeftTextRight');
			this.layoutImageRightTextLeft = _.includes(answers.layoutSections, 'layoutImageRightTextLeft');

			this.config.save();
			done();

		}.bind(this));

	},

	configuring: function () {
		
		// ensure all colours match hex values or valid colours
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
					// basic information
					yzname: this.yzname,
					charityNumber: this.charityNumber,

					// urls
					yzSiteUrl: this.yzSiteUrl,
					twitterUrl: this.twitterUrl,
					linkedInUrl: this.linkedInUrl,
					flickrUrl: this.flickrUrl,
					youtubeUrl: this.youtubeUrl,

					// colours
					colourBodyCopy: this.config.get('colourBodyCopy'),
					darkBgColour: this.config.get('darkBgColour'),
					linkColour: this.config.get('linkColour'),
					linkColourName: this.config.get('linkColourName'),
					primaryBrandColour: this.primaryBrandColour,
					primaryBrandColourName: this.primaryBrandColourName,
					secondaryBrandColour: this.secondaryBrandColour,
					secondaryBrandColourName: this.secondaryBrandColourName,
					footerBgColour: this.footerBgColour,

					// layout
					layoutSingleWideColumn: this.layoutSingleWideColumn,
					layoutTwoColumns: this.layoutTwoColumns,
					layoutThreeColumns: this.layoutThreeColumns,
					layoutImageLeftTextRight: this.layoutImageLeftTextRight,
					layoutImageRightTextLeft: this.layoutImageRightTextLeft
				}
			)
		},

		git: function () {
			this.composeWith('common', {
				options: {
					'skip-message': true,
					gitignore: true,
					gitattributes: false,
					jshintrc: false,
					editorconfig: false,
					'test-jshintrc': false
				}
			},
			{
				local: require.resolve('generator-common')
			});
		}
	},

	conflicts: function () {
		
	},

	install: function () {
		
	},

	end: function () {

	}
});