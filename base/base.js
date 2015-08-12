var _ = require('../util/util');
var delegates = require('../mixins/delegates');

// ##Base Class Object
//
// All sudo.js objects inherit base, giving the ability
// to utilize delegation
//
class Base {
  constructor() {
    // can delegate
    this.delegates = [];
    // a beautiful and unique snowflake
    this.uid = _.unique();
    // should be overridden in child classes
    this.role = 'base';
  }
}

// add the actual methods
_.mixin(Base.prototype, delegates);

module.exports = Base;
