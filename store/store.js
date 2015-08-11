var Emitterbase = require('../base/emitter');
var _ = require('../sudo');
// ##Store
//
// Store Objects expose methods for setting and getting data. Being a subclass
// of Emitterbase, EventEmitter methods are available. After processing, a
// store may emit the `change` event signifying it is ready to be queried
//
// `param` {object} data. An initial state for this store.
//
// `constructor`
class Store extends Emitterbase {
  constructor(data) {
    super();

    this.role = 'model';
    // stores operate on the inner data hash...
    this.data = data || {};
  }
  // ###get
  // Returns the value associated with a key.
  //
  // `param` {String} `k`. The name of the key
  // `returns` {*}. The value associated with the key or false if not found.
  get(k) { return this.data[k]; }
  // ###getPath
  // Uses the sudo namespace's getpath function operating on the model's
  // data hash.
  //
  // `param` {string} `path`
  // `returns` {*|undefined}. The value at keypath or undefined if not found.
  getPath(path) {
    return _.getPath(path, this.data);
  }
  // ###gets
  // Assembles and returns an object of key:value pairs for each key
  // contained in the passed in Array.
  //
  // `param` {array} `ary`. An array of keys.
  // `returns` {object}
  gets(ary) {
    let obj = {};
    ary.forEach(str => {
      obj[str] = !~str.indexOf('.') ? this.get(str) : this.getPath(str);
    });
    return obj;
  }
  // ###handleDispatch
  // A noop by default, override in you subclass to perform the necessary
  // computation on the recieved dispatch payload.
  handleDispatch() {}
  // ###register
  // Register a callback with the dispatcher, assigning the returned
  // "dispatch token" as `this.dispatchId`.
  //
  // `param` {Object} `dispatcher`. The dispatcher instance to register with
  // `param` {String|Function} Optional argument indicating the function to
  // register with. If falsy, `handleDispatch` is assumed. If a String, the
  // method is bound to this instance when registered. If a Function, it is
  // simply passed as-is
  register(dispatcher, fn = 'handleDispatch') {
    let cb = typeof fn === 'string' ? this[fn].bind(this) : fn;
    // if there is no cb to register, indicate with an falsy ID
    this.dispatchId = cb ? dispatcher.register(cb) : null;
  }
  // ###set
  // Set a key:value pair.
  //
  // `param` {String} `k`. The name of the key.
  // `param` {*} `v`. The value associated with the key.
  // `returns` {Object} `this`
  set(k, v) {
    // _NOTE: intentional possibilty of setting a falsy value_
    this.data[k] = v;
    return this;
  }
  // ###setPath
  // Uses the `setpath` function operating on the model's
  // data hash.
  //
  // `param` {String} `path`
  // `param` {*} `v`
  // `returns` {Object} this.
  setPath(path, v) {
    _.setPath(path, v, this.data);
    return this;
  }
  // ###sets
  // Invokes `set()` or `setPath()` for each key value pair in `obj`.
  // Any listeners for those keys or paths will be called.
  //
  // `param` {Object} `obj`. The keys and values to set.
  // `returns` {Object} `this`
  sets(obj) {
    Object.keys(obj).forEach(k => {
      !~k.indexOf('.') ? this.set(k, obj[k]) : this.setPath(k, obj[k]);
    });
    return this;
  }
  // ###unset
  // Remove a key:value pair from this object's data store
  //
  // `param` {String} `k`
  // `returns` {Object} `this`
  unset(k) {
    delete this.data[k];
    return this;
  }
  // ###unsetPath
  // Uses the `unsetPath` method, operating on this models data hash
  //
  // `param` {String} path
  // `returns` {Object} `this`
  unsetPath(path) {
    _.unsetPath(path, this.data);
    return this;
  }
  // ###unsets
  // Deletes a number of keys or paths from this object's data store
  //
  // `param` {array} `ary`. An array of keys or paths.
  // `returns` {Objaect} `this`
  unsets(ary) {
    ary.forEach(k => { !~k.indexOf('.') ? this.unset(k) : this.unsetPath(k); });
    return this;
  }
}

module.exports = Store;
