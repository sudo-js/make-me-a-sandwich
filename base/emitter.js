var EventEmitter = require('events').EventEmitter;
var _ = require('../util/util');
var delegates = require('../mixins/delegates');

// ##Emitterbase Class Object
//
// A Base Class extending the core Node module EventEmitter.
class Emitterbase extends EventEmitter {
  constructor() {
    super();
    // can delegate
    this.delegates = [];
    // a beautiful and unique snowflake
    this.uid = _.unique();
    // should be overridden in child classes
    this.role = 'base';
  }
}

// add the actual methods
_.mixin(Emitterbase.prototype, delegates);

module.exports = Emitterbase;
