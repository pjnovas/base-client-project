
/**
 * LAYOUT: MainLayout
 * Main Layout of the Application
 *
 */

var DummyCollection = require('../models/DummyCollection'),
		DummyCompositeView = require('./DummyCompositeView');

module.exports = Backbone.Marionette.Layout.extend({

	id: 'main-layout',

	template: require('./templates/mainLayout'),

	regions: {
		banner: "header[role=banner]",
		mainContent: "section[role=main-content]",
		footer: "footer[role=contentinfo]"
	},

	initialize: function(){
		this.someModels = [{
			id: 1,
			name: 'John'
		},{
			id: 2,
			name: 'Charly'
		}];
	},

	onRender: function(){

		var coll = new DummyCollection(this.someModels);
		this.mainContent.show(new DummyCompositeView({
			collection: coll
		}));
	}

});

