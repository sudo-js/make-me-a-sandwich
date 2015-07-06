require('babel/register');

var Store = require('../store');

describe('Sudo Model as Emitter', function() {
  var count = 0;
  var callback = function() { count++; };

  beforeEach(function() {
    store = new Store;
  });

  it('adds a listener', function() {
    store.on('change', callback);

    expect(store.listeners('change').length).toBe(1);
  });

  it('removes a listener', function() {
    store.removeListener('change', callback);

    expect(store.listeners('change').length).toBe(0);
  });

});
