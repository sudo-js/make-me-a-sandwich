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

var View = require('../view');

var Buttons = (function (_View) {
  _inherits(Buttons, _View);

  function Buttons() {
    _classCallCheck(this, Buttons);

    _get(Object.getPrototypeOf(Buttons.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Buttons, [{
    key: 'addedToParent',
    value: function addedToParent(parent) {
      _get(Object.getPrototypeOf(Buttons.prototype), 'addedToParent', this).call(this, parent);

      // listen at the container level as a delegate
      this.host.addEventListener('click', this.handleClick.bind(this));
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      // which button was clicked?
      // console.log('button clicked: ' + e.target.name);
      if (e.target.name) {
        this.send('buttonPressed', e.target.name);
      }
    }
  }]);

  return Buttons;
})(View);

module.exports = Buttons;

},{"../view":13}],10:[function(require,module,exports){
'use strict';

var Store = require('./test-store');
var Dispatcher = require('./test-dispatcher');
var Buttons = require('./buttons-component');
// var Main = require('./main-component');

var store = new Store();
var dispatcher = new Dispatcher();

// store knows how to register with the dispatcher
store.register(dispatcher);

// not a templated view component, pass it an 'el'
var buttons = new Buttons({ el: '#button-content' });
// is a templated view, pass in the file to import
// var main = new Main({template: 'template', import: '#main-content-template'});
// dispatcher is the root object, parent of all children
dispatcher.addChildren([buttons]);

},{"./buttons-component":9,"./test-dispatcher":11,"./test-store":12}],11:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Dispatcher = require('../../dispatcher/dispatcher');

var TestDispatcher = (function (_Dispatcher) {
  _inherits(TestDispatcher, _Dispatcher);

  function TestDispatcher() {
    _classCallCheck(this, TestDispatcher);

    _get(Object.getPrototypeOf(TestDispatcher.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(TestDispatcher, [{
    key: 'buttonPressed',

    // send target for button component
    value: function buttonPressed(name) {
      console.log('send target hit');
      // which button was pressed ?
      this.dispatch({ action: 'buttonPress', identifier: name });
    }
  }]);

  return TestDispatcher;
})(Dispatcher);

module.exports = TestDispatcher;

},{"../../dispatcher/dispatcher":4}],12:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Store = require('../../store/store');

var TestStore = (function (_Store) {
  _inherits(TestStore, _Store);

  function TestStore() {
    _classCallCheck(this, TestStore);

    _get(Object.getPrototypeOf(TestStore.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(TestStore, [{
    key: 'handleDispatch',
    value: function handleDispatch(payload) {
      console.log('handle dispatch hit');
      // depending on the payload, set some stuff and emit...
      this.sets(payload);
      this.emit('change');
    }

    // pass in a dispatcher instance to register with it
  }, {
    key: 'register',
    value: function register(dispatcher) {
      this.dispatchId = dispatcher.register(this.handleDispatch.bind(this));
    }
  }]);

  return TestStore;
})(Store);

module.exports = TestStore;

},{"../../store/store":7}],13:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Container = require('../container/container');

//##View
// Given a template identifier, `data.template`, use that for content
// Given a shadow host, `data.shadowHost`, create shadow root there
// Given a template import `data.import`, fetch my template from there

var View = (function (_Container) {
  _inherits(View, _Container);

  function View(data) {
    _classCallCheck(this, View);

    _get(Object.getPrototypeOf(View.prototype), 'constructor', this).call(this);

    this.role = 'view';
    this.data = data;
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

  _createClass(View, [{
    key: 'addedToParent',
    value: function addedToParent(parent) {
      var tmplHost = undefined,
          tmpl = undefined;
      // if my .template is a string identifier, locate it
      if (typeof this.data.template === 'string') {
        // locate the template host, can be in the main doc or an import
        if (this.data['import']) {
          tmplHost = document.querySelector(this.data['import'])['import'];
        } else tmplHost = document;
        // now the actual template
        tmpl = tmplHost && tmplHost.querySelector(this.data.template);
      } // else tmpl = this.data.template; -- do we want to support passing it in?
      var tmplContent = tmpl && document.importNode(tmpl.content, true);
      // the eventual location, assumed to be in the main doc
      this.host = document.querySelector(this.data.shadowHost || this.data.el);
      if (tmplContent && this.host && "createShadowRoot" in this.host) {
        this.root = this.host.createShadowRoot();
        // place the template content into the host
        this.root && this.root.appendChild(tmplContent);
      }
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
    //    { '.foo': 'Bar', h3: 'Foo'}
    //
    // Will result in:
    //    <div id="#fooHost">
    //      <h3>Foo</h3>
    //      <span class="foo">Bar</span>
    //    </div>
    //
    // The actual presentation details, of course, are abstracted away in the
    // Shadow Dom, via your template. NOTE: We do expect that you have processed the
    // values to be inserted down to a simple `textContent` by this point
  }, {
    key: 'render',
    value: function render(state) {
      var _this = this;

      // state and host are mandatory
      if (!this.host || !state) return;
      Object.keys(state).forEach(function (key) {
        _this.host.querySelector(key).textContent = state[key];
      });
      return this;
    }
  }]);

  return View;
})(Container);

module.exports = View;

},{"../container/container":3}]},{},[10])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcm9iL0dpdGh1Yi9tYWtlLW1lLWEtc2FuZHdpY2gvYmFzZS9iYXNlLmpzIiwiL1VzZXJzL3JvYi9HaXRodWIvbWFrZS1tZS1hLXNhbmR3aWNoL2Jhc2UvZW1pdHRlci5qcyIsIi9Vc2Vycy9yb2IvR2l0aHViL21ha2UtbWUtYS1zYW5kd2ljaC9jb250YWluZXIvY29udGFpbmVyLmpzIiwiL1VzZXJzL3JvYi9HaXRodWIvbWFrZS1tZS1hLXNhbmR3aWNoL2Rpc3BhdGNoZXIvZGlzcGF0Y2hlci5qcyIsIi9Vc2Vycy9yb2IvR2l0aHViL21ha2UtbWUtYS1zYW5kd2ljaC9taXhpbnMvZGVsZWdhdGVzLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCIvVXNlcnMvcm9iL0dpdGh1Yi9tYWtlLW1lLWEtc2FuZHdpY2gvc3RvcmUvc3RvcmUuanMiLCIvVXNlcnMvcm9iL0dpdGh1Yi9tYWtlLW1lLWEtc2FuZHdpY2gvc3Vkby5qcyIsIi9Vc2Vycy9yb2IvR2l0aHViL21ha2UtbWUtYS1zYW5kd2ljaC92aWV3L3Rlc3QvYnV0dG9ucy1jb21wb25lbnQuanMiLCIvVXNlcnMvcm9iL0dpdGh1Yi9tYWtlLW1lLWEtc2FuZHdpY2gvdmlldy90ZXN0L2luZGV4LmpzIiwiL1VzZXJzL3JvYi9HaXRodWIvbWFrZS1tZS1hLXNhbmR3aWNoL3ZpZXcvdGVzdC90ZXN0LWRpc3BhdGNoZXIuanMiLCIvVXNlcnMvcm9iL0dpdGh1Yi9tYWtlLW1lLWEtc2FuZHdpY2gvdmlldy90ZXN0L3Rlc3Qtc3RvcmUuanMiLCIvVXNlcnMvcm9iL0dpdGh1Yi9tYWtlLW1lLWEtc2FuZHdpY2gvdmlldy92aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBLElBQUksQ0FBQyxHQUFH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LFVBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7O0FBRXZCLFdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQzdCLFdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2pCLGVBQU8sSUFBSSxDQUFDO09BQ2I7S0FDRjtBQUNELFdBQU8sSUFBSSxDQUFDO0dBQ2I7Q0FDRixDQUFDOzs7QUMxREY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN1NBLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQzdDLElB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QVcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7T0FDdkQsQ0FBQyxDQUFDO0FBQ0gsYUFBTyxJQUFJLENBQUM7S0FDYjs7O1NBM0VHLElBQUk7R0FBUyxTQUFTOztBQThFNUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIF8gPSByZXF1aXJlKCcuLi9zdWRvJyk7XG52YXIgZGVsZWdhdGVzID0gcmVxdWlyZSgnLi4vbWl4aW5zL2RlbGVnYXRlcycpO1xuXG4vLyAjI0Jhc2UgQ2xhc3MgT2JqZWN0XG4vL1xuLy8gQWxsIHN1ZG8uanMgb2JqZWN0cyBpbmhlcml0IGJhc2UsIGdpdmluZyB0aGUgYWJpbGl0eVxuLy8gdG8gdXRpbGl6ZSBkZWxlZ2F0aW9uXG4vL1xuY2xhc3MgQmFzZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIGNhbiBkZWxlZ2F0ZVxuICAgIHRoaXMuZGVsZWdhdGVzID0gW107XG4gICAgLy8gYSBiZWF1dGlmdWwgYW5kIHVuaXF1ZSBzbm93Zmxha2VcbiAgICB0aGlzLnVpZCA9IF8udW5pcXVlKCk7XG4gICAgLy8gc2hvdWxkIGJlIG92ZXJyaWRkZW4gaW4gY2hpbGQgY2xhc3Nlc1xuICAgIHRoaXMucm9sZSA9ICdiYXNlJztcbiAgfVxufVxuXG4vLyBhZGQgdGhlIGFjdHVhbCBtZXRob2RzXG5fLm1peGluKEJhc2UucHJvdG90eXBlLCBkZWxlZ2F0ZXMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2U7XG4iLCJ2YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xudmFyIF8gPSByZXF1aXJlKCcuLi9zdWRvJyk7XG52YXIgZGVsZWdhdGVzID0gcmVxdWlyZSgnLi4vbWl4aW5zL2RlbGVnYXRlcycpO1xuXG4vLyAjI0VtaXR0ZXJiYXNlIENsYXNzIE9iamVjdFxuLy9cbi8vIEEgQmFzZSBDbGFzcyBleHRlbmRpbmcgdGhlIGNvcmUgTm9kZSBtb2R1bGUgRXZlbnRFbWl0dGVyLlxuY2xhc3MgRW1pdHRlcmJhc2UgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIC8vIGNhbiBkZWxlZ2F0ZVxuICAgIHRoaXMuZGVsZWdhdGVzID0gW107XG4gICAgLy8gYSBiZWF1dGlmdWwgYW5kIHVuaXF1ZSBzbm93Zmxha2VcbiAgICB0aGlzLnVpZCA9IF8udW5pcXVlKCk7XG4gICAgLy8gc2hvdWxkIGJlIG92ZXJyaWRkZW4gaW4gY2hpbGQgY2xhc3Nlc1xuICAgIHRoaXMucm9sZSA9ICdiYXNlJztcbiAgfVxufVxuXG4vLyBhZGQgdGhlIGFjdHVhbCBtZXRob2RzXG5fLm1peGluKEVtaXR0ZXJiYXNlLnByb3RvdHlwZSwgZGVsZWdhdGVzKTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyYmFzZTtcbiIsInZhciBCYXNlID0gcmVxdWlyZSgnLi4vYmFzZS9iYXNlJyk7XG4vLyAjI0NvbnRhaW5lclxuLy9cbi8vIEEgY29udGFpbmVyIGlzIGFueSBvYmplY3QgdGhhdCBjYW4gYm90aCBjb250YWluIG90aGVyIG9iamVjdHMgYW5kXG4vLyBpdHNlbGYgYmUgY29udGFpbmVkLlxuLy9cbi8vIGBwYXJhbWAge0FycmF5fE9iamVjdH0gJ2FyZycuIE9wdGlvbmFsIGFycmF5IG9yIGhhc2hcbi8vIG9mIGNoaWxkIG9iamVjdHMgd2hpY2ggdGhlIENvbnRhaW5lciB3aWxsIGFkZCBhcyBjaGlsZCBvYmplY3RzXG4vLyB2aWEgYGFkZENoaWxkcmVuYFxuY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgQmFzZSB7XG4gIGNvbnN0cnVjdG9yKGFyZykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnJvbGUgPSAnY29udGFpbmVyJztcbiAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gICAgdGhpcy5jaGlsZE5hbWVzID0ge307XG5cbiAgICBpZihhcmcpIHRoaXMuYWRkQ2hpbGRyZW4oYXJnKTtcbiAgfVxuICAvLyAjIyNhZGRDaGlsZFxuICAvLyBBZGRzIGEgQ2xhc3MgaW5zdGFuY2UgdG8gdGhpcyBjb250YWluZXIncyBsaXN0IG9mIGNoaWxkcmVuLlxuICAvLyBBbHNvIGFkZHMgYW4gJ2luZGV4JyBwcm9wZXJ0eSBhbmQgYW4gZW50cnkgaW4gdGhlIGNoaWxkTmFtZXMgaGFzaC5cbiAgLy8gSWYgYGFkZGVkVG9QYXJlbnRgIGlzIGZvdW5kIG9uIHRoZSBjaGlsZCwgY2FsbCBpdCwgc2VuZGluZyBgdGhpc2AgYXMgYW4gYXJndW1lbnQuXG4gIC8vXG4gIC8vIGBwYXJhbWAge09iamVjdH0gYGNgLiBPdGhlciBDbGFzcyBpbnN0YW5jZS5cbiAgLy8gYHBhcmFtYCB7U3RyaW5nfSBgbmFtZWAuIEFuIG9wdGlvbmFsIG5hbWUgZm9yIHRoZSBjaGlsZCB0aGF0IHdpbGwgZ28gaW4gdGhlIGNoaWxkTmFtZXMgaGFzaC5cbiAgLy8gYHJldHVybnNgIHtPYmplY3R9IGB0aGlzYFxuICBhZGRDaGlsZChjLCBuYW1lKSB7XG4gICAgdmFyIGNoID0gdGhpcy5jaGlsZHJlbjtcbiAgICBjLnBhcmVudCA9IHRoaXM7XG4gICAgYy5pbmRleCA9IGNoLmxlbmd0aDtcbiAgICBpZihuYW1lKSB7XG4gICAgICBjLm5hbWUgPSBuYW1lO1xuICAgICAgdGhpcy5jaGlsZE5hbWVzW25hbWVdID0gYy5pbmRleDtcbiAgICB9XG4gICAgY2gucHVzaChjKTtcbiAgICBpZignYWRkZWRUb1BhcmVudCcgaW4gYykgYy5hZGRlZFRvUGFyZW50KHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8vICMjI2FkZENoaWxkcmVuXG4gIC8vIEFsbG93cyBmb3IgbXVsdGlwbGUgY2hpbGRyZW4gdG8gYmUgYWRkZWQgdG8gdGhpcyBDb250YWluZXIgYnkgcGFzc2luZ1xuICAvLyBlaXRoZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGxpdGVyYWwuXG4gIC8vXG4gIC8vIHNlZSBgYWRkQ2hpbGRgXG4gIC8vXG4gIC8vIGBwYXJhbWAge0FycmF5fE9iamVjdH0gYGFyZ2AuIEFuIGFycmF5IG9mIGNoaWxkcmVuIHRvIGFkZCBvciBhblxuICAvLyBPYmplY3QgbGl0ZXJhbCBpbiB0aGUgZm9ybSB7bmFtZTogY2hpbGR9XG4gIC8vIGByZXR1cm5zYCB7T2JqZWN0fSBgdGhpc2BcbiAgYWRkQ2hpbGRyZW4oYXJnKSB7XG4gICAgLy8gbm9ybWFsaXplIHRoZSBhcmdcbiAgICBsZXQgX2tleXMgPSBBcnJheS5pc0FycmF5KGFyZykgPyB1bmRlZmluZWQgOiBPYmplY3Qua2V5cyhhcmcpO1xuICAgIGxldCBhcnkgPSBfa2V5cyB8fCBhcmc7XG5cbiAgICBhcnkuZm9yRWFjaChjID0+IHsgX2tleXMgPyB0aGlzLmFkZENoaWxkKGFyZ1tjXSwgYykgOiB0aGlzLmFkZENoaWxkKGMpOyB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvLyAjIyNidWJibGVcbiAgLy8gQnkgZGVmYXVsdCwgYGJ1YmJsZWAgcmV0dXJucyB0aGUgY3VycmVudCB2aWV3J3MgcGFyZW50IChpZiBpdCBoYXMgb25lKVxuICAvL1xuICAvLyBgcmV0dXJuc2Age09iamVjdHx1bmRlZmluZWR9XG4gIGJ1YmJsZSgpIHsgcmV0dXJuIHRoaXMucGFyZW50OyB9XG4gIC8vICMjI2VhY2hDaGlsZFxuICAvLyBDYWxsIGEgbmFtZWQgbWV0aG9kIGFuZCBwYXNzIGFueSBhcmdzIHRvIGVhY2ggY2hpbGQgaW4gYSBjb250YWluZXInc1xuICAvLyBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuXG4gIC8vXG4gIC8vIGBwYXJhbWAgeyp9IEFueSBudW1iZXIgb2YgYXJndW1lbnRzIHRoZSBmaXJzdCBvZiB3aGljaCBtdXN0IGJlXG4gIC8vIFRoZSBuYW1lZCBtZXRob2QgdG8gbG9vayBmb3IgYW5kIGNhbGwuIE90aGVyIGFyZ3MgYXJlIHBhc3NlZCB0aHJvdWdoXG4gIC8vIGByZXR1cm5zYCB7b2JqZWN0fSBgdGhpc2BcbiAgZWFjaENoaWxkKC4uLmFyZ3MpIHtcbiAgICBsZXQgbWV0aCA9IGFyZ3Muc2hpZnQoKTtcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goYyA9PiB7IGlmKG1ldGggaW4gYykgY1ttZXRoXS5hcHBseShjLCBhcmdzKTsgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLy8gIyMjZ2V0Q2hpbGRcbiAgLy8gSWYgYSBjaGlsZCB3YXMgYWRkZWQgd2l0aCBhIG5hbWUsIHZpYSBgYWRkQ2hpbGRgLFxuICAvLyB0aGF0IG9iamVjdCBjYW4gYmUgZmV0Y2hlZCBieSBuYW1lLiBUaGlzIHByZXZlbnRzIHVzIGZyb20gaGF2aW5nIHRvIHJlZmVyZW5jZSBhXG4gIC8vIGNvbnRhaW5lcnMgY2hpbGRyZW4gYnkgaW5kZXguIFRoYXQgaXMgcG9zc2libGUgaG93ZXZlciwgdGhvdWdoIG5vdCBwcmVmZXJyZWQuXG4gIC8vXG4gIC8vIGBwYXJhbWAge1N0cmluZ3xOdW1iZXJ9IGBpZGAuIFRoZSBzdHJpbmcgYG5hbWVgIG9yIG51bWVyaWMgYGluZGV4YCBvZiB0aGUgY2hpbGQgdG8gZmV0Y2guXG4gIC8vIGByZXR1cm5zYCB7T2JqZWN0fHVuZGVmaW5lZH0gVGhlIGZvdW5kIGNoaWxkXG4gIGdldENoaWxkKGlkKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBpZCA9PT0gJ3N0cmluZycgPyB0aGlzLmNoaWxkcmVuW3RoaXMuY2hpbGROYW1lc1tpZF1dIDpcbiAgICAgIHRoaXMuY2hpbGRyZW5baWRdO1xuICB9XG4gIC8vICMjI19pbmRleENoaWxkcmVuX1xuICAvLyBNZXRob2QgaXMgY2FsbGVkIHdpdGggdGhlIGBpbmRleGAgcHJvcGVydHkgb2YgYSBzdWJ2aWV3IHRoYXQgaXMgYmVpbmcgcmVtb3ZlZC5cbiAgLy8gQmVnaW5uaW5nIGF0IGBpYCBkZWNyZW1lbnQgc3VidmlldyBpbmRpY2VzLlxuICAvLyBgcGFyYW1gIHtOdW1iZXJ9IGBpYFxuICAvLyBgcHJpdmF0ZWBcbiAgX2luZGV4Q2hpbGRyZW5fKGkpIHtcbiAgICBsZXQgYyA9IHRoaXMuY2hpbGRyZW47XG4gICAgbGV0IG9iaiA9IHRoaXMuY2hpbGROYW1lcztcbiAgICBsZXQgbGVuO1xuICAgIGZvciAobGVuID0gYy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY1tpXS5pbmRleC0tO1xuICAgICAgLy8gYWRqdXN0IGFueSBlbnRyaWVzIGluIGNoaWxkTmFtZXNcbiAgICAgIGlmKGNbaV0ubmFtZSBpbiBvYmopIG9ialtjW2ldLm5hbWVdID0gY1tpXS5pbmRleDtcbiAgICB9XG4gIH1cbiAgLy8gIyMjcmVtb3ZlQ2hpbGRcbiAgLy8gRmluZCB0aGUgaW50ZW5kZWQgY2hpbGQgZnJvbSBteSBsaXN0IG9mIGNoaWxkcmVuIGFuZCByZW1vdmUgaXQsIHJlbW92aW5nIHRoZSBuYW1lIHJlZmVyZW5jZSBhbmQgcmUtaW5kZXhpbmdcbiAgLy8gcmVtYWluaW5nIGNoaWxkcmVuLiBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZW1vdmUgdGhlIGNoaWxkJ3MgRE9NLlxuICAvLyBPdmVycmlkZSB0aGlzIG1ldGhvZCwgZG9pbmcgd2hhdGV2ZXIgeW91IHdhbnQgdG8gdGhlIGNoaWxkJ3MgRE9NLCB0aGVuIGNhbGwgYGJhc2UoJ3JlbW92ZUNoaWxkJylgIHRvIGRvIHNvLlxuICAvL1xuICAvLyBJZiB0aGUgY2hpbGQgYmVpbmcgcmVtb3ZlZCBoYXMgYSBgcmVtb3ZlZEZyb21QYXJlbnRgIG1ldGhvZCBpdCB3aWxsIGJlIGNhbGxlZCBhZnRlciB0aGUgcGFyZW50aCBoYXNcbiAgLy8gZmluaXNoZWQsIHBhc3NpbmcgaXRzZWxmKHRoZSBwYXJlbnQpIGFzIGFuIGFyZ3VtZW50LlxuICAvL1xuICAvLyBgcGFyYW1gIHtTdHJpbmd8TnVtYmVyfE9iamVjdH0gYGFyZ2AuIENoaWxkcmVuIHdpbGwgYWx3YXlzIGhhdmUgYW4gYGluZGV4YCBudW1iZXIsIGFuZCBvcHRpb25hbGx5IGEgYG5hbWVgLlxuICAvLyBJZiBwYXNzZWQgYSBzdHJpbmcgYG5hbWVgIGlzIGFzc3VtZWQsIHNvIGJlIHN1cmUgdG8gcGFzcyBhbiBhY3R1YWwgbnVtYmVyIGlmIGV4cGVjdGluZyB0byB1c2UgaW5kZXguXG4gIC8vIEFuIG9iamVjdCB3aWxsIGJlIGFzc3VtZWQgdG8gYmUgYW4gYWN0dWFsIHN1ZG8gQ2xhc3MgT2JqZWN0LlxuICAvLyBgcmV0dXJuc2Age09iamVjdH0gYHRoaXNgXG4gIHJlbW92ZUNoaWxkKGFyZykge1xuICAgIGxldCBpO1xuICAgIGxldCB0ID0gdHlwZW9mIGFyZztcbiAgICBsZXQgYztcbiAgICAvLyBub3JtYWxpemUgdGhlIGlucHV0XG4gICAgaWYodCA9PT0gJ29iamVjdCcpIGMgPSBhcmc7XG4gICAgZWxzZSBjID0gdCA9PT0gJ3N0cmluZycgPyB0aGlzLmNoaWxkcmVuW3RoaXMuY2hpbGROYW1lc1thcmddXSA6IHRoaXMuY2hpbGRyZW5bYXJnXTtcbiAgICAvLyBpZiBubyBjaGlsZCBleGlzdHMgYmFzZWQgb24gdGhlIGFyZ3VtZW50LCBkb24ndCB0cnkgdG8gcmVtb3ZlIGl0XG4gICAgaWYoIWMpIHJldHVybiB0aGlzO1xuICAgIGkgPSBjLmluZGV4O1xuICAgIC8vIHJlbW92ZSBmcm9tIHRoZSBjaGlsZHJlbiBBcnJheVxuICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGksIDEpO1xuICAgIC8vIHJlbW92ZSBmcm9tIHRoZSBuYW1lZCBjaGlsZCBoYXNoIGlmIHByZXNlbnRcbiAgICBkZWxldGUgdGhpcy5jaGlsZE5hbWVzW2MubmFtZV07XG4gICAgLy8gY2hpbGQgaXMgbm93IGFuIGBvcnBoYW5gXG4gICAgZGVsZXRlIGMucGFyZW50O1xuICAgIGRlbGV0ZSBjLmluZGV4O1xuICAgIGRlbGV0ZSBjLm5hbWU7XG4gICAgdGhpcy5faW5kZXhDaGlsZHJlbl8oaSk7XG4gICAgaWYoJ3JlbW92ZWRGcm9tUGFyZW50JyBpbiBjKSBjLnJlbW92ZWRGcm9tUGFyZW50KHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8vICMjI3JlbW92ZUNoaWxkcmVuXG4gIC8vIFJlbW92ZSBhbGwgY2hpbGRyZW4uXG4gIC8vXG4gIC8vIHNlZSBgcmVtb3ZlQ2hpbGRgXG4gIC8vIGByZXR1cm5zYCB7b2JqZWN0fSBgdGhpc2BcbiAgcmVtb3ZlQ2hpbGRyZW4oKSB7XG4gICAgbGV0IG4gPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcbiAgICB3aGlsZShuID4gMCkge1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmNoaWxkcmVuW24gLSAxXSk7XG4gICAgICBuLS07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gIyMjc2VuZFxuICAvLyBUaGUgY2FsbCB0byB0aGUgc3BlY2lmaWMgbWV0aG9kIG9uIGEgKHVuKXNwZWNpZmllZCB0YXJnZXQgaGFwcGVucyBoZXJlLlxuICAvLyBJZiB0aGlzIE9iamVjdCBpcyBwYXJ0IG9mIGEgYHN1ZG8uQ29udGFpbmVyYCBtYWludGFpbmVkIGhpZXJhcmNoeVxuICAvLyB0aGUgJ3RhcmdldCcgbWF5IGJlIGxlZnQgb3V0LCBjYXVzaW5nIHRoZSBgYnViYmxlKClgIG1ldGhvZCB0byBiZSBjYWxsZWQuXG4gIC8vIFdoYXQgdGhpcyBkb2VzIGlzIGFsbG93IGNoaWxkcmVuIG9mIGEgYHN1ZG8uQ29udGFpbmVyYCB0byBzaW1wbHkgcGFzc1xuICAvLyBldmVudHMgIHVwd2FyZCwgZGVsZWdhdGluZyB0aGUgcmVzcG9uc2liaWxpdHkgb2YgZGVjaWRpbmcgd2hhdCB0byBkbyB0byB0aGUgcGFyZW50LlxuICAvL1xuICAvLyBOT1RFIE9ubHkgdGhlIGZpcnN0IHRhcmdldCBtZXRob2QgZm91bmQgaXMgY2FsbGVkLCBidWJibGluZyBzdG9wcyB0aGVyZS5cbiAgLy8gSWYgeW91IHdpc2ggaXQgdG8gY29udGludWUgY2FsbCBgc2VuZGAgYWdhaW4uLi5cbiAgLy9cbiAgLy8gYHBhcmFtYCB7Kn0gQW55IG51bWJlciBvZiBhcmd1bWVudHMgaXMgc3VwcG9ydGVkLCBidXQgdGhlIGZpcnN0IGlzIHRoZSBvbmx5IG9uZSBzZWFyY2hlZCBmb3IgaW5mby5cbiAgLy8gQSBzZW5kTWV0aG9kIHdpbGwgYmUgbG9jYXRlZCBieTpcbiAgLy8gICAxLiB1c2luZyB0aGUgZmlyc3QgYXJndW1lbnQgaWYgaXQgaXMgYSBzdHJpbmdcbiAgLy8gICAyLiBsb29raW5nIGZvciBhIGBzZW5kTWV0aG9kYCBwcm9wZXJ0eSBpZiBpdCBpcyBhbiBvYmplY3RcbiAgLy8gQW55IGFyZ3Mgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHNlbmRNZXRob2RcbiAgLy8gYHJldHVybnNgIHtPYmplY3R9IGB0aGlzYFxuICBzZW5kKC4uLmFyZ3MpIHtcbiAgICBsZXQgZCA9IHRoaXMuZGF0YTtcbiAgICBsZXQgbWV0aDtcbiAgICBsZXQgdGFyZztcbiAgICBsZXQgZm47XG4gICAgLy8gLnNlbmRNZXRob2QgdXNlZnVsIGZvciBkaXJlY3QgZXZlbnQgYmluZGluZyB0byBhIHNlbmRcbiAgICBpZihkICYmICdzZW5kTWV0aG9kJyBpbiBkKSBtZXRoID0gZC5zZW5kTWV0aG9kO1xuICAgIC8vIHRoaXMuc2VuZCgnZm9vJywgLi4uYXJncylcbiAgICBlbHNlIGlmKHR5cGVvZiBhcmdzWzBdID09PSAnc3RyaW5nJykgbWV0aCA9IGFyZ3Muc2hpZnQoKTtcbiAgICAvLyBpZiB0aGVyZSB3YXMgbm8gc2VuZCB0YXJnZXQgc3BlY2lmaWVkIGJhaWwgb3V0XG4gICAgaWYgKCFtZXRoKSByZXR1cm47XG4gICAgLy8gdGFyZ2V0IGlzIGVpdGhlciBzcGVjaWZpZWQgb3IgbXkgcGFyZW50XG4gICAgdGFyZyA9IGQgJiYgZC5zZW5kVGFyZ2V0IHx8IHRoaXMuYnViYmxlKCk7XG4gICAgLy8gb2J2aW91cyBjaGFuY2UgZm9yIGVycm9ycyBoZXJlLCBkb24ndCBiZSBkdW1iXG4gICAgZm4gPSB0YXJnW21ldGhdO1xuICAgIHdoaWxlKCFmbiAmJiAodGFyZyA9IHRhcmcuYnViYmxlKCkpKSBmbiA9IHRhcmdbbWV0aF07XG4gICAgaWYoZm4pIGZuLmFwcGx5KHRhcmcsIGFyZ3MpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGFpbmVyO1xuIiwidmFyIENvbnRhaW5lciA9IHJlcXVpcmUoJy4uL2NvbnRhaW5lci9jb250YWluZXInKTtcbi8vICMjRGlzcGF0Y2hlclxuLy9cbi8vIEEgZGlzcGF0Y2hlciBpcyBhIHNwZWNpYWxpemVkIGNvbnRhaW5lciB0aGF0OlxuLy9cbi8vICogQWN0cyBhcyB0aGUgc29sZSByb290IGNvbnRhaW5lciBvZiBhbGwgdmlldyBjb21wb25lbnRzXG4vLyAqIFNlcnZlcyBhcyB0aGUgZW5kLW9mLXRoZS1saW5lIGZvciB0aGUgYHNlbmRgIHJlc3BvbmRlci1jaGFpblxuLy8gKiBBbGxvd3Mgc3RvcmVzIHRvIHJlZ2lzdGVyIGZvciBwYXlsb2FkIGRpc3BhdGNoZXNcbi8vICogQWxsb3dzIHN0b3JlcyB0byB1bnJlZ2lzdGVyIGZvciBwYXlsb2FkIGRpc3BhdGNoZXNcbi8vICogRGlzcGF0Y2hlcyBwYXlsb2FkcyB0byByZWdpc3RlcmVkIHN0b3JlcyAodHJpZ2dlcmQgdmlhIGBzZW5kYClcbi8vXG4vLyBgcGFyYW1gIHtBcnJheXxPYmplY3R9ICdhcmcnLiBPcHRpb25hbCBhcnJheSBvciBoYXNoXG4vLyBgc2VlYCBDb250YWluZXJcbi8vIGBtYW55VGhhbmtzYCBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmx1eC9ibG9iL21hc3Rlci9zcmMvRGlzcGF0Y2hlci5qc1xuY2xhc3MgRGlzcGF0Y2hlciBleHRlbmRzIENvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKGFyZykge1xuICAgIHN1cGVyKGFyZyk7XG5cbiAgICB0aGlzLnJvbGUgPSAnZGlzcGF0Y2hlcic7XG4gICAgdGhpcy5wcmVmaXggPSAnaWRfJztcbiAgICB0aGlzLmNvdW50ZXIgPSAxO1xuICAgIHRoaXMuY2FsbGJhY2tzID0ge307XG4gICAgdGhpcy5wZW5kaW5nID0ge307XG4gICAgdGhpcy5leGVjdXRlZCA9IHt9O1xuICAgIHRoaXMuaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuICAgIHRoaXMucGVuZGluZ1BheWxvYWQgPSBudWxsO1xuICB9XG5cbiAgLy8gIyMjZGlzcGF0Y2hcbiAgZGlzcGF0Y2goZGF0YSkge1xuICAgIGlmKHRoaXMuaXNEaXNwYXRjaGluZykgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBkaXNwYXRjaCBkdXJpbmcgYSBkaXNwYXRjaCcpO1xuICAgIHRoaXMuc3RhcnREaXNwYXRjaGluZyhkYXRhKTtcbiAgICB0cnkge1xuICAgICAgT2JqZWN0LmtleXModGhpcy5jYWxsYmFja3MpLmZvckVhY2goaWQgPT4ge1xuICAgICAgICBpZiAoIXRoaXMucGVuZGluZ1tpZF0pIHRoaXMuZXhlY3V0ZUNhbGxiYWNrKGlkKTtcbiAgICAgIH0pO1xuICAgIH0gZmluYWxseSB7IHRoaXMuc3RvcERpc3BhdGNoaW5nKCk7IH1cbiAgfVxuXG4gIC8vICMjI2V4ZWN1dGVDYWxsYmFja1xuICAvLyBEbyBpdC5cbiAgLy8gYHBhcmFtYCB7c3RyaW5nfSBgaWRgLiBUaGUgcmVnaXN0ZXJlZCBjYWxsYmFjayB0byBjYWxsIHdpdGggdGhlIGN1cnJlbnQgcGF5bG9hZFxuICBleGVjdXRlQ2FsbGJhY2soaWQpIHtcbiAgICB0aGlzLnBlbmRpbmdbaWRdID0gdHJ1ZTtcbiAgICB0aGlzLmNhbGxiYWNrc1tpZF0odGhpcy5wZW5kaW5nUGF5bG9hZCk7XG4gICAgdGhpcy5leGVjdXRlZFtpZF0gPSB0cnVlO1xuICB9XG5cbiAgLy8gIyMjcmVnaXN0ZXJcbiAgLy8gQ2FsbGVkIGJ5IHN0b3JlcyB3aG8gd2lzaCB0byBiZSBzZW50IGRpc3BhdGNoIHBheWxvYWRzLlxuICAvLyBgcGFyYW1gIHtmdW5jdGlvbn0gYGZuYC4gVGhlIGNhbGxiYWNrIHRvIHNlbmQgcGF5bG9hZHMgdG9cbiAgLy8gYHJldHVybnNgIHtzdHJpbmd9IEFuIFwiaWRcIiB0aGF0IHRoZSBzdG9yZSBjYW4gdXNlIHRvIHVucmVnaXN0ZXJcbiAgcmVnaXN0ZXIoZm4pIHtcbiAgICBsZXQga2V5ID0gdGhpcy5wcmVmaXggKyB0aGlzLmNvdW50ZXIrKztcbiAgICB0aGlzLmNhbGxiYWNrc1trZXldID0gZm47XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuXG4gIC8vICMjI3N0YXJ0RGlzcGF0Y2hpbmdcbiAgLy9cbiAgLy8gYHBhcmFtYCB7b2JqZWN0fSBgZGF0YWBcbiAgc3RhcnREaXNwYXRjaGluZyhkYXRhKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5jYWxsYmFja3MpLmZvckVhY2goaWQgPT4ge1xuICAgICAgdGhpcy5wZW5kaW5nW2lkXSA9IGZhbHNlO1xuICAgICAgdGhpcy5leGVjdXRlZFtpZF0gPSBmYWxzZTtcbiAgICB9KTtcblxuICAgIHRoaXMucGVuZGluZ1BheWxvYWQgPSBkYXRhO1xuICAgIHRoaXMuaXNEaXNwYXRjaGluZyA9IHRydWU7XG4gIH1cblxuICBzdG9wRGlzcGF0Y2hpbmcoKSB7XG4gICAgdGhpcy5wZW5kaW5nUGF5bG9hZCA9IG51bGw7XG4gICAgdGhpcy5pc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG4gIH1cblxuICAvLyAjIyN1bnJlZ2lzdGVyXG4gIC8vIEFsbG93cyBhIHN0b3JlIHRvIHN0b3AgbGlzdGVuaW5nIGZvciBkaXNwYXRjaFxuICB1bnJlZ2lzdGVyKGlkKSB7IGRlbGV0ZSB0aGlzLmNhbGxiYWNrc1tpZF07IH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEaXNwYXRjaGVyO1xuIiwiLy8gIyNEZWxlZ2F0ZXMgbWl4aW5cbi8vIFVzZWQgYnkgdGhlIHR3byBiYXNlIGNsYXNzZXMsIEJhc2UgYW5kIEVtaXR0ZXJiYXNlXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gIyMjYWRkRGVsZWdhdGVcbiAgLy8gUHVzaCBhbiBpbnN0YW5jZSBvZiBhIENsYXNzIE9iamVjdCBpbnRvIHRoaXMgb2JqZWN0J3MgYF9kZWxlZ2F0ZXNfYCBsaXN0LlxuICAvL1xuICAvLyBgcGFyYW1gIHtPYmplY3R9IGBkZWxgLiBBbiBpbnN0YW5jZSBvZiBhIHN1ZG8uZGVsZWdhdGVzIENsYXNzIE9iamVjdFxuICAvLyBgcmV0dXJuc2Age09iamVjdH0gYHRoaXNgXG4gIGFkZERlbGVnYXRlOiBmdW5jdGlvbihkZWwpIHtcbiAgICBkZWwuZGVsZWdhdG9yID0gdGhpcztcbiAgICB0aGlzLmRlbGVnYXRlcy5wdXNoKGRlbCk7XG4gICAgaWYoJ2FkZGVkQXNEZWxlZ2F0ZScgaW4gZGVsKSBkZWwuYWRkZWRBc0RlbGVnYXRlKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICAvLyAjIyNkZWxlZ2F0ZVxuICAvLyBGcm9tIHRoaXMgb2JqZWN0J3MgbGlzdCBvZiBkZWxlZ2F0ZXMgZmluZCB0aGUgb2JqZWN0IHdob3NlIGBfcm9sZV9gIG1hdGNoZXNcbiAgLy8gdGhlIHBhc3NlZCBgbmFtZWAgYW5kOlxuICAvLyAxLiBpZiBgbWV0aGAgaXMgZmFsc3kgcmV0dXJuIHRoZSBkZWxlZ2F0ZS5cbiAgLy8gMiBpZiBgbWV0aGAgaXMgdHJ1dGh5IGJpbmQgaXRzIG1ldGhvZCAodG8gdGhlIGRlbGVnYXRlKSBhbmQgcmV0dXJuIHRoZSBtZXRob2RcbiAgLy9cbiAgLy8gYHBhcmFtYCB7U3RyaW5nfSBgcm9sZWAgVGhlIHJvbGUgcHJvcGVydHkgdG8gbWF0Y2ggaW4gdGhpcyBvYmplY3QncyBkZWxlZ2F0ZXMgbGlzdFxuICAvLyBgcGFyYW1gIHtTdHJpbmd9IGBtZXRoYCBPcHRpb25hbCBtZXRob2QgdG8gYmluZCB0byB0aGUgYWN0aW9uIHRoaXMgZGVsZWdhdGUgaXMgYmVpbmcgdXNlZCBmb3JcbiAgLy8gYHJldHVybnNgXG4gIGRlbGVnYXRlOiBmdW5jdGlvbihyb2xlLCBtZXRoKSB7XG4gICAgbGV0IGRlbCA9IHRoaXMuZGVsZWdhdGVzLCBpO1xuICAgIGZvcihpID0gMDsgaSA8IGRlbC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYoZGVsW2ldLnJvbGUgPT09IHJvbGUpIHtcbiAgICAgICAgaWYoIW1ldGgpIHJldHVybiBkZWxbaV07XG4gICAgICAgIHJldHVybiBkZWxbaV1bbWV0aF0uYmluZChkZWxbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgLy8gIyMjZ2V0RGVsZWdhdGVcbiAgLy8gRmV0Y2ggYSBkZWxlZ2F0ZSB3aG9zZSByb2xlIHByb3BlcnR5IG1hdGNoZXMgdGhlIHBhc3NlZCBpbiBhcmd1bWVudC5cbiAgLy8gVXNlcyB0aGUgYGRlbGVnYXRlYCBtZXRob2QgaW4gaXRzICdzaW5nbGUgYXJndW1lbnQnIGZvcm0sIGluY2x1ZGVkIGZvclxuICAvLyBBUEkgY29uc2lzdGVuY3lcbiAgLy9cbiAgLy8gYHBhcmFtYCB7U3RyaW5nfSBgcm9sZWBcbiAgLy8gJ3JldHVybnMnIHtPYmplY3R8dW5kZWZpbmVkfVxuICBnZXREZWxlZ2F0ZTogZnVuY3Rpb24ocm9sZSkgeyByZXR1cm4gdGhpcy5kZWxlZ2F0ZShyb2xlKTsgfSxcbiAgLy8gIyMjcmVtb3ZlRGVsZWdhdGVcbiAgLy8gRnJvbSB0aGlzIG9iamVjdHMgYGRlbGVnYXRlc2AgbGlzdCByZW1vdmUgdGhlIG9iamVjdCAodGhlcmUgc2hvdWxkIG9ubHkgZXZlciBiZSAxKVxuICAvLyB3aG9zZSByb2xlIG1hdGNoZXMgdGhlIHBhc3NlZCBpbiBhcmd1bWVudFxuICAvL1xuICAvLyBgcGFyYW1gIHtTdHJpbmd9IGByb2xlYFxuICAvLyBgcmV0dXJuc2Age09iamVjdH0gYHRoaXNgXG4gIHJlbW92ZURlbGVnYXRlOiBmdW5jdGlvbihyb2xlKSB7XG4gICAgbGV0IGRlbCA9IHRoaXMuZGVsZWdhdGVzLCBpO1xuICAgIGZvcihpID0gMDsgaSA8IGRlbC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYoZGVsW2ldLnJvbGUgPT09IHJvbGUpIHtcbiAgICAgICAgLy8gbm8gX2RlbGVnYXRvcl8gZm9yIHlvdVxuICAgICAgICBkZWxbaV0uZGVsZWdhdG9yID0gdW5kZWZpbmVkO1xuICAgICAgICBkZWwuc3BsaWNlKGksIDEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfVxuICAgICAgdGhyb3cgVHlwZUVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LicpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICBhcmdzID0gbmV3IEFycmF5KGxlbiAtIDEpO1xuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgbGVuOyBpKyspXG4gICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiAtIDEpO1xuICAgIGZvciAoaSA9IDE7IGkgPCBsZW47IGkrKylcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuXG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgdmFyIG07XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCFlbWl0dGVyLl9ldmVudHMgfHwgIWVtaXR0ZXIuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSAwO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKGVtaXR0ZXIuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gMTtcbiAgZWxzZVxuICAgIHJldCA9IGVtaXR0ZXIuX2V2ZW50c1t0eXBlXS5sZW5ndGg7XG4gIHJldHVybiByZXQ7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG4iLCJ2YXIgRW1pdHRlcmJhc2UgPSByZXF1aXJlKCcuLi9iYXNlL2VtaXR0ZXInKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vc3VkbycpO1xuLy8gIyNTdG9yZVxuLy9cbi8vIFN0b3JlIE9iamVjdHMgZXhwb3NlIG1ldGhvZHMgZm9yIHNldHRpbmcgYW5kIGdldHRpbmcgZGF0YS4gQmVpbmcgYSBzdWJjbGFzc1xuLy8gb2YgRW1pdHRlcmJhc2UsIEV2ZW50RW1pdHRlciBtZXRob2RzIGFyZSBhdmFpbGFibGUuIEFmdGVyIHByb2Nlc3NpbmcsIGFcbi8vIHN0b3JlIG1heSBlbWl0IHRoZSBgY2hhbmdlYCBldmVudCBzaWduaWZ5aW5nIGl0IGlzIHJlYWR5IHRvIGJlIHF1ZXJpZWRcbi8vXG4vLyBgcGFyYW1gIHtvYmplY3R9IGRhdGEuIEFuIGluaXRpYWwgc3RhdGUgZm9yIHRoaXMgc3RvcmUuXG4vL1xuLy8gYGNvbnN0cnVjdG9yYFxuY2xhc3MgU3RvcmUgZXh0ZW5kcyBFbWl0dGVyYmFzZSB7XG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5yb2xlID0gJ21vZGVsJztcbiAgICAvLyBzdG9yZXMgb3BlcmF0ZSBvbiB0aGUgaW5uZXIgZGF0YSBoYXNoLi4uXG4gICAgdGhpcy5kYXRhID0gZGF0YSB8fCB7fTtcbiAgfVxuICAvLyAjIyNnZXRcbiAgLy8gUmV0dXJucyB0aGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIGEga2V5LlxuICAvL1xuICAvLyBgcGFyYW1gIHtTdHJpbmd9IGBrYC4gVGhlIG5hbWUgb2YgdGhlIGtleVxuICAvLyBgcmV0dXJuc2Ageyp9LiBUaGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIHRoZSBrZXkgb3IgZmFsc2UgaWYgbm90IGZvdW5kLlxuICBnZXQoaykgeyByZXR1cm4gdGhpcy5kYXRhW2tdOyB9XG4gIC8vICMjI2dldFBhdGhcbiAgLy8gVXNlcyB0aGUgc3VkbyBuYW1lc3BhY2UncyBnZXRwYXRoIGZ1bmN0aW9uIG9wZXJhdGluZyBvbiB0aGUgbW9kZWwnc1xuICAvLyBkYXRhIGhhc2guXG4gIC8vXG4gIC8vIGBwYXJhbWAge3N0cmluZ30gYHBhdGhgXG4gIC8vIGByZXR1cm5zYCB7Knx1bmRlZmluZWR9LiBUaGUgdmFsdWUgYXQga2V5cGF0aCBvciB1bmRlZmluZWQgaWYgbm90IGZvdW5kLlxuICBnZXRQYXRoKHBhdGgpIHtcbiAgICByZXR1cm4gXy5nZXRQYXRoKHBhdGgsIHRoaXMuZGF0YSk7XG4gIH1cbiAgLy8gIyMjZ2V0c1xuICAvLyBBc3NlbWJsZXMgYW5kIHJldHVybnMgYW4gb2JqZWN0IG9mIGtleTp2YWx1ZSBwYWlycyBmb3IgZWFjaCBrZXlcbiAgLy8gY29udGFpbmVkIGluIHRoZSBwYXNzZWQgaW4gQXJyYXkuXG4gIC8vXG4gIC8vIGBwYXJhbWAge2FycmF5fSBgYXJ5YC4gQW4gYXJyYXkgb2Yga2V5cy5cbiAgLy8gYHJldHVybnNgIHtvYmplY3R9XG4gIGdldHMoYXJ5KSB7XG4gICAgbGV0IG9iaiA9IHt9O1xuICAgIGFyeS5mb3JFYWNoKHN0ciA9PiB7XG4gICAgICBvYmpbc3RyXSA9ICF+c3RyLmluZGV4T2YoJy4nKSA/IHRoaXMuZ2V0KHN0cikgOiB0aGlzLmdldFBhdGgoc3RyKTtcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqO1xuICB9XG4gIC8vICMjI3NldFxuICAvLyBTZXQgYSBrZXk6dmFsdWUgcGFpci5cbiAgLy9cbiAgLy8gYHBhcmFtYCB7U3RyaW5nfSBga2AuIFRoZSBuYW1lIG9mIHRoZSBrZXkuXG4gIC8vIGBwYXJhbWAgeyp9IGB2YC4gVGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGUga2V5LlxuICAvLyBgcmV0dXJuc2Age09iamVjdH0gYHRoaXNgXG4gIHNldChrLCB2KSB7XG4gICAgLy8gX05PVEU6IGludGVudGlvbmFsIHBvc3NpYmlsdHkgb2Ygc2V0dGluZyBhIGZhbHN5IHZhbHVlX1xuICAgIHRoaXMuZGF0YVtrXSA9IHY7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLy8gIyMjc2V0UGF0aFxuICAvLyBVc2VzIHRoZSBgc2V0cGF0aGAgZnVuY3Rpb24gb3BlcmF0aW5nIG9uIHRoZSBtb2RlbCdzXG4gIC8vIGRhdGEgaGFzaC5cbiAgLy9cbiAgLy8gYHBhcmFtYCB7U3RyaW5nfSBgcGF0aGBcbiAgLy8gYHBhcmFtYCB7Kn0gYHZgXG4gIC8vIGByZXR1cm5zYCB7T2JqZWN0fSB0aGlzLlxuICBzZXRQYXRoKHBhdGgsIHYpIHtcbiAgICBfLnNldFBhdGgocGF0aCwgdiwgdGhpcy5kYXRhKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvLyAjIyNzZXRzXG4gIC8vIEludm9rZXMgYHNldCgpYCBvciBgc2V0UGF0aCgpYCBmb3IgZWFjaCBrZXkgdmFsdWUgcGFpciBpbiBgb2JqYC5cbiAgLy8gQW55IGxpc3RlbmVycyBmb3IgdGhvc2Uga2V5cyBvciBwYXRocyB3aWxsIGJlIGNhbGxlZC5cbiAgLy9cbiAgLy8gYHBhcmFtYCB7T2JqZWN0fSBgb2JqYC4gVGhlIGtleXMgYW5kIHZhbHVlcyB0byBzZXQuXG4gIC8vIGByZXR1cm5zYCB7T2JqZWN0fSBgdGhpc2BcbiAgc2V0cyhvYmopIHtcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goayA9PiB7XG4gICAgICAhfmsuaW5kZXhPZignLicpID8gdGhpcy5zZXQoaywgb2JqW2tdKSA6IHRoaXMuc2V0UGF0aChrLCBvYmpba10pO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8vICMjI3Vuc2V0XG4gIC8vIFJlbW92ZSBhIGtleTp2YWx1ZSBwYWlyIGZyb20gdGhpcyBvYmplY3QncyBkYXRhIHN0b3JlXG4gIC8vXG4gIC8vIGBwYXJhbWAge1N0cmluZ30gYGtgXG4gIC8vIGByZXR1cm5zYCB7T2JqZWN0fSBgdGhpc2BcbiAgdW5zZXQoaykge1xuICAgIGRlbGV0ZSB0aGlzLmRhdGFba107XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLy8gIyMjdW5zZXRQYXRoXG4gIC8vIFVzZXMgdGhlIGB1bnNldFBhdGhgIG1ldGhvZCwgb3BlcmF0aW5nIG9uIHRoaXMgbW9kZWxzIGRhdGEgaGFzaFxuICAvL1xuICAvLyBgcGFyYW1gIHtTdHJpbmd9IHBhdGhcbiAgLy8gYHJldHVybnNgIHtPYmplY3R9IGB0aGlzYFxuICB1bnNldFBhdGgocGF0aCkge1xuICAgIF8udW5zZXRQYXRoKHBhdGgsIHRoaXMuZGF0YSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLy8gIyMjdW5zZXRzXG4gIC8vIERlbGV0ZXMgYSBudW1iZXIgb2Yga2V5cyBvciBwYXRocyBmcm9tIHRoaXMgb2JqZWN0J3MgZGF0YSBzdG9yZVxuICAvL1xuICAvLyBgcGFyYW1gIHthcnJheX0gYGFyeWAuIEFuIGFycmF5IG9mIGtleXMgb3IgcGF0aHMuXG4gIC8vIGByZXR1cm5zYCB7T2JqYWVjdH0gYHRoaXNgXG4gIHVuc2V0cyhhcnkpIHtcbiAgICBhcnkuZm9yRWFjaChrID0+IHsgIX5rLmluZGV4T2YoJy4nKSA/IHRoaXMudW5zZXQoaykgOiB0aGlzLnVuc2V0UGF0aChrKTsgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdG9yZTtcbiIsIi8vICMjI2dldFBhdGhcbi8vIEV4dHJhY3QgYSB2YWx1ZSBsb2NhdGVkIGF0IGBwYXRoYCByZWxhdGl2ZSB0byB0aGUgcGFzc2VkIGluIG9iamVjdFxuLy9cbi8vIGBwYXJhbWAge1N0cmluZ30gYHBhdGhgLiBUaGUga2V5IGluIHRoZSBmb3JtIG9mIGEgZG90LWRlbGltaXRlZCBwYXRoLlxuLy8gYHBhcmFtYCB7b2JqZWN0fSBgb2JqYC4gQW4gb2JqZWN0IGxpdGVyYWwgdG8gb3BlcmF0ZSBvbi5cbi8vXG4vLyBgcmV0dXJuc2Ageyp8dW5kZWZpbmVkfS4gVGhlIHZhbHVlIGF0IGtleXBhdGggb3IgdW5kZWZpbmVkIGlmIG5vdCBmb3VuZC5cbmV4cG9ydHMuZ2V0UGF0aCA9IGZ1bmN0aW9uKHBhdGgsIG9iaikge1xuICB2YXIga2V5LCBwO1xuICBwID0gcGF0aC5zcGxpdCgnLicpO1xuICBmb3IgKDsgcC5sZW5ndGggJiYgKGtleSA9IHAuc2hpZnQoKSk7KSB7XG4gICAgaWYoIXAubGVuZ3RoKSByZXR1cm4gb2JqW2tleV07XG4gICAgZWxzZSBvYmogPSBvYmpba2V5XSB8fCB7fTtcbiAgfVxuICByZXR1cm4gb2JqO1xufTtcbi8vICMjI21ha2VNZUFTYW5kd2ljaFxuLy8gTm90aWNlIHRoZXJlIGlzIG5vIG5lZWQgdG8gZXh0cmluc2ljYWxseSBpbnN0cnVjdCAqaG93KiB0b1xuLy8gbWFrZSB0aGUgc2FuZHdpY2gsIGp1c3QgdGhlIGVsZWdhbnQgc2luZ2xlIGNvbW1hbmQuXG4vL1xuLy8gYHJldHVybnNgIHtzdHJpbmd9XG5leHBvcnRzLm1ha2VNZUFTYW5kd2ljaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gJ09rYXkuJzsgfTtcbi8vICMjI21peGluXG4vLyBlczYgQ2xhc3NlcyBkbyBub3QgaGF2ZSBhIGB0cmFpdHNgIGZ1bmN0aW9uYWxpdHkgYXMgb2YgeWV0LiBUaGlzIG1ldGhvZCBpc1xuLy8gcHJvdmlkZWQgdW50aWwgdGhlcmUgaXMgb25lLlxuLy9cbi8vIGBwYXJhbWAge2NsYXNzIHByb3RvdHlwZX0gYHRhcmdgLiBBIFN1ZG8gQ2xhc3MgaW5zdGFuY2UncyBwcm90b3R5cGVcbi8vIGBwYXJhbWAge09iamVjdH0gYHNvdXJjZWAuIEFuIE9iamVjdCBMaXRlcmFsIGNvbnRhaW5pbmcgcHJvcGVydGllcyB0byBhZGRcbmV4cG9ydHMubWl4aW4gPSBmdW5jdGlvbih0YXJnLCBzb3VyY2UpIHtcbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnLCBuYW1lLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgbmFtZSkpO1xuICB9KTtcbn07XG4vLyAjIyNzZXRQYXRoXG4vLyBUcmF2ZXJzZSB0aGUga2V5cGF0aCBhbmQgZ2V0IGVhY2ggb2JqZWN0XG4vLyAob3IgbWFrZSBibGFuayBvbmVzKSBldmVudHVhbGx5IHNldHRpbmcgdGhlIHZhbHVlXG4vLyBhdCB0aGUgZW5kIG9mIHRoZSBwYXRoXG4vL1xuLy8gYHBhcmFtYCB7c3RyaW5nfSBgcGF0aGAuIFRoZSBwYXRoIHRvIHRyYXZlcnNlIHdoZW4gc2V0dGluZyBhIHZhbHVlLlxuLy8gYHBhcmFtYCB7Kn0gYHZhbHVlYC4gV2hhdCB0byBzZXQuXG4vLyBgcGFyYW1gIHtPYmplY3R9IGBvYmpgLiBUaGUgb2JqZWN0IGxpdGVyYWwgdG8gb3BlcmF0ZSBvbi5cbmV4cG9ydHMuc2V0UGF0aCA9IGZ1bmN0aW9uKHBhdGgsIHZhbHVlLCBvYmopIHtcbiAgdmFyIHAgPSBwYXRoLnNwbGl0KCcuJyksIGtleTtcbiAgZm9yICg7IHAubGVuZ3RoICYmIChrZXkgPSBwLnNoaWZ0KCkpOykge1xuICAgIGlmKCFwLmxlbmd0aCkgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICBlbHNlIGlmIChvYmpba2V5XSkgb2JqID0gb2JqW2tleV07XG4gICAgZWxzZSBvYmogPSBvYmpba2V5XSA9IHt9O1xuICB9XG59O1xuLy8gIyMjI3VpZFxuLy8gU29tZSBzdWRvIE9iamVjdHMgdXNlIGEgdW5pcXVlIGludGVnZXIgYXMgYSBgdGFnYCBmb3IgaWRlbnRpZmljYXRpb24uXG4vLyAoVmlld3MgZm9yIGV4YW1wbGUpLiBUaGlzIGVuc3VyZXMgdGhleSBhcmUgaW5kZWVkIHVuaXF1ZS5cbmV4cG9ydHMudWlkID0gMDtcbi8vICMjIyN1bmlxdWVcbi8vIEFuIGludGVnZXIgdXNlZCBhcyAndGFncycgYnkgc29tZSBzdWRvIE9iamVjdHMgYXMgd2VsbFxuLy8gYXMgYSB1bmlxdWUgc3RyaW5nIGZvciB2aWV3cyB3aGVuIG5lZWRlZFxuLy9cbi8vIGBwYXJhbWAge3N0cmluZ30gcHJlZml4LiBPcHRpb25hbCBzdHJpbmcgaWRlbnRpZmllclxuZXhwb3J0cy51bmlxdWUgPSBmdW5jdGlvbihwcmVmaXgpIHtcbiAgcmV0dXJuIHByZWZpeCA/IHByZWZpeCArIHRoaXMudWlkKysgOiB0aGlzLnVpZCsrO1xufTtcbi8vICMjI3Vuc2V0UGF0aFxuLy8gUmVtb3ZlIGEga2V5OnZhbHVlIHBhaXIgZnJvbSB0aGlzIG9iamVjdCdzIGRhdGEgc3RvcmVcbi8vIGxvY2F0ZWQgYXQgPHBhdGg+XG4vL1xuLy8gYHBhcmFtYCB7U3RyaW5nfSBgcGF0aGBcbi8vIGBwYXJhbWAge09iamVjdH0gYG9iamAgVGhlIG9iamVjdCB0byBvcGVyYXRlIG9uLlxuZXhwb3J0cy51bnNldFBhdGggPSBmdW5jdGlvbihwYXRoLCBvYmopIHtcbiAgdmFyIHAgPSBwYXRoLnNwbGl0KCcuJyksIGtleTtcbiAgZm9yICg7IHAubGVuZ3RoICYmIChrZXkgPSBwLnNoaWZ0KCkpOykge1xuICAgIGlmKCFwLmxlbmd0aCkgZGVsZXRlIG9ialtrZXldO1xuICAgIC8vIHRoaXMgY2FuIGZhaWwgaWYgYSBmYXVsdHkgcGF0aCBpcyBwYXNzZWQuXG4gICAgLy8gdXNpbmcgZ2V0UGF0aCBiZWZvcmVoYW5kIGNhbiBwcmV2ZW50IHRoYXRcbiAgICBlbHNlIG9iaiA9IG9ialtrZXldO1xuICB9XG59O1xuIiwidmFyIFZpZXcgPSByZXF1aXJlKCcuLi92aWV3Jyk7XG5cbmNsYXNzIEJ1dHRvbnMgZXh0ZW5kcyBWaWV3IHtcbiAgYWRkZWRUb1BhcmVudChwYXJlbnQpIHtcbiAgICBzdXBlci5hZGRlZFRvUGFyZW50KHBhcmVudCk7XG5cbiAgICAvLyBsaXN0ZW4gYXQgdGhlIGNvbnRhaW5lciBsZXZlbCBhcyBhIGRlbGVnYXRlXG4gICAgdGhpcy5ob3N0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKGUpIHtcbiAgICAvLyB3aGljaCBidXR0b24gd2FzIGNsaWNrZWQ/XG4gICAgLy8gY29uc29sZS5sb2coJ2J1dHRvbiBjbGlja2VkOiAnICsgZS50YXJnZXQubmFtZSk7XG4gICAgaWYgKGUudGFyZ2V0Lm5hbWUpIHtcbiAgICAgIHRoaXMuc2VuZCgnYnV0dG9uUHJlc3NlZCcsIGUudGFyZ2V0Lm5hbWUpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvbnM7XG4iLCJ2YXIgU3RvcmUgPSByZXF1aXJlICgnLi90ZXN0LXN0b3JlJyk7XG52YXIgRGlzcGF0Y2hlciA9IHJlcXVpcmUoJy4vdGVzdC1kaXNwYXRjaGVyJyk7XG52YXIgQnV0dG9ucyA9IHJlcXVpcmUoJy4vYnV0dG9ucy1jb21wb25lbnQnKTtcbi8vIHZhciBNYWluID0gcmVxdWlyZSgnLi9tYWluLWNvbXBvbmVudCcpO1xuXG52YXIgc3RvcmUgPSBuZXcgU3RvcmUoKTtcbnZhciBkaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXIoKTtcblxuLy8gc3RvcmUga25vd3MgaG93IHRvIHJlZ2lzdGVyIHdpdGggdGhlIGRpc3BhdGNoZXJcbnN0b3JlLnJlZ2lzdGVyKGRpc3BhdGNoZXIpO1xuXG4vLyBub3QgYSB0ZW1wbGF0ZWQgdmlldyBjb21wb25lbnQsIHBhc3MgaXQgYW4gJ2VsJ1xudmFyIGJ1dHRvbnMgPSBuZXcgQnV0dG9ucyh7ZWw6ICcjYnV0dG9uLWNvbnRlbnQnfSk7XG4vLyBpcyBhIHRlbXBsYXRlZCB2aWV3LCBwYXNzIGluIHRoZSBmaWxlIHRvIGltcG9ydFxuLy8gdmFyIG1haW4gPSBuZXcgTWFpbih7dGVtcGxhdGU6ICd0ZW1wbGF0ZScsIGltcG9ydDogJyNtYWluLWNvbnRlbnQtdGVtcGxhdGUnfSk7XG4vLyBkaXNwYXRjaGVyIGlzIHRoZSByb290IG9iamVjdCwgcGFyZW50IG9mIGFsbCBjaGlsZHJlblxuZGlzcGF0Y2hlci5hZGRDaGlsZHJlbihbYnV0dG9uc10pO1xuIiwidmFyIERpc3BhdGNoZXIgPSByZXF1aXJlKCcuLi8uLi9kaXNwYXRjaGVyL2Rpc3BhdGNoZXInKTtcblxuY2xhc3MgVGVzdERpc3BhdGNoZXIgZXh0ZW5kcyBEaXNwYXRjaGVyIHtcbiAgLy8gc2VuZCB0YXJnZXQgZm9yIGJ1dHRvbiBjb21wb25lbnRcbiAgYnV0dG9uUHJlc3NlZChuYW1lKSB7XG4gICAgY29uc29sZS5sb2coJ3NlbmQgdGFyZ2V0IGhpdCcpO1xuICAgIC8vIHdoaWNoIGJ1dHRvbiB3YXMgcHJlc3NlZCA/XG4gICAgdGhpcy5kaXNwYXRjaCh7YWN0aW9uOiAnYnV0dG9uUHJlc3MnLCBpZGVudGlmaWVyOiBuYW1lfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUZXN0RGlzcGF0Y2hlcjtcbiIsInZhciBTdG9yZSA9IHJlcXVpcmUoJy4uLy4uL3N0b3JlL3N0b3JlJyk7XG5cbmNsYXNzIFRlc3RTdG9yZSBleHRlbmRzIFN0b3JlIHtcbiAgaGFuZGxlRGlzcGF0Y2gocGF5bG9hZCkge1xuICAgIGNvbnNvbGUubG9nKCdoYW5kbGUgZGlzcGF0Y2ggaGl0Jyk7XG4gICAgLy8gZGVwZW5kaW5nIG9uIHRoZSBwYXlsb2FkLCBzZXQgc29tZSBzdHVmZiBhbmQgZW1pdC4uLlxuICAgIHRoaXMuc2V0cyhwYXlsb2FkKTtcbiAgICB0aGlzLmVtaXQoJ2NoYW5nZScpO1xuICB9XG4gIC8vIHBhc3MgaW4gYSBkaXNwYXRjaGVyIGluc3RhbmNlIHRvIHJlZ2lzdGVyIHdpdGggaXRcbiAgcmVnaXN0ZXIoZGlzcGF0Y2hlcikge1xuICAgIHRoaXMuZGlzcGF0Y2hJZCA9IGRpc3BhdGNoZXIucmVnaXN0ZXIodGhpcy5oYW5kbGVEaXNwYXRjaC5iaW5kKHRoaXMpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRlc3RTdG9yZTtcbiIsInZhciBDb250YWluZXIgPSByZXF1aXJlKCcuLi9jb250YWluZXIvY29udGFpbmVyJyk7XG5cbi8vIyNWaWV3XG4vLyBHaXZlbiBhIHRlbXBsYXRlIGlkZW50aWZpZXIsIGBkYXRhLnRlbXBsYXRlYCwgdXNlIHRoYXQgZm9yIGNvbnRlbnRcbi8vIEdpdmVuIGEgc2hhZG93IGhvc3QsIGBkYXRhLnNoYWRvd0hvc3RgLCBjcmVhdGUgc2hhZG93IHJvb3QgdGhlcmVcbi8vIEdpdmVuIGEgdGVtcGxhdGUgaW1wb3J0IGBkYXRhLmltcG9ydGAsIGZldGNoIG15IHRlbXBsYXRlIGZyb20gdGhlcmVcbmNsYXNzIFZpZXcgZXh0ZW5kcyBDb250YWluZXIge1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucm9sZSA9ICd2aWV3JztcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgLy8gIyMjYWRkZWRUb1BhcmVudFxuICAvLyBBbGwgdmlldyBjb21wb25lbnRzIHdpbGwgc2V0dXAgdGhlaXIgc2hhZG93IERPTSB3aGVuIGFkZGVkIHRvIGEgY29udGFpbmVyLlxuICAvLyBUaGlzIGRvZXMgbWVhbiB0aGF0IHdlIGV4cGVjdCBhbnkgdmlldyBjb21wb25lbnQgdG8gYmUgaG91c2VkIGluIGEgY29udGFpbmVyLFxuICAvLyB3aGV0aGVyIGFub3RoZXIgdmlldyBvciB0aGUgdG9wIGxldmVsIGBEaXNwYXRjaGVyYC4gU3RlcHMgZm9yIHNldHVwIGFyZTpcbiAgLy9cbiAgLy8gKiBMb2NhdGUgbXkgdGVtcGxhdGUsIGVpdGhlciBpbiB0aGUgbWFpbiBkb2N1bWVudCBvciBpbXBvcnQgaXRcbiAgLy8gKiBMb2NhdGUgbXkgU2hhZG93IEhvc3QsIHNhdmUgYSByZWYgYHRoaXMuaG9zdGBcbiAgLy8gKiBDcmVhdGUgbXkgU2hhZG93IFJvb3QgYXQgdGhlIFNoYWRvdyBIb3N0LCBzYXZlZCBhdCBgdGhpcy5yb290YFxuICAvLyAqIENsb25lIHRoZSB0ZW1wbGF0ZSBhbmQgaW5zZXJ0IGl0IGF0IHRoZSBTaGFkb3cgUm9vdFxuICAvL1xuICAvLyBUaGVyZSBpcyBhIHBhdGggZm9yIGEgc2ltcGxlLCBub24tdGVtcGxhdGVkLCBub24gU2hhZG93IERvbSBlbGVtZW50LiBTaW1wbHlcbiAgLy8gcHJvdmlkZSBhIHNlbGVjdG9yIHZpYSBgZWxgIGFuZCBpdCB3aWxsIGJlY29tZSB0aGUgYGhvc3RgLiBTaW5jZSB0aGUgc3RhdGVcbiAgLy8gaHlkcmF0aW9uIGZvciB0ZW1sYXRlZCAoYW5kIG5vbikgaXMgdGhlIHNhbWUgdGhpcyB3aWxsIHdvcmtcbiAgYWRkZWRUb1BhcmVudChwYXJlbnQpIHtcbiAgICBsZXQgdG1wbEhvc3QsIHRtcGw7XG4gICAgLy8gaWYgbXkgLnRlbXBsYXRlIGlzIGEgc3RyaW5nIGlkZW50aWZpZXIsIGxvY2F0ZSBpdFxuICAgIGlmKHR5cGVvZiB0aGlzLmRhdGEudGVtcGxhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBsb2NhdGUgdGhlIHRlbXBsYXRlIGhvc3QsIGNhbiBiZSBpbiB0aGUgbWFpbiBkb2Mgb3IgYW4gaW1wb3J0XG4gICAgICBpZiAodGhpcy5kYXRhLmltcG9ydCkge1xuICAgICAgICB0bXBsSG9zdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5kYXRhLmltcG9ydCkuaW1wb3J0O1xuICAgICAgfSBlbHNlIHRtcGxIb3N0ID0gZG9jdW1lbnQ7XG4gICAgICAvLyBub3cgdGhlIGFjdHVhbCB0ZW1wbGF0ZVxuICAgICAgdG1wbCA9IHRtcGxIb3N0ICYmIHRtcGxIb3N0LnF1ZXJ5U2VsZWN0b3IodGhpcy5kYXRhLnRlbXBsYXRlKTtcbiAgICB9IC8vIGVsc2UgdG1wbCA9IHRoaXMuZGF0YS50ZW1wbGF0ZTsgLS0gZG8gd2Ugd2FudCB0byBzdXBwb3J0IHBhc3NpbmcgaXQgaW4/XG4gICAgbGV0IHRtcGxDb250ZW50ID0gdG1wbCAmJiBkb2N1bWVudC5pbXBvcnROb2RlKHRtcGwuY29udGVudCwgdHJ1ZSk7XG4gICAgLy8gdGhlIGV2ZW50dWFsIGxvY2F0aW9uLCBhc3N1bWVkIHRvIGJlIGluIHRoZSBtYWluIGRvY1xuICAgIHRoaXMuaG9zdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5kYXRhLnNoYWRvd0hvc3QgfHwgdGhpcy5kYXRhLmVsKTtcbiAgICBpZiAodG1wbENvbnRlbnQgJiYgdGhpcy5ob3N0ICYmIChcImNyZWF0ZVNoYWRvd1Jvb3RcIiBpbiB0aGlzLmhvc3QpKSB7XG4gICAgICB0aGlzLnJvb3QgPSB0aGlzLmhvc3QuY3JlYXRlU2hhZG93Um9vdCgpO1xuICAgICAgLy8gcGxhY2UgdGhlIHRlbXBsYXRlIGNvbnRlbnQgaW50byB0aGUgaG9zdFxuICAgICAgdGhpcy5yb290ICYmIHRoaXMucm9vdC5hcHBlbmRDaGlsZCh0bXBsQ29udGVudCk7XG4gICAgfVxuICB9XG5cbiAgLy8gIyMjcmVuZGVyXG4gIC8vIFRoZSBpbnNlcnRpb24gb2YgdGhlIHRlbXBsYXRlIGF0IHRoZSBTaGFkb3cgSG9zdCwgaW4gYGFkZGVkVG9QYXJlbnRgLFxuICAvLyBzZXRzIHVwIG91ciBkZXNpcmVkIFwicHJlc2VudGF0aW9uXCIgZGV0YWlscyB3aXRoIGFueSBpbml0aWFsIGRhdGEgdGhhdCBtYXkgaGF2ZVxuICAvLyBiZWVuIHByZXNlbnQuIENhbGxzIHRvIHJlbmRlciBzaG91bGQgYmUgdGhlIHByb2R1Y3Qgb2YgY2hhbmdpbmcgc3RhdGUgaW4geW91clxuICAvLyBhcHBsaWNhdGlvbiwgdmlldyBjb21wb25lbnRzIHJlYWN0aW5nIHRvIHN0b3JlcyBlbWl0dGluZyBjaGFuZ2UgZXZlbnRzLlxuICAvLyBBcyBzdWNoLCBhIGBzdGF0ZWAgb2JqZWN0IGlzIGV4cGVjdGVkIHRoYXQgY2FuIGJlIGluc3BlY3RlZC4gSWYga2V5cyBpbiB0aGVcbiAgLy8gc2FpZCBoYXNoIG1hdGNoIGF0dHJpYnV0ZXMgb2YgZWxlbWVudHMgaW4gdGhpcyBvYmplY3QncyBTaGFkb3cgSG9zdCBFTGVtZW50LFxuICAvLyB0aGUgdmFsdWVzIGxvY2F0ZWQgYXQgdGhvc2Uga2V5cyB3aWxsIGJlIGluc2VydGVkIHRoZXJlLiBGb3IgZXhhbXBsZSxcbiAgLy8gZ2l2ZW4gdGhpcyBtYXJrdXAgaW4gdGhlIHNoYWRvdyBob3N0OlxuICAvLyAgICA8ZGl2IGlkPVwiI2Zvb0hvc3RcIj5cbiAgLy8gICAgICA8aDM+PC9oMz5cbiAgLy8gICAgICA8c3BhbiBjbGFzcz1cImZvb1wiPjwvc3Bhbj5cbiAgLy8gICAgPC9kaXY+XG4gIC8vXG4gIC8vIFRoZW4gcGFzc2VkIHRoaXMgYHN0YXRlYCBvYmplY3Q6XG4gIC8vICAgIHsgJy5mb28nOiAnQmFyJywgaDM6ICdGb28nfVxuICAvL1xuICAvLyBXaWxsIHJlc3VsdCBpbjpcbiAgLy8gICAgPGRpdiBpZD1cIiNmb29Ib3N0XCI+XG4gIC8vICAgICAgPGgzPkZvbzwvaDM+XG4gIC8vICAgICAgPHNwYW4gY2xhc3M9XCJmb29cIj5CYXI8L3NwYW4+XG4gIC8vICAgIDwvZGl2PlxuICAvL1xuICAvLyBUaGUgYWN0dWFsIHByZXNlbnRhdGlvbiBkZXRhaWxzLCBvZiBjb3Vyc2UsIGFyZSBhYnN0cmFjdGVkIGF3YXkgaW4gdGhlXG4gIC8vIFNoYWRvdyBEb20sIHZpYSB5b3VyIHRlbXBsYXRlLiBOT1RFOiBXZSBkbyBleHBlY3QgdGhhdCB5b3UgaGF2ZSBwcm9jZXNzZWQgdGhlXG4gIC8vIHZhbHVlcyB0byBiZSBpbnNlcnRlZCBkb3duIHRvIGEgc2ltcGxlIGB0ZXh0Q29udGVudGAgYnkgdGhpcyBwb2ludFxuICByZW5kZXIoc3RhdGUpIHtcbiAgICAvLyBzdGF0ZSBhbmQgaG9zdCBhcmUgbWFuZGF0b3J5XG4gICAgaWYgKCF0aGlzLmhvc3QgfHwgIXN0YXRlKSByZXR1cm47XG4gICAgT2JqZWN0LmtleXMoc3RhdGUpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHRoaXMuaG9zdC5xdWVyeVNlbGVjdG9yKGtleSkudGV4dENvbnRlbnQgPSBzdGF0ZVtrZXldO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVmlldztcbiJdfQ==
