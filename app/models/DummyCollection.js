/**
 * Collection: DummyCollection
 *
 *
 */

var 
  DummyModel = require('./DummyModel'),
  logger = require('../helpers/logger');

module.exports = Backbone.Collection.extend({

  model: DummyModel,

  initialize: function () {
    logger.log('DummyCollection created: >');
    logger.log(this);
  }

});

