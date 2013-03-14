
module.exports = function(cfg){

  //Init logger
  logger = require('./helpers/logger');

  // Init Handlebars Helpers
  require('./helpers/handlebars');

  logger.log('Started <' + cfg.enviroment + '> Application');

  // Start Application
  require('./Application').start();
};