/*global keys*/

// ##Model Class Object
//
// Model Objects expose methods for setting and getting data, and
// can be observed if implementing the `Observable Extension`
//
// `param` {object} data. An initial state for this model.
//
// `constructor`
sudo.Model = function(data) {
  sudo.Base.call(this);
  this.data = data || {};
};
// Model inherits from sudo.Base
// `private`
sudo.inherit(sudo.Base, sudo.Model);
// ###get
// Returns the value associated with a key.
//
// `param` {String} `k`. The name of the key
// `returns` {*}. The value associated with the key or false if not found.
sudo.Model.prototype.get = function(k) {return this.data[k];};
// ###getPath
// Uses the sudo namespace's getpath function operating on the model's
// data hash.
//
// `param` {string} `path`
// `returns` {*|undefined}. The value at keypath or undefined if not found.
sudo.Model.prototype.getPath = function(path) {
  return sudo.getPath(path, this.data);
};
// ###gets
// Assembles and returns an object of key:value pairs for each key
// contained in the passed in Array.
//
// `param` {array} `ary`. An array of keys.
// `returns` {object}
sudo.Model.prototype.gets = function(ary) {
  var obj = {};
  ary.forEach(function(str) {
    obj[str] = !~str.indexOf('.') ? this.get(str) : this.getPath(str);
  }.bind(this));
  return obj;
};
// `private`
sudo.Model.prototype.role = 'model';
// ###set
// Set a key:value pair.
//
// `param` {String} `k`. The name of the key.
// `param` {*} `v`. The value associated with the key.
// `returns` {Object} `this`
sudo.Model.prototype.set = function(k, v) {
  // _NOTE: intentional possibilty of setting a falsy value_
  this.data[k] = v;
  return this;
};
// ###setPath
// Uses the sudo namespace's setpath function operating on the model's
// data hash.
//
// `param` {String} `path`
// `param` {*} `v`
// `returns` {Object} this.
sudo.Model.prototype.setPath = function(path, v) {
  sudo.setPath(path, v, this.data);
  return this;
};
// ###sets
// Invokes `set()` or `setPath()` for each key value pair in `obj`.
// Any listeners for those keys or paths will be called.
//
// `param` {Object} `obj`. The keys and values to set.
// `returns` {Object} `this`
sudo.Model.prototype.sets = function(obj) {
  keys(obj).forEach(function(k) {
    !~k.indexOf('.') ? this.set(k, obj[k]) : this.setPath(k, obj[k]);
  }.bind(this));
  return this;
};
// ###unset
// Remove a key:value pair from this object's data store
//
// `param` {String} `k`
// `returns` {Object} `this`
sudo.Model.prototype.unset = function(k) {
  delete this.data[k];
  return this;
};
// ###unsetPath
// Uses `sudo.unsetPath` operating on this models data hash
//
// `param` {String} path
// `returns` {Object} `this`
sudo.Model.prototype.unsetPath = function(path) {
  sudo.unsetPath(path, this.data);
  return this;
};
// ###unsets
// Deletes a number of keys or paths from this object's data store
//
// `param` {array} `ary`. An array of keys or paths.
// `returns` {Objaect} `this`
sudo.Model.prototype.unsets = function(ary) {
  ary.forEach(function(k) {
    !~k.indexOf('.') ? this.unset(k) : this.unsetPath(k);
  }.bind(this));
  return this;
};
