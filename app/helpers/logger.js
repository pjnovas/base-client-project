/**
 * HELPER: logger
 *
 */

var log = _.bind(console.log, console),
	warn = _.bind(console.warn, console),
	error = _.bind(console.error, console);

function noop(){}

module.exports = {
	enable: function (enabled){
		if (!enabled){
			this.log = noop;
			this.warn = noop;
			this.error = noop;
		}
		else {
			this.log = log;
			this.warn = warn;
			this.error = error;
		}
	},

	log: log,

	warn: warn,

	error: error
};
