require('babel/register');

var Store = require('../store');

describe('Sudo Model as Emitter', function() {
  var count = 0;
  var callback = function() { count++; };
  var dispatcher = {
    cb: null,
    register: function(cb) {
      this.cb = cb;
      return 1;
    }
  };

  beforeEach(function() {
    this.store = new Store;
  });

  it('can register with a dispatcher', function() {
    this.store.register(dispatcher, callback);

    expect(this.store.dispatchId).toBe(1);
  });

  it('adds a listener', function() {
    this.store.on('change', callback);

    expect(this.store.listeners('change').length).toBe(1);
  });

  it('removes a listener', function() {
    this.store.removeListener('change', callback);

    expect(this.store.listeners('change').length).toBe(0);
  });

});
