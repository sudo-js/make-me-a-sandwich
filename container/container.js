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
    this.getChild(n).removeFromParent();
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
