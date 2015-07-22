(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ = require('../sudo');
var delegates = require('../mixins/delegates');

// ##Base Class Object
//
// All sudo.js objects inherit base, giving the ability
// to utilize delegation
//

var Base = function Base() {
  _classCallCheck(this, Base);

  // can delegate
  this.delegates = [];
  // a beautiful and unique snowflake
  this.uid = _.unique();
  // should be overridden in child classes
  this.role = 'base';
}

// add the actual methods
;

_.mixin(Base.prototype, delegates);

module.exports = Base;

},{"../mixins/delegates":5,"../sudo":8}],2:[function(require,module,exports){
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var EventEmitter = require('events').EventEmitter;
var _ = require('../sudo');
var delegates = require('../mixins/delegates');

// ##Emitterbase Class Object
//
// A Base Class extending the core Node module EventEmitter.

var Emitterbase = (function (_EventEmitter) {
  _inherits(Emitterbase, _EventEmitter);

  function Emitterbase() {
    _classCallCheck(this, Emitterbase);

    _get(Object.getPrototypeOf(Emitterbase.prototype), 'constructor', this).call(this);
    // can delegate
    this.delegates = [];
    // a beautiful and unique snowflake
    this.uid = _.unique();
    // should be overridden in child classes
    this.role = 'base';
  }

  return Emitterbase;
})(EventEmitter)

// add the actual methods
;

_.mixin(Emitterbase.prototype, delegates);

module.exports = Emitterbase;

},{"../mixins/delegates":5,"../sudo":8,"events":6}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Base = require('../base/base');
// ##Container
//
// A container is any object that can both contain other objects and
// itself be contained.
//
// `param` {Array|Object} 'arg'. Optional array or hash
// of child objects which the Container will add as child objects
// via `addChildren`

var Container = (function (_Base) {
  _inherits(Container, _Base);

  function Container(arg) {
    _classCallCheck(this, Container);

    _get(Object.getPrototypeOf(Container.prototype), 'constructor', this).call(this);

    this.role = 'container';
    this.children = [];
    this.childNames = {};

    if (arg) this.addChildren(arg);
  }

  // ###addChild
  // Adds a Class instance to this container's list of children.
  // Also adds an 'index' property and an entry in the childNames hash.
  // If `addedToParent` is found on the child, call it, sending `this` as an argument.
  //
  // `param` {Object} `c`. Other Class instance.
  // `param` {String} `name`. An optional name for the child that will go in the childNames hash.
  // `returns` {Object} `this`

  _createClass(Container, [{
    key: 'addChild',
    value: function addChild(c, name) {
      var ch = this.children;
      c.parent = this;
      c.index = ch.length;
      if (name) {
        c.name = name;
        this.childNames[name] = c.index;
      }
      ch.push(c);
      if ('addedToParent' in c) c.addedToParent(this);
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
  }, {
    key: 'addChildren',
    value: function addChildren(arg) {
      var _this = this;

      // normalize the arg
      var _keys = Array.isArray(arg) ? undefined : Object.keys(arg);
      var ary = _keys || arg;

      ary.forEach(function (c) {
        _keys ? _this.addChild(arg[c], c) : _this.addChild(c);
      });
      return this;
    }

    // ###bubble
    // By default, `bubble` returns the current view's parent (if it has one)
    //
    // `returns` {Object|undefined}
  }, {
    key: 'bubble',
    value: function bubble() {
      return this.parent;
    }

    // ###eachChild
    // Call a named method and pass any args to each child in a container's
    // collection of children
    //
    // `param` {*} Any number of arguments the first of which must be
    // The named method to look for and call. Other args are passed through
    // `returns` {object} `this`
  }, {
    key: 'eachChild',
    value: function eachChild() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var meth = args.shift();
      this.children.forEach(function (c) {
        if (meth in c) c[meth].apply(c, args);
      });
      return this;
    }

    // ###getChild
    // If a child was added with a name, via `addChild`,
    // that object can be fetched by name. This prevents us from having to reference a
    // containers children by index. That is possible however, though not preferred.
    //
    // `param` {String|Number} `id`. The string `name` or numeric `index` of the child to fetch.
    // `returns` {Object|undefined} The found child
  }, {
    key: 'getChild',
    value: function getChild(id) {
      return typeof id === 'string' ? this.children[this.childNames[id]] : this.children[id];
    }

    // ###_indexChildren_
    // Method is called with the `index` property of a subview that is being removed.
    // Beginning at `i` decrement subview indices.
    // `param` {Number} `i`
    // `private`
  }, {
    key: '_indexChildren_',
    value: function _indexChildren_(i) {
      var c = this.children;
      var obj = this.childNames;
      var len = undefined;
      for (len = c.length; i < len; i++) {
        c[i].index--;
        // adjust any entries in childNames
        if (c[i].name in obj) obj[c[i].name] = c[i].index;
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
  }, {
    key: 'removeChild',
    value: function removeChild(arg) {
      var i = undefined;
      var t = typeof arg;
      var c = undefined;
      // normalize the input
      if (t === 'object') c = arg;else c = t === 'string' ? this.children[this.childNames[arg]] : this.children[arg];
      // if no child exists based on the argument, don't try to remove it
      if (!c) return this;
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
      if ('removedFromParent' in c) c.removedFromParent(this);
      return this;
    }

    // ###removeChildren
    // Remove all children.
    //
    // see `removeChild`
    // `returns` {object} `this`
  }, {
    key: 'removeChildren',
    value: function removeChildren() {
      var n = this.children.length;
      while (n > 0) {
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
  }, {
    key: 'send',
    value: function send() {
      var d = this.data;
      var meth = undefined;
      var targ = undefined;
      var fn = undefined;
      // .sendMethod useful for direct event binding to a send

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (d && 'sendMethod' in d) meth = d.sendMethod;
      // this.send('foo', ...args)
      else if (typeof args[0] === 'string') meth = args.shift();
      // if there was no send target specified bail out
      if (!meth) return;
      // target is either specified or my parent
      targ = d && d.sendTarget || this.bubble();
      // obvious chance for errors here, don't be dumb
      fn = targ[meth];
      while (!fn && (targ = targ.bubble())) fn = targ[meth];
      if (fn) fn.apply(targ, args);
      return this;
    }
  }]);

  return Container;
})(Base);

module.exports = Container;

},{"../base/base":1}],4:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Container = require('../container/container');
// ##Dispatcher
//
// A dispatcher is a specialized container that:
//
// * Acts as the sole root container of all view components
// * Serves as the end-of-the-line for the `send` responder-chain
// * Allows stores to register for payload dispatches
// * Allows stores to unregister for payload dispatches
// * Dispatches payloads to registered stores (triggerd via `send`)
//
// `param` {Array|Object} 'arg'. Optional array or hash
// `see` Container
// `manyThanks` https://github.com/facebook/flux/blob/master/src/Dispatcher.js

var Dispatcher = (function (_Container) {
  _inherits(Dispatcher, _Container);

  function Dispatcher(arg) {
    _classCallCheck(this, Dispatcher);

    _get(Object.getPrototypeOf(Dispatcher.prototype), 'constructor', this).call(this, arg);

    this.role = 'dispatcher';
    this.prefix = 'id_';
    this.counter = 1;
    this.callbacks = {};
    this.pending = {};
    this.executed = {};
    this.isDispatching = false;
    this.pendingPayload = null;
  }

  // ###dispatch

  _createClass(Dispatcher, [{
    key: 'dispatch',
    value: function dispatch(data) {
      var _this = this;

      if (this.isDispatching) throw Error('Cannot dispatch during a dispatch');
      this.startDispatching(data);
      try {
        Object.keys(this.callbacks).forEach(function (id) {
          if (!_this.pending[id]) _this.executeCallback(id);
        });
      } finally {
        this.stopDispatching();
      }
    }

    // ###executeCallback
    // Do it.
    // `param` {string} `id`. The registered callback to call with the current payload
  }, {
    key: 'executeCallback',
    value: function executeCallback(id) {
      this.pending[id] = true;
      this.callbacks[id](this.pendingPayload);
      this.executed[id] = true;
    }

    // ###register
    // Called by stores who wish to be sent dispatch payloads.
    // `param` {function} `fn`. The callback to send payloads to
    // `returns` {string} An "id" that the store can use to unregister
  }, {
    key: 'register',
    value: function register(fn) {
      var key = this.prefix + this.counter++;
      this.callbacks[key] = fn;
      return key;
    }

    // ###startDispatching
    //
    // `param` {object} `data`
  }, {
    key: 'startDispatching',
    value: function startDispatching(data) {
      var _this2 = this;

      Object.keys(this.callbacks).forEach(function (id) {
        _this2.pending[id] = false;
        _this2.executed[id] = false;
      });

      this.pendingPayload = data;
      this.isDispatching = true;
    }
  }, {
    key: 'stopDispatching',
    value: function stopDispatching() {
      this.pendingPayload = null;
      this.isDispatching = false;
    }

    // ###unregister
    // Allows a store to stop listening for dispatch
  }, {
    key: 'unregister',
    value: function unregister(id) {
      delete this.callbacks[id];
    }
  }]);

  return Dispatcher;
})(Container);

module.exports = Dispatcher;

},{"../container/container":3}],5:[function(require,module,exports){
// ##Delegates mixin
// Used by the two base classes, Base and Emitterbase
'use strict';

module.exports = {
  // ###addDelegate
  // Push an instance of a Class Object into this object's `_delegates_` list.
  //
  // `param` {Object} `del`. An instance of a sudo.delegates Class Object
  // `returns` {Object} `this`
  addDelegate: function addDelegate(del) {
    del.delegator = this;
    this.delegates.push(del);
    if ('addedAsDelegate' in del) del.addedAsDelegate(this);
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
  delegate: function delegate(role, meth) {
    var del = this.delegates,
        i = undefined;
    for (i = 0; i < del.length; i++) {
      if (del[i].role === role) {
        if (!meth) return del[i];
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
  getDelegate: function getDelegate(role) {
    return this.delegate(role);
  },
  // ###removeDelegate
  // From this objects `delegates` list remove the object (there should only ever be 1)
  // whose role matches the passed in argument
  //
  // `param` {String} `role`
  // `returns` {Object} `this`
  removeDelegate: function removeDelegate(role) {
    var del = this.delegates,
        i = undefined;
    for (i = 0; i < del.length; i++) {
      if (del[i].role === role) {
        // no _delegator_ for you
        del[i].delegator = undefined;
        del.splice(i, 1);
        return this;
      }
    }
    return this;
  }
};

},{}],6:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],7:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

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

var Store = (function (_Emitterbase) {
  _inherits(Store, _Emitterbase);

  function Store(data) {
    _classCallCheck(this, Store);

    _get(Object.getPrototypeOf(Store.prototype), 'constructor', this).call(this);

    this.role = 'model';
    // stores operate on the inner data hash...
    this.data = data || {};
  }

  // ###get
  // Returns the value associated with a key.
  //
  // `param` {String} `k`. The name of the key
  // `returns` {*}. The value associated with the key or false if not found.

  _createClass(Store, [{
    key: 'get',
    value: function get(k) {
      return this.data[k];
    }

    // ###getPath
    // Uses the sudo namespace's getpath function operating on the model's
    // data hash.
    //
    // `param` {string} `path`
    // `returns` {*|undefined}. The value at keypath or undefined if not found.
  }, {
    key: 'getPath',
    value: function getPath(path) {
      return _.getPath(path, this.data);
    }

    // ###gets
    // Assembles and returns an object of key:value pairs for each key
    // contained in the passed in Array.
    //
    // `param` {array} `ary`. An array of keys.
    // `returns` {object}
  }, {
    key: 'gets',
    value: function gets(ary) {
      var _this = this;

      var obj = {};
      ary.forEach(function (str) {
        obj[str] = ! ~str.indexOf('.') ? _this.get(str) : _this.getPath(str);
      });
      return obj;
    }

    // ###set
    // Set a key:value pair.
    //
    // `param` {String} `k`. The name of the key.
    // `param` {*} `v`. The value associated with the key.
    // `returns` {Object} `this`
  }, {
    key: 'set',
    value: function set(k, v) {
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
  }, {
    key: 'setPath',
    value: function setPath(path, v) {
      _.setPath(path, v, this.data);
      return this;
    }

    // ###sets
    // Invokes `set()` or `setPath()` for each key value pair in `obj`.
    // Any listeners for those keys or paths will be called.
    //
    // `param` {Object} `obj`. The keys and values to set.
    // `returns` {Object} `this`
  }, {
    key: 'sets',
    value: function sets(obj) {
      var _this2 = this;

      Object.keys(obj).forEach(function (k) {
        ! ~k.indexOf('.') ? _this2.set(k, obj[k]) : _this2.setPath(k, obj[k]);
      });
      return this;
    }

    // ###unset
    // Remove a key:value pair from this object's data store
    //
    // `param` {String} `k`
    // `returns` {Object} `this`
  }, {
    key: 'unset',
    value: function unset(k) {
      delete this.data[k];
      return this;
    }

    // ###unsetPath
    // Uses the `unsetPath` method, operating on this models data hash
    //
    // `param` {String} path
    // `returns` {Object} `this`
  }, {
    key: 'unsetPath',
    value: function unsetPath(path) {
      _.unsetPath(path, this.data);
      return this;
    }

    // ###unsets
    // Deletes a number of keys or paths from this object's data store
    //
    // `param` {array} `ary`. An array of keys or paths.
    // `returns` {Objaect} `this`
  }, {
    key: 'unsets',
    value: function unsets(ary) {
      var _this3 = this;

      ary.forEach(function (k) {
        ! ~k.indexOf('.') ? _this3.unset(k) : _this3.unsetPath(k);
      });
      return this;
    }
  }]);

  return Store;
})(Emitterbase);

module.exports = Store;

},{"../base/emitter":2,"../sudo":8}],8:[function(require,module,exports){
// ###getPath
// Extract a value located at `path` relative to the passed in object
//
// `param` {String} `path`. The key in the form of a dot-delimited path.
// `param` {object} `obj`. An object literal to operate on.
//
// `returns` {*|undefined}. The value at keypath or undefined if not found.
'use strict';

exports.getPath = function (path, obj) {
  var key, p;
  p = path.split('.');
  for (; p.length && (key = p.shift());) {
    if (!p.length) return obj[key];else obj = obj[key] || {};
  }
  return obj;
};
// ###makeMeASandwich
// Notice there is no need to extrinsically instruct *how* to
// make the sandwich, just the elegant single command.
//
// `returns` {string}
exports.makeMeASandwich = function () {
  return 'Okay.';
};
// ###mixin
// es6 Classes do not have a `traits` functionality as of yet. This method is
// provided until there is one.
//
// `param` {class prototype} `targ`. A Sudo Class instance's prototype
// `param` {Object} `source`. An Object Literal containing properties to add
exports.mixin = function (targ, source) {
  Object.getOwnPropertyNames(source).forEach(function (name) {
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
exports.setPath = function (path, value, obj) {
  var p = path.split('.'),
      key;
  for (; p.length && (key = p.shift());) {
    if (!p.length) obj[key] = value;else if (obj[key]) obj = obj[key];else obj = obj[key] = {};
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
exports.unique = function (prefix) {
  return prefix ? prefix + this.uid++ : this.uid++;
};
// ###unsetPath
// Remove a key:value pair from this object's data store
// located at <path>
//
// `param` {String} `path`
// `param` {Object} `obj` The object to operate on.
exports.unsetPath = function (path, obj) {
  var p = path.split('.'),
      key;
  for (; p.length && (key = p.shift());) {
    if (!p.length) delete obj[key];
    // this can fail if a faulty path is passed.
    // using getPath beforehand can prevent that
    else obj = obj[key];
  }
};

},{}],9:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Container = require('../container/container');

//##View
//
// Given a template identifier, `data.template`, use that for content
// Given a shadow host, `data.shadowHost`, create shadow root there
//

var View = (function (_Container) {
  _inherits(View, _Container);

  function View(data) {
    _classCallCheck(this, View);

    _get(Object.getPrototypeOf(View.prototype), 'constructor', this).call(this);

    this.role = 'view';
    this.data = data;
    this.preRender();
  }

  // ###preRender
  // Locate the template tag, create the shodow root etc...

  _createClass(View, [{
    key: 'preRender',
    value: function preRender() {
      // if my .template is a string identifier, locate it
      if (typeof this.data.template === 'string') {
        // locate the template host, can be in the main doc or an import
        var tmplHost = undefined;
        if (this.data['import']) {
          tmplHost = document.querySelector(this.data['import'])['import'];
        } else tmplHost = document;
        // now the actual template
        this.template = tmplHost && tmplHost.querySelector(this.data.template);
      } // else we will assume an actual template ref was passed in

      // the eventual location, assumed to be in the main doc
      this.host = document.querySelector(this.data.shadowHost);
      if (this.host && "createShadowRoot" in this.host) {
        this.root = this.host.createShadowRoot();
      }
    }
  }]);

  return View;
})(Container);

},{"../container/container":3}]},{},[3,4,7,9])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcm9iL0dpdGh1Yi9tYWtlLW1lLWEtc2FuZHdpY2gvYmFzZS9iYXNlLmpzIiwiL1VzZXJzL3JvYi9HaXRodWIvbWFrZS1tZS1hLXNhbmR3aWNoL2Jhc2UvZW1pdHRlci5qcyIsIi9Vc2Vycy9yb2IvR2l0aHViL21ha2UtbWUtYS1zYW5kd2ljaC9jb250YWluZXIvY29udGFpbmVyLmpzIiwiL1VzZXJzL3JvYi9HaXRodWIvbWFrZS1tZS1hLXNhbmR3aWNoL2Rpc3BhdGNoZXIvZGlzcGF0Y2hlci5qcyIsIi9Vc2Vycy9yb2IvR2l0aHViL21ha2UtbWUtYS1zYW5kd2ljaC9taXhpbnMvZGVsZWdhdGVzLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCIvVXNlcnMvcm9iL0dpdGh1Yi9tYWtlLW1lLWEtc2FuZHdpY2gvc3RvcmUvc3RvcmUuanMiLCIvVXNlcnMvcm9iL0dpdGh1Yi9tYWtlLW1lLWEtc2FuZHdpY2gvc3Vkby5qcyIsIi9Vc2Vycy9yb2IvR2l0aHViL21ha2UtbWUtYS1zYW5kd2ljaC92aWV3L3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FDQUEsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzNCLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDOzs7Ozs7OztJQU96QyxJQUFJLEdBQ0csU0FEUCxJQUFJLEdBQ007d0JBRFYsSUFBSTs7O0FBR04sTUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7O0FBRXBCLE1BQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDOztBQUV0QixNQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztDQUNwQjs7Ozs7QUFJSCxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7O0FBRW5DLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDOzs7Ozs7Ozs7OztBQ3RCdEIsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQztBQUNsRCxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDM0IsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7Ozs7OztJQUt6QyxXQUFXO1lBQVgsV0FBVzs7QUFDSixXQURQLFdBQVcsR0FDRDswQkFEVixXQUFXOztBQUViLCtCQUZFLFdBQVcsNkNBRUw7O0FBRVIsUUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7O0FBRXBCLFFBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDOztBQUV0QixRQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztHQUNwQjs7U0FURyxXQUFXO0dBQVMsWUFBWTs7Ozs7QUFhdEMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDOztBQUUxQyxNQUFNLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3RCN0IsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBUzdCLFNBQVM7WUFBVCxTQUFTOztBQUNGLFdBRFAsU0FBUyxDQUNELEdBQUcsRUFBRTswQkFEYixTQUFTOztBQUVYLCtCQUZFLFNBQVMsNkNBRUg7O0FBRVIsUUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7QUFDeEIsUUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDbkIsUUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRXJCLFFBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7R0FDL0I7Ozs7Ozs7Ozs7O2VBVEcsU0FBUzs7V0FrQkwsa0JBQUMsQ0FBQyxFQUFFLElBQUksRUFBRTtBQUNoQixVQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQ3ZCLE9BQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLE9BQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztBQUNwQixVQUFHLElBQUksRUFBRTtBQUNQLFNBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2QsWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO09BQ2pDO0FBQ0QsUUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNYLFVBQUcsZUFBZSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9DLGFBQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7Ozs7Ozs7Ozs7V0FVVSxxQkFBQyxHQUFHLEVBQUU7Ozs7QUFFZixVQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlELFVBQUksR0FBRyxHQUFHLEtBQUssSUFBSSxHQUFHLENBQUM7O0FBRXZCLFNBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLEVBQUk7QUFBRSxhQUFLLEdBQUcsTUFBSyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLE1BQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQUUsQ0FBQyxDQUFDO0FBQzNFLGFBQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7Ozs7O1dBS0ssa0JBQUc7QUFBRSxhQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7S0FBRTs7Ozs7Ozs7Ozs7V0FRdkIscUJBQVU7d0NBQU4sSUFBSTtBQUFKLFlBQUk7OztBQUNmLFVBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4QixVQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsRUFBSTtBQUFFLFlBQUcsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztPQUFFLENBQUMsQ0FBQztBQUN0RSxhQUFPLElBQUksQ0FBQztLQUNiOzs7Ozs7Ozs7OztXQVFPLGtCQUFDLEVBQUUsRUFBRTtBQUNYLGFBQU8sT0FBTyxFQUFFLEtBQUssUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUNoRSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3JCOzs7Ozs7Ozs7V0FNYyx5QkFBQyxDQUFDLEVBQUU7QUFDakIsVUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztBQUN0QixVQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQzFCLFVBQUksR0FBRyxZQUFBLENBQUM7QUFDUixXQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDakMsU0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDOztBQUViLFlBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO09BQ2xEO0tBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7V0FhVSxxQkFBQyxHQUFHLEVBQUU7QUFDZixVQUFJLENBQUMsWUFBQSxDQUFDO0FBQ04sVUFBSSxDQUFDLEdBQUcsT0FBTyxHQUFHLENBQUM7QUFDbkIsVUFBSSxDQUFDLFlBQUEsQ0FBQzs7QUFFTixVQUFHLENBQUMsS0FBSyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUN0QixDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVuRixVQUFHLENBQUMsQ0FBQyxFQUFFLE9BQU8sSUFBSSxDQUFDO0FBQ25CLE9BQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDOztBQUVaLFVBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFFM0IsYUFBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFL0IsYUFBTyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ2hCLGFBQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUNmLGFBQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNkLFVBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEIsVUFBRyxtQkFBbUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZELGFBQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7Ozs7OztXQU1hLDBCQUFHO0FBQ2YsVUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7QUFDN0IsYUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ1gsWUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLFNBQUMsRUFBRSxDQUFDO09BQ0w7QUFDRCxhQUFPLElBQUksQ0FBQztLQUNiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQWtCRyxnQkFBVTtBQUNaLFVBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDbEIsVUFBSSxJQUFJLFlBQUEsQ0FBQztBQUNULFVBQUksSUFBSSxZQUFBLENBQUM7QUFDVCxVQUFJLEVBQUUsWUFBQSxDQUFDOzs7eUNBSkQsSUFBSTtBQUFKLFlBQUk7OztBQU1WLFVBQUcsQ0FBQyxJQUFJLFlBQVksSUFBSSxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUM7O1dBRTFDLElBQUcsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7O0FBRXpELFVBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTzs7QUFFbEIsVUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7QUFFMUMsUUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQixhQUFNLENBQUMsRUFBRSxLQUFLLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUEsQUFBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckQsVUFBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDNUIsYUFBTyxJQUFJLENBQUM7S0FDYjs7O1NBNUtHLFNBQVM7R0FBUyxJQUFJOztBQStLNUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN4TDNCLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7SUFjNUMsVUFBVTtZQUFWLFVBQVU7O0FBQ0gsV0FEUCxVQUFVLENBQ0YsR0FBRyxFQUFFOzBCQURiLFVBQVU7O0FBRVosK0JBRkUsVUFBVSw2Q0FFTixHQUFHLEVBQUU7O0FBRVgsUUFBSSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7QUFDekIsUUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDcEIsUUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDakIsUUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDcEIsUUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDbEIsUUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDbkIsUUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFDM0IsUUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7R0FDNUI7Ozs7ZUFaRyxVQUFVOztXQWVOLGtCQUFDLElBQUksRUFBRTs7O0FBQ2IsVUFBRyxJQUFJLENBQUMsYUFBYSxFQUFFLE1BQU0sS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7QUFDeEUsVUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVCLFVBQUk7QUFDRixjQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFLEVBQUk7QUFDeEMsY0FBSSxDQUFDLE1BQUssT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQUssZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pELENBQUMsQ0FBQztPQUNKLFNBQVM7QUFBRSxZQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7T0FBRTtLQUN0Qzs7Ozs7OztXQUtjLHlCQUFDLEVBQUUsRUFBRTtBQUNsQixVQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUN4QixVQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUN4QyxVQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztLQUMxQjs7Ozs7Ozs7V0FNTyxrQkFBQyxFQUFFLEVBQUU7QUFDWCxVQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN2QyxVQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN6QixhQUFPLEdBQUcsQ0FBQztLQUNaOzs7Ozs7O1dBS2UsMEJBQUMsSUFBSSxFQUFFOzs7QUFDckIsWUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsRUFBRSxFQUFJO0FBQ3hDLGVBQUssT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUN6QixlQUFLLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7T0FDM0IsQ0FBQyxDQUFDOztBQUVILFVBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0FBQzNCLFVBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0tBQzNCOzs7V0FFYywyQkFBRztBQUNoQixVQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztBQUMzQixVQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztLQUM1Qjs7Ozs7O1dBSVMsb0JBQUMsRUFBRSxFQUFFO0FBQUUsYUFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQUU7OztTQWhFekMsVUFBVTtHQUFTLFNBQVM7O0FBbUVsQyxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQzs7Ozs7OztBQy9FNUIsTUFBTSxDQUFDLE9BQU8sR0FBRzs7Ozs7O0FBTWYsYUFBVyxFQUFFLHFCQUFTLEdBQUcsRUFBRTtBQUN6QixPQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztBQUNyQixRQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6QixRQUFHLGlCQUFpQixJQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZELFdBQU8sSUFBSSxDQUFDO0dBQ2I7Ozs7Ozs7Ozs7QUFVRCxVQUFRLEVBQUUsa0JBQVMsSUFBSSxFQUFFLElBQUksRUFBRTtBQUM3QixRQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUztRQUFFLENBQUMsWUFBQSxDQUFDO0FBQzVCLFNBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM5QixVQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO0FBQ3ZCLFlBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEIsZUFBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQ2xDO0tBQ0Y7R0FDRjs7Ozs7Ozs7QUFRRCxhQUFXLEVBQUUscUJBQVMsSUFBSSxFQUFFO0FBQUUsV0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQUU7Ozs7Ozs7QUFPM0QsZ0JBQWMsRUFBRSx3QkFBUyxJQUFJLEVBQUU7QUFDN0IsUUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVM7UUFBRSxDQUFDLFlBQUEsQ0FBQztBQUM1QixTQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDOUIsVUFBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTs7QUFFdkIsV0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDN0IsV0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDakIsZUFBTyxJQUFJLENBQUM7T0FDYjtLQUNGO0FBQ0QsV0FBTyxJQUFJLENBQUM7R0FDYjtDQUNGLENBQUM7OztBQzFERjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LFlBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztPQUN4RTs7O0FBR0QsVUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDekQsVUFBSSxJQUFJLENBQUMsSUFBSSxJQUFLLGtCQUFrQixJQUFJLElBQUksQ0FBQyxJQUFJLEFBQUMsRUFBRTtBQUNsRCxZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztPQUMxQztLQUNGOzs7U0E1QkcsSUFBSTtHQUFTLFNBQVMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIF8gPSByZXF1aXJlKCcuLi9zdWRvJyk7XG52YXIgZGVsZWdhdGVzID0gcmVxdWlyZSgnLi4vbWl4aW5zL2RlbGVnYXRlcycpO1xuXG4vLyAjI0Jhc2UgQ2xhc3MgT2JqZWN0XG4vL1xuLy8gQWxsIHN1ZG8uanMgb2JqZWN0cyBpbmhlcml0IGJhc2UsIGdpdmluZyB0aGUgYWJpbGl0eVxuLy8gdG8gdXRpbGl6ZSBkZWxlZ2F0aW9uXG4vL1xuY2xhc3MgQmFzZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIGNhbiBkZWxlZ2F0ZVxuICAgIHRoaXMuZGVsZWdhdGVzID0gW107XG4gICAgLy8gYSBiZWF1dGlmdWwgYW5kIHVuaXF1ZSBzbm93Zmxha2VcbiAgICB0aGlzLnVpZCA9IF8udW5pcXVlKCk7XG4gICAgLy8gc2hvdWxkIGJlIG92ZXJyaWRkZW4gaW4gY2hpbGQgY2xhc3Nlc1xuICAgIHRoaXMucm9sZSA9ICdiYXNlJztcbiAgfVxufVxuXG4vLyBhZGQgdGhlIGFjdHVhbCBtZXRob2RzXG5fLm1peGluKEJhc2UucHJvdG90eXBlLCBkZWxlZ2F0ZXMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2U7XG4iLCJ2YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xudmFyIF8gPSByZXF1aXJlKCcuLi9zdWRvJyk7XG52YXIgZGVsZWdhdGVzID0gcmVxdWlyZSgnLi4vbWl4aW5zL2RlbGVnYXRlcycpO1xuXG4vLyAjI0VtaXR0ZXJiYXNlIENsYXNzIE9iamVjdFxuLy9cbi8vIEEgQmFzZSBDbGFzcyBleHRlbmRpbmcgdGhlIGNvcmUgTm9kZSBtb2R1bGUgRXZlbnRFbWl0dGVyLlxuY2xhc3MgRW1pdHRlcmJhc2UgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIC8vIGNhbiBkZWxlZ2F0ZVxuICAgIHRoaXMuZGVsZWdhdGVzID0gW107XG4gICAgLy8gYSBiZWF1dGlmdWwgYW5kIHVuaXF1ZSBzbm93Zmxha2VcbiAgICB0aGlzLnVpZCA9IF8udW5pcXVlKCk7XG4gICAgLy8gc2hvdWxkIGJlIG92ZXJyaWRkZW4gaW4gY2hpbGQgY2xhc3Nlc1xuICAgIHRoaXMucm9sZSA9ICdiYXNlJztcbiAgfVxufVxuXG4vLyBhZGQgdGhlIGFjdHVhbCBtZXRob2RzXG5fLm1peGluKEVtaXR0ZXJiYXNlLnByb3RvdHlwZSwgZGVsZWdhdGVzKTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyYmFzZTtcbiIsInZhciBCYXNlID0gcmVxdWlyZSgnLi4vYmFzZS9iYXNlJyk7XG4vLyAjI0NvbnRhaW5lclxuLy9cbi8vIEEgY29udGFpbmVyIGlzIGFueSBvYmplY3QgdGhhdCBjYW4gYm90aCBjb250YWluIG90aGVyIG9iamVjdHMgYW5kXG4vLyBpdHNlbGYgYmUgY29udGFpbmVkLlxuLy9cbi8vIGBwYXJhbWAge0FycmF5fE9iamVjdH0gJ2FyZycuIE9wdGlvbmFsIGFycmF5IG9yIGhhc2hcbi8vIG9mIGNoaWxkIG9iamVjdHMgd2hpY2ggdGhlIENvbnRhaW5lciB3aWxsIGFkZCBhcyBjaGlsZCBvYmplY3RzXG4vLyB2aWEgYGFkZENoaWxkcmVuYFxuY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgQmFzZSB7XG4gIGNvbnN0cnVjdG9yKGFyZykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnJvbGUgPSAnY29udGFpbmVyJztcbiAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gICAgdGhpcy5jaGlsZE5hbWVzID0ge307XG5cbiAgICBpZihhcmcpIHRoaXMuYWRkQ2hpbGRyZW4oYXJnKTtcbiAgfVxuICAvLyAjIyNhZGRDaGlsZFxuICAvLyBBZGRzIGEgQ2xhc3MgaW5zdGFuY2UgdG8gdGhpcyBjb250YWluZXIncyBsaXN0IG9mIGNoaWxkcmVuLlxuICAvLyBBbHNvIGFkZHMgYW4gJ2luZGV4JyBwcm9wZXJ0eSBhbmQgYW4gZW50cnkgaW4gdGhlIGNoaWxkTmFtZXMgaGFzaC5cbiAgLy8gSWYgYGFkZGVkVG9QYXJlbnRgIGlzIGZvdW5kIG9uIHRoZSBjaGlsZCwgY2FsbCBpdCwgc2VuZGluZyBgdGhpc2AgYXMgYW4gYXJndW1lbnQuXG4gIC8vXG4gIC8vIGBwYXJhbWAge09iamVjdH0gYGNgLiBPdGhlciBDbGFzcyBpbnN0YW5jZS5cbiAgLy8gYHBhcmFtYCB7U3RyaW5nfSBgbmFtZWAuIEFuIG9wdGlvbmFsIG5hbWUgZm9yIHRoZSBjaGlsZCB0aGF0IHdpbGwgZ28gaW4gdGhlIGNoaWxkTmFtZXMgaGFzaC5cbiAgLy8gYHJldHVybnNgIHtPYmplY3R9IGB0aGlzYFxuICBhZGRDaGlsZChjLCBuYW1lKSB7XG4gICAgdmFyIGNoID0gdGhpcy5jaGlsZHJlbjtcbiAgICBjLnBhcmVudCA9IHRoaXM7XG4gICAgYy5pbmRleCA9IGNoLmxlbmd0aDtcbiAgICBpZihuYW1lKSB7XG4gICAgICBjLm5hbWUgPSBuYW1lO1xuICAgICAgdGhpcy5jaGlsZE5hbWVzW25hbWVdID0gYy5pbmRleDtcbiAgICB9XG4gICAgY2gucHVzaChjKTtcbiAgICBpZignYWRkZWRUb1BhcmVudCcgaW4gYykgYy5hZGRlZFRvUGFyZW50KHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8vICMjI2FkZENoaWxkcmVuXG4gIC8vIEFsbG93cyBmb3IgbXVsdGlwbGUgY2hpbGRyZW4gdG8gYmUgYWRkZWQgdG8gdGhpcyBDb250YWluZXIgYnkgcGFzc2luZ1xuICAvLyBlaXRoZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGxpdGVyYWwuXG4gIC8vXG4gIC8vIHNlZSBgYWRkQ2hpbGRgXG4gIC8vXG4gIC8vIGBwYXJhbWAge0FycmF5fE9iamVjdH0gYGFyZ2AuIEFuIGFycmF5IG9mIGNoaWxkcmVuIHRvIGFkZCBvciBhblxuICAvLyBPYmplY3QgbGl0ZXJhbCBpbiB0aGUgZm9ybSB7bmFtZTogY2hpbGR9XG4gIC8vIGByZXR1cm5zYCB7T2JqZWN0fSBgdGhpc2BcbiAgYWRkQ2hpbGRyZW4oYXJnKSB7XG4gICAgLy8gbm9ybWFsaXplIHRoZSBhcmdcbiAgICBsZXQgX2tleXMgPSBBcnJheS5pc0FycmF5KGFyZykgPyB1bmRlZmluZWQgOiBPYmplY3Qua2V5cyhhcmcpO1xuICAgIGxldCBhcnkgPSBfa2V5cyB8fCBhcmc7XG5cbiAgICBhcnkuZm9yRWFjaChjID0+IHsgX2tleXMgPyB0aGlzLmFkZENoaWxkKGFyZ1tjXSwgYykgOiB0aGlzLmFkZENoaWxkKGMpOyB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvLyAjIyNidWJibGVcbiAgLy8gQnkgZGVmYXVsdCwgYGJ1YmJsZWAgcmV0dXJucyB0aGUgY3VycmVudCB2aWV3J3MgcGFyZW50IChpZiBpdCBoYXMgb25lKVxuICAvL1xuICAvLyBgcmV0dXJuc2Age09iamVjdHx1bmRlZmluZWR9XG4gIGJ1YmJsZSgpIHsgcmV0dXJuIHRoaXMucGFyZW50OyB9XG4gIC8vICMjI2VhY2hDaGlsZFxuICAvLyBDYWxsIGEgbmFtZWQgbWV0aG9kIGFuZCBwYXNzIGFueSBhcmdzIHRvIGVhY2ggY2hpbGQgaW4gYSBjb250YWluZXInc1xuICAvLyBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuXG4gIC8vXG4gIC8vIGBwYXJhbWAgeyp9IEFueSBudW1iZXIgb2YgYXJndW1lbnRzIHRoZSBmaXJzdCBvZiB3aGljaCBtdXN0IGJlXG4gIC8vIFRoZSBuYW1lZCBtZXRob2QgdG8gbG9vayBmb3IgYW5kIGNhbGwuIE90aGVyIGFyZ3MgYXJlIHBhc3NlZCB0aHJvdWdoXG4gIC8vIGByZXR1cm5zYCB7b2JqZWN0fSBgdGhpc2BcbiAgZWFjaENoaWxkKC4uLmFyZ3MpIHtcbiAgICBsZXQgbWV0aCA9IGFyZ3Muc2hpZnQoKTtcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goYyA9PiB7IGlmKG1ldGggaW4gYykgY1ttZXRoXS5hcHBseShjLCBhcmdzKTsgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLy8gIyMjZ2V0Q2hpbGRcbiAgLy8gSWYgYSBjaGlsZCB3YXMgYWRkZWQgd2l0aCBhIG5hbWUsIHZpYSBgYWRkQ2hpbGRgLFxuICAvLyB0aGF0IG9iamVjdCBjYW4gYmUgZmV0Y2hlZCBieSBuYW1lLiBUaGlzIHByZXZlbnRzIHVzIGZyb20gaGF2aW5nIHRvIHJlZmVyZW5jZSBhXG4gIC8vIGNvbnRhaW5lcnMgY2hpbGRyZW4gYnkgaW5kZXguIFRoYXQgaXMgcG9zc2libGUgaG93ZXZlciwgdGhvdWdoIG5vdCBwcmVmZXJyZWQuXG4gIC8vXG4gIC8vIGBwYXJhbWAge1N0cmluZ3xOdW1iZXJ9IGBpZGAuIFRoZSBzdHJpbmcgYG5hbWVgIG9yIG51bWVyaWMgYGluZGV4YCBvZiB0aGUgY2hpbGQgdG8gZmV0Y2guXG4gIC8vIGByZXR1cm5zYCB7T2JqZWN0fHVuZGVmaW5lZH0gVGhlIGZvdW5kIGNoaWxkXG4gIGdldENoaWxkKGlkKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBpZCA9PT0gJ3N0cmluZycgPyB0aGlzLmNoaWxkcmVuW3RoaXMuY2hpbGROYW1lc1tpZF1dIDpcbiAgICAgIHRoaXMuY2hpbGRyZW5baWRdO1xuICB9XG4gIC8vICMjI19pbmRleENoaWxkcmVuX1xuICAvLyBNZXRob2QgaXMgY2FsbGVkIHdpdGggdGhlIGBpbmRleGAgcHJvcGVydHkgb2YgYSBzdWJ2aWV3IHRoYXQgaXMgYmVpbmcgcmVtb3ZlZC5cbiAgLy8gQmVnaW5uaW5nIGF0IGBpYCBkZWNyZW1lbnQgc3VidmlldyBpbmRpY2VzLlxuICAvLyBgcGFyYW1gIHtOdW1iZXJ9IGBpYFxuICAvLyBgcHJpdmF0ZWBcbiAgX2luZGV4Q2hpbGRyZW5fKGkpIHtcbiAgICBsZXQgYyA9IHRoaXMuY2hpbGRyZW47XG4gICAgbGV0IG9iaiA9IHRoaXMuY2hpbGROYW1lcztcbiAgICBsZXQgbGVuO1xuICAgIGZvciAobGVuID0gYy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY1tpXS5pbmRleC0tO1xuICAgICAgLy8gYWRqdXN0IGFueSBlbnRyaWVzIGluIGNoaWxkTmFtZXNcbiAgICAgIGlmKGNbaV0ubmFtZSBpbiBvYmopIG9ialtjW2ldLm5hbWVdID0gY1tpXS5pbmRleDtcbiAgICB9XG4gIH1cbiAgLy8gIyMjcmVtb3ZlQ2hpbGRcbiAgLy8gRmluZCB0aGUgaW50ZW5kZWQgY2hpbGQgZnJvbSBteSBsaXN0IG9mIGNoaWxkcmVuIGFuZCByZW1vdmUgaXQsIHJlbW92aW5nIHRoZSBuYW1lIHJlZmVyZW5jZSBhbmQgcmUtaW5kZXhpbmdcbiAgLy8gcmVtYWluaW5nIGNoaWxkcmVuLiBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZW1vdmUgdGhlIGNoaWxkJ3MgRE9NLlxuICAvLyBPdmVycmlkZSB0aGlzIG1ldGhvZCwgZG9pbmcgd2hhdGV2ZXIgeW91IHdhbnQgdG8gdGhlIGNoaWxkJ3MgRE9NLCB0aGVuIGNhbGwgYGJhc2UoJ3JlbW92ZUNoaWxkJylgIHRvIGRvIHNvLlxuICAvL1xuICAvLyBJZiB0aGUgY2hpbGQgYmVpbmcgcmVtb3ZlZCBoYXMgYSBgcmVtb3ZlZEZyb21QYXJlbnRgIG1ldGhvZCBpdCB3aWxsIGJlIGNhbGxlZCBhZnRlciB0aGUgcGFyZW50aCBoYXNcbiAgLy8gZmluaXNoZWQsIHBhc3NpbmcgaXRzZWxmKHRoZSBwYXJlbnQpIGFzIGFuIGFyZ3VtZW50LlxuICAvL1xuICAvLyBgcGFyYW1gIHtTdHJpbmd8TnVtYmVyfE9iamVjdH0gYGFyZ2AuIENoaWxkcmVuIHdpbGwgYWx3YXlzIGhhdmUgYW4gYGluZGV4YCBudW1iZXIsIGFuZCBvcHRpb25hbGx5IGEgYG5hbWVgLlxuICAvLyBJZiBwYXNzZWQgYSBzdHJpbmcgYG5hbWVgIGlzIGFzc3VtZWQsIHNvIGJlIHN1cmUgdG8gcGFzcyBhbiBhY3R1YWwgbnVtYmVyIGlmIGV4cGVjdGluZyB0byB1c2UgaW5kZXguXG4gIC8vIEFuIG9iamVjdCB3aWxsIGJlIGFzc3VtZWQgdG8gYmUgYW4gYWN0dWFsIHN1ZG8gQ2xhc3MgT2JqZWN0LlxuICAvLyBgcmV0dXJuc2Age09iamVjdH0gYHRoaXNgXG4gIHJlbW92ZUNoaWxkKGFyZykge1xuICAgIGxldCBpO1xuICAgIGxldCB0ID0gdHlwZW9mIGFyZztcbiAgICBsZXQgYztcbiAgICAvLyBub3JtYWxpemUgdGhlIGlucHV0XG4gICAgaWYodCA9PT0gJ29iamVjdCcpIGMgPSBhcmc7XG4gICAgZWxzZSBjID0gdCA9PT0gJ3N0cmluZycgPyB0aGlzLmNoaWxkcmVuW3RoaXMuY2hpbGROYW1lc1thcmddXSA6IHRoaXMuY2hpbGRyZW5bYXJnXTtcbiAgICAvLyBpZiBubyBjaGlsZCBleGlzdHMgYmFzZWQgb24gdGhlIGFyZ3VtZW50LCBkb24ndCB0cnkgdG8gcmVtb3ZlIGl0XG4gICAgaWYoIWMpIHJldHVybiB0aGlzO1xuICAgIGkgPSBjLmluZGV4O1xuICAgIC8vIHJlbW92ZSBmcm9tIHRoZSBjaGlsZHJlbiBBcnJheVxuICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGksIDEpO1xuICAgIC8vIHJlbW92ZSBmcm9tIHRoZSBuYW1lZCBjaGlsZCBoYXNoIGlmIHByZXNlbnRcbiAgICBkZWxldGUgdGhpcy5jaGlsZE5hbWVzW2MubmFtZV07XG4gICAgLy8gY2hpbGQgaXMgbm93IGFuIGBvcnBoYW5gXG4gICAgZGVsZXRlIGMucGFyZW50O1xuICAgIGRlbGV0ZSBjLmluZGV4O1xuICAgIGRlbGV0ZSBjLm5hbWU7XG4gICAgdGhpcy5faW5kZXhDaGlsZHJlbl8oaSk7XG4gICAgaWYoJ3JlbW92ZWRGcm9tUGFyZW50JyBpbiBjKSBjLnJlbW92ZWRGcm9tUGFyZW50KHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8vICMjI3JlbW92ZUNoaWxkcmVuXG4gIC8vIFJlbW92ZSBhbGwgY2hpbGRyZW4uXG4gIC8vXG4gIC8vIHNlZSBgcmVtb3ZlQ2hpbGRgXG4gIC8vIGByZXR1cm5zYCB7b2JqZWN0fSBgdGhpc2BcbiAgcmVtb3ZlQ2hpbGRyZW4oKSB7XG4gICAgbGV0IG4gPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcbiAgICB3aGlsZShuID4gMCkge1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmNoaWxkcmVuW24gLSAxXSk7XG4gICAgICBuLS07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gIyMjc2VuZFxuICAvLyBUaGUgY2FsbCB0byB0aGUgc3BlY2lmaWMgbWV0aG9kIG9uIGEgKHVuKXNwZWNpZmllZCB0YXJnZXQgaGFwcGVucyBoZXJlLlxuICAvLyBJZiB0aGlzIE9iamVjdCBpcyBwYXJ0IG9mIGEgYHN1ZG8uQ29udGFpbmVyYCBtYWludGFpbmVkIGhpZXJhcmNoeVxuICAvLyB0aGUgJ3RhcmdldCcgbWF5IGJlIGxlZnQgb3V0LCBjYXVzaW5nIHRoZSBgYnViYmxlKClgIG1ldGhvZCB0byBiZSBjYWxsZWQuXG4gIC8vIFdoYXQgdGhpcyBkb2VzIGlzIGFsbG93IGNoaWxkcmVuIG9mIGEgYHN1ZG8uQ29udGFpbmVyYCB0byBzaW1wbHkgcGFzc1xuICAvLyBldmVudHMgIHVwd2FyZCwgZGVsZWdhdGluZyB0aGUgcmVzcG9uc2liaWxpdHkgb2YgZGVjaWRpbmcgd2hhdCB0byBkbyB0byB0aGUgcGFyZW50LlxuICAvL1xuICAvLyBOT1RFIE9ubHkgdGhlIGZpcnN0IHRhcmdldCBtZXRob2QgZm91bmQgaXMgY2FsbGVkLCBidWJibGluZyBzdG9wcyB0aGVyZS5cbiAgLy8gSWYgeW91IHdpc2ggaXQgdG8gY29udGludWUgY2FsbCBgc2VuZGAgYWdhaW4uLi5cbiAgLy9cbiAgLy8gYHBhcmFtYCB7Kn0gQW55IG51bWJlciBvZiBhcmd1bWVudHMgaXMgc3VwcG9ydGVkLCBidXQgdGhlIGZpcnN0IGlzIHRoZSBvbmx5IG9uZSBzZWFyY2hlZCBmb3IgaW5mby5cbiAgLy8gQSBzZW5kTWV0aG9kIHdpbGwgYmUgbG9jYXRlZCBieTpcbiAgLy8gICAxLiB1c2luZyB0aGUgZmlyc3QgYXJndW1lbnQgaWYgaXQgaXMgYSBzdHJpbmdcbiAgLy8gICAyLiBsb29raW5nIGZvciBhIGBzZW5kTWV0aG9kYCBwcm9wZXJ0eSBpZiBpdCBpcyBhbiBvYmplY3RcbiAgLy8gQW55IGFyZ3Mgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHNlbmRNZXRob2RcbiAgLy8gYHJldHVybnNgIHtPYmplY3R9IGB0aGlzYFxuICBzZW5kKC4uLmFyZ3MpIHtcbiAgICBsZXQgZCA9IHRoaXMuZGF0YTtcbiAgICBsZXQgbWV0aDtcbiAgICBsZXQgdGFyZztcbiAgICBsZXQgZm47XG4gICAgLy8gLnNlbmRNZXRob2QgdXNlZnVsIGZvciBkaXJlY3QgZXZlbnQgYmluZGluZyB0byBhIHNlbmRcbiAgICBpZihkICYmICdzZW5kTWV0aG9kJyBpbiBkKSBtZXRoID0gZC5zZW5kTWV0aG9kO1xuICAgIC8vIHRoaXMuc2VuZCgnZm9vJywgLi4uYXJncylcbiAgICBlbHNlIGlmKHR5cGVvZiBhcmdzWzBdID09PSAnc3RyaW5nJykgbWV0aCA9IGFyZ3Muc2hpZnQoKTtcbiAgICAvLyBpZiB0aGVyZSB3YXMgbm8gc2VuZCB0YXJnZXQgc3BlY2lmaWVkIGJhaWwgb3V0XG4gICAgaWYgKCFtZXRoKSByZXR1cm47XG4gICAgLy8gdGFyZ2V0IGlzIGVpdGhlciBzcGVjaWZpZWQgb3IgbXkgcGFyZW50XG4gICAgdGFyZyA9IGQgJiYgZC5zZW5kVGFyZ2V0IHx8IHRoaXMuYnViYmxlKCk7XG4gICAgLy8gb2J2aW91cyBjaGFuY2UgZm9yIGVycm9ycyBoZXJlLCBkb24ndCBiZSBkdW1iXG4gICAgZm4gPSB0YXJnW21ldGhdO1xuICAgIHdoaWxlKCFmbiAmJiAodGFyZyA9IHRhcmcuYnViYmxlKCkpKSBmbiA9IHRhcmdbbWV0aF07XG4gICAgaWYoZm4pIGZuLmFwcGx5KHRhcmcsIGFyZ3MpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGFpbmVyO1xuIiwidmFyIENvbnRhaW5lciA9IHJlcXVpcmUoJy4uL2NvbnRhaW5lci9jb250YWluZXInKTtcbi8vICMjRGlzcGF0Y2hlclxuLy9cbi8vIEEgZGlzcGF0Y2hlciBpcyBhIHNwZWNpYWxpemVkIGNvbnRhaW5lciB0aGF0OlxuLy9cbi8vICogQWN0cyBhcyB0aGUgc29sZSByb290IGNvbnRhaW5lciBvZiBhbGwgdmlldyBjb21wb25lbnRzXG4vLyAqIFNlcnZlcyBhcyB0aGUgZW5kLW9mLXRoZS1saW5lIGZvciB0aGUgYHNlbmRgIHJlc3BvbmRlci1jaGFpblxuLy8gKiBBbGxvd3Mgc3RvcmVzIHRvIHJlZ2lzdGVyIGZvciBwYXlsb2FkIGRpc3BhdGNoZXNcbi8vICogQWxsb3dzIHN0b3JlcyB0byB1bnJlZ2lzdGVyIGZvciBwYXlsb2FkIGRpc3BhdGNoZXNcbi8vICogRGlzcGF0Y2hlcyBwYXlsb2FkcyB0byByZWdpc3RlcmVkIHN0b3JlcyAodHJpZ2dlcmQgdmlhIGBzZW5kYClcbi8vXG4vLyBgcGFyYW1gIHtBcnJheXxPYmplY3R9ICdhcmcnLiBPcHRpb25hbCBhcnJheSBvciBoYXNoXG4vLyBgc2VlYCBDb250YWluZXJcbi8vIGBtYW55VGhhbmtzYCBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmx1eC9ibG9iL21hc3Rlci9zcmMvRGlzcGF0Y2hlci5qc1xuY2xhc3MgRGlzcGF0Y2hlciBleHRlbmRzIENvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKGFyZykge1xuICAgIHN1cGVyKGFyZyk7XG5cbiAgICB0aGlzLnJvbGUgPSAnZGlzcGF0Y2hlcic7XG4gICAgdGhpcy5wcmVmaXggPSAnaWRfJztcbiAgICB0aGlzLmNvdW50ZXIgPSAxO1xuICAgIHRoaXMuY2FsbGJhY2tzID0ge307XG4gICAgdGhpcy5wZW5kaW5nID0ge307XG4gICAgdGhpcy5leGVjdXRlZCA9IHt9O1xuICAgIHRoaXMuaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuICAgIHRoaXMucGVuZGluZ1BheWxvYWQgPSBudWxsO1xuICB9XG5cbiAgLy8gIyMjZGlzcGF0Y2hcbiAgZGlzcGF0Y2goZGF0YSkge1xuICAgIGlmKHRoaXMuaXNEaXNwYXRjaGluZykgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBkaXNwYXRjaCBkdXJpbmcgYSBkaXNwYXRjaCcpO1xuICAgIHRoaXMuc3RhcnREaXNwYXRjaGluZyhkYXRhKTtcbiAgICB0cnkge1xuICAgICAgT2JqZWN0LmtleXModGhpcy5jYWxsYmFja3MpLmZvckVhY2goaWQgPT4ge1xuICAgICAgICBpZiAoIXRoaXMucGVuZGluZ1tpZF0pIHRoaXMuZXhlY3V0ZUNhbGxiYWNrKGlkKTtcbiAgICAgIH0pO1xuICAgIH0gZmluYWxseSB7IHRoaXMuc3RvcERpc3BhdGNoaW5nKCk7IH1cbiAgfVxuXG4gIC8vICMjI2V4ZWN1dGVDYWxsYmFja1xuICAvLyBEbyBpdC5cbiAgLy8gYHBhcmFtYCB7c3RyaW5nfSBgaWRgLiBUaGUgcmVnaXN0ZXJlZCBjYWxsYmFjayB0byBjYWxsIHdpdGggdGhlIGN1cnJlbnQgcGF5bG9hZFxuICBleGVjdXRlQ2FsbGJhY2soaWQpIHtcbiAgICB0aGlzLnBlbmRpbmdbaWRdID0gdHJ1ZTtcbiAgICB0aGlzLmNhbGxiYWNrc1tpZF0odGhpcy5wZW5kaW5nUGF5bG9hZCk7XG4gICAgdGhpcy5leGVjdXRlZFtpZF0gPSB0cnVlO1xuICB9XG5cbiAgLy8gIyMjcmVnaXN0ZXJcbiAgLy8gQ2FsbGVkIGJ5IHN0b3JlcyB3aG8gd2lzaCB0byBiZSBzZW50IGRpc3BhdGNoIHBheWxvYWRzLlxuICAvLyBgcGFyYW1gIHtmdW5jdGlvbn0gYGZuYC4gVGhlIGNhbGxiYWNrIHRvIHNlbmQgcGF5bG9hZHMgdG9cbiAgLy8gYHJldHVybnNgIHtzdHJpbmd9IEFuIFwiaWRcIiB0aGF0IHRoZSBzdG9yZSBjYW4gdXNlIHRvIHVucmVnaXN0ZXJcbiAgcmVnaXN0ZXIoZm4pIHtcbiAgICBsZXQga2V5ID0gdGhpcy5wcmVmaXggKyB0aGlzLmNvdW50ZXIrKztcbiAgICB0aGlzLmNhbGxiYWNrc1trZXldID0gZm47XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuXG4gIC8vICMjI3N0YXJ0RGlzcGF0Y2hpbmdcbiAgLy9cbiAgLy8gYHBhcmFtYCB7b2JqZWN0fSBgZGF0YWBcbiAgc3RhcnREaXNwYXRjaGluZyhkYXRhKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5jYWxsYmFja3MpLmZvckVhY2goaWQgPT4ge1xuICAgICAgdGhpcy5wZW5kaW5nW2lkXSA9IGZhbHNlO1xuICAgICAgdGhpcy5leGVjdXRlZFtpZF0gPSBmYWxzZTtcbiAgICB9KTtcblxuICAgIHRoaXMucGVuZGluZ1BheWxvYWQgPSBkYXRhO1xuICAgIHRoaXMuaXNEaXNwYXRjaGluZyA9IHRydWU7XG4gIH1cblxuICBzdG9wRGlzcGF0Y2hpbmcoKSB7XG4gICAgdGhpcy5wZW5kaW5nUGF5bG9hZCA9IG51bGw7XG4gICAgdGhpcy5pc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG4gIH1cblxuICAvLyAjIyN1bnJlZ2lzdGVyXG4gIC8vIEFsbG93cyBhIHN0b3JlIHRvIHN0b3AgbGlzdGVuaW5nIGZvciBkaXNwYXRjaFxuICB1bnJlZ2lzdGVyKGlkKSB7IGRlbGV0ZSB0aGlzLmNhbGxiYWNrc1tpZF07IH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEaXNwYXRjaGVyO1xuIiwiLy8gIyNEZWxlZ2F0ZXMgbWl4aW5cbi8vIFVzZWQgYnkgdGhlIHR3byBiYXNlIGNsYXNzZXMsIEJhc2UgYW5kIEVtaXR0ZXJiYXNlXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gIyMjYWRkRGVsZWdhdGVcbiAgLy8gUHVzaCBhbiBpbnN0YW5jZSBvZiBhIENsYXNzIE9iamVjdCBpbnRvIHRoaXMgb2JqZWN0J3MgYF9kZWxlZ2F0ZXNfYCBsaXN0LlxuICAvL1xuICAvLyBgcGFyYW1gIHtPYmplY3R9IGBkZWxgLiBBbiBpbnN0YW5jZSBvZiBhIHN1ZG8uZGVsZWdhdGVzIENsYXNzIE9iamVjdFxuICAvLyBgcmV0dXJuc2Age09iamVjdH0gYHRoaXNgXG4gIGFkZERlbGVnYXRlOiBmdW5jdGlvbihkZWwpIHtcbiAgICBkZWwuZGVsZWdhdG9yID0gdGhpcztcbiAgICB0aGlzLmRlbGVnYXRlcy5wdXNoKGRlbCk7XG4gICAgaWYoJ2FkZGVkQXNEZWxlZ2F0ZScgaW4gZGVsKSBkZWwuYWRkZWRBc0RlbGVnYXRlKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICAvLyAjIyNkZWxlZ2F0ZVxuICAvLyBGcm9tIHRoaXMgb2JqZWN0J3MgbGlzdCBvZiBkZWxlZ2F0ZXMgZmluZCB0aGUgb2JqZWN0IHdob3NlIGBfcm9sZV9gIG1hdGNoZXNcbiAgLy8gdGhlIHBhc3NlZCBgbmFtZWAgYW5kOlxuICAvLyAxLiBpZiBgbWV0aGAgaXMgZmFsc3kgcmV0dXJuIHRoZSBkZWxlZ2F0ZS5cbiAgLy8gMiBpZiBgbWV0aGAgaXMgdHJ1dGh5IGJpbmQgaXRzIG1ldGhvZCAodG8gdGhlIGRlbGVnYXRlKSBhbmQgcmV0dXJuIHRoZSBtZXRob2RcbiAgLy9cbiAgLy8gYHBhcmFtYCB7U3RyaW5nfSBgcm9sZWAgVGhlIHJvbGUgcHJvcGVydHkgdG8gbWF0Y2ggaW4gdGhpcyBvYmplY3QncyBkZWxlZ2F0ZXMgbGlzdFxuICAvLyBgcGFyYW1gIHtTdHJpbmd9IGBtZXRoYCBPcHRpb25hbCBtZXRob2QgdG8gYmluZCB0byB0aGUgYWN0aW9uIHRoaXMgZGVsZWdhdGUgaXMgYmVpbmcgdXNlZCBmb3JcbiAgLy8gYHJldHVybnNgXG4gIGRlbGVnYXRlOiBmdW5jdGlvbihyb2xlLCBtZXRoKSB7XG4gICAgbGV0IGRlbCA9IHRoaXMuZGVsZWdhdGVzLCBpO1xuICAgIGZvcihpID0gMDsgaSA8IGRlbC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYoZGVsW2ldLnJvbGUgPT09IHJvbGUpIHtcbiAgICAgICAgaWYoIW1ldGgpIHJldHVybiBkZWxbaV07XG4gICAgICAgIHJldHVybiBkZWxbaV1bbWV0aF0uYmluZChkZWxbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgLy8gIyMjZ2V0RGVsZWdhdGVcbiAgLy8gRmV0Y2ggYSBkZWxlZ2F0ZSB3aG9zZSByb2xlIHByb3BlcnR5IG1hdGNoZXMgdGhlIHBhc3NlZCBpbiBhcmd1bWVudC5cbiAgLy8gVXNlcyB0aGUgYGRlbGVnYXRlYCBtZXRob2QgaW4gaXRzICdzaW5nbGUgYXJndW1lbnQnIGZvcm0sIGluY2x1ZGVkIGZvclxuICAvLyBBUEkgY29uc2lzdGVuY3lcbiAgLy9cbiAgLy8gYHBhcmFtYCB7U3RyaW5nfSBgcm9sZWBcbiAgLy8gJ3JldHVybnMnIHtPYmplY3R8dW5kZWZpbmVkfVxuICBnZXREZWxlZ2F0ZTogZnVuY3Rpb24ocm9sZSkgeyByZXR1cm4gdGhpcy5kZWxlZ2F0ZShyb2xlKTsgfSxcbiAgLy8gIyMjcmVtb3ZlRGVsZWdhdGVcbiAgLy8gRnJvbSB0aGlzIG9iamVjdHMgYGRlbGVnYXRlc2AgbGlzdCByZW1vdmUgdGhlIG9iamVjdCAodGhlcmUgc2hvdWxkIG9ubHkgZXZlciBiZSAxKVxuICAvLyB3aG9zZSByb2xlIG1hdGNoZXMgdGhlIHBhc3NlZCBpbiBhcmd1bWVudFxuICAvL1xuICAvLyBgcGFyYW1gIHtTdHJpbmd9IGByb2xlYFxuICAvLyBgcmV0dXJuc2Age09iamVjdH0gYHRoaXNgXG4gIHJlbW92ZURlbGVnYXRlOiBmdW5jdGlvbihyb2xlKSB7XG4gICAgbGV0IGRlbCA9IHRoaXMuZGVsZWdhdGVzLCBpO1xuICAgIGZvcihpID0gMDsgaSA8IGRlbC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYoZGVsW2ldLnJvbGUgPT09IHJvbGUpIHtcbiAgICAgICAgLy8gbm8gX2RlbGVnYXRvcl8gZm9yIHlvdVxuICAgICAgICBkZWxbaV0uZGVsZWdhdG9yID0gdW5kZWZpbmVkO1xuICAgICAgICBkZWwuc3BsaWNlKGksIDEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfVxuICAgICAgdGhyb3cgVHlwZUVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LicpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICBhcmdzID0gbmV3IEFycmF5KGxlbiAtIDEpO1xuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgbGVuOyBpKyspXG4gICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiAtIDEpO1xuICAgIGZvciAoaSA9IDE7IGkgPCBsZW47IGkrKylcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuXG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgdmFyIG07XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCFlbWl0dGVyLl9ldmVudHMgfHwgIWVtaXR0ZXIuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSAwO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKGVtaXR0ZXIuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gMTtcbiAgZWxzZVxuICAgIHJldCA9IGVtaXR0ZXIuX2V2ZW50c1t0eXBlXS5sZW5ndGg7XG4gIHJldHVybiByZXQ7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG4iLCJ2YXIgRW1pdHRlcmJhc2UgPSByZXF1aXJlKCcuLi9iYXNlL2VtaXR0ZXInKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vc3VkbycpO1xuLy8gIyNTdG9yZVxuLy9cbi8vIFN0b3JlIE9iamVjdHMgZXhwb3NlIG1ldGhvZHMgZm9yIHNldHRpbmcgYW5kIGdldHRpbmcgZGF0YS4gQmVpbmcgYSBzdWJjbGFzc1xuLy8gb2YgRW1pdHRlcmJhc2UsIEV2ZW50RW1pdHRlciBtZXRob2RzIGFyZSBhdmFpbGFibGUuIEFmdGVyIHByb2Nlc3NpbmcsIGFcbi8vIHN0b3JlIG1heSBlbWl0IHRoZSBgY2hhbmdlYCBldmVudCBzaWduaWZ5aW5nIGl0IGlzIHJlYWR5IHRvIGJlIHF1ZXJpZWRcbi8vXG4vLyBgcGFyYW1gIHtvYmplY3R9IGRhdGEuIEFuIGluaXRpYWwgc3RhdGUgZm9yIHRoaXMgc3RvcmUuXG4vL1xuLy8gYGNvbnN0cnVjdG9yYFxuY2xhc3MgU3RvcmUgZXh0ZW5kcyBFbWl0dGVyYmFzZSB7XG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5yb2xlID0gJ21vZGVsJztcbiAgICAvLyBzdG9yZXMgb3BlcmF0ZSBvbiB0aGUgaW5uZXIgZGF0YSBoYXNoLi4uXG4gICAgdGhpcy5kYXRhID0gZGF0YSB8fCB7fTtcbiAgfVxuICAvLyAjIyNnZXRcbiAgLy8gUmV0dXJucyB0aGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIGEga2V5LlxuICAvL1xuICAvLyBgcGFyYW1gIHtTdHJpbmd9IGBrYC4gVGhlIG5hbWUgb2YgdGhlIGtleVxuICAvLyBgcmV0dXJuc2Ageyp9LiBUaGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIHRoZSBrZXkgb3IgZmFsc2UgaWYgbm90IGZvdW5kLlxuICBnZXQoaykgeyByZXR1cm4gdGhpcy5kYXRhW2tdOyB9XG4gIC8vICMjI2dldFBhdGhcbiAgLy8gVXNlcyB0aGUgc3VkbyBuYW1lc3BhY2UncyBnZXRwYXRoIGZ1bmN0aW9uIG9wZXJhdGluZyBvbiB0aGUgbW9kZWwnc1xuICAvLyBkYXRhIGhhc2guXG4gIC8vXG4gIC8vIGBwYXJhbWAge3N0cmluZ30gYHBhdGhgXG4gIC8vIGByZXR1cm5zYCB7Knx1bmRlZmluZWR9LiBUaGUgdmFsdWUgYXQga2V5cGF0aCBvciB1bmRlZmluZWQgaWYgbm90IGZvdW5kLlxuICBnZXRQYXRoKHBhdGgpIHtcbiAgICByZXR1cm4gXy5nZXRQYXRoKHBhdGgsIHRoaXMuZGF0YSk7XG4gIH1cbiAgLy8gIyMjZ2V0c1xuICAvLyBBc3NlbWJsZXMgYW5kIHJldHVybnMgYW4gb2JqZWN0IG9mIGtleTp2YWx1ZSBwYWlycyBmb3IgZWFjaCBrZXlcbiAgLy8gY29udGFpbmVkIGluIHRoZSBwYXNzZWQgaW4gQXJyYXkuXG4gIC8vXG4gIC8vIGBwYXJhbWAge2FycmF5fSBgYXJ5YC4gQW4gYXJyYXkgb2Yga2V5cy5cbiAgLy8gYHJldHVybnNgIHtvYmplY3R9XG4gIGdldHMoYXJ5KSB7XG4gICAgbGV0IG9iaiA9IHt9O1xuICAgIGFyeS5mb3JFYWNoKHN0ciA9PiB7XG4gICAgICBvYmpbc3RyXSA9ICF+c3RyLmluZGV4T2YoJy4nKSA/IHRoaXMuZ2V0KHN0cikgOiB0aGlzLmdldFBhdGgoc3RyKTtcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqO1xuICB9XG4gIC8vICMjI3NldFxuICAvLyBTZXQgYSBrZXk6dmFsdWUgcGFpci5cbiAgLy9cbiAgLy8gYHBhcmFtYCB7U3RyaW5nfSBga2AuIFRoZSBuYW1lIG9mIHRoZSBrZXkuXG4gIC8vIGBwYXJhbWAgeyp9IGB2YC4gVGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGUga2V5LlxuICAvLyBgcmV0dXJuc2Age09iamVjdH0gYHRoaXNgXG4gIHNldChrLCB2KSB7XG4gICAgLy8gX05PVEU6IGludGVudGlvbmFsIHBvc3NpYmlsdHkgb2Ygc2V0dGluZyBhIGZhbHN5IHZhbHVlX1xuICAgIHRoaXMuZGF0YVtrXSA9IHY7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLy8gIyMjc2V0UGF0aFxuICAvLyBVc2VzIHRoZSBgc2V0cGF0aGAgZnVuY3Rpb24gb3BlcmF0aW5nIG9uIHRoZSBtb2RlbCdzXG4gIC8vIGRhdGEgaGFzaC5cbiAgLy9cbiAgLy8gYHBhcmFtYCB7U3RyaW5nfSBgcGF0aGBcbiAgLy8gYHBhcmFtYCB7Kn0gYHZgXG4gIC8vIGByZXR1cm5zYCB7T2JqZWN0fSB0aGlzLlxuICBzZXRQYXRoKHBhdGgsIHYpIHtcbiAgICBfLnNldFBhdGgocGF0aCwgdiwgdGhpcy5kYXRhKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvLyAjIyNzZXRzXG4gIC8vIEludm9rZXMgYHNldCgpYCBvciBgc2V0UGF0aCgpYCBmb3IgZWFjaCBrZXkgdmFsdWUgcGFpciBpbiBgb2JqYC5cbiAgLy8gQW55IGxpc3RlbmVycyBmb3IgdGhvc2Uga2V5cyBvciBwYXRocyB3aWxsIGJlIGNhbGxlZC5cbiAgLy9cbiAgLy8gYHBhcmFtYCB7T2JqZWN0fSBgb2JqYC4gVGhlIGtleXMgYW5kIHZhbHVlcyB0byBzZXQuXG4gIC8vIGByZXR1cm5zYCB7T2JqZWN0fSBgdGhpc2BcbiAgc2V0cyhvYmopIHtcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goayA9PiB7XG4gICAgICAhfmsuaW5kZXhPZignLicpID8gdGhpcy5zZXQoaywgb2JqW2tdKSA6IHRoaXMuc2V0UGF0aChrLCBvYmpba10pO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8vICMjI3Vuc2V0XG4gIC8vIFJlbW92ZSBhIGtleTp2YWx1ZSBwYWlyIGZyb20gdGhpcyBvYmplY3QncyBkYXRhIHN0b3JlXG4gIC8vXG4gIC8vIGBwYXJhbWAge1N0cmluZ30gYGtgXG4gIC8vIGByZXR1cm5zYCB7T2JqZWN0fSBgdGhpc2BcbiAgdW5zZXQoaykge1xuICAgIGRlbGV0ZSB0aGlzLmRhdGFba107XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLy8gIyMjdW5zZXRQYXRoXG4gIC8vIFVzZXMgdGhlIGB1bnNldFBhdGhgIG1ldGhvZCwgb3BlcmF0aW5nIG9uIHRoaXMgbW9kZWxzIGRhdGEgaGFzaFxuICAvL1xuICAvLyBgcGFyYW1gIHtTdHJpbmd9IHBhdGhcbiAgLy8gYHJldHVybnNgIHtPYmplY3R9IGB0aGlzYFxuICB1bnNldFBhdGgocGF0aCkge1xuICAgIF8udW5zZXRQYXRoKHBhdGgsIHRoaXMuZGF0YSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLy8gIyMjdW5zZXRzXG4gIC8vIERlbGV0ZXMgYSBudW1iZXIgb2Yga2V5cyBvciBwYXRocyBmcm9tIHRoaXMgb2JqZWN0J3MgZGF0YSBzdG9yZVxuICAvL1xuICAvLyBgcGFyYW1gIHthcnJheX0gYGFyeWAuIEFuIGFycmF5IG9mIGtleXMgb3IgcGF0aHMuXG4gIC8vIGByZXR1cm5zYCB7T2JqYWVjdH0gYHRoaXNgXG4gIHVuc2V0cyhhcnkpIHtcbiAgICBhcnkuZm9yRWFjaChrID0+IHsgIX5rLmluZGV4T2YoJy4nKSA/IHRoaXMudW5zZXQoaykgOiB0aGlzLnVuc2V0UGF0aChrKTsgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdG9yZTtcbiIsIi8vICMjI2dldFBhdGhcbi8vIEV4dHJhY3QgYSB2YWx1ZSBsb2NhdGVkIGF0IGBwYXRoYCByZWxhdGl2ZSB0byB0aGUgcGFzc2VkIGluIG9iamVjdFxuLy9cbi8vIGBwYXJhbWAge1N0cmluZ30gYHBhdGhgLiBUaGUga2V5IGluIHRoZSBmb3JtIG9mIGEgZG90LWRlbGltaXRlZCBwYXRoLlxuLy8gYHBhcmFtYCB7b2JqZWN0fSBgb2JqYC4gQW4gb2JqZWN0IGxpdGVyYWwgdG8gb3BlcmF0ZSBvbi5cbi8vXG4vLyBgcmV0dXJuc2Ageyp8dW5kZWZpbmVkfS4gVGhlIHZhbHVlIGF0IGtleXBhdGggb3IgdW5kZWZpbmVkIGlmIG5vdCBmb3VuZC5cbmV4cG9ydHMuZ2V0UGF0aCA9IGZ1bmN0aW9uKHBhdGgsIG9iaikge1xuICB2YXIga2V5LCBwO1xuICBwID0gcGF0aC5zcGxpdCgnLicpO1xuICBmb3IgKDsgcC5sZW5ndGggJiYgKGtleSA9IHAuc2hpZnQoKSk7KSB7XG4gICAgaWYoIXAubGVuZ3RoKSByZXR1cm4gb2JqW2tleV07XG4gICAgZWxzZSBvYmogPSBvYmpba2V5XSB8fCB7fTtcbiAgfVxuICByZXR1cm4gb2JqO1xufTtcbi8vICMjI21ha2VNZUFTYW5kd2ljaFxuLy8gTm90aWNlIHRoZXJlIGlzIG5vIG5lZWQgdG8gZXh0cmluc2ljYWxseSBpbnN0cnVjdCAqaG93KiB0b1xuLy8gbWFrZSB0aGUgc2FuZHdpY2gsIGp1c3QgdGhlIGVsZWdhbnQgc2luZ2xlIGNvbW1hbmQuXG4vL1xuLy8gYHJldHVybnNgIHtzdHJpbmd9XG5leHBvcnRzLm1ha2VNZUFTYW5kd2ljaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gJ09rYXkuJzsgfTtcbi8vICMjI21peGluXG4vLyBlczYgQ2xhc3NlcyBkbyBub3QgaGF2ZSBhIGB0cmFpdHNgIGZ1bmN0aW9uYWxpdHkgYXMgb2YgeWV0LiBUaGlzIG1ldGhvZCBpc1xuLy8gcHJvdmlkZWQgdW50aWwgdGhlcmUgaXMgb25lLlxuLy9cbi8vIGBwYXJhbWAge2NsYXNzIHByb3RvdHlwZX0gYHRhcmdgLiBBIFN1ZG8gQ2xhc3MgaW5zdGFuY2UncyBwcm90b3R5cGVcbi8vIGBwYXJhbWAge09iamVjdH0gYHNvdXJjZWAuIEFuIE9iamVjdCBMaXRlcmFsIGNvbnRhaW5pbmcgcHJvcGVydGllcyB0byBhZGRcbmV4cG9ydHMubWl4aW4gPSBmdW5jdGlvbih0YXJnLCBzb3VyY2UpIHtcbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnLCBuYW1lLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgbmFtZSkpO1xuICB9KTtcbn07XG4vLyAjIyNzZXRQYXRoXG4vLyBUcmF2ZXJzZSB0aGUga2V5cGF0aCBhbmQgZ2V0IGVhY2ggb2JqZWN0XG4vLyAob3IgbWFrZSBibGFuayBvbmVzKSBldmVudHVhbGx5IHNldHRpbmcgdGhlIHZhbHVlXG4vLyBhdCB0aGUgZW5kIG9mIHRoZSBwYXRoXG4vL1xuLy8gYHBhcmFtYCB7c3RyaW5nfSBgcGF0aGAuIFRoZSBwYXRoIHRvIHRyYXZlcnNlIHdoZW4gc2V0dGluZyBhIHZhbHVlLlxuLy8gYHBhcmFtYCB7Kn0gYHZhbHVlYC4gV2hhdCB0byBzZXQuXG4vLyBgcGFyYW1gIHtPYmplY3R9IGBvYmpgLiBUaGUgb2JqZWN0IGxpdGVyYWwgdG8gb3BlcmF0ZSBvbi5cbmV4cG9ydHMuc2V0UGF0aCA9IGZ1bmN0aW9uKHBhdGgsIHZhbHVlLCBvYmopIHtcbiAgdmFyIHAgPSBwYXRoLnNwbGl0KCcuJyksIGtleTtcbiAgZm9yICg7IHAubGVuZ3RoICYmIChrZXkgPSBwLnNoaWZ0KCkpOykge1xuICAgIGlmKCFwLmxlbmd0aCkgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICBlbHNlIGlmIChvYmpba2V5XSkgb2JqID0gb2JqW2tleV07XG4gICAgZWxzZSBvYmogPSBvYmpba2V5XSA9IHt9O1xuICB9XG59O1xuLy8gIyMjI3VpZFxuLy8gU29tZSBzdWRvIE9iamVjdHMgdXNlIGEgdW5pcXVlIGludGVnZXIgYXMgYSBgdGFnYCBmb3IgaWRlbnRpZmljYXRpb24uXG4vLyAoVmlld3MgZm9yIGV4YW1wbGUpLiBUaGlzIGVuc3VyZXMgdGhleSBhcmUgaW5kZWVkIHVuaXF1ZS5cbmV4cG9ydHMudWlkID0gMDtcbi8vICMjIyN1bmlxdWVcbi8vIEFuIGludGVnZXIgdXNlZCBhcyAndGFncycgYnkgc29tZSBzdWRvIE9iamVjdHMgYXMgd2VsbFxuLy8gYXMgYSB1bmlxdWUgc3RyaW5nIGZvciB2aWV3cyB3aGVuIG5lZWRlZFxuLy9cbi8vIGBwYXJhbWAge3N0cmluZ30gcHJlZml4LiBPcHRpb25hbCBzdHJpbmcgaWRlbnRpZmllclxuZXhwb3J0cy51bmlxdWUgPSBmdW5jdGlvbihwcmVmaXgpIHtcbiAgcmV0dXJuIHByZWZpeCA/IHByZWZpeCArIHRoaXMudWlkKysgOiB0aGlzLnVpZCsrO1xufTtcbi8vICMjI3Vuc2V0UGF0aFxuLy8gUmVtb3ZlIGEga2V5OnZhbHVlIHBhaXIgZnJvbSB0aGlzIG9iamVjdCdzIGRhdGEgc3RvcmVcbi8vIGxvY2F0ZWQgYXQgPHBhdGg+XG4vL1xuLy8gYHBhcmFtYCB7U3RyaW5nfSBgcGF0aGBcbi8vIGBwYXJhbWAge09iamVjdH0gYG9iamAgVGhlIG9iamVjdCB0byBvcGVyYXRlIG9uLlxuZXhwb3J0cy51bnNldFBhdGggPSBmdW5jdGlvbihwYXRoLCBvYmopIHtcbiAgdmFyIHAgPSBwYXRoLnNwbGl0KCcuJyksIGtleTtcbiAgZm9yICg7IHAubGVuZ3RoICYmIChrZXkgPSBwLnNoaWZ0KCkpOykge1xuICAgIGlmKCFwLmxlbmd0aCkgZGVsZXRlIG9ialtrZXldO1xuICAgIC8vIHRoaXMgY2FuIGZhaWwgaWYgYSBmYXVsdHkgcGF0aCBpcyBwYXNzZWQuXG4gICAgLy8gdXNpbmcgZ2V0UGF0aCBiZWZvcmVoYW5kIGNhbiBwcmV2ZW50IHRoYXRcbiAgICBlbHNlIG9iaiA9IG9ialtrZXldO1xuICB9XG59O1xuIiwidmFyIENvbnRhaW5lciA9IHJlcXVpcmUoJy4uL2NvbnRhaW5lci9jb250YWluZXInKTtcblxuLy8jI1ZpZXdcbi8vXG4vLyBHaXZlbiBhIHRlbXBsYXRlIGlkZW50aWZpZXIsIGBkYXRhLnRlbXBsYXRlYCwgdXNlIHRoYXQgZm9yIGNvbnRlbnRcbi8vIEdpdmVuIGEgc2hhZG93IGhvc3QsIGBkYXRhLnNoYWRvd0hvc3RgLCBjcmVhdGUgc2hhZG93IHJvb3QgdGhlcmVcbi8vXG5jbGFzcyBWaWV3IGV4dGVuZHMgQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnJvbGUgPSAndmlldyc7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLnByZVJlbmRlcigpO1xuICB9XG5cbiAgLy8gIyMjcHJlUmVuZGVyXG4gIC8vIExvY2F0ZSB0aGUgdGVtcGxhdGUgdGFnLCBjcmVhdGUgdGhlIHNob2RvdyByb290IGV0Yy4uLlxuICBwcmVSZW5kZXIoKSB7XG4gICAgLy8gaWYgbXkgLnRlbXBsYXRlIGlzIGEgc3RyaW5nIGlkZW50aWZpZXIsIGxvY2F0ZSBpdFxuICAgIGlmKHR5cGVvZiB0aGlzLmRhdGEudGVtcGxhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBsb2NhdGUgdGhlIHRlbXBsYXRlIGhvc3QsIGNhbiBiZSBpbiB0aGUgbWFpbiBkb2Mgb3IgYW4gaW1wb3J0XG4gICAgICBsZXQgdG1wbEhvc3Q7XG4gICAgICBpZiAodGhpcy5kYXRhLmltcG9ydCkge1xuICAgICAgICB0bXBsSG9zdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5kYXRhLmltcG9ydCkuaW1wb3J0O1xuICAgICAgfSBlbHNlIHRtcGxIb3N0ID0gZG9jdW1lbnQ7XG4gICAgICAvLyBub3cgdGhlIGFjdHVhbCB0ZW1wbGF0ZVxuICAgICAgdGhpcy50ZW1wbGF0ZSA9IHRtcGxIb3N0ICYmIHRtcGxIb3N0LnF1ZXJ5U2VsZWN0b3IodGhpcy5kYXRhLnRlbXBsYXRlKTtcbiAgICB9IC8vIGVsc2Ugd2Ugd2lsbCBhc3N1bWUgYW4gYWN0dWFsIHRlbXBsYXRlIHJlZiB3YXMgcGFzc2VkIGluXG5cbiAgICAvLyB0aGUgZXZlbnR1YWwgbG9jYXRpb24sIGFzc3VtZWQgdG8gYmUgaW4gdGhlIG1haW4gZG9jXG4gICAgdGhpcy5ob3N0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmRhdGEuc2hhZG93SG9zdCk7XG4gICAgaWYgKHRoaXMuaG9zdCAmJiAoXCJjcmVhdGVTaGFkb3dSb290XCIgaW4gdGhpcy5ob3N0KSkge1xuICAgICAgdGhpcy5yb290ID0gdGhpcy5ob3N0LmNyZWF0ZVNoYWRvd1Jvb3QoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
