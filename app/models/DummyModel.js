/**
 * MODEL: DummyModel
 *
 *
 */

var 
		logger = require('../helpers/logger');

module.exports = Backbone.Model.extend({

	defaults: {
		id: 0,
		name: 'No Name'
	},

	initialize: function () {
		logger.log('DummyModel created: >');
		logger.log(this);
	}

});

