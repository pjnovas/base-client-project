/**
 * Application Bootstrapper
 *
 */

var app = module.exports = new Backbone.Marionette.Application();

app.addInitializer( function () {
	var MainLayout = require('./views/MainLayout');
		
	app.addRegions({
		mainContainer: ".app-container"
	});

	app.mainContainer.show(new MainLayout());
});
