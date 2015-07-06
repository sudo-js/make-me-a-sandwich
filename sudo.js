// ###getPath
// Extract a value located at `path` relative to the passed in object
//
// `param` {String} `path`. The key in the form of a dot-delimited path.
// `param` {object} `obj`. An object literal to operate on.
//
// `returns` {*|undefined}. The value at keypath or undefined if not found.
exports.getPath = function(path, obj) {
  var key, p;
  p = path.split('.');
  for (; p.length && (key = p.shift());) {
    if(!p.length) return obj[key];
    else obj = obj[key] || {};
  }
  return obj;
};
// ###makeMeASandwich
// Notice there is no need to extrinsically instruct *how* to
// make the sandwich, just the elegant single command.
//
// `returns` {string}
exports.makeMeASandwich = function() { return 'Okay.'; };
// ###mixin
// es6 Classes do not have a `traits` functionality as of yet. This method is
// provided until there is one.
//
// `param` {class prototype} `targ`. A Sudo Class instance's prototype
// `param` {Object} `source`. An Object Literal containing properties to add
exports.mixin = function(targ, source) {
  Object.getOwnPropertyNames(source).forEach(name => {
    Object.defineProperty(targ, name, Object.getOwnPropertyDescriptor(source, name));
  });
};
// ###setPath
// Traverse the keypath and get each object
// (or make blank ones) eventually setting the value
// at the end of the path
//
// `param` {string} `path`. The path to traverse when setting a value.
// `param` {*} `value`. What to set.
// `param` {Object} `obj`. The object literal to operate on.
exports.setPath = function(path, value, obj) {
  var p = path.split('.'), key;
  for (; p.length && (key = p.shift());) {
    if(!p.length) obj[key] = value;
    else if (obj[key]) obj = obj[key];
    else obj = obj[key] = {};
  }
};
// ####uid
// Some sudo Objects use a unique integer as a `tag` for identification.
// (Views for example). This ensures they are indeed unique.
exports.uid = 0;
// ####unique
// An integer used as 'tags' by some sudo Objects as well
// as a unique string for views when needed
//
// `param` {string} prefix. Optional string identifier
exports.unique = function(prefix) {
  return prefix ? prefix + this.uid++ : this.uid++;
};
// ###unsetPath
// Remove a key:value pair from this object's data store
// located at <path>
//
// `param` {String} `path`
// `param` {Object} `obj` The object to operate on.
exports.unsetPath = function(path, obj) {
  var p = path.split('.'), key;
  for (; p.length && (key = p.shift());) {
    if(!p.length) delete obj[key];
    // this can fail if a faulty path is passed.
    // using getPath beforehand can prevent that
    else obj = obj[key];
  }
};
