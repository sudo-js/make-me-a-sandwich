sudo.extensions.observable = {
  // ###observe
  // A light wrapper around Object.observe that instructs this model to
  // abserve it's data store. The passed in function is used as the callback
  // invoked by the native functionality.
  // 
  // For ease of 'unobserving' the same Function passed in is returned.
  //
  // `param` {Function} `fn` The callback to be called with changeRecord(s)
  // `returns` {Function} the Function passed in as an argument
  observe: function(fn) {
    // only interested in adds, updates and deletes
    Object.observe(this.data, fn, ['add', 'update', 'delete']);
    return fn;
  },
  // ###observes
  // Allow an array of callbacks to be registered as changeRecord recipients
  //
  // `param` {Array} ary
  // `returns` {Array} the Array passed in to observe
  observes: function(ary) {
    ary.forEach(function(fn) {this.observe(fn);}.bind(this));
    return ary;
  },
  // ###unobserve
  // Remove a particular callback from this observable
  //
  // `param` {Function} the function passed in to `observe`
  // `returns` {Object} `this`
  unobserve: function unobserve(fn) {
    Object.unobserve(this.data, fn);
    return this;
  },
  // ###unobserves
  // Allow an array of callbacks to be unregistered as changeRecord recipients
  //
  // `param` {Array} ary
  // `returns` {Object} `this`
  unobserves: function(ary) {
    ary.forEach(function(fn) {this.unobserve(fn);}.bind(this));
    return this;
  }
};