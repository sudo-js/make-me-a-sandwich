var Emitterbase = require('../base/emitter');
var _ = require('../sudo');
// ##Model Class Object
//
// Store Objects expose methods for setting and getting data. Being a subclass
// of Emitterbase, EventEmitter methods are available
//
// `param` {object} data. An initial state for this model.
//
// `constructor`
class Store extends Emitterbase {
  constructor(data) {
    super();

    this.role = 'store';
    // stores operate on the inner data hash...
    this.data = data || {};
  }

}

module.exports = Store;
