/**
 * VIEW: DummyView
 *
 */
var 
	template = require('./templates/dummy');

module.exports = Backbone.Marionette.ItemView.extend({

	//--------------------------------------
	//+ PUBLIC PROPERTIES / CONSTANTS
	//--------------------------------------

	tagName: "li",
  className: "someClass",
	template: template

	//--------------------------------------
	//+ INHERITED / OVERRIDES
	//--------------------------------------

	//--------------------------------------
	//+ PUBLIC METHODS / GETTERS / SETTERS
	//--------------------------------------

	//--------------------------------------
	//+ EVENT HANDLERS
	//--------------------------------------

	//--------------------------------------
	//+ PRIVATE AND PROTECTED METHODS
	//--------------------------------------

});