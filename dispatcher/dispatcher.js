var Container = require('../container/container');
// ##Dispatcher
//
// A dispatcher is a specialized container that:
//
// * Acts as the sole root container of all view components
// * Serves as the end-of-the-line for the `send` responder-chain
// * Allows stores to register for payload dispatches
// * Allows stores to unregister for payload dispatches
// * Dispatches payloads to registered stores (triggerd via `send`)
//
// `param` {Array|Object} 'arg'. Optional array or hash
// `see` Container
// `manyThanks` https://github.com/facebook/flux/blob/master/src/Dispatcher.js
class Dispatcher extends Container {
  constructor(arg) {
    super(arg);

    this.role = 'dispatcher';
    this.prefix = 'id_';
    this.counter = 1;
    this.callbacks = {};
    this.pending = {};
    this.executed = {};
    this.isDispatching = false;
    this.pendingPayload = null;
  }

  // ###dispatch
  dispatch(data) {
    if(this.isDispatching) throw Error('Cannot dispatch during a dispatch');
    this.startDispatching(data);
    try {
      Object.keys(this.callbacks).forEach(id => {
        if (!this.pending[id]) this.executeCallback(id);
      });
    } finally { this.stopDispatching(); }
  }

  // ###executeCallback
  // Do it.
  // `param` {string} `id`. The registered callback to call with the current payload
  executeCallback(id) {
    this.pending[id] = true;
    this.callbacks[id](this.pendingPayload);
    this.executed[id] = true;
  }

  // ###register
  // Called by stores who wish to be sent dispatch payloads.
  // `param` {function} `fn`. The callback to send payloads to
  // `returns` {string} An "id" that the store can use to unregister
  register(fn) {
    let key = this.prefix + this.counter++;
    this.callbacks[key] = fn;
    return key;
  }

  // ###startDispatching
  //
  // `param` {object} `data`
  startDispatching(data) {
    Object.keys(this.callbacks).forEach(id => {
      this.pending[id] = false;
      this.executed[id] = false;
    });

    this.pendingPayload = data;
    this.isDispatching = true;
  }

  stopDispatching() {
    this.pendingPayload = null;
    this.isDispatching = false;
  }

  // ###unregister
  // Allows a store to stop listening for dispatch
  unregister(id) { delete this.callbacks[id]; }
}
