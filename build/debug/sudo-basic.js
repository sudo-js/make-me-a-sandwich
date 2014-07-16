(function(window) {
// #Sudo Namespace
var sudo = {
  // Namespace for `Delegate` Class Objects used to delegate functionality
  // from a `delegator`
  //
  // `namespace`
  delegates: {},
  // The sudo.extensions namespace holds the objects that are stand alone `modules` which
  // can be `implemented` (mixed-in) in sudo Class Objects
  //
  // `namespace`
  extensions: {},
  // ###getPath
  // Extract a value located at `path` relative to the passed in object
  //
  // `param` {String} `path`. The key in the form of a dot-delimited path.
  // `param` {object} `obj`. An object literal to operate on.
  //
  // `returns` {*|undefined}. The value at keypath or undefined if not found.
  getPath: function getPath(path, obj) {
    var key, p;
    p = path.split('.');
    for (key; p.length && (key = p.shift());) {
      if(!p.length) return obj[key];
      else obj = obj[key] || {};
    }
    return obj;
  },
  // ###inherit
  // Inherit the prototype from a parent to a child.
  // Set the childs constructor for subclasses of child.
  // Subclasses of the library base classes will not 
  // want to use this function in *most* use-cases. Why? User Sudo Class Objects
  // possess their own constructors and any call back to a `superclass` constructor
  // will generally be looking for the library Object's constructor.
  //
  // `param` {function} `parent`
  // `param` {function} `child`
  inherit: function inherit(parent, child) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
  },
  // ###makeMeASandwich
  // Notice there is no need to extrinsically instruct *how* to
  // make the sandwich, just the elegant single command.
  //
  // `returns` {string}
  makeMeASandwich: function makeMeASandwich() {return 'Okay.';},
  // ###namespace
  // Method for assuring a Namespace is defined.
  //
  // `param` {string} `path`. The path that leads to a blank Object.
  namespace: function namespace(path) {
    if (!this.getPath(path, window)) {
      this.setPath(path, {}, window);
    }
  },
  // ###setPath
  // Traverse the keypath and get each object 
  // (or make blank ones) eventually setting the value 
  // at the end of the path
  //
  // `param` {string} `path`. The path to traverse when setting a value.
  // `param` {*} `value`. What to set.
  // `param` {Object} `obj`. The object literal to operate on.
  setPath: function setPath(path, value, obj) {
    var p = path.split('.'), key;
    for (key; p.length && (key = p.shift());) {
      if(!p.length) obj[key] = value;
      else if (obj[key]) obj = obj[key];
      else obj = obj[key] = {};
    }
  },
  // ####uid
  // Some sudo Objects use a unique integer as a `tag` for identification.
  // (Views for example). This ensures they are indeed unique.
  uid: 0,
  // ####unique
  // An integer used as 'tags' by some sudo Objects as well
  // as a unique string for views when needed
  //
  // `param` {string} prefix. Optional string identifier
  unique: function unique(prefix) {
    return prefix ? prefix + this.uid++ : this.uid++;
  },
  // ###unsetPath
  // Remove a key:value pair from this object's data store
  // located at <path>
  //
  // `param` {String} `path`
  // `param` {Object} `obj` The object to operate on.
  unsetPath: function unsetPath(path, obj) {
    var p = path.split('.'), key;
    for (key; p.length && (key = p.shift());) {
      if(!p.length) delete obj[key];
      // this can fail if a faulty path is passed.
      // using getPath beforehand can prevent that
      else obj = obj[key];
    }
  }
};
// ##Base Class Object
//
// All sudo.js objects inherit base, giving the ability
// to utilize delegation, the `base` function and the 
// `construct` convenience method.
//
// `constructor`
sudo.Base = function() {
  // can delegate
  this.delegates = [];
  // a beautiful and unique snowflake
  this.uid = sudo.unique();
};
// ###addDelegate
// Push an instance of a Class Object into this object's `_delegates_` list.
//
// `param` {Object} `del`. An instance of a sudo.delegates Class Object
// `returns` {Object} `this`
sudo.Base.prototype.addDelegate = function(del) {
  del.delegator = this;
  this.delegates.push(del);
  if('addedAsDelegate' in del) del.addedAsDelegate(this);
  return this;
};
// ###base
// Lookup the function matching the name passed in  and call it with
// any passed in argumets scoped to the calling object.
// This method will avoid the recursive-loop problem by making sure
// that the first match is not the function that called `base`.
//
// `params` {*} any other number of arguments to be passed to the looked up method
// along with the initial method name
sudo.Base.prototype.base = function() {
  var args = Array.prototype.slice.call(arguments),
    name = args.shift(), 
    found = false,
    obj = this,
    curr;
  // find method on the prototype, excluding the caller
  while(!found) {
    curr = Object.getPrototypeOf(obj);
    if(curr[name] && curr[name] !== this[name]) found = true;
    // keep digging
    else obj = curr;
  }
  return curr[name].apply(this, args);
};
// ###construct
// A convenience method that alleviates the need to place:
// `Object.getPrototypeOf(this).consturctor.apply(this, arguments)`
// in every constructor
sudo.Base.prototype.construct = function() {
  Object.getPrototypeOf(this).constructor.apply(this, arguments || []);
};
// ###delegate
// From this object's list of delegates find the object whose `_role_` matches
// the passed `name` and:
// 1. if `meth` is falsy return the delegate.
// 2 if `meth` is truthy bind its method (to the delegate) and return the method
//
// `param` {String} `role` The role property to match in this object's delegates list
// `param` {String} `meth` Optional method to bind to the action this delegate is being used for
// `returns`
sudo.Base.prototype.delegate = function(role, meth) {
  var del = this.delegates, i;
  for(i = 0; i < del.length; i++) {
    if(del[i].role === role) {
      if(!meth) return del[i];
      return del[i][meth].bind(del[i]);
    }
  }
};
// ###getDelegate
// Fetch a delegate whose role property matches the passed in argument.
// Uses the `delegate` method in its 'single argument' form, included for 
// API consistency
//
// `param` {String} `role`
// 'returns' {Object|undefined}
sudo.Base.prototype.getDelegate = function(role) {return this.delegate(role);};
// ###removeDelegate
// From this objects `delegates` list remove the object (there should only ever be 1)
// whose role matches the passed in argument
//
// `param` {String} `role`
// `returns` {Object} `this`
sudo.Base.prototype.removeDelegate = function(role) {
  var del = this.delegates, i;
  for(i = 0; i < del.length; i++) {
    if(del[i].role === role) {
      // no _delegator_ for you
      del[i].delegator = void 0;
      del.splice(i, 1);
      return this;
    }
  }
  return this;
};
// `private`
sudo.Base.prototype.role = 'base';// ##Model Class Object
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
  // only models are `observable`
  this.callbacks = [];
  this.changeRecords = [];
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
    obj[str] = str.indexOf('.') === -1 ? this.get(str) : this.getPath(str);
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
  Object.keys(obj).forEach(function(k) {
    k.indexOf('.') === -1 ? this.set(k, obj[k]) : this.setPath(k, obj[k]);
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
    k.indexOf('.') === -1 ? this.unset(k) : this.unsetPath(k);
  }.bind(this));
  return this;
};
// ##Container Class Object
//
// A container is any object that can both contain other objects and
// itself be contained.
//
// `param` {Array|Object} 'arg'. Optional array or hash
// of child objects which the Container will add as child objects
// via `addChildren`
//
// `constructor`
sudo.Container = function(arg) {
  sudo.Base.call(this);
  this.children = [];
  this.childNames = {};
  if(arg) this.addChildren(arg);
};
// Container is a subclass of sudo.Base
sudo.inherit(sudo.Base, sudo.Container);
// ###addChild
// Adds a View to this container's list of children.
// Also adds an 'index' property and an entry in the childNames hash.
// If `addedToParent` if found on the child, call it, sending `this` as an argument.
//
// `param` {Object} `c`. View (or View subclass) instance.
// `param` {String} `name`. An optional name for the child that will go in the childNames hash.
// `returns` {Object} `this`
sudo.Container.prototype.addChild = function(c, name) {
  var ch = this.children;
  c.parent = this;
  c.index = ch.length;
  if(name) {
    c.name = name;
    this.childNames[name] = c.index;
  }
  ch.push(c);
  if('addedToParent' in c) c.addedToParent(this);
  return this;
};
// ###addChildren
// Allows for multiple children to be added to this Container by passing
// either an Array or an Object literal.
//
// see `addChild`
//
// `param` {Array|Object} `arg`. An array of children to add or an
// Object literal in the form {name: child}
// `returns` {Object} `this` 
sudo.Container.prototype.addChildren = function(arg) {
  // normalize the arg
  var keys = Array.isArray(arg) ? undefined : Object.keys(arg),
    ary = keys || arg;
  ary.forEach(function(c) {
    keys ? this.addChild(arg[c], c) : this.addChild(c);
  }.bind(this));
  return this;
};
// ###bubble
// By default, `bubble` returns the current view's parent (if it has one)
//
// `returns` {Object|undefined}
sudo.Container.prototype.bubble = function() {return this.parent;};
// ###eachChild
// Call a named method and pass any args to each child in a container's
// collection of children
//
// `param` {*} Any number of arguments the first of which must be
// The named method to look for and call. Other args are passed through
// `returns` {object} `this`
sudo.Container.prototype.eachChild = function(/*args*/) {
  var args = Array.prototype.slice.call(arguments), meth = args.shift();
  this.children.forEach(function(c) {if(meth in c) c[meth].apply(c, args);});
  return this;
};
// ###getChild
// If a child was added with a name, via `addChild`,
// that object can be fetched by name. This prevents us from having to reference a 
// containers children by index. That is possible however, though not preferred.
//
// `param` {String|Number} `id`. The string `name` or numeric `index` of the child to fetch.
// `returns` {Object|undefined} The found child
sudo.Container.prototype.getChild = function(id) {
  return typeof id === 'string' ? this.children[this.childNames[id]] :
    this.children[id];
};
// ###_indexChildren_
// Method is called with the `index` property of a subview that is being removed.
// Beginning at `i` decrement subview indices.
// `param` {Number} `i`
// `private`
sudo.Container.prototype._indexChildren_ = function(i) {
  var c = this.children, obj = this.childNames, len;
  for (len = c.length; i < len; i++) {
    c[i].index--;
    // adjust any entries in childNames
    if(c[i].name in obj) obj[c[i].name] = c[i].index; 
  }
};
// ###removeChild
// Find the intended child from my list of children and remove it, removing the name reference and re-indexing
// remaining children. This method does not remove the child's DOM.
// Override this method, doing whatever you want to the child's DOM, then call `base('removeChild')` to do so.
//
// If the child being removed has a `removedFromParent` method it will be called after the parenth has
// finished, passing itself(the parent) as an argument.
//
// `param` {String|Number|Object} `arg`. Children will always have an `index` number, and optionally a `name`.
// If passed a string `name` is assumed, so be sure to pass an actual number if expecting to use index.
// An object will be assumed to be an actual sudo Class Object.
// `returns` {Object} `this`
sudo.Container.prototype.removeChild = function(arg) {
  var i, t = typeof arg, c;
  // normalize the input
  if(t === 'object') c = arg; 
  else c = t === 'string' ? this.children[this.childNames[arg]] : this.children[arg];
  i = c.index;
  // remove from the children Array
  this.children.splice(i, 1);
  // remove from the named child hash if present
  delete this.childNames[c.name];
  // child is now an `orphan`
  delete c.parent;
  delete c.index;
  delete c.name;
  this._indexChildren_(i);
  if('removedFromParent' in c) c.removedFromParent(this);
  return this;
};
// ###removeChildren
// Remove all children, name references and adjust indexes accordingly.
// This method calls removeFromParent as each child may have overridden logic there.
//
// see `removeChild`
// `returns` {object} `this`
sudo.Container.prototype.removeChildren = function() {
  Object.keys(this.childNames).forEach(function(n) {
    this.removeChild(this.getChild(n));
  }.bind(this));
  return this;
};
// This is a container, yes.
sudo.Container.prototype.role = 'container';
// ###send
// The call to the specific method on a (un)specified target happens here.
// If this Object is part of a `sudo.Container` maintained hierarchy
// the 'target' may be left out, causing the `bubble()` method to be called.
// What this does is allow children of a `sudo.Container` to simply pass
// events  upward, delegating the responsibility of deciding what to do to the parent.
//
// TODO Currently, only the first target method found is called, then the
// bubbling is stopped. Should bubbling continue all the way up the 'chain'?
//
// `param` {*} Any number of arguments is supported, but the first is the only one searched for info. 
// A sendMethod will be located by:
//   1. using the first argument if it is a string
//   2. looking for a `sendMethod` property if it is an object
// In the case a specified target exists at `this.data.sendTarget` it will be used
// Any other args will be passed to the sendMethod after `this`
// `returns` {Object} `this`
sudo.Container.prototype.send = function(/*args*/) {
  var args = Array.prototype.slice.call(arguments),
    d = this.data, meth, targ, fn;
  // normalize the input, common use cases first
  if(d && 'sendMethod' in d) meth = d.sendMethod;
  else if(typeof args[0] === 'string') meth = args.shift();
  // less common but viable options
  if(!meth) {
    // passed as a custom data attr bound in events
    meth = 'data' in args[0] ? args[0].data.sendMethod :
      // passed in a hash from something or not passed at all
      args[0].sendMethod || undefined;
  }
  // target is either specified or my parent
  targ = d && d.sendTarget || this.bubble();
  // obvious chance for errors here, don't be dumb
  fn = targ[meth];
  while(!fn && (targ = targ.bubble())) {
    fn = targ[meth];
  }
  // sendMethods expect a signature (sender, ...)
  if(fn) {
    args.unshift(this);
    fn.apply(targ, args);
  }
  return this;
};
// ##View Class Object

// Create an instance of a sudo.View object. A view is any object
// that maintains its own `el`, that being some type of DOM element.
// Pass in a string selector or an actual dom node reference to have the object
// set that as its `el`. If no `el` is specified one will be created upon instantiation
// based on the `tagName` (`div` by default) if present in the `data` arg. 
// Specify `className`, `id` (or other attributes if desired)
// as an (optional) `attributes` object literal on the `data` arg.
//
// The `this.el` and `this.qs` methods scope queries to this objects `el`, i.e it's
// a shortcut for `this.el.querySelector(selector)`
// in addition `this.qsa` does the same for the querySelectorAll method
//
// `param` {string|element} `el`. Otional el for the View instance.
// `param` {object} `data`. Optional data object-literal which becomes the initial state
// of `this.data` on the View.
//
// `constructor`
sudo.View = function(el, data) {
  sudo.Container.call(this);
  this.data = data;
  this.setEl(el);
};
// View inherits from Container
// `private`
sudo.inherit(sudo.Container, sudo.View);
// the el needs to be normalized before use
// `private`
sudo.View.prototype._normalizedEl_ = function(el) {
  var _el = typeof el === 'string' ? document.querySelector(el) : el;
    // if there is not a top level query returned the desired node may be 
    // in a document fragment not in the DOM yet. We will check the parent's el
    // if available, or return the empty query
    return _el ? _el : (this.parent ? this.parent.qs(el) : _el);
};
// `private`
sudo.View.prototype.role = 'view';
// ###setEl
// A view must have an element, set that here.
// Node is always then available as `this.el`.
//
// `param` {string=|element} `el`
// `returns` {Object} `this`
sudo.View.prototype.setEl = function(el) {
  var d = this.data, a, t;
  if(!el) {
    // normalize any relevant data
    t = d ? d.tagName || 'div': 'div';
    this.el = document.createElement(t);
    if(d && (a = d.attributes)) {
      // iterate and set the attributes
      Object.keys(a).forEach(function(k) {
        this.el.setAttribute(k, a[k]);
      }.bind(this));
    }
  } else this.el = this._normalizedEl_(el);
  return this;
};
// ###this.qs
// Return a single Element matching `sel` scoped to this View's el.
// This is an alias to `this.el.querySelector(sel)`.
//
// `param` {string} `sel`. A DOM compatible selector
// `returns` {node|null} A 'querified' result matching the selector
sudo.View.prototype.qs = function(sel) {
  return this.el.querySelector(sel);
};
// ###this.qsa
// Return multiple Elements (a NodeList) matching `sel` scoped to this View's el.
// This is an alias to `this.el.querySelectorAll(sel)`.
//
// `param` {string} `sel`. A querySelectorAll compatible selector
// `returns` {Elements | undefined} Results matching the selector (or undefined if not)
sudo.View.prototype.qsa = function(sel) {
  return this.el.querySelectorAll(sel);
};
// ## Observable Extension Object
//
// Implementaion of the ES6 Harmony Observer pattern.
// Extend a `sudo.Model` class with this object if
// data-mutation-observation is required
sudo.extensions.observable = {
  // ###_deliver_
  // Called from deliverChangeRecords when ready to send
  // changeRecords to observers.
  //
  // `private`
  _deliver_: function(obj) {
    this.callbacks.forEach(function(cb) {
      cb(obj);
    });
  },
  // ###deliverChangeRecords
  // Iterate through the changeRecords array(emptying it as you go), delivering them to the
  // observers. You can override this method to change the standard delivery behavior.
  //
  // `returns` {Object} `this`
  deliverChangeRecords: function() {
    var rec, cr = this.changeRecords;
    // FIFO
    for(rec; cr.length && (rec = cr.shift());) {this._deliver_(rec);}
    return this;
  },
  // ###observe
  // In a quasi-ES6 Object.observe pattern, calling observe on an `observable` and 
  // passing a callback will cause that callback to be called whenever any
  // property on the observable's data store is set, changed or deleted 
  // via set, unset, setPath or unsetPath with an object containing:
  //    {
  //      type: <new, updated, deleted>,
  //      object: <the object being observed>,
  //      name: <the key that was modified>,
  //      oldValue: <if a previous value existed for this key>
  //    }
  // For ease of 'unobserving' the same Function passed in is returned.
  //
  // `param` {Function} `fn` The callback to be called with changeRecord(s)
  // `returns` {Function} the Function passed in as an argument
  observe: function(fn) {
    // this will fail if mixed-in and no `callbacks` created so don't do that.
    // Per the spec, do not allow the same callback to be added
    var d = this.callbacks;
    if(d.indexOf(fn) === -1) d.push(fn);
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
  // ###set
  // Overrides sudo.Base.set to check for observers
  //
  // `param` {String} `key`. The name of the key
  // `param` {*} `value`
  // `param` {Bool} `hold` Call _deliver_ (falsy) or store the change notification
  // to be delivered upon a call to deliverChangeRecords (truthy)
  //
  // `returns` {Object|*} `this` or calls deliverChangeRecords
  set: function(k, v, hold) {
    var obj = {name: k, object: this.data};
    // did this key exist already
    if(k in this.data) {
      obj.type = 'updated';
      // then there is an oldValue
      obj.oldValue = this.data[k];
    } else obj.type = 'new';
    // now actually set the value
    this.data[k] = v;
    this.changeRecords.push(obj);
    // call the observers or not
    if(hold) return this;
    return this.deliverChangeRecords();
  },
  // ###setPath
  // Overrides sudo.Base.setPath to check for observers.
  // Change records originating from a `setPath` operation
  // send back the passed in `path` as `name` as well as the
  // top level object being observed (this observable's data).
  // this allows for easy filtering either manually or via a 
  // `change delegate`
  //
  // `param` {String} `path`
  // `param` {*} `value`
  // `param` {Bool} `hold` Call _deliver_ (falsy) or store the change notification
  // to be delivered upon a call to deliverChangeRecords (truthy)
  // `returns` {Object|*} `this` or calls deliverChangeRecords
  setPath: function(path, v, hold) {
    var curr = this.data, obj = {name: path, object: this.data},
      p = path.split('.'), k;
    for(k; p.length && (k = p.shift());) {
      if(!p.length) {
        // reached the last refinement, pre-existing?
        if (k in curr) {
          obj.type = 'updated';
          obj.oldValue = curr[k];
        } else obj.type = 'new';
        curr[k] = v;
      } else if (curr[k]) {
        curr = curr[k];
      } else {
        curr = curr[k] = {};
      }
    }
    this.changeRecords.push(obj);
    // call all observers or not
    if(hold) return this;
    return this.deliverChangeRecords();
  }, 
  // ###sets
  // Overrides Base.sets to hold the call to _deliver_ until
  // all operations are done
  //
  // `returns` {Object|*} `this` or calls deliverChangeRecords
  sets: function(obj, hold) {
    Object.keys(obj).forEach(function(k) {
      k.indexOf('.') === -1 ? this.set(k, obj[k], true) :
        this.setPath(k, obj[k], true);      
    }.bind(this));
    if(hold) return this;
    return this.deliverChangeRecords();
  },
  // ###unobserve
  // Remove a particular callback from this observable
  //
  // `param` {Function} the function passed in to `observe`
  // `returns` {Object} `this`
  unobserve: function(fn) {
    var cb = this.callbacks, i = cb.indexOf(fn);
    if(~i) cb.splice(i, 1);
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
  },
  // ###unset
  // Overrides sudo.Base.unset to check for observers
  //
  // `param` {String} `key`. The name of the key
  // `param` {Bool} `hold`
  //
  // `returns` {Object|*} `this` or calls deliverChangeRecords
  unset: function(key, hold) {
    var obj = {name: key, object: this.data, type: 'deleted'}, 
      val = !!this.data[key];
    delete this.data[key];
    // call the observers if there was a val to delete
    return this._unset_(obj, val, hold);
  },
  // ###_unset_
  // Helper for the unset functions
  //
  // `private`
  _unset_: function(o, v, h) {
    if(v) {
      this.changeRecords.push(o);
      if(h) return this;
      return this.deliverChangeRecords();
    }
    return this;
  },
  // ###setPath
  // Overrides sudo.Base.unsetPath to check for observers
  //
  // `param` {String} `path`
  // `param` {*} `value`
  // `param` {bool} `hold`
  //
  // `returns` {Object|*} `this` or calls deliverChangeRecords
  unsetPath: function(path, hold) {
    var obj = {name: path, object: this.data, type: 'deleted'}, 
      curr = this.data, p = path.split('.'), 
      k, v;
    for (k; p.length && (k = p.shift());) {
      if(!p.length) {
        // reached the last refinement
        v = !!curr[k];
        delete curr[k];
      } else {
        // this can obviously fail, but can be prevented by checking
        // with `getPath` first.
        curr = curr[k];
      }
    }
    return this._unset_(obj, v, hold);
  },
  // ###unsets
  // Override of Base.unsets to hold the call to _deliver_ until done
  //
  // `param` ary 
  // `param` hold
  // `returns` {Object|*} `this` or calls deliverChangeRecords
  unsets: function(ary, hold) {
    ary.forEach(function(k) {
      k.indexOf('.') === -1 ? this.unset(k, true) : this.unsetPath(k, true);   
    }.bind(this));
    if(hold) return this;
    return this.deliverChangeRecords();	
  }
};
sudo.version = "0.9.8b";
window.sudo = sudo;
if(typeof window._ === "undefined") window._ = sudo;
}).call(this, this);