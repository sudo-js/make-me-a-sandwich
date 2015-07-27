var Store = require('../../store/store');

class TestStore extends Store {
  handleDispatch(payload) {
    console.log('handle dispatch hit');
    // depending on the payload, set some stuff and emit...
    this.sets(payload);
    this.emit('change');
  }
  // pass in a dispatcher instance to register with it
  register(dispatcher) {
    this.dispatchId = dispatcher.register(this.handleDispatch.bind(this));
  }
}

module.exports = TestStore;
