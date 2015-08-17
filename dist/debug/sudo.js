var _ = require('../util/util');
var delegates = require('../mixins/delegates');

// ##Base Class Object
//
// All sudo.js objects inherit base, giving the ability
// to utilize delegation
//
class Base {
  constructor() {
    // can delegate
    this.delegates = [];
    // a beautiful and unique snowflake
    this.uid = _.unique();
    // should be overridden in child classes
    this.role = 'base';
  }
}

// add the actual methods
_.mixin(Base.prototype, delegates);

module.exports = Base;

var EventEmitter = require('events').EventEmitter;
var _ = require('../util/util');
var delegates = require('../mixins/delegates');

// ##Emitter Class Object
//
// A Base Class extending the core Node module EventEmitter and our delegation functionality
class Emitter extends EventEmitter {
  constructor() {
    super();
    // can delegate
    this.delegates = [];
    // a beautiful and unique snowflake
    this.uid = _.unique();
    // should be overridden in child classes
    this.role = 'base';
  }
}

// add the actual methods
_.mixin(Emitter.prototype, delegates);

module.exports = Emitter;

// ##Delegates mixin
// Used by the two base classes, Base and Emitter
module.exports = {
  // ###addDelegate
  // Push an instance of a Class Object into this object's `_delegates_` list.
  //
  // `param` {Object} `del`. An instance of a sudo.delegates Class Object
  // `returns` {Object} `this`
  addDelegate: function(del) {
    del.delegator = this;
    this.delegates.push(del);
    if('addedAsDelegate' in del) del.addedAsDelegate(this);
    return this;
  },
  // ###delegate
  // From this object's list of delegates find the object whose `_role_` matches
  // the passed `name` and:
  // 1. if `meth` is falsy return the delegate.
  // 2 if `meth` is truthy bind its method (to the delegate) and return the method
  //
  // `param` {String} `role` The role property to match in this object's delegates list
  // `param` {String} `meth` Optional method to bind to the action this delegate is being used for
  // `returns`
  delegate: function(role, meth) {
    let del = this.delegates, i;
    for(i = 0; i < del.length; i++) {
      if(del[i].role === role) {
        if(!meth) return del[i];
        return del[i][meth].bind(del[i]);
      }
    }
  },
  // ###getDelegate
  // Fetch a delegate whose role property matches the passed in argument.
  // Uses the `delegate` method in its 'single argument' form, included for
  // API consistency
  //
  // `param` {String} `role`
  // 'returns' {Object|undefined}
  getDelegate: function(role) { return this.delegate(role); },
  // ###removeDelegate
  // From this objects `delegates` list remove the object (there should only ever be 1)
  // whose role matches the passed in argument
  //
  // `param` {String} `role`
  // `returns` {Object} `this`
  removeDelegate: function(role) {
    let del = this.delegates, i;
    for(i = 0; i < del.length; i++) {
      if(del[i].role === role) {
        // no _delegator_ for you
        del[i].delegator = undefined;
        del.splice(i, 1);
        return this;
      }
    }
    return this;
  }
};

var Base = require('../base/base');
// ##Container
//
// A container is any object that can both contain other objects and
// itself be contained.
//
// `param` {Array|Object} 'arg'. Optional array or hash
// of child objects which the Container will add as child objects
// via `addChildren`
class Container extends Base {
  constructor(arg) {
    super();

    this.role = 'container';
    this.children = [];
    this.childNames = {};

    if(arg) this.addChildren(arg);
  }
  // ###addChild
  // Adds a Class instance to this container's list of children.
  // Also adds an 'index' property and an entry in the childNames hash.
  // If `addedToParent` is found on the child, call it, sending `this` as an argument.
  //
  // `param` {Object} `c`. Other Class instance.
  // `param` {String} `name`. An optional name for the child that will go in the childNames hash.
  // `returns` {Object} `this`
  addChild(c, name) {
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
  }
  // ###addChildren
  // Allows for multiple children to be added to this Container by passing
  // either an Array or an Object literal.
  //
  // see `addChild`
  //
  // `param` {Array|Object} `arg`. An array of children to add or an
  // Object literal in the form {name: child}
  // `returns` {Object} `this`
  addChildren(arg) {
    // normalize the arg
    let _keys = Array.isArray(arg) ? undefined : Object.keys(arg);
    let ary = _keys || arg;

    ary.forEach(c => { _keys ? this.addChild(arg[c], c) : this.addChild(c); });
    return this;
  }
  // ###bubble
  // By default, `bubble` returns the current view's parent (if it has one)
  //
  // `returns` {Object|undefined}
  bubble() { return this.parent; }
  // ###eachChild
  // Call a named method and pass any args to each child in a container's
  // collection of children
  //
  // `param` {*} Any number of arguments the first of which must be
  // The named method to look for and call. Other args are passed through
  // `returns` {object} `this`
  eachChild(...args) {
    let meth = args.shift();
    this.children.forEach(c => { if(meth in c) c[meth].apply(c, args); });
    return this;
  }
  // ###getChild
  // If a child was added with a name, via `addChild`,
  // that object can be fetched by name. This prevents us from having to reference a
  // containers children by index. That is possible however, though not preferred.
  //
  // `param` {String|Number} `id`. The string `name` or numeric `index` of the child to fetch.
  // `returns` {Object|undefined} The found child
  getChild(id) {
    return typeof id === 'string' ? this.children[this.childNames[id]] :
      this.children[id];
  }
  // ###_indexChildren_
  // Method is called with the `index` property of a subview that is being removed.
  // Beginning at `i` decrement subview indices.
  // `param` {Number} `i`
  // `private`
  _indexChildren_(i) {
    let c = this.children;
    let obj = this.childNames;
    let len;
    for (len = c.length; i < len; i++) {
      c[i].index--;
      // adjust any entries in childNames
      if(c[i].name in obj) obj[c[i].name] = c[i].index;
    }
  }
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
  removeChild(arg) {
    let i;
    let t = typeof arg;
    let c;
    // normalize the input
    if(t === 'object') c = arg;
    else c = t === 'string' ? this.children[this.childNames[arg]] : this.children[arg];
    // if no child exists based on the argument, don't try to remove it
    if(!c) return this;
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
  }
  // ###removeChildren
  // Remove all children.
  //
  // see `removeChild`
  // `returns` {object} `this`
  removeChildren() {
    let n = this.children.length;
    while(n > 0) {
      this.removeChild(this.children[n - 1]);
      n--;
    }
    return this;
  }

  // ###send
  // The call to the specific method on a (un)specified target happens here.
  // If this Object is part of a `sudo.Container` maintained hierarchy
  // the 'target' may be left out, causing the `bubble()` method to be called.
  // What this does is allow children of a `sudo.Container` to simply pass
  // events  upward, delegating the responsibility of deciding what to do to the parent.
  //
  // NOTE Only the first target method found is called, bubbling stops there.
  // If you wish it to continue call `send` again...
  //
  // `param` {*} Any number of arguments is supported, but the first is the only one searched for info.
  // A sendMethod will be located by:
  //   1. using the first argument if it is a string
  //   2. looking for a `sendMethod` property if it is an object
  // Any args will be passed to the sendMethod
  // `returns` {Object} `this`
  send(...args) {
    let d = this.data;
    let meth;
    let targ;
    let fn;
    // .sendMethod useful for direct event binding to a send
    if(d && 'sendMethod' in d) meth = d.sendMethod;
    // this.send('foo', ...args)
    else if(typeof args[0] === 'string') meth = args.shift();
    // if there was no send target specified bail out
    if (!meth) return;
    // target is either specified or my parent
    targ = d && d.sendTarget || this.bubble();
    // obvious chance for errors here, don't be dumb
    fn = targ[meth];
    while(!fn && (targ = targ.bubble())) fn = targ[meth];
    if(fn) fn.apply(targ, args);
    return this;
  }
}

module.exports = Container;

var Emitter = require('../base/emitter');
var _ = require('../util/util');
// ##Store
//
// Store Objects expose methods for setting and getting key:val pairs on this
// object's internal `data` hash. Notice there are no `get` or `set` operations
// as for simple "one level deep" operations you should simply:
//
//     this.data.foo = 'bar';
//     delete this.data.foo;
//
// The methods provided here are either for *path* based operations or give the
// ability to (un)set / get multiple vals at once.
//
// Being a subclass of Emitterbase, EventEmitter methods are available. After
// processing, a store may emit the `change` event signifying it is ready to be queried
//
// `param` {object} data. An initial state for this store.
//
// `constructor`
class Store extends Emitter {
  constructor(data) {
    super();

    this.role = 'store';
    // stores operate on the inner data hash...
    this.data = data || {};
  }
  // ###getPath
  // Uses the `getpath` function operating on the store's data hash.
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
      obj[str] = !~str.indexOf('.') ? this.data[str] : this.getPath(str);
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
      !~k.indexOf('.') ? (this.data[k] = obj[k]) : this.setPath(k, obj[k]);
    });
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
    ary.forEach(k => { !~k.indexOf('.') ? (delete this.data[k]) : this.unsetPath(k); });
    return this;
  }
}

module.exports = Store;

var Container = require('../container/container');

//##View
// Given a template identifier, `data.template`, use that for content
// Given a shadow host, `data.shadowHost`, create shadow root there
// Given a template import `data.import`, fetch my template from there
class View extends Container {
  constructor(data) {
    super();

    this.role = 'view';
    this.data = data;
    this.state = {};
  }

  // ###addedToParent
  // All view components will setup their shadow DOM when added to a container.
  // This does mean that we expect any view component to be housed in a container,
  // whether another view or the top level `Dispatcher`. Steps for setup are:
  //
  // * Locate my template, either in the main document or import it
  // * Locate my Shadow Host, save a ref `this.host`
  // * Create my Shadow Root at the Shadow Host, saved at `this.root`
  // * Clone the template and insert it at the Shadow Root
  //
  // There is a path for a simple, non-templated, non Shadow Dom element. Simply
  // provide a selector via `el` and it will become the `host`. Since the state
  // hydration for temlated (and non) is the same this will work
  //
  // `arg` {object} `parent`. The Container instance adding this object
  addedToParent() {
    let tmplHost, tmpl;
    // if my .template is a string identifier, locate it
    if(typeof this.data.template === 'string') {
      // locate the template host, can be in the main doc or an import
      if (this.data.import) {
        tmplHost = document.querySelector(this.data.import).import;
      } else tmplHost = document;
      // now the actual template
      tmpl = tmplHost && tmplHost.querySelector(this.data.template);
    } // else tmpl = this.data.template; -- do we want to support passing it in?
    let tmplContent = tmpl && document.importNode(tmpl.content, true);
    // the eventual location, assumed to be in the main doc
    this.host = document.querySelector(this.data.shadowHost || this.data.el);
    if (tmplContent && this.host && ('createShadowRoot' in this.host)) {
      this.root = this.host.createShadowRoot();
      // place the template content into the host
      this.root && this.root.appendChild(tmplContent);
    }
  }

  // ###mergeState
  mergeState(state) {
    Object.keys(state).forEach(key => {
      this.state[key] = state[key];
    });

    return this.render(this.state);
  }

  // ###render
  // The insertion of the template at the Shadow Host, in `addedToParent`,
  // sets up our desired "presentation" details with any initial data that may have
  // been present. Calls to render should be the product of changing state in your
  // application, view components reacting to stores emitting change events.
  // As such, a `state` object is expected that can be inspected. If keys in the
  // said hash match attributes of elements in this object's Shadow Host ELement,
  // the values located at those keys will be inserted there. For example,
  // given this markup in the shadow host:
  //    <div id="#fooHost">
  //      <h3></h3>
  //      <span class="foo"></span>
  //    </div>
  //
  // Then passed this `state` object:
  //    { '.foo': 'Bar', h3: 'Foo' }
  //
  // Will result in:
  //    <div id="#fooHost">
  //      <h3>Foo</h3>
  //      <span class="foo">Bar</span>
  //    </div>
  //
  // You can, obviously, override this to provide different behavior
  //
  // The actual presentation details, of course, are abstracted away in the
  // Shadow Dom, via your template. NOTE: We do expect that you have processed the
  // values to be inserted down to a simple `textContent` by this point
  //
  // `param` {Object} `state`. A hash of key:val pairs that map to this component's markup.
  // `param` {Bool} `reset`. Optional flag to remove any previous state, using the
  // passed-in state object as the new baseline.
  // `returns` {oject} `this`
  render(state = this.state) {
    // host is mandatory
    if (!this.host) return;

    // TODO diff based on a _prevState_ ??
    Object.keys(state).forEach(key => {
      this.host.querySelector(key).textContent = this.state[key];
    });
    return this;
  }

  // ###resetState
  // Given a hash of key:val pairs set any that are present and empty any previous
  // keys in my state object.
  // Essentially this 'blanks out' any previous keys that were present, but are
  // not present in the passed-in object, by setting their value to an empty string.
  // `mergeState` is then called with the passed-in object.
  //
  // `param` {Object} `state`
  resetState(state) {
    // empty the value of any keys not in the passed-in state object
    Object.keys(this.state).forEach(key => {
      if(!(key in state)) this.state[key] = '';
    });
    // now that any prev entries are erased (but kept) the new state can be merged
    return this.mergeState(state);
  }

  // ###update
  // Default implementation is a noop. An overridden method may exist on your
  // subclass to map the data passed in to one suitable for passing to render.
  // This is the preferred method for parents to call with dispatch data
  update() {}
}

module.exports = View;
