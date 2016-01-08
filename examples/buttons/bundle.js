(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ = require('../util/util');
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

},{"../mixins/delegates":10,"../util/util":16}],2:[function(require,module,exports){
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var EventEmitter = require('events').EventEmitter;
var _ = require('../util/util');
var delegates = require('../mixins/delegates');

// ##Emitter Class Object
//
// A Base Class extending the core Node module EventEmitter and our delegation functionality

var Emitter = (function (_EventEmitter) {
  _inherits(Emitter, _EventEmitter);

  function Emitter() {
    _classCallCheck(this, Emitter);

    _get(Object.getPrototypeOf(Emitter.prototype), 'constructor', this).call(this);
    // can delegate
    this.delegates = [];
    // a beautiful and unique snowflake
    this.uid = _.unique();
    // should be overridden in child classes
    this.role = 'base';
  }

  return Emitter;
})(EventEmitter)

// add the actual methods
;

_.mixin(Emitter.prototype, delegates);

module.exports = Emitter;

},{"../mixins/delegates":10,"../util/util":16,"events":11}],3:[function(require,module,exports){
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

var View = require('../../view/view');

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
      if (e.target.name) {
        this.send('buttonPressed', e.target.name);
      }
    }
  }]);

  return Buttons;
})(View);

module.exports = Buttons;

},{"../../view/view":17}],5:[function(require,module,exports){
'use strict';

var Dispatcher = require('flux').Dispatcher;

module.exports = new Dispatcher();

},{"flux":12}],6:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var View = require('../../view/view');

var Main = (function (_View) {
  _inherits(Main, _View);

  function Main(data) {
    _classCallCheck(this, Main);

    _get(Object.getPrototypeOf(Main.prototype), 'constructor', this).call(this, data);

    this.CLICKTEXT = 'Clicked!';
    this.NOTCLICKED = 'aww...';
  }

  // map the recieved dispatch data to what my render can use

  _createClass(Main, [{
    key: 'update',
    value: function update(data) {
      // class 'targets' depend on which event happened
      var isOne = data.event === 'event-one';

      var state = {
        '.one-notification': isOne ? this.CLICKTEXT : this.NOTCLICKED,
        '.two-notification': isOne ? this.NOTCLICKED : this.CLICKTEXT
      };

      var count = isOne ? '.one-count' : '.two-count';
      state[count] = data.count;

      this.mergeState(state);
    }
  }]);

  return Main;
})(View);

module.exports = Main;

},{"../../view/view":17}],7:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Container = require('../../container/container');

var dispatcher = require('./buttons-dispatcher');
var store = require('./buttons-store');
var Buttons = require('./buttons-component');
var Main = require('./buttons-main');

var Root = (function (_Container) {
  _inherits(Root, _Container);

  function Root() {
    _classCallCheck(this, Root);

    _get(Object.getPrototypeOf(Root.prototype), 'constructor', this).call(this);
    // we can listen for store changes here
    store.on('change', this.handleEmit.bind(this));
    // i am the root node, so add some children
    this.setupChildren();
  }

  // send target for button component

  _createClass(Root, [{
    key: 'buttonPressed',
    value: function buttonPressed(name) {
      // which button was pressed ?
      dispatcher.dispatch({ type: 'buttonPress', identifier: name });
    }
  }, {
    key: 'handleEmit',
    value: function handleEmit() {
      var data = store.getCurrentEvent();
      // i'll direct the payload to the correct child, could
      // be naive here and let the child decide by just blindly calling update
      // on each child, either is fine imo...
      this.getChild('main').update(data);
    }
  }, {
    key: 'setupChildren',
    value: function setupChildren() {
      // passed `el` as it's a  non-templated view component
      this.addChild(new Buttons({ el: '#button-content' }), 'buttons').addChild(new Main({
        shadowHost: '#main-content',
        template: '#main',
        'import': '#main-content-template'
      }), 'main');
    }
  }]);

  return Root;
})(Container);

module.exports = new Root();

},{"../../container/container":3,"./buttons-component":4,"./buttons-dispatcher":5,"./buttons-main":6,"./buttons-store":8}],8:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Store = require('../../store/store');
var dispatcher = require('./buttons-dispatcher');

var TestStore = (function (_Store) {
  _inherits(TestStore, _Store);

  function TestStore() {
    _classCallCheck(this, TestStore);

    _get(Object.getPrototypeOf(TestStore.prototype), 'constructor', this).call(this);
    this.register(dispatcher);

    this.sets({ oneHappened: 0, twoHappened: 0 });
  }

  _createClass(TestStore, [{
    key: 'handleDispatch',
    value: function handleDispatch(payload) {
      if (payload.type === 'buttonPress') {
        // if there were more than 2 we'd switch...
        if (payload.identifier === 'event-one') this.data.oneHappened += 1;else this.data.twoHappened += 1;

        this.data.currentEvent = payload.identifier;
        this.emit('change');
      }
    }
  }, {
    key: 'getCurrentEvent',
    value: function getCurrentEvent() {
      var event = this.data.currentEvent;

      return {
        event: event,
        count: event === 'event-one' ? this.data.oneHappened : this.data.twoHappened
      };
    }
  }]);

  return TestStore;
})(Store);

module.exports = new TestStore();

},{"../../store/store":15,"./buttons-dispatcher":5}],9:[function(require,module,exports){
// root sets up children and listens for store changes...
'use strict';

var root = require('./buttons-root');

},{"./buttons-root":7}],10:[function(require,module,exports){
// ##Delegates mixin
// Used by the two base classes, Base and Emitter
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = require('./lib/Dispatcher')

},{"./lib/Dispatcher":13}],13:[function(require,module,exports){
/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * @typechecks
 */

"use strict";

var invariant = require('./invariant');

var _lastID = 1;
var _prefix = 'ID_';

/**
 * Dispatcher is used to broadcast payloads to registered callbacks. This is
 * different from generic pub-sub systems in two ways:
 *
 *   1) Callbacks are not subscribed to particular events. Every payload is
 *      dispatched to every registered callback.
 *   2) Callbacks can be deferred in whole or part until other callbacks have
 *      been executed.
 *
 * For example, consider this hypothetical flight destination form, which
 * selects a default city when a country is selected:
 *
 *   var flightDispatcher = new Dispatcher();
 *
 *   // Keeps track of which country is selected
 *   var CountryStore = {country: null};
 *
 *   // Keeps track of which city is selected
 *   var CityStore = {city: null};
 *
 *   // Keeps track of the base flight price of the selected city
 *   var FlightPriceStore = {price: null}
 *
 * When a user changes the selected city, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'city-update',
 *     selectedCity: 'paris'
 *   });
 *
 * This payload is digested by `CityStore`:
 *
 *   flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'city-update') {
 *       CityStore.city = payload.selectedCity;
 *     }
 *   });
 *
 * When the user selects a country, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'country-update',
 *     selectedCountry: 'australia'
 *   });
 *
 * This payload is digested by both stores:
 *
 *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       CountryStore.country = payload.selectedCountry;
 *     }
 *   });
 *
 * When the callback to update `CountryStore` is registered, we save a reference
 * to the returned token. Using this token with `waitFor()`, we can guarantee
 * that `CountryStore` is updated before the callback that updates `CityStore`
 * needs to query its data.
 *
 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       // `CountryStore.country` may not be updated.
 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
 *       // `CountryStore.country` is now guaranteed to be updated.
 *
 *       // Select the default city for the new country
 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
 *     }
 *   });
 *
 * The usage of `waitFor()` can be chained, for example:
 *
 *   FlightPriceStore.dispatchToken =
 *     flightDispatcher.register(function(payload) {
 *       switch (payload.actionType) {
 *         case 'country-update':
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *
 *         case 'city-update':
 *           FlightPriceStore.price =
 *             FlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */

  function Dispatcher() {
    this.$Dispatcher_callbacks = {};
    this.$Dispatcher_isPending = {};
    this.$Dispatcher_isHandled = {};
    this.$Dispatcher_isDispatching = false;
    this.$Dispatcher_pendingPayload = null;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   *
   * @param {function} callback
   * @return {string}
   */
  Dispatcher.prototype.register=function(callback) {
    var id = _prefix + _lastID++;
    this.$Dispatcher_callbacks[id] = callback;
    return id;
  };

  /**
   * Removes a callback based on its token.
   *
   * @param {string} id
   */
  Dispatcher.prototype.unregister=function(id) {
    invariant(
      this.$Dispatcher_callbacks[id],
      'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
      id
    );
    delete this.$Dispatcher_callbacks[id];
  };

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   *
   * @param {array<string>} ids
   */
  Dispatcher.prototype.waitFor=function(ids) {
    invariant(
      this.$Dispatcher_isDispatching,
      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
    );
    for (var ii = 0; ii < ids.length; ii++) {
      var id = ids[ii];
      if (this.$Dispatcher_isPending[id]) {
        invariant(
          this.$Dispatcher_isHandled[id],
          'Dispatcher.waitFor(...): Circular dependency detected while ' +
          'waiting for `%s`.',
          id
        );
        continue;
      }
      invariant(
        this.$Dispatcher_callbacks[id],
        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
        id
      );
      this.$Dispatcher_invokeCallback(id);
    }
  };

  /**
   * Dispatches a payload to all registered callbacks.
   *
   * @param {object} payload
   */
  Dispatcher.prototype.dispatch=function(payload) {
    invariant(
      !this.$Dispatcher_isDispatching,
      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
    );
    this.$Dispatcher_startDispatching(payload);
    try {
      for (var id in this.$Dispatcher_callbacks) {
        if (this.$Dispatcher_isPending[id]) {
          continue;
        }
        this.$Dispatcher_invokeCallback(id);
      }
    } finally {
      this.$Dispatcher_stopDispatching();
    }
  };

  /**
   * Is this Dispatcher currently dispatching.
   *
   * @return {boolean}
   */
  Dispatcher.prototype.isDispatching=function() {
    return this.$Dispatcher_isDispatching;
  };

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @param {string} id
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_invokeCallback=function(id) {
    this.$Dispatcher_isPending[id] = true;
    this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
    this.$Dispatcher_isHandled[id] = true;
  };

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @param {object} payload
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_startDispatching=function(payload) {
    for (var id in this.$Dispatcher_callbacks) {
      this.$Dispatcher_isPending[id] = false;
      this.$Dispatcher_isHandled[id] = false;
    }
    this.$Dispatcher_pendingPayload = payload;
    this.$Dispatcher_isDispatching = true;
  };

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_stopDispatching=function() {
    this.$Dispatcher_pendingPayload = null;
    this.$Dispatcher_isDispatching = false;
  };


module.exports = Dispatcher;

},{"./invariant":14}],14:[function(require,module,exports){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (false) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

},{}],15:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

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

var Store = (function (_Emitter) {
  _inherits(Store, _Emitter);

  function Store(data) {
    _classCallCheck(this, Store);

    _get(Object.getPrototypeOf(Store.prototype), 'constructor', this).call(this);

    this.role = 'store';
    // stores operate on the inner data hash...
    this.data = data || {};
  }

  // ###getPath
  // Uses the `getpath` function operating on the store's data hash.
  //
  // `param` {string} `path`
  // `returns` {*|undefined}. The value at keypath or undefined if not found.

  _createClass(Store, [{
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
        obj[str] = ! ~str.indexOf('.') ? _this.data[str] : _this.getPath(str);
      });
      return obj;
    }

    // ###handleDispatch
    // A noop by default, override in you subclass to perform the necessary
    // computation on the recieved dispatch payload.
  }, {
    key: 'handleDispatch',
    value: function handleDispatch() {}

    // ###register
    // Register a callback with the dispatcher, assigning the returned
    // "dispatch token" as `this.dispatchId`.
    //
    // `param` {Object} `dispatcher`. The dispatcher instance to register with
    // `param` {String|Function} Optional argument indicating the function to
    // register with. If falsy, `handleDispatch` is assumed. If a String, the
    // method is bound to this instance when registered. If a Function, it is
    // simply passed as-is
  }, {
    key: 'register',
    value: function register(dispatcher) {
      var fn = arguments.length <= 1 || arguments[1] === undefined ? 'handleDispatch' : arguments[1];

      var cb = typeof fn === 'string' ? this[fn].bind(this) : fn;
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
        ! ~k.indexOf('.') ? _this2.data[k] = obj[k] : _this2.setPath(k, obj[k]);
      });
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
        ! ~k.indexOf('.') ? delete _this3.data[k] : _this3.unsetPath(k);
      });
      return this;
    }
  }]);

  return Store;
})(Emitter);

module.exports = Store;

},{"../base/emitter":2,"../util/util":16}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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

  _createClass(View, [{
    key: 'addedToParent',
    value: function addedToParent() {
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
      if (tmplContent && this.host && 'createShadowRoot' in this.host) {
        this.root = this.host.createShadowRoot();
        // place the template content into the host
        this.root && this.root.appendChild(tmplContent);
      }
    }

    // ###mergeState
  }, {
    key: 'mergeState',
    value: function mergeState(state) {
      var _this = this;

      Object.keys(state).forEach(function (key) {
        _this.state[key] = state[key];
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
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var state = arguments.length <= 0 || arguments[0] === undefined ? this.state : arguments[0];

      // host is mandatory
      if (!this.host) return;

      // TODO diff based on a _prevState_ ??
      Object.keys(state).forEach(function (key) {
        _this2.host.querySelector(key).textContent = _this2.state[key];
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
  }, {
    key: 'resetState',
    value: function resetState(state) {
      var _this3 = this;

      // empty the value of any keys not in the passed-in state object
      Object.keys(this.state).forEach(function (key) {
        if (!(key in state)) _this3.state[key] = '';
      });
      // now that any prev entries are erased (but kept) the new state can be merged
      return this.mergeState(state);
    }

    // ###update
    // Default implementation is a noop. An overridden method may exist on your
    // subclass to map the data passed in to one suitable for passing to render.
    // This is the preferred method for parents to call with dispatch data
  }, {
    key: 'update',
    value: function update() {}
  }]);

  return View;
})(Container);

module.exports = View;

},{"../container/container":3}]},{},[9])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcm9iL0dpdGh1Yi9tYWtlLW1lLWEtc2FuZHdpY2gvYmFzZS9iYXNlLmpzIiwiL1VzZXJzL3JvYi9HaXRodWIvbWFrZS1tZS1hLXNhbmR3aWNoL2Jhc2UvZW1pdHRlci5qcyIsIi9Vc2Vycy9yb2IvR2l0aHViL21ha2UtbWUtYS1zYW5kd2ljaC9jb250YWluZXIvY29udGFpbmVyLmpzIiwiL1VzZXJzL3JvYi9HaXRodWIvbWFrZS1tZS1hLXNhbmR3aWNoL2V4YW1wbGVzL2J1dHRvbnMvYnV0dG9ucy1jb21wb25lbnQuanMiLCIvVXNlcnMvcm9iL0dpdGh1Yi9tYWtlLW1lLWEtc2FuZHdpY2gvZXhhbXBsZXMvYnV0dG9ucy9idXR0b25zLWRpc3BhdGNoZXIuanMiLCIvVXNlcnMvcm9iL0dpdGh1Yi9tYWtlLW1lLWEtc2FuZHdpY2gvZXhhbXBsZXMvYnV0dG9ucy9idXR0b25zLW1haW4uanMiLCIvVXNlcnMvcm9iL0dpdGh1Yi9tYWtlLW1lLWEtc2FuZHdpY2gvZXhhbXBsZXMvYnV0dG9ucy9idXR0b25zLXJvb3QuanMiLCIvVXNlcnMvcm9iL0dpdGh1Yi9tYWtlLW1lLWEtc2FuZHdpY2gvZXhhbXBsZXMvYnV0dG9ucy9idXR0b25zLXN0b3JlLmpzIiwiL1VzZXJzL3JvYi9HaXRodWIvbWFrZS1tZS1hLXNhbmR3aWNoL2V4YW1wbGVzL2J1dHRvbnMvaW5kZXguanMiLCIvVXNlcnMvcm9iL0dpdGh1Yi9tYWtlLW1lLWEtc2FuZHdpY2gvbWl4aW5zL2RlbGVnYXRlcy5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwibm9kZV9tb2R1bGVzL2ZsdXgvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZmx1eC9saWIvRGlzcGF0Y2hlci5qcyIsIm5vZGVfbW9kdWxlcy9mbHV4L2xpYi9pbnZhcmlhbnQuanMiLCIvVXNlcnMvcm9iL0dpdGh1Yi9tYWtlLW1lLWEtc2FuZHdpY2gvc3RvcmUvc3RvcmUuanMiLCIvVXNlcnMvcm9iL0dpdGh1Yi9tYWtlLW1lLWEtc2FuZHdpY2gvdXRpbC91dGlsLmpzIiwiL1VzZXJzL3JvYi9HaXRodWIvbWFrZS1tZS1hLXNhbmR3aWNoL3ZpZXcvdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUNBQSxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDaEMsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7Ozs7Ozs7O0lBT3pDLElBQUksR0FDRyxTQURQLElBQUksR0FDTTt3QkFEVixJQUFJOzs7QUFHTixNQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQzs7QUFFcEIsTUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7O0FBRXRCLE1BQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0NBQ3BCOzs7OztBQUlILENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQzs7QUFFbkMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Ozs7Ozs7Ozs7O0FDdEJ0QixJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDO0FBQ2xELElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNoQyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQzs7Ozs7O0lBS3pDLE9BQU87WUFBUCxPQUFPOztBQUNBLFdBRFAsT0FBTyxHQUNHOzBCQURWLE9BQU87O0FBRVQsK0JBRkUsT0FBTyw2Q0FFRDs7QUFFUixRQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQzs7QUFFcEIsUUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxF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RUFBRTs7QUFFdkIsV0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDN0IsV0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDakIsZUFBTyxJQUFJLENBQUM7T0FDYjtLQUNGO0FBQ0QsV0FBTyxJQUFJLENBQUM7R0FDYjtDQUNGLENBQUM7OztBQzFERjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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LENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUcsRUFBSTtBQUNoQyxlQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxHQUFHLE9BQUssS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO09BQzVELENBQUMsQ0FBQztBQUNILGFBQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7Ozs7Ozs7OztXQVVTLG9CQUFDLEtBQUssRUFBRTs7OztBQUVoQixZQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLEVBQUk7QUFDckMsWUFBRyxFQUFFLEdBQUcsSUFBSSxLQUFLLENBQUEsQUFBQyxFQUFFLE9BQUssS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztPQUMxQyxDQUFDLENBQUM7O0FBRUgsYUFBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQy9COzs7Ozs7OztXQU1LLGtCQUFHLEVBQUU7OztTQXZIUCxJQUFJO0dBQVMsU0FBUzs7QUEwSDVCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBfID0gcmVxdWlyZSgnLi4vdXRpbC91dGlsJyk7XG52YXIgZGVsZWdhdGVzID0gcmVxdWlyZSgnLi4vbWl4aW5zL2RlbGVnYXRlcycpO1xuXG4vLyAjI0Jhc2UgQ2xhc3MgT2JqZWN0XG4vL1xuLy8gQWxsIHN1ZG8uanMgb2JqZWN0cyBpbmhlcml0IGJhc2UsIGdpdmluZyB0aGUgYWJpbGl0eVxuLy8gdG8gdXRpbGl6ZSBkZWxlZ2F0aW9uXG4vL1xuY2xhc3MgQmFzZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIGNhbiBkZWxlZ2F0ZVxuICAgIHRoaXMuZGVsZWdhdGVzID0gW107XG4gICAgLy8gYSBiZWF1dGlmdWwgYW5kIHVuaXF1ZSBzbm93Zmxha2VcbiAgICB0aGlzLnVpZCA9IF8udW5pcXVlKCk7XG4gICAgLy8gc2hvdWxkIGJlIG92ZXJyaWRkZW4gaW4gY2hpbGQgY2xhc3Nlc1xuICAgIHRoaXMucm9sZSA9ICdiYXNlJztcbiAgfVxufVxuXG4vLyBhZGQgdGhlIGFjdHVhbCBtZXRob2RzXG5fLm1peGluKEJhc2UucHJvdG90eXBlLCBkZWxlZ2F0ZXMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2U7XG4iLCJ2YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xudmFyIF8gPSByZXF1aXJlKCcuLi91dGlsL3V0aWwnKTtcbnZhciBkZWxlZ2F0ZXMgPSByZXF1aXJlKCcuLi9taXhpbnMvZGVsZWdhdGVzJyk7XG5cbi8vICMjRW1pdHRlciBDbGFzcyBPYmplY3Rcbi8vXG4vLyBBIEJhc2UgQ2xhc3MgZXh0ZW5kaW5nIHRoZSBjb3JlIE5vZGUgbW9kdWxlIEV2ZW50RW1pdHRlciBhbmQgb3VyIGRlbGVnYXRpb24gZnVuY3Rpb25hbGl0eVxuY2xhc3MgRW1pdHRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgLy8gY2FuIGRlbGVnYXRlXG4gICAgdGhpcy5kZWxlZ2F0ZXMgPSBbXTtcbiAgICAvLyBhIGJlYXV0aWZ1bCBhbmQgdW5pcXVlIHNub3dmbGFrZVxuICAgIHRoaXMudWlkID0gXy51bmlxdWUoKTtcbiAgICAvLyBzaG91bGQgYmUgb3ZlcnJpZGRlbiBpbiBjaGlsZCBjbGFzc2VzXG4gICAgdGhpcy5yb2xlID0gJ2Jhc2UnO1xuICB9XG59XG5cbi8vIGFkZCB0aGUgYWN0dWFsIG1ldGhvZHNcbl8ubWl4aW4oRW1pdHRlci5wcm90b3R5cGUsIGRlbGVnYXRlcyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRW1pdHRlcjtcbiIsInZhciBCYXNlID0gcmVxdWlyZSgnLi4vYmFzZS9iYXNlJyk7XG4vLyAjI0NvbnRhaW5lclxuLy9cbi8vIEEgY29udGFpbmVyIGlzIGFueSBvYmplY3QgdGhhdCBjYW4gYm90aCBjb250YWluIG90aGVyIG9iamVjdHMgYW5kXG4vLyBpdHNlbGYgYmUgY29udGFpbmVkLlxuLy9cbi8vIGBwYXJhbWAge0FycmF5fE9iamVjdH0gJ2FyZycuIE9wdGlvbmFsIGFycmF5IG9yIGhhc2hcbi8vIG9mIGNoaWxkIG9iamVjdHMgd2hpY2ggdGhlIENvbnRhaW5lciB3aWxsIGFkZCBhcyBjaGlsZCBvYmplY3RzXG4vLyB2aWEgYGFkZENoaWxkcmVuYFxuY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgQmFzZSB7XG4gIGNvbnN0cnVjdG9yKGFyZykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnJvbGUgPSAnY29udGFpbmVyJztcbiAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gICAgdGhpcy5jaGlsZE5hbWVzID0ge307XG5cbiAgICBpZihhcmcpIHRoaXMuYWRkQ2hpbGRyZW4oYXJnKTtcbiAgfVxuICAvLyAjIyNhZGRDaGlsZFxuICAvLyBBZGRzIGEgQ2xhc3MgaW5zdGFuY2UgdG8gdGhpcyBjb250YWluZXIncyBsaXN0IG9mIGNoaWxkcmVuLlxuICAvLyBBbHNvIGFkZHMgYW4gJ2luZGV4JyBwcm9wZXJ0eSBhbmQgYW4gZW50cnkgaW4gdGhlIGNoaWxkTmFtZXMgaGFzaC5cbiAgLy8gSWYgYGFkZGVkVG9QYXJlbnRgIGlzIGZvdW5kIG9uIHRoZSBjaGlsZCwgY2FsbCBpdCwgc2VuZGluZyBgdGhpc2AgYXMgYW4gYXJndW1lbnQuXG4gIC8vXG4gIC8vIGBwYXJhbWAge09iamVjdH0gYGNgLiBPdGhlciBDbGFzcyBpbnN0YW5jZS5cbiAgLy8gYHBhcmFtYCB7U3RyaW5nfSBgbmFtZWAuIEFuIG9wdGlvbmFsIG5hbWUgZm9yIHRoZSBjaGlsZCB0aGF0IHdpbGwgZ28gaW4gdGhlIGNoaWxkTmFtZXMgaGFzaC5cbiAgLy8gYHJldHVybnNgIHtPYmplY3R9IGB0aGlzYFxuICBhZGRDaGlsZChjLCBuYW1lKSB7XG4gICAgdmFyIGNoID0gdGhpcy5jaGlsZHJlbjtcbiAgICBjLnBhcmVudCA9IHRoaXM7XG4gICAgYy5pbmRleCA9IGNoLmxlbmd0aDtcbiAgICBpZihuYW1lKSB7XG4gICAgICBjLm5hbWUgPSBuYW1lO1xuICAgICAgdGhpcy5jaGlsZE5hbWVzW25hbWVdID0gYy5pbmRleDtcbiAgICB9XG4gICAgY2gucHVzaChjKTtcbiAgICBpZignYWRkZWRUb1BhcmVudCcgaW4gYykgYy5hZGRlZFRvUGFyZW50KHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8vICMjI2FkZENoaWxkcmVuXG4gIC8vIEFsbG93cyBmb3IgbXVsdGlwbGUgY2hpbGRyZW4gdG8gYmUgYWRkZWQgdG8gdGhpcyBDb250YWluZXIgYnkgcGFzc2luZ1xuICAvLyBlaXRoZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGxpdGVyYWwuXG4gIC8vXG4gIC8vIHNlZSBgYWRkQ2hpbGRgXG4gIC8vXG4gIC8vIGBwYXJhbWAge0FycmF5fE9iamVjdH0gYGFyZ2AuIEFuIGFycmF5IG9mIGNoaWxkcmVuIHRvIGFkZCBvciBhblxuICAvLyBPYmplY3QgbGl0ZXJhbCBpbiB0aGUgZm9ybSB7bmFtZTogY2hpbGR9XG4gIC8vIGByZXR1cm5zYCB7T2JqZWN0fSBgdGhpc2BcbiAgYWRkQ2hpbGRyZW4oYXJnKSB7XG4gICAgLy8gbm9ybWFsaXplIHRoZSBhcmdcbiAgICBsZXQgX2tleXMgPSBBcnJheS5pc0FycmF5KGFyZykgPyB1bmRlZmluZWQgOiBPYmplY3Qua2V5cyhhcmcpO1xuICAgIGxldCBhcnkgPSBfa2V5cyB8fCBhcmc7XG5cbiAgICBhcnkuZm9yRWFjaChjID0+IHsgX2tleXMgPyB0aGlzLmFkZENoaWxkKGFyZ1tjXSwgYykgOiB0aGlzLmFkZENoaWxkKGMpOyB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvLyAjIyNidWJibGVcbiAgLy8gQnkgZGVmYXVsdCwgYGJ1YmJsZWAgcmV0dXJucyB0aGUgY3VycmVudCB2aWV3J3MgcGFyZW50IChpZiBpdCBoYXMgb25lKVxuICAvL1xuICAvLyBgcmV0dXJuc2Age09iamVjdHx1bmRlZmluZWR9XG4gIGJ1YmJsZSgpIHsgcmV0dXJuIHRoaXMucGFyZW50OyB9XG4gIC8vICMjI2VhY2hDaGlsZFxuICAvLyBDYWxsIGEgbmFtZWQgbWV0aG9kIGFuZCBwYXNzIGFueSBhcmdzIHRvIGVhY2ggY2hpbGQgaW4gYSBjb250YWluZXInc1xuICAvLyBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuXG4gIC8vXG4gIC8vIGBwYXJhbWAgeyp9IEFueSBudW1iZXIgb2YgYXJndW1lbnRzIHRoZSBmaXJzdCBvZiB3aGljaCBtdXN0IGJlXG4gIC8vIFRoZSBuYW1lZCBtZXRob2QgdG8gbG9vayBmb3IgYW5kIGNhbGwuIE90aGVyIGFyZ3MgYXJlIHBhc3NlZCB0aHJvdWdoXG4gIC8vIGByZXR1cm5zYCB7b2JqZWN0fSBgdGhpc2BcbiAgZWFjaENoaWxkKC4uLmFyZ3MpIHtcbiAgICBsZXQgbWV0aCA9IGFyZ3Muc2hpZnQoKTtcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goYyA9PiB7IGlmKG1ldGggaW4gYykgY1ttZXRoXS5hcHBseShjLCBhcmdzKTsgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLy8gIyMjZ2V0Q2hpbGRcbiAgLy8gSWYgYSBjaGlsZCB3YXMgYWRkZWQgd2l0aCBhIG5hbWUsIHZpYSBgYWRkQ2hpbGRgLFxuICAvLyB0aGF0IG9iamVjdCBjYW4gYmUgZmV0Y2hlZCBieSBuYW1lLiBUaGlzIHByZXZlbnRzIHVzIGZyb20gaGF2aW5nIHRvIHJlZmVyZW5jZSBhXG4gIC8vIGNvbnRhaW5lcnMgY2hpbGRyZW4gYnkgaW5kZXguIFRoYXQgaXMgcG9zc2libGUgaG93ZXZlciwgdGhvdWdoIG5vdCBwcmVmZXJyZWQuXG4gIC8vXG4gIC8vIGBwYXJhbWAge1N0cmluZ3xOdW1iZXJ9IGBpZGAuIFRoZSBzdHJpbmcgYG5hbWVgIG9yIG51bWVyaWMgYGluZGV4YCBvZiB0aGUgY2hpbGQgdG8gZmV0Y2guXG4gIC8vIGByZXR1cm5zYCB7T2JqZWN0fHVuZGVmaW5lZH0gVGhlIGZvdW5kIGNoaWxkXG4gIGdldENoaWxkKGlkKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBpZCA9PT0gJ3N0cmluZycgPyB0aGlzLmNoaWxkcmVuW3RoaXMuY2hpbGROYW1lc1tpZF1dIDpcbiAgICAgIHRoaXMuY2hpbGRyZW5baWRdO1xuICB9XG4gIC8vICMjI19pbmRleENoaWxkcmVuX1xuICAvLyBNZXRob2QgaXMgY2FsbGVkIHdpdGggdGhlIGBpbmRleGAgcHJvcGVydHkgb2YgYSBzdWJ2aWV3IHRoYXQgaXMgYmVpbmcgcmVtb3ZlZC5cbiAgLy8gQmVnaW5uaW5nIGF0IGBpYCBkZWNyZW1lbnQgc3VidmlldyBpbmRpY2VzLlxuICAvLyBgcGFyYW1gIHtOdW1iZXJ9IGBpYFxuICAvLyBgcHJpdmF0ZWBcbiAgX2luZGV4Q2hpbGRyZW5fKGkpIHtcbiAgICBsZXQgYyA9IHRoaXMuY2hpbGRyZW47XG4gICAgbGV0IG9iaiA9IHRoaXMuY2hpbGROYW1lcztcbiAgICBsZXQgbGVuO1xuICAgIGZvciAobGVuID0gYy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY1tpXS5pbmRleC0tO1xuICAgICAgLy8gYWRqdXN0IGFueSBlbnRyaWVzIGluIGNoaWxkTmFtZXNcbiAgICAgIGlmKGNbaV0ubmFtZSBpbiBvYmopIG9ialtjW2ldLm5hbWVdID0gY1tpXS5pbmRleDtcbiAgICB9XG4gIH1cbiAgLy8gIyMjcmVtb3ZlQ2hpbGRcbiAgLy8gRmluZCB0aGUgaW50ZW5kZWQgY2hpbGQgZnJvbSBteSBsaXN0IG9mIGNoaWxkcmVuIGFuZCByZW1vdmUgaXQsIHJlbW92aW5nIHRoZSBuYW1lIHJlZmVyZW5jZSBhbmQgcmUtaW5kZXhpbmdcbiAgLy8gcmVtYWluaW5nIGNoaWxkcmVuLiBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZW1vdmUgdGhlIGNoaWxkJ3MgRE9NLlxuICAvLyBPdmVycmlkZSB0aGlzIG1ldGhvZCwgZG9pbmcgd2hhdGV2ZXIgeW91IHdhbnQgdG8gdGhlIGNoaWxkJ3MgRE9NLCB0aGVuIGNhbGwgYGJhc2UoJ3JlbW92ZUNoaWxkJylgIHRvIGRvIHNvLlxuICAvL1xuICAvLyBJZiB0aGUgY2hpbGQgYmVpbmcgcmVtb3ZlZCBoYXMgYSBgcmVtb3ZlZEZyb21QYXJlbnRgIG1ldGhvZCBpdCB3aWxsIGJlIGNhbGxlZCBhZnRlciB0aGUgcGFyZW50aCBoYXNcbiAgLy8gZmluaXNoZWQsIHBhc3NpbmcgaXRzZWxmKHRoZSBwYXJlbnQpIGFzIGFuIGFyZ3VtZW50LlxuICAvL1xuICAvLyBgcGFyYW1gIHtTdHJpbmd8TnVtYmVyfE9iamVjdH0gYGFyZ2AuIENoaWxkcmVuIHdpbGwgYWx3YXlzIGhhdmUgYW4gYGluZGV4YCBudW1iZXIsIGFuZCBvcHRpb25hbGx5IGEgYG5hbWVgLlxuICAvLyBJZiBwYXNzZWQgYSBzdHJpbmcgYG5hbWVgIGlzIGFzc3VtZWQsIHNvIGJlIHN1cmUgdG8gcGFzcyBhbiBhY3R1YWwgbnVtYmVyIGlmIGV4cGVjdGluZyB0byB1c2UgaW5kZXguXG4gIC8vIEFuIG9iamVjdCB3aWxsIGJlIGFzc3VtZWQgdG8gYmUgYW4gYWN0dWFsIHN1ZG8gQ2xhc3MgT2JqZWN0LlxuICAvLyBgcmV0dXJuc2Age09iamVjdH0gYHRoaXNgXG4gIHJlbW92ZUNoaWxkKGFyZykge1xuICAgIGxldCBpO1xuICAgIGxldCB0ID0gdHlwZW9mIGFyZztcbiAgICBsZXQgYztcbiAgICAvLyBub3JtYWxpemUgdGhlIGlucHV0XG4gICAgaWYodCA9PT0gJ29iamVjdCcpIGMgPSBhcmc7XG4gICAgZWxzZSBjID0gdCA9PT0gJ3N0cmluZycgPyB0aGlzLmNoaWxkcmVuW3RoaXMuY2hpbGROYW1lc1thcmddXSA6IHRoaXMuY2hpbGRyZW5bYXJnXTtcbiAgICAvLyBpZiBubyBjaGlsZCBleGlzdHMgYmFzZWQgb24gdGhlIGFyZ3VtZW50LCBkb24ndCB0cnkgdG8gcmVtb3ZlIGl0XG4gICAgaWYoIWMpIHJldHVybiB0aGlzO1xuICAgIGkgPSBjLmluZGV4O1xuICAgIC8vIHJlbW92ZSBmcm9tIHRoZSBjaGlsZHJlbiBBcnJheVxuICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGksIDEpO1xuICAgIC8vIHJlbW92ZSBmcm9tIHRoZSBuYW1lZCBjaGlsZCBoYXNoIGlmIHByZXNlbnRcbiAgICBkZWxldGUgdGhpcy5jaGlsZE5hbWVzW2MubmFtZV07XG4gICAgLy8gY2hpbGQgaXMgbm93IGFuIGBvcnBoYW5gXG4gICAgZGVsZXRlIGMucGFyZW50O1xuICAgIGRlbGV0ZSBjLmluZGV4O1xuICAgIGRlbGV0ZSBjLm5hbWU7XG4gICAgdGhpcy5faW5kZXhDaGlsZHJlbl8oaSk7XG4gICAgaWYoJ3JlbW92ZWRGcm9tUGFyZW50JyBpbiBjKSBjLnJlbW92ZWRGcm9tUGFyZW50KHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8vICMjI3JlbW92ZUNoaWxkcmVuXG4gIC8vIFJlbW92ZSBhbGwgY2hpbGRyZW4uXG4gIC8vXG4gIC8vIHNlZSBgcmVtb3ZlQ2hpbGRgXG4gIC8vIGByZXR1cm5zYCB7b2JqZWN0fSBgdGhpc2BcbiAgcmVtb3ZlQ2hpbGRyZW4oKSB7XG4gICAgbGV0IG4gPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcbiAgICB3aGlsZShuID4gMCkge1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmNoaWxkcmVuW24gLSAxXSk7XG4gICAgICBuLS07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gIyMjc2VuZFxuICAvLyBUaGUgY2FsbCB0byB0aGUgc3BlY2lmaWMgbWV0aG9kIG9uIGEgKHVuKXNwZWNpZmllZCB0YXJnZXQgaGFwcGVucyBoZXJlLlxuICAvLyBJZiB0aGlzIE9iamVjdCBpcyBwYXJ0IG9mIGEgYHN1ZG8uQ29udGFpbmVyYCBtYWludGFpbmVkIGhpZXJhcmNoeVxuICAvLyB0aGUgJ3RhcmdldCcgbWF5IGJlIGxlZnQgb3V0LCBjYXVzaW5nIHRoZSBgYnViYmxlKClgIG1ldGhvZCB0byBiZSBjYWxsZWQuXG4gIC8vIFdoYXQgdGhpcyBkb2VzIGlzIGFsbG93IGNoaWxkcmVuIG9mIGEgYHN1ZG8uQ29udGFpbmVyYCB0byBzaW1wbHkgcGFzc1xuICAvLyBldmVudHMgIHVwd2FyZCwgZGVsZWdhdGluZyB0aGUgcmVzcG9uc2liaWxpdHkgb2YgZGVjaWRpbmcgd2hhdCB0byBkbyB0byB0aGUgcGFyZW50LlxuICAvL1xuICAvLyBOT1RFIE9ubHkgdGhlIGZpcnN0IHRhcmdldCBtZXRob2QgZm91bmQgaXMgY2FsbGVkLCBidWJibGluZyBzdG9wcyB0aGVyZS5cbiAgLy8gSWYgeW91IHdpc2ggaXQgdG8gY29udGludWUgY2FsbCBgc2VuZGAgYWdhaW4uLi5cbiAgLy9cbiAgLy8gYHBhcmFtYCB7Kn0gQW55IG51bWJlciBvZiBhcmd1bWVudHMgaXMgc3VwcG9ydGVkLCBidXQgdGhlIGZpcnN0IGlzIHRoZSBvbmx5IG9uZSBzZWFyY2hlZCBmb3IgaW5mby5cbiAgLy8gQSBzZW5kTWV0aG9kIHdpbGwgYmUgbG9jYXRlZCBieTpcbiAgLy8gICAxLiB1c2luZyB0aGUgZmlyc3QgYXJndW1lbnQgaWYgaXQgaXMgYSBzdHJpbmdcbiAgLy8gICAyLiBsb29raW5nIGZvciBhIGBzZW5kTWV0aG9kYCBwcm9wZXJ0eSBpZiBpdCBpcyBhbiBvYmplY3RcbiAgLy8gQW55IGFyZ3Mgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHNlbmRNZXRob2RcbiAgLy8gYHJldHVybnNgIHtPYmplY3R9IGB0aGlzYFxuICBzZW5kKC4uLmFyZ3MpIHtcbiAgICBsZXQgZCA9IHRoaXMuZGF0YTtcbiAgICBsZXQgbWV0aDtcbiAgICBsZXQgdGFyZztcbiAgICBsZXQgZm47XG4gICAgLy8gLnNlbmRNZXRob2QgdXNlZnVsIGZvciBkaXJlY3QgZXZlbnQgYmluZGluZyB0byBhIHNlbmRcbiAgICBpZihkICYmICdzZW5kTWV0aG9kJyBpbiBkKSBtZXRoID0gZC5zZW5kTWV0aG9kO1xuICAgIC8vIHRoaXMuc2VuZCgnZm9vJywgLi4uYXJncylcbiAgICBlbHNlIGlmKHR5cGVvZiBhcmdzWzBdID09PSAnc3RyaW5nJykgbWV0aCA9IGFyZ3Muc2hpZnQoKTtcbiAgICAvLyBpZiB0aGVyZSB3YXMgbm8gc2VuZCB0YXJnZXQgc3BlY2lmaWVkIGJhaWwgb3V0XG4gICAgaWYgKCFtZXRoKSByZXR1cm47XG4gICAgLy8gdGFyZ2V0IGlzIGVpdGhlciBzcGVjaWZpZWQgb3IgbXkgcGFyZW50XG4gICAgdGFyZyA9IGQgJiYgZC5zZW5kVGFyZ2V0IHx8IHRoaXMuYnViYmxlKCk7XG4gICAgLy8gb2J2aW91cyBjaGFuY2UgZm9yIGVycm9ycyBoZXJlLCBkb24ndCBiZSBkdW1iXG4gICAgZm4gPSB0YXJnW21ldGhdO1xuICAgIHdoaWxlKCFmbiAmJiAodGFyZyA9IHRhcmcuYnViYmxlKCkpKSBmbiA9IHRhcmdbbWV0aF07XG4gICAgaWYoZm4pIGZuLmFwcGx5KHRhcmcsIGFyZ3MpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGFpbmVyO1xuIiwidmFyIFZpZXcgPSByZXF1aXJlKCcuLi8uLi92aWV3L3ZpZXcnKTtcblxuY2xhc3MgQnV0dG9ucyBleHRlbmRzIFZpZXcge1xuICBhZGRlZFRvUGFyZW50KHBhcmVudCkge1xuICAgIHN1cGVyLmFkZGVkVG9QYXJlbnQocGFyZW50KTtcblxuICAgIC8vIGxpc3RlbiBhdCB0aGUgY29udGFpbmVyIGxldmVsIGFzIGEgZGVsZWdhdGVcbiAgICB0aGlzLmhvc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcykpO1xuICB9XG5cbiAgaGFuZGxlQ2xpY2soZSkge1xuICAgIGlmIChlLnRhcmdldC5uYW1lKSB7XG4gICAgICB0aGlzLnNlbmQoJ2J1dHRvblByZXNzZWQnLCBlLnRhcmdldC5uYW1lKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25zO1xuIiwidmFyIERpc3BhdGNoZXIgPSByZXF1aXJlKCdmbHV4JykuRGlzcGF0Y2hlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRGlzcGF0Y2hlcjtcbiIsInZhciBWaWV3ID0gcmVxdWlyZSgnLi4vLi4vdmlldy92aWV3Jyk7XG5cbmNsYXNzIE1haW4gZXh0ZW5kcyBWaWV3IHtcbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHN1cGVyKGRhdGEpO1xuXG4gICAgdGhpcy5DTElDS1RFWFQgPSAnQ2xpY2tlZCEnO1xuICAgIHRoaXMuTk9UQ0xJQ0tFRCA9ICdhd3cuLi4nO1xuICB9XG4gIC8vIG1hcCB0aGUgcmVjaWV2ZWQgZGlzcGF0Y2ggZGF0YSB0byB3aGF0IG15IHJlbmRlciBjYW4gdXNlXG4gIHVwZGF0ZShkYXRhKSB7XG4gICAgLy8gY2xhc3MgJ3RhcmdldHMnIGRlcGVuZCBvbiB3aGljaCBldmVudCBoYXBwZW5lZFxuICAgIGxldCBpc09uZSA9IGRhdGEuZXZlbnQgPT09ICdldmVudC1vbmUnO1xuXG4gICAgbGV0IHN0YXRlID0ge1xuICAgICAgJy5vbmUtbm90aWZpY2F0aW9uJzogaXNPbmUgPyB0aGlzLkNMSUNLVEVYVCA6IHRoaXMuTk9UQ0xJQ0tFRCxcbiAgICAgICcudHdvLW5vdGlmaWNhdGlvbic6IGlzT25lID8gdGhpcy5OT1RDTElDS0VEIDogdGhpcy5DTElDS1RFWFRcbiAgICB9O1xuXG4gICAgbGV0IGNvdW50ID0gaXNPbmUgPyAnLm9uZS1jb3VudCc6ICcudHdvLWNvdW50JztcbiAgICBzdGF0ZVtjb3VudF0gPSBkYXRhLmNvdW50O1xuXG4gICAgdGhpcy5tZXJnZVN0YXRlKHN0YXRlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1haW47XG4iLCJ2YXIgQ29udGFpbmVyID0gcmVxdWlyZSgnLi4vLi4vY29udGFpbmVyL2NvbnRhaW5lcicpO1xuXG52YXIgZGlzcGF0Y2hlciA9IHJlcXVpcmUoJy4vYnV0dG9ucy1kaXNwYXRjaGVyJyk7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuL2J1dHRvbnMtc3RvcmUnKTtcbnZhciBCdXR0b25zID0gcmVxdWlyZSgnLi9idXR0b25zLWNvbXBvbmVudCcpO1xudmFyIE1haW4gPSByZXF1aXJlKCcuL2J1dHRvbnMtbWFpbicpO1xuXG5jbGFzcyBSb290IGV4dGVuZHMgQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICAvLyB3ZSBjYW4gbGlzdGVuIGZvciBzdG9yZSBjaGFuZ2VzIGhlcmVcbiAgICBzdG9yZS5vbignY2hhbmdlJywgdGhpcy5oYW5kbGVFbWl0LmJpbmQodGhpcykpO1xuICAgIC8vIGkgYW0gdGhlIHJvb3Qgbm9kZSwgc28gYWRkIHNvbWUgY2hpbGRyZW5cbiAgICB0aGlzLnNldHVwQ2hpbGRyZW4oKTtcbiAgfVxuICAvLyBzZW5kIHRhcmdldCBmb3IgYnV0dG9uIGNvbXBvbmVudFxuICBidXR0b25QcmVzc2VkKG5hbWUpIHtcbiAgICAvLyB3aGljaCBidXR0b24gd2FzIHByZXNzZWQgP1xuICAgIGRpc3BhdGNoZXIuZGlzcGF0Y2goeyB0eXBlOiAnYnV0dG9uUHJlc3MnLCBpZGVudGlmaWVyOiBuYW1lIH0pO1xuICB9XG5cbiAgaGFuZGxlRW1pdCgpIHtcbiAgICBsZXQgZGF0YSA9IHN0b3JlLmdldEN1cnJlbnRFdmVudCgpO1xuICAgIC8vIGknbGwgZGlyZWN0IHRoZSBwYXlsb2FkIHRvIHRoZSBjb3JyZWN0IGNoaWxkLCBjb3VsZFxuICAgIC8vIGJlIG5haXZlIGhlcmUgYW5kIGxldCB0aGUgY2hpbGQgZGVjaWRlIGJ5IGp1c3QgYmxpbmRseSBjYWxsaW5nIHVwZGF0ZVxuICAgIC8vIG9uIGVhY2ggY2hpbGQsIGVpdGhlciBpcyBmaW5lIGltby4uLlxuICAgIHRoaXMuZ2V0Q2hpbGQoJ21haW4nKS51cGRhdGUoZGF0YSk7XG4gIH1cblxuICBzZXR1cENoaWxkcmVuKCkge1xuICAgIC8vIHBhc3NlZCBgZWxgIGFzIGl0J3MgYSAgbm9uLXRlbXBsYXRlZCB2aWV3IGNvbXBvbmVudFxuICAgIHRoaXMuYWRkQ2hpbGQobmV3IEJ1dHRvbnMoe2VsOiAnI2J1dHRvbi1jb250ZW50J30pLCAnYnV0dG9ucycpXG5cbiAgICAuYWRkQ2hpbGQobmV3IE1haW4oe1xuICAgICAgc2hhZG93SG9zdDogJyNtYWluLWNvbnRlbnQnLFxuICAgICAgdGVtcGxhdGU6ICcjbWFpbicsXG4gICAgICBpbXBvcnQ6ICcjbWFpbi1jb250ZW50LXRlbXBsYXRlJ1xuICAgIH0pLCAnbWFpbicpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFJvb3Q7XG4iLCJ2YXIgU3RvcmUgPSByZXF1aXJlKCcuLi8uLi9zdG9yZS9zdG9yZScpO1xudmFyIGRpc3BhdGNoZXIgPSByZXF1aXJlKCcuL2J1dHRvbnMtZGlzcGF0Y2hlcicpO1xuXG5jbGFzcyBUZXN0U3RvcmUgZXh0ZW5kcyBTdG9yZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZWdpc3RlcihkaXNwYXRjaGVyKTtcblxuICAgIHRoaXMuc2V0cyh7b25lSGFwcGVuZWQ6IDAsIHR3b0hhcHBlbmVkOiAwfSk7XG4gIH1cblxuICBoYW5kbGVEaXNwYXRjaChwYXlsb2FkKSB7XG4gICAgaWYgKHBheWxvYWQudHlwZSA9PT0gJ2J1dHRvblByZXNzJykge1xuICAgICAgLy8gaWYgdGhlcmUgd2VyZSBtb3JlIHRoYW4gMiB3ZSdkIHN3aXRjaC4uLlxuICAgICAgaWYgKHBheWxvYWQuaWRlbnRpZmllciA9PT0gJ2V2ZW50LW9uZScpIHRoaXMuZGF0YS5vbmVIYXBwZW5lZCArPSAxO1xuICAgICAgZWxzZSB0aGlzLmRhdGEudHdvSGFwcGVuZWQgKz0gMTtcblxuICAgICAgdGhpcy5kYXRhLmN1cnJlbnRFdmVudCA9IHBheWxvYWQuaWRlbnRpZmllcjtcbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q3VycmVudEV2ZW50KCkge1xuICAgIGxldCBldmVudCA9IHRoaXMuZGF0YS5jdXJyZW50RXZlbnQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgY291bnQ6IGV2ZW50ID09PSAnZXZlbnQtb25lJyA/IHRoaXMuZGF0YS5vbmVIYXBwZW5lZCA6XG4gICAgICAgIHRoaXMuZGF0YS50d29IYXBwZW5lZFxuICAgIH07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgVGVzdFN0b3JlO1xuIiwiLy8gcm9vdCBzZXRzIHVwIGNoaWxkcmVuIGFuZCBsaXN0ZW5zIGZvciBzdG9yZSBjaGFuZ2VzLi4uXG52YXIgcm9vdCA9IHJlcXVpcmUoJy4vYnV0dG9ucy1yb290Jyk7XG4iLCIvLyAjI0RlbGVnYXRlcyBtaXhpblxuLy8gVXNlZCBieSB0aGUgdHdvIGJhc2UgY2xhc3NlcywgQmFzZSBhbmQgRW1pdHRlclxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vICMjI2FkZERlbGVnYXRlXG4gIC8vIFB1c2ggYW4gaW5zdGFuY2Ugb2YgYSBDbGFzcyBPYmplY3QgaW50byB0aGlzIG9iamVjdCdzIGBfZGVsZWdhdGVzX2AgbGlzdC5cbiAgLy9cbiAgLy8gYHBhcmFtYCB7T2JqZWN0fSBgZGVsYC4gQW4gaW5zdGFuY2Ugb2YgYSBzdWRvLmRlbGVnYXRlcyBDbGFzcyBPYmplY3RcbiAgLy8gYHJldHVybnNgIHtPYmplY3R9IGB0aGlzYFxuICBhZGREZWxlZ2F0ZTogZnVuY3Rpb24oZGVsKSB7XG4gICAgZGVsLmRlbGVnYXRvciA9IHRoaXM7XG4gICAgdGhpcy5kZWxlZ2F0ZXMucHVzaChkZWwpO1xuICAgIGlmKCdhZGRlZEFzRGVsZWdhdGUnIGluIGRlbCkgZGVsLmFkZGVkQXNEZWxlZ2F0ZSh0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgLy8gIyMjZGVsZWdhdGVcbiAgLy8gRnJvbSB0aGlzIG9iamVjdCdzIGxpc3Qgb2YgZGVsZWdhdGVzIGZpbmQgdGhlIG9iamVjdCB3aG9zZSBgX3JvbGVfYCBtYXRjaGVzXG4gIC8vIHRoZSBwYXNzZWQgYG5hbWVgIGFuZDpcbiAgLy8gMS4gaWYgYG1ldGhgIGlzIGZhbHN5IHJldHVybiB0aGUgZGVsZWdhdGUuXG4gIC8vIDIgaWYgYG1ldGhgIGlzIHRydXRoeSBiaW5kIGl0cyBtZXRob2QgKHRvIHRoZSBkZWxlZ2F0ZSkgYW5kIHJldHVybiB0aGUgbWV0aG9kXG4gIC8vXG4gIC8vIGBwYXJhbWAge1N0cmluZ30gYHJvbGVgIFRoZSByb2xlIHByb3BlcnR5IHRvIG1hdGNoIGluIHRoaXMgb2JqZWN0J3MgZGVsZWdhdGVzIGxpc3RcbiAgLy8gYHBhcmFtYCB7U3RyaW5nfSBgbWV0aGAgT3B0aW9uYWwgbWV0aG9kIHRvIGJpbmQgdG8gdGhlIGFjdGlvbiB0aGlzIGRlbGVnYXRlIGlzIGJlaW5nIHVzZWQgZm9yXG4gIC8vIGByZXR1cm5zYFxuICBkZWxlZ2F0ZTogZnVuY3Rpb24ocm9sZSwgbWV0aCkge1xuICAgIGxldCBkZWwgPSB0aGlzLmRlbGVnYXRlcywgaTtcbiAgICBmb3IoaSA9IDA7IGkgPCBkZWwubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKGRlbFtpXS5yb2xlID09PSByb2xlKSB7XG4gICAgICAgIGlmKCFtZXRoKSByZXR1cm4gZGVsW2ldO1xuICAgICAgICByZXR1cm4gZGVsW2ldW21ldGhdLmJpbmQoZGVsW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIC8vICMjI2dldERlbGVnYXRlXG4gIC8vIEZldGNoIGEgZGVsZWdhdGUgd2hvc2Ugcm9sZSBwcm9wZXJ0eSBtYXRjaGVzIHRoZSBwYXNzZWQgaW4gYXJndW1lbnQuXG4gIC8vIFVzZXMgdGhlIGBkZWxlZ2F0ZWAgbWV0aG9kIGluIGl0cyAnc2luZ2xlIGFyZ3VtZW50JyBmb3JtLCBpbmNsdWRlZCBmb3JcbiAgLy8gQVBJIGNvbnNpc3RlbmN5XG4gIC8vXG4gIC8vIGBwYXJhbWAge1N0cmluZ30gYHJvbGVgXG4gIC8vICdyZXR1cm5zJyB7T2JqZWN0fHVuZGVmaW5lZH1cbiAgZ2V0RGVsZWdhdGU6IGZ1bmN0aW9uKHJvbGUpIHsgcmV0dXJuIHRoaXMuZGVsZWdhdGUocm9sZSk7IH0sXG4gIC8vICMjI3JlbW92ZURlbGVnYXRlXG4gIC8vIEZyb20gdGhpcyBvYmplY3RzIGBkZWxlZ2F0ZXNgIGxpc3QgcmVtb3ZlIHRoZSBvYmplY3QgKHRoZXJlIHNob3VsZCBvbmx5IGV2ZXIgYmUgMSlcbiAgLy8gd2hvc2Ugcm9sZSBtYXRjaGVzIHRoZSBwYXNzZWQgaW4gYXJndW1lbnRcbiAgLy9cbiAgLy8gYHBhcmFtYCB7U3RyaW5nfSBgcm9sZWBcbiAgLy8gYHJldHVybnNgIHtPYmplY3R9IGB0aGlzYFxuICByZW1vdmVEZWxlZ2F0ZTogZnVuY3Rpb24ocm9sZSkge1xuICAgIGxldCBkZWwgPSB0aGlzLmRlbGVnYXRlcywgaTtcbiAgICBmb3IoaSA9IDA7IGkgPCBkZWwubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKGRlbFtpXS5yb2xlID09PSByb2xlKSB7XG4gICAgICAgIC8vIG5vIF9kZWxlZ2F0b3JfIGZvciB5b3VcbiAgICAgICAgZGVsW2ldLmRlbGVnYXRvciA9IHVuZGVmaW5lZDtcbiAgICAgICAgZGVsLnNwbGljZShpLCAxKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH1cbiAgICAgIHRocm93IFR5cGVFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4nKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgYXJncyA9IG5ldyBBcnJheShsZW4gLSAxKTtcbiAgICAgICAgZm9yIChpID0gMTsgaSA8IGxlbjsgaSsrKVxuICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gLSAxKTtcbiAgICBmb3IgKGkgPSAxOyBpIDwgbGVuOyBpKyspXG4gICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIHZhciBtO1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghZW1pdHRlci5fZXZlbnRzIHx8ICFlbWl0dGVyLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gMDtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbihlbWl0dGVyLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IDE7XG4gIGVsc2VcbiAgICByZXQgPSBlbWl0dGVyLl9ldmVudHNbdHlwZV0ubGVuZ3RoO1xuICByZXR1cm4gcmV0O1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbm1vZHVsZS5leHBvcnRzLkRpc3BhdGNoZXIgPSByZXF1aXJlKCcuL2xpYi9EaXNwYXRjaGVyJylcbiIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgRGlzcGF0Y2hlclxuICogQHR5cGVjaGVja3NcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJy4vaW52YXJpYW50Jyk7XG5cbnZhciBfbGFzdElEID0gMTtcbnZhciBfcHJlZml4ID0gJ0lEXyc7XG5cbi8qKlxuICogRGlzcGF0Y2hlciBpcyB1c2VkIHRvIGJyb2FkY2FzdCBwYXlsb2FkcyB0byByZWdpc3RlcmVkIGNhbGxiYWNrcy4gVGhpcyBpc1xuICogZGlmZmVyZW50IGZyb20gZ2VuZXJpYyBwdWItc3ViIHN5c3RlbXMgaW4gdHdvIHdheXM6XG4gKlxuICogICAxKSBDYWxsYmFja3MgYXJlIG5vdCBzdWJzY3JpYmVkIHRvIHBhcnRpY3VsYXIgZXZlbnRzLiBFdmVyeSBwYXlsb2FkIGlzXG4gKiAgICAgIGRpc3BhdGNoZWQgdG8gZXZlcnkgcmVnaXN0ZXJlZCBjYWxsYmFjay5cbiAqICAgMikgQ2FsbGJhY2tzIGNhbiBiZSBkZWZlcnJlZCBpbiB3aG9sZSBvciBwYXJ0IHVudGlsIG90aGVyIGNhbGxiYWNrcyBoYXZlXG4gKiAgICAgIGJlZW4gZXhlY3V0ZWQuXG4gKlxuICogRm9yIGV4YW1wbGUsIGNvbnNpZGVyIHRoaXMgaHlwb3RoZXRpY2FsIGZsaWdodCBkZXN0aW5hdGlvbiBmb3JtLCB3aGljaFxuICogc2VsZWN0cyBhIGRlZmF1bHQgY2l0eSB3aGVuIGEgY291bnRyeSBpcyBzZWxlY3RlZDpcbiAqXG4gKiAgIHZhciBmbGlnaHREaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXIoKTtcbiAqXG4gKiAgIC8vIEtlZXBzIHRyYWNrIG9mIHdoaWNoIGNvdW50cnkgaXMgc2VsZWN0ZWRcbiAqICAgdmFyIENvdW50cnlTdG9yZSA9IHtjb3VudHJ5OiBudWxsfTtcbiAqXG4gKiAgIC8vIEtlZXBzIHRyYWNrIG9mIHdoaWNoIGNpdHkgaXMgc2VsZWN0ZWRcbiAqICAgdmFyIENpdHlTdG9yZSA9IHtjaXR5OiBudWxsfTtcbiAqXG4gKiAgIC8vIEtlZXBzIHRyYWNrIG9mIHRoZSBiYXNlIGZsaWdodCBwcmljZSBvZiB0aGUgc2VsZWN0ZWQgY2l0eVxuICogICB2YXIgRmxpZ2h0UHJpY2VTdG9yZSA9IHtwcmljZTogbnVsbH1cbiAqXG4gKiBXaGVuIGEgdXNlciBjaGFuZ2VzIHRoZSBzZWxlY3RlZCBjaXR5LCB3ZSBkaXNwYXRjaCB0aGUgcGF5bG9hZDpcbiAqXG4gKiAgIGZsaWdodERpc3BhdGNoZXIuZGlzcGF0Y2goe1xuICogICAgIGFjdGlvblR5cGU6ICdjaXR5LXVwZGF0ZScsXG4gKiAgICAgc2VsZWN0ZWRDaXR5OiAncGFyaXMnXG4gKiAgIH0pO1xuICpcbiAqIFRoaXMgcGF5bG9hZCBpcyBkaWdlc3RlZCBieSBgQ2l0eVN0b3JlYDpcbiAqXG4gKiAgIGZsaWdodERpc3BhdGNoZXIucmVnaXN0ZXIoZnVuY3Rpb24ocGF5bG9hZCkge1xuICogICAgIGlmIChwYXlsb2FkLmFjdGlvblR5cGUgPT09ICdjaXR5LXVwZGF0ZScpIHtcbiAqICAgICAgIENpdHlTdG9yZS5jaXR5ID0gcGF5bG9hZC5zZWxlY3RlZENpdHk7XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBXaGVuIHRoZSB1c2VyIHNlbGVjdHMgYSBjb3VudHJ5LCB3ZSBkaXNwYXRjaCB0aGUgcGF5bG9hZDpcbiAqXG4gKiAgIGZsaWdodERpc3BhdGNoZXIuZGlzcGF0Y2goe1xuICogICAgIGFjdGlvblR5cGU6ICdjb3VudHJ5LXVwZGF0ZScsXG4gKiAgICAgc2VsZWN0ZWRDb3VudHJ5OiAnYXVzdHJhbGlhJ1xuICogICB9KTtcbiAqXG4gKiBUaGlzIHBheWxvYWQgaXMgZGlnZXN0ZWQgYnkgYm90aCBzdG9yZXM6XG4gKlxuICogICAgQ291bnRyeVN0b3JlLmRpc3BhdGNoVG9rZW4gPSBmbGlnaHREaXNwYXRjaGVyLnJlZ2lzdGVyKGZ1bmN0aW9uKHBheWxvYWQpIHtcbiAqICAgICBpZiAocGF5bG9hZC5hY3Rpb25UeXBlID09PSAnY291bnRyeS11cGRhdGUnKSB7XG4gKiAgICAgICBDb3VudHJ5U3RvcmUuY291bnRyeSA9IHBheWxvYWQuc2VsZWN0ZWRDb3VudHJ5O1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogV2hlbiB0aGUgY2FsbGJhY2sgdG8gdXBkYXRlIGBDb3VudHJ5U3RvcmVgIGlzIHJlZ2lzdGVyZWQsIHdlIHNhdmUgYSByZWZlcmVuY2VcbiAqIHRvIHRoZSByZXR1cm5lZCB0b2tlbi4gVXNpbmcgdGhpcyB0b2tlbiB3aXRoIGB3YWl0Rm9yKClgLCB3ZSBjYW4gZ3VhcmFudGVlXG4gKiB0aGF0IGBDb3VudHJ5U3RvcmVgIGlzIHVwZGF0ZWQgYmVmb3JlIHRoZSBjYWxsYmFjayB0aGF0IHVwZGF0ZXMgYENpdHlTdG9yZWBcbiAqIG5lZWRzIHRvIHF1ZXJ5IGl0cyBkYXRhLlxuICpcbiAqICAgQ2l0eVN0b3JlLmRpc3BhdGNoVG9rZW4gPSBmbGlnaHREaXNwYXRjaGVyLnJlZ2lzdGVyKGZ1bmN0aW9uKHBheWxvYWQpIHtcbiAqICAgICBpZiAocGF5bG9hZC5hY3Rpb25UeXBlID09PSAnY291bnRyeS11cGRhdGUnKSB7XG4gKiAgICAgICAvLyBgQ291bnRyeVN0b3JlLmNvdW50cnlgIG1heSBub3QgYmUgdXBkYXRlZC5cbiAqICAgICAgIGZsaWdodERpc3BhdGNoZXIud2FpdEZvcihbQ291bnRyeVN0b3JlLmRpc3BhdGNoVG9rZW5dKTtcbiAqICAgICAgIC8vIGBDb3VudHJ5U3RvcmUuY291bnRyeWAgaXMgbm93IGd1YXJhbnRlZWQgdG8gYmUgdXBkYXRlZC5cbiAqXG4gKiAgICAgICAvLyBTZWxlY3QgdGhlIGRlZmF1bHQgY2l0eSBmb3IgdGhlIG5ldyBjb3VudHJ5XG4gKiAgICAgICBDaXR5U3RvcmUuY2l0eSA9IGdldERlZmF1bHRDaXR5Rm9yQ291bnRyeShDb3VudHJ5U3RvcmUuY291bnRyeSk7XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBUaGUgdXNhZ2Ugb2YgYHdhaXRGb3IoKWAgY2FuIGJlIGNoYWluZWQsIGZvciBleGFtcGxlOlxuICpcbiAqICAgRmxpZ2h0UHJpY2VTdG9yZS5kaXNwYXRjaFRva2VuID1cbiAqICAgICBmbGlnaHREaXNwYXRjaGVyLnJlZ2lzdGVyKGZ1bmN0aW9uKHBheWxvYWQpIHtcbiAqICAgICAgIHN3aXRjaCAocGF5bG9hZC5hY3Rpb25UeXBlKSB7XG4gKiAgICAgICAgIGNhc2UgJ2NvdW50cnktdXBkYXRlJzpcbiAqICAgICAgICAgICBmbGlnaHREaXNwYXRjaGVyLndhaXRGb3IoW0NpdHlTdG9yZS5kaXNwYXRjaFRva2VuXSk7XG4gKiAgICAgICAgICAgRmxpZ2h0UHJpY2VTdG9yZS5wcmljZSA9XG4gKiAgICAgICAgICAgICBnZXRGbGlnaHRQcmljZVN0b3JlKENvdW50cnlTdG9yZS5jb3VudHJ5LCBDaXR5U3RvcmUuY2l0eSk7XG4gKiAgICAgICAgICAgYnJlYWs7XG4gKlxuICogICAgICAgICBjYXNlICdjaXR5LXVwZGF0ZSc6XG4gKiAgICAgICAgICAgRmxpZ2h0UHJpY2VTdG9yZS5wcmljZSA9XG4gKiAgICAgICAgICAgICBGbGlnaHRQcmljZVN0b3JlKENvdW50cnlTdG9yZS5jb3VudHJ5LCBDaXR5U3RvcmUuY2l0eSk7XG4gKiAgICAgICAgICAgYnJlYWs7XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBUaGUgYGNvdW50cnktdXBkYXRlYCBwYXlsb2FkIHdpbGwgYmUgZ3VhcmFudGVlZCB0byBpbnZva2UgdGhlIHN0b3JlcydcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzIGluIG9yZGVyOiBgQ291bnRyeVN0b3JlYCwgYENpdHlTdG9yZWAsIHRoZW5cbiAqIGBGbGlnaHRQcmljZVN0b3JlYC5cbiAqL1xuXG4gIGZ1bmN0aW9uIERpc3BhdGNoZXIoKSB7XG4gICAgdGhpcy4kRGlzcGF0Y2hlcl9jYWxsYmFja3MgPSB7fTtcbiAgICB0aGlzLiREaXNwYXRjaGVyX2lzUGVuZGluZyA9IHt9O1xuICAgIHRoaXMuJERpc3BhdGNoZXJfaXNIYW5kbGVkID0ge307XG4gICAgdGhpcy4kRGlzcGF0Y2hlcl9pc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG4gICAgdGhpcy4kRGlzcGF0Y2hlcl9wZW5kaW5nUGF5bG9hZCA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCB3aXRoIGV2ZXJ5IGRpc3BhdGNoZWQgcGF5bG9hZC4gUmV0dXJuc1xuICAgKiBhIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgd2l0aCBgd2FpdEZvcigpYC5cbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgRGlzcGF0Y2hlci5wcm90b3R5cGUucmVnaXN0ZXI9ZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICB2YXIgaWQgPSBfcHJlZml4ICsgX2xhc3RJRCsrO1xuICAgIHRoaXMuJERpc3BhdGNoZXJfY2FsbGJhY2tzW2lkXSA9IGNhbGxiYWNrO1xuICAgIHJldHVybiBpZDtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNhbGxiYWNrIGJhc2VkIG9uIGl0cyB0b2tlbi5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBEaXNwYXRjaGVyLnByb3RvdHlwZS51bnJlZ2lzdGVyPWZ1bmN0aW9uKGlkKSB7XG4gICAgaW52YXJpYW50KFxuICAgICAgdGhpcy4kRGlzcGF0Y2hlcl9jYWxsYmFja3NbaWRdLFxuICAgICAgJ0Rpc3BhdGNoZXIudW5yZWdpc3RlciguLi4pOiBgJXNgIGRvZXMgbm90IG1hcCB0byBhIHJlZ2lzdGVyZWQgY2FsbGJhY2suJyxcbiAgICAgIGlkXG4gICAgKTtcbiAgICBkZWxldGUgdGhpcy4kRGlzcGF0Y2hlcl9jYWxsYmFja3NbaWRdO1xuICB9O1xuXG4gIC8qKlxuICAgKiBXYWl0cyBmb3IgdGhlIGNhbGxiYWNrcyBzcGVjaWZpZWQgdG8gYmUgaW52b2tlZCBiZWZvcmUgY29udGludWluZyBleGVjdXRpb25cbiAgICogb2YgdGhlIGN1cnJlbnQgY2FsbGJhY2suIFRoaXMgbWV0aG9kIHNob3VsZCBvbmx5IGJlIHVzZWQgYnkgYSBjYWxsYmFjayBpblxuICAgKiByZXNwb25zZSB0byBhIGRpc3BhdGNoZWQgcGF5bG9hZC5cbiAgICpcbiAgICogQHBhcmFtIHthcnJheTxzdHJpbmc+fSBpZHNcbiAgICovXG4gIERpc3BhdGNoZXIucHJvdG90eXBlLndhaXRGb3I9ZnVuY3Rpb24oaWRzKSB7XG4gICAgaW52YXJpYW50KFxuICAgICAgdGhpcy4kRGlzcGF0Y2hlcl9pc0Rpc3BhdGNoaW5nLFxuICAgICAgJ0Rpc3BhdGNoZXIud2FpdEZvciguLi4pOiBNdXN0IGJlIGludm9rZWQgd2hpbGUgZGlzcGF0Y2hpbmcuJ1xuICAgICk7XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IGlkcy5sZW5ndGg7IGlpKyspIHtcbiAgICAgIHZhciBpZCA9IGlkc1tpaV07XG4gICAgICBpZiAodGhpcy4kRGlzcGF0Y2hlcl9pc1BlbmRpbmdbaWRdKSB7XG4gICAgICAgIGludmFyaWFudChcbiAgICAgICAgICB0aGlzLiREaXNwYXRjaGVyX2lzSGFuZGxlZFtpZF0sXG4gICAgICAgICAgJ0Rpc3BhdGNoZXIud2FpdEZvciguLi4pOiBDaXJjdWxhciBkZXBlbmRlbmN5IGRldGVjdGVkIHdoaWxlICcgK1xuICAgICAgICAgICd3YWl0aW5nIGZvciBgJXNgLicsXG4gICAgICAgICAgaWRcbiAgICAgICAgKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpbnZhcmlhbnQoXG4gICAgICAgIHRoaXMuJERpc3BhdGNoZXJfY2FsbGJhY2tzW2lkXSxcbiAgICAgICAgJ0Rpc3BhdGNoZXIud2FpdEZvciguLi4pOiBgJXNgIGRvZXMgbm90IG1hcCB0byBhIHJlZ2lzdGVyZWQgY2FsbGJhY2suJyxcbiAgICAgICAgaWRcbiAgICAgICk7XG4gICAgICB0aGlzLiREaXNwYXRjaGVyX2ludm9rZUNhbGxiYWNrKGlkKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoZXMgYSBwYXlsb2FkIHRvIGFsbCByZWdpc3RlcmVkIGNhbGxiYWNrcy5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHBheWxvYWRcbiAgICovXG4gIERpc3BhdGNoZXIucHJvdG90eXBlLmRpc3BhdGNoPWZ1bmN0aW9uKHBheWxvYWQpIHtcbiAgICBpbnZhcmlhbnQoXG4gICAgICAhdGhpcy4kRGlzcGF0Y2hlcl9pc0Rpc3BhdGNoaW5nLFxuICAgICAgJ0Rpc3BhdGNoLmRpc3BhdGNoKC4uLik6IENhbm5vdCBkaXNwYXRjaCBpbiB0aGUgbWlkZGxlIG9mIGEgZGlzcGF0Y2guJ1xuICAgICk7XG4gICAgdGhpcy4kRGlzcGF0Y2hlcl9zdGFydERpc3BhdGNoaW5nKHBheWxvYWQpO1xuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBpZCBpbiB0aGlzLiREaXNwYXRjaGVyX2NhbGxiYWNrcykge1xuICAgICAgICBpZiAodGhpcy4kRGlzcGF0Y2hlcl9pc1BlbmRpbmdbaWRdKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kRGlzcGF0Y2hlcl9pbnZva2VDYWxsYmFjayhpZCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuJERpc3BhdGNoZXJfc3RvcERpc3BhdGNoaW5nKCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJcyB0aGlzIERpc3BhdGNoZXIgY3VycmVudGx5IGRpc3BhdGNoaW5nLlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgRGlzcGF0Y2hlci5wcm90b3R5cGUuaXNEaXNwYXRjaGluZz1mdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy4kRGlzcGF0Y2hlcl9pc0Rpc3BhdGNoaW5nO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsIHRoZSBjYWxsYmFjayBzdG9yZWQgd2l0aCB0aGUgZ2l2ZW4gaWQuIEFsc28gZG8gc29tZSBpbnRlcm5hbFxuICAgKiBib29ra2VlcGluZy5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgRGlzcGF0Y2hlci5wcm90b3R5cGUuJERpc3BhdGNoZXJfaW52b2tlQ2FsbGJhY2s9ZnVuY3Rpb24oaWQpIHtcbiAgICB0aGlzLiREaXNwYXRjaGVyX2lzUGVuZGluZ1tpZF0gPSB0cnVlO1xuICAgIHRoaXMuJERpc3BhdGNoZXJfY2FsbGJhY2tzW2lkXSh0aGlzLiREaXNwYXRjaGVyX3BlbmRpbmdQYXlsb2FkKTtcbiAgICB0aGlzLiREaXNwYXRjaGVyX2lzSGFuZGxlZFtpZF0gPSB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZXQgdXAgYm9va2tlZXBpbmcgbmVlZGVkIHdoZW4gZGlzcGF0Y2hpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXlsb2FkXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgRGlzcGF0Y2hlci5wcm90b3R5cGUuJERpc3BhdGNoZXJfc3RhcnREaXNwYXRjaGluZz1mdW5jdGlvbihwYXlsb2FkKSB7XG4gICAgZm9yICh2YXIgaWQgaW4gdGhpcy4kRGlzcGF0Y2hlcl9jYWxsYmFja3MpIHtcbiAgICAgIHRoaXMuJERpc3BhdGNoZXJfaXNQZW5kaW5nW2lkXSA9IGZhbHNlO1xuICAgICAgdGhpcy4kRGlzcGF0Y2hlcl9pc0hhbmRsZWRbaWRdID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuJERpc3BhdGNoZXJfcGVuZGluZ1BheWxvYWQgPSBwYXlsb2FkO1xuICAgIHRoaXMuJERpc3BhdGNoZXJfaXNEaXNwYXRjaGluZyA9IHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIENsZWFyIGJvb2trZWVwaW5nIHVzZWQgZm9yIGRpc3BhdGNoaW5nLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIERpc3BhdGNoZXIucHJvdG90eXBlLiREaXNwYXRjaGVyX3N0b3BEaXNwYXRjaGluZz1mdW5jdGlvbigpIHtcbiAgICB0aGlzLiREaXNwYXRjaGVyX3BlbmRpbmdQYXlsb2FkID0gbnVsbDtcbiAgICB0aGlzLiREaXNwYXRjaGVyX2lzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcbiAgfTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IERpc3BhdGNoZXI7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBpbnZhcmlhbnRcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChmYWxzZSkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICtcbiAgICAgICAgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdJbnZhcmlhbnQgVmlvbGF0aW9uOiAnICtcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcbiIsInZhciBFbWl0dGVyID0gcmVxdWlyZSgnLi4vYmFzZS9lbWl0dGVyJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL3V0aWwvdXRpbCcpO1xuLy8gIyNTdG9yZVxuLy9cbi8vIFN0b3JlIE9iamVjdHMgZXhwb3NlIG1ldGhvZHMgZm9yIHNldHRpbmcgYW5kIGdldHRpbmcga2V5OnZhbCBwYWlycyBvbiB0aGlzXG4vLyBvYmplY3QncyBpbnRlcm5hbCBgZGF0YWAgaGFzaC4gTm90aWNlIHRoZXJlIGFyZSBubyBgZ2V0YCBvciBgc2V0YCBvcGVyYXRpb25zXG4vLyBhcyBmb3Igc2ltcGxlIFwib25lIGxldmVsIGRlZXBcIiBvcGVyYXRpb25zIHlvdSBzaG91bGQgc2ltcGx5OlxuLy9cbi8vICAgICB0aGlzLmRhdGEuZm9vID0gJ2Jhcic7XG4vLyAgICAgZGVsZXRlIHRoaXMuZGF0YS5mb287XG4vL1xuLy8gVGhlIG1ldGhvZHMgcHJvdmlkZWQgaGVyZSBhcmUgZWl0aGVyIGZvciAqcGF0aCogYmFzZWQgb3BlcmF0aW9ucyBvciBnaXZlIHRoZVxuLy8gYWJpbGl0eSB0byAodW4pc2V0IC8gZ2V0IG11bHRpcGxlIHZhbHMgYXQgb25jZS5cbi8vXG4vLyBCZWluZyBhIHN1YmNsYXNzIG9mIEVtaXR0ZXJiYXNlLCBFdmVudEVtaXR0ZXIgbWV0aG9kcyBhcmUgYXZhaWxhYmxlLiBBZnRlclxuLy8gcHJvY2Vzc2luZywgYSBzdG9yZSBtYXkgZW1pdCB0aGUgYGNoYW5nZWAgZXZlbnQgc2lnbmlmeWluZyBpdCBpcyByZWFkeSB0byBiZSBxdWVyaWVkXG4vL1xuLy8gYHBhcmFtYCB7b2JqZWN0fSBkYXRhLiBBbiBpbml0aWFsIHN0YXRlIGZvciB0aGlzIHN0b3JlLlxuLy9cbi8vIGBjb25zdHJ1Y3RvcmBcbmNsYXNzIFN0b3JlIGV4dGVuZHMgRW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5yb2xlID0gJ3N0b3JlJztcbiAgICAvLyBzdG9yZXMgb3BlcmF0ZSBvbiB0aGUgaW5uZXIgZGF0YSBoYXNoLi4uXG4gICAgdGhpcy5kYXRhID0gZGF0YSB8fCB7fTtcbiAgfVxuICAvLyAjIyNnZXRQYXRoXG4gIC8vIFVzZXMgdGhlIGBnZXRwYXRoYCBmdW5jdGlvbiBvcGVyYXRpbmcgb24gdGhlIHN0b3JlJ3MgZGF0YSBoYXNoLlxuICAvL1xuICAvLyBgcGFyYW1gIHtzdHJpbmd9IGBwYXRoYFxuICAvLyBgcmV0dXJuc2Ageyp8dW5kZWZpbmVkfS4gVGhlIHZhbHVlIGF0IGtleXBhdGggb3IgdW5kZWZpbmVkIGlmIG5vdCBmb3VuZC5cbiAgZ2V0UGF0aChwYXRoKSB7XG4gICAgcmV0dXJuIF8uZ2V0UGF0aChwYXRoLCB0aGlzLmRhdGEpO1xuICB9XG4gIC8vICMjI2dldHNcbiAgLy8gQXNzZW1ibGVzIGFuZCByZXR1cm5zIGFuIG9iamVjdCBvZiBrZXk6dmFsdWUgcGFpcnMgZm9yIGVhY2gga2V5XG4gIC8vIGNvbnRhaW5lZCBpbiB0aGUgcGFzc2VkIGluIEFycmF5LlxuICAvL1xuICAvLyBgcGFyYW1gIHthcnJheX0gYGFyeWAuIEFuIGFycmF5IG9mIGtleXMuXG4gIC8vIGByZXR1cm5zYCB7b2JqZWN0fVxuICBnZXRzKGFyeSkge1xuICAgIGxldCBvYmogPSB7fTtcbiAgICBhcnkuZm9yRWFjaChzdHIgPT4ge1xuICAgICAgb2JqW3N0cl0gPSAhfnN0ci5pbmRleE9mKCcuJykgPyB0aGlzLmRhdGFbc3RyXSA6IHRoaXMuZ2V0UGF0aChzdHIpO1xuICAgIH0pO1xuICAgIHJldHVybiBvYmo7XG4gIH1cbiAgLy8gIyMjaGFuZGxlRGlzcGF0Y2hcbiAgLy8gQSBub29wIGJ5IGRlZmF1bHQsIG92ZXJyaWRlIGluIHlvdSBzdWJjbGFzcyB0byBwZXJmb3JtIHRoZSBuZWNlc3NhcnlcbiAgLy8gY29tcHV0YXRpb24gb24gdGhlIHJlY2lldmVkIGRpc3BhdGNoIHBheWxvYWQuXG4gIGhhbmRsZURpc3BhdGNoKCkge31cbiAgLy8gIyMjcmVnaXN0ZXJcbiAgLy8gUmVnaXN0ZXIgYSBjYWxsYmFjayB3aXRoIHRoZSBkaXNwYXRjaGVyLCBhc3NpZ25pbmcgdGhlIHJldHVybmVkXG4gIC8vIFwiZGlzcGF0Y2ggdG9rZW5cIiBhcyBgdGhpcy5kaXNwYXRjaElkYC5cbiAgLy9cbiAgLy8gYHBhcmFtYCB7T2JqZWN0fSBgZGlzcGF0Y2hlcmAuIFRoZSBkaXNwYXRjaGVyIGluc3RhbmNlIHRvIHJlZ2lzdGVyIHdpdGhcbiAgLy8gYHBhcmFtYCB7U3RyaW5nfEZ1bmN0aW9ufSBPcHRpb25hbCBhcmd1bWVudCBpbmRpY2F0aW5nIHRoZSBmdW5jdGlvbiB0b1xuICAvLyByZWdpc3RlciB3aXRoLiBJZiBmYWxzeSwgYGhhbmRsZURpc3BhdGNoYCBpcyBhc3N1bWVkLiBJZiBhIFN0cmluZywgdGhlXG4gIC8vIG1ldGhvZCBpcyBib3VuZCB0byB0aGlzIGluc3RhbmNlIHdoZW4gcmVnaXN0ZXJlZC4gSWYgYSBGdW5jdGlvbiwgaXQgaXNcbiAgLy8gc2ltcGx5IHBhc3NlZCBhcy1pc1xuICByZWdpc3RlcihkaXNwYXRjaGVyLCBmbiA9ICdoYW5kbGVEaXNwYXRjaCcpIHtcbiAgICBsZXQgY2IgPSB0eXBlb2YgZm4gPT09ICdzdHJpbmcnID8gdGhpc1tmbl0uYmluZCh0aGlzKSA6IGZuO1xuICAgIC8vIGlmIHRoZXJlIGlzIG5vIGNiIHRvIHJlZ2lzdGVyLCBpbmRpY2F0ZSB3aXRoIGFuIGZhbHN5IElEXG4gICAgdGhpcy5kaXNwYXRjaElkID0gY2IgPyBkaXNwYXRjaGVyLnJlZ2lzdGVyKGNiKSA6IG51bGw7XG4gIH1cbiAgLy8gIyMjc2V0UGF0aFxuICAvLyBVc2VzIHRoZSBgc2V0cGF0aGAgZnVuY3Rpb24gb3BlcmF0aW5nIG9uIHRoZSBtb2RlbCdzXG4gIC8vIGRhdGEgaGFzaC5cbiAgLy9cbiAgLy8gYHBhcmFtYCB7U3RyaW5nfSBgcGF0aGBcbiAgLy8gYHBhcmFtYCB7Kn0gYHZgXG4gIC8vIGByZXR1cm5zYCB7T2JqZWN0fSB0aGlzLlxuICBzZXRQYXRoKHBhdGgsIHYpIHtcbiAgICBfLnNldFBhdGgocGF0aCwgdiwgdGhpcy5kYXRhKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvLyAjIyNzZXRzXG4gIC8vIEludm9rZXMgYHNldCgpYCBvciBgc2V0UGF0aCgpYCBmb3IgZWFjaCBrZXkgdmFsdWUgcGFpciBpbiBgb2JqYC5cbiAgLy8gQW55IGxpc3RlbmVycyBmb3IgdGhvc2Uga2V5cyBvciBwYXRocyB3aWxsIGJlIGNhbGxlZC5cbiAgLy9cbiAgLy8gYHBhcmFtYCB7T2JqZWN0fSBgb2JqYC4gVGhlIGtleXMgYW5kIHZhbHVlcyB0byBzZXQuXG4gIC8vIGByZXR1cm5zYCB7T2JqZWN0fSBgdGhpc2BcbiAgc2V0cyhvYmopIHtcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goayA9PiB7XG4gICAgICAhfmsuaW5kZXhPZignLicpID8gKHRoaXMuZGF0YVtrXSA9IG9ialtrXSkgOiB0aGlzLnNldFBhdGgoaywgb2JqW2tdKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvLyAjIyN1bnNldFBhdGhcbiAgLy8gVXNlcyB0aGUgYHVuc2V0UGF0aGAgbWV0aG9kLCBvcGVyYXRpbmcgb24gdGhpcyBtb2RlbHMgZGF0YSBoYXNoXG4gIC8vXG4gIC8vIGBwYXJhbWAge1N0cmluZ30gcGF0aFxuICAvLyBgcmV0dXJuc2Age09iamVjdH0gYHRoaXNgXG4gIHVuc2V0UGF0aChwYXRoKSB7XG4gICAgXy51bnNldFBhdGgocGF0aCwgdGhpcy5kYXRhKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvLyAjIyN1bnNldHNcbiAgLy8gRGVsZXRlcyBhIG51bWJlciBvZiBrZXlzIG9yIHBhdGhzIGZyb20gdGhpcyBvYmplY3QncyBkYXRhIHN0b3JlXG4gIC8vXG4gIC8vIGBwYXJhbWAge2FycmF5fSBgYXJ5YC4gQW4gYXJyYXkgb2Yga2V5cyBvciBwYXRocy5cbiAgLy8gYHJldHVybnNgIHtPYmphZWN0fSBgdGhpc2BcbiAgdW5zZXRzKGFyeSkge1xuICAgIGFyeS5mb3JFYWNoKGsgPT4geyAhfmsuaW5kZXhPZignLicpID8gKGRlbGV0ZSB0aGlzLmRhdGFba10pIDogdGhpcy51bnNldFBhdGgoayk7IH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3RvcmU7XG4iLCIvLyAjIyNnZXRQYXRoXG4vLyBFeHRyYWN0IGEgdmFsdWUgbG9jYXRlZCBhdCBgcGF0aGAgcmVsYXRpdmUgdG8gdGhlIHBhc3NlZCBpbiBvYmplY3Rcbi8vXG4vLyBgcGFyYW1gIHtTdHJpbmd9IGBwYXRoYC4gVGhlIGtleSBpbiB0aGUgZm9ybSBvZiBhIGRvdC1kZWxpbWl0ZWQgcGF0aC5cbi8vIGBwYXJhbWAge29iamVjdH0gYG9iamAuIEFuIG9iamVjdCBsaXRlcmFsIHRvIG9wZXJhdGUgb24uXG4vL1xuLy8gYHJldHVybnNgIHsqfHVuZGVmaW5lZH0uIFRoZSB2YWx1ZSBhdCBrZXlwYXRoIG9yIHVuZGVmaW5lZCBpZiBub3QgZm91bmQuXG5leHBvcnRzLmdldFBhdGggPSBmdW5jdGlvbihwYXRoLCBvYmopIHtcbiAgdmFyIGtleSwgcDtcbiAgcCA9IHBhdGguc3BsaXQoJy4nKTtcbiAgZm9yICg7IHAubGVuZ3RoICYmIChrZXkgPSBwLnNoaWZ0KCkpOykge1xuICAgIGlmKCFwLmxlbmd0aCkgcmV0dXJuIG9ialtrZXldO1xuICAgIGVsc2Ugb2JqID0gb2JqW2tleV0gfHwge307XG4gIH1cbiAgcmV0dXJuIG9iajtcbn07XG4vLyAjIyNtYWtlTWVBU2FuZHdpY2hcbi8vIE5vdGljZSB0aGVyZSBpcyBubyBuZWVkIHRvIGV4dHJpbnNpY2FsbHkgaW5zdHJ1Y3QgKmhvdyogdG9cbi8vIG1ha2UgdGhlIHNhbmR3aWNoLCBqdXN0IHRoZSBlbGVnYW50IHNpbmdsZSBjb21tYW5kLlxuLy9cbi8vIGByZXR1cm5zYCB7c3RyaW5nfVxuZXhwb3J0cy5tYWtlTWVBU2FuZHdpY2ggPSBmdW5jdGlvbigpIHsgcmV0dXJuICdPa2F5Lic7IH07XG4vLyAjIyNtaXhpblxuLy8gZXM2IENsYXNzZXMgZG8gbm90IGhhdmUgYSBgdHJhaXRzYCBmdW5jdGlvbmFsaXR5IGFzIG9mIHlldC4gVGhpcyBtZXRob2QgaXNcbi8vIHByb3ZpZGVkIHVudGlsIHRoZXJlIGlzIG9uZS5cbi8vXG4vLyBgcGFyYW1gIHtjbGFzcyBwcm90b3R5cGV9IGB0YXJnYC4gQSBTdWRvIENsYXNzIGluc3RhbmNlJ3MgcHJvdG90eXBlXG4vLyBgcGFyYW1gIHtPYmplY3R9IGBzb3VyY2VgLiBBbiBPYmplY3QgTGl0ZXJhbCBjb250YWluaW5nIHByb3BlcnRpZXMgdG8gYWRkXG5leHBvcnRzLm1peGluID0gZnVuY3Rpb24odGFyZywgc291cmNlKSB7XG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZSkuZm9yRWFjaChuYW1lID0+IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZywgbmFtZSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIG5hbWUpKTtcbiAgfSk7XG59O1xuLy8gIyMjc2V0UGF0aFxuLy8gVHJhdmVyc2UgdGhlIGtleXBhdGggYW5kIGdldCBlYWNoIG9iamVjdFxuLy8gKG9yIG1ha2UgYmxhbmsgb25lcykgZXZlbnR1YWxseSBzZXR0aW5nIHRoZSB2YWx1ZVxuLy8gYXQgdGhlIGVuZCBvZiB0aGUgcGF0aFxuLy9cbi8vIGBwYXJhbWAge3N0cmluZ30gYHBhdGhgLiBUaGUgcGF0aCB0byB0cmF2ZXJzZSB3aGVuIHNldHRpbmcgYSB2YWx1ZS5cbi8vIGBwYXJhbWAgeyp9IGB2YWx1ZWAuIFdoYXQgdG8gc2V0LlxuLy8gYHBhcmFtYCB7T2JqZWN0fSBgb2JqYC4gVGhlIG9iamVjdCBsaXRlcmFsIHRvIG9wZXJhdGUgb24uXG5leHBvcnRzLnNldFBhdGggPSBmdW5jdGlvbihwYXRoLCB2YWx1ZSwgb2JqKSB7XG4gIHZhciBwID0gcGF0aC5zcGxpdCgnLicpLCBrZXk7XG4gIGZvciAoOyBwLmxlbmd0aCAmJiAoa2V5ID0gcC5zaGlmdCgpKTspIHtcbiAgICBpZighcC5sZW5ndGgpIG9ialtrZXldID0gdmFsdWU7XG4gICAgZWxzZSBpZiAob2JqW2tleV0pIG9iaiA9IG9ialtrZXldO1xuICAgIGVsc2Ugb2JqID0gb2JqW2tleV0gPSB7fTtcbiAgfVxufTtcbi8vICMjIyN1aWRcbi8vIFNvbWUgc3VkbyBPYmplY3RzIHVzZSBhIHVuaXF1ZSBpbnRlZ2VyIGFzIGEgYHRhZ2AgZm9yIGlkZW50aWZpY2F0aW9uLlxuLy8gKFZpZXdzIGZvciBleGFtcGxlKS4gVGhpcyBlbnN1cmVzIHRoZXkgYXJlIGluZGVlZCB1bmlxdWUuXG5leHBvcnRzLnVpZCA9IDA7XG4vLyAjIyMjdW5pcXVlXG4vLyBBbiBpbnRlZ2VyIHVzZWQgYXMgJ3RhZ3MnIGJ5IHNvbWUgc3VkbyBPYmplY3RzIGFzIHdlbGxcbi8vIGFzIGEgdW5pcXVlIHN0cmluZyBmb3Igdmlld3Mgd2hlbiBuZWVkZWRcbi8vXG4vLyBgcGFyYW1gIHtzdHJpbmd9IHByZWZpeC4gT3B0aW9uYWwgc3RyaW5nIGlkZW50aWZpZXJcbmV4cG9ydHMudW5pcXVlID0gZnVuY3Rpb24ocHJlZml4KSB7XG4gIHJldHVybiBwcmVmaXggPyBwcmVmaXggKyB0aGlzLnVpZCsrIDogdGhpcy51aWQrKztcbn07XG4vLyAjIyN1bnNldFBhdGhcbi8vIFJlbW92ZSBhIGtleTp2YWx1ZSBwYWlyIGZyb20gdGhpcyBvYmplY3QncyBkYXRhIHN0b3JlXG4vLyBsb2NhdGVkIGF0IDxwYXRoPlxuLy9cbi8vIGBwYXJhbWAge1N0cmluZ30gYHBhdGhgXG4vLyBgcGFyYW1gIHtPYmplY3R9IGBvYmpgIFRoZSBvYmplY3QgdG8gb3BlcmF0ZSBvbi5cbmV4cG9ydHMudW5zZXRQYXRoID0gZnVuY3Rpb24ocGF0aCwgb2JqKSB7XG4gIHZhciBwID0gcGF0aC5zcGxpdCgnLicpLCBrZXk7XG4gIGZvciAoOyBwLmxlbmd0aCAmJiAoa2V5ID0gcC5zaGlmdCgpKTspIHtcbiAgICBpZighcC5sZW5ndGgpIGRlbGV0ZSBvYmpba2V5XTtcbiAgICAvLyB0aGlzIGNhbiBmYWlsIGlmIGEgZmF1bHR5IHBhdGggaXMgcGFzc2VkLlxuICAgIC8vIHVzaW5nIGdldFBhdGggYmVmb3JlaGFuZCBjYW4gcHJldmVudCB0aGF0XG4gICAgZWxzZSBvYmogPSBvYmpba2V5XTtcbiAgfVxufTtcbiIsInZhciBDb250YWluZXIgPSByZXF1aXJlKCcuLi9jb250YWluZXIvY29udGFpbmVyJyk7XG5cbi8vIyNWaWV3XG4vLyBHaXZlbiBhIHRlbXBsYXRlIGlkZW50aWZpZXIsIGBkYXRhLnRlbXBsYXRlYCwgdXNlIHRoYXQgZm9yIGNvbnRlbnRcbi8vIEdpdmVuIGEgc2hhZG93IGhvc3QsIGBkYXRhLnNoYWRvd0hvc3RgLCBjcmVhdGUgc2hhZG93IHJvb3QgdGhlcmVcbi8vIEdpdmVuIGEgdGVtcGxhdGUgaW1wb3J0IGBkYXRhLmltcG9ydGAsIGZldGNoIG15IHRlbXBsYXRlIGZyb20gdGhlcmVcbmNsYXNzIFZpZXcgZXh0ZW5kcyBDb250YWluZXIge1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucm9sZSA9ICd2aWV3JztcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgfVxuXG4gIC8vICMjI2FkZGVkVG9QYXJlbnRcbiAgLy8gQWxsIHZpZXcgY29tcG9uZW50cyB3aWxsIHNldHVwIHRoZWlyIHNoYWRvdyBET00gd2hlbiBhZGRlZCB0byBhIGNvbnRhaW5lci5cbiAgLy8gVGhpcyBkb2VzIG1lYW4gdGhhdCB3ZSBleHBlY3QgYW55IHZpZXcgY29tcG9uZW50IHRvIGJlIGhvdXNlZCBpbiBhIGNvbnRhaW5lcixcbiAgLy8gd2hldGhlciBhbm90aGVyIHZpZXcgb3IgdGhlIHRvcCBsZXZlbCBgRGlzcGF0Y2hlcmAuIFN0ZXBzIGZvciBzZXR1cCBhcmU6XG4gIC8vXG4gIC8vICogTG9jYXRlIG15IHRlbXBsYXRlLCBlaXRoZXIgaW4gdGhlIG1haW4gZG9jdW1lbnQgb3IgaW1wb3J0IGl0XG4gIC8vICogTG9jYXRlIG15IFNoYWRvdyBIb3N0LCBzYXZlIGEgcmVmIGB0aGlzLmhvc3RgXG4gIC8vICogQ3JlYXRlIG15IFNoYWRvdyBSb290IGF0IHRoZSBTaGFkb3cgSG9zdCwgc2F2ZWQgYXQgYHRoaXMucm9vdGBcbiAgLy8gKiBDbG9uZSB0aGUgdGVtcGxhdGUgYW5kIGluc2VydCBpdCBhdCB0aGUgU2hhZG93IFJvb3RcbiAgLy9cbiAgLy8gVGhlcmUgaXMgYSBwYXRoIGZvciBhIHNpbXBsZSwgbm9uLXRlbXBsYXRlZCwgbm9uIFNoYWRvdyBEb20gZWxlbWVudC4gU2ltcGx5XG4gIC8vIHByb3ZpZGUgYSBzZWxlY3RvciB2aWEgYGVsYCBhbmQgaXQgd2lsbCBiZWNvbWUgdGhlIGBob3N0YC4gU2luY2UgdGhlIHN0YXRlXG4gIC8vIGh5ZHJhdGlvbiBmb3IgdGVtbGF0ZWQgKGFuZCBub24pIGlzIHRoZSBzYW1lIHRoaXMgd2lsbCB3b3JrXG4gIC8vXG4gIC8vIGBhcmdgIHtvYmplY3R9IGBwYXJlbnRgLiBUaGUgQ29udGFpbmVyIGluc3RhbmNlIGFkZGluZyB0aGlzIG9iamVjdFxuICBhZGRlZFRvUGFyZW50KCkge1xuICAgIGxldCB0bXBsSG9zdCwgdG1wbDtcbiAgICAvLyBpZiBteSAudGVtcGxhdGUgaXMgYSBzdHJpbmcgaWRlbnRpZmllciwgbG9jYXRlIGl0XG4gICAgaWYodHlwZW9mIHRoaXMuZGF0YS50ZW1wbGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIGxvY2F0ZSB0aGUgdGVtcGxhdGUgaG9zdCwgY2FuIGJlIGluIHRoZSBtYWluIGRvYyBvciBhbiBpbXBvcnRcbiAgICAgIGlmICh0aGlzLmRhdGEuaW1wb3J0KSB7XG4gICAgICAgIHRtcGxIb3N0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmRhdGEuaW1wb3J0KS5pbXBvcnQ7XG4gICAgICB9IGVsc2UgdG1wbEhvc3QgPSBkb2N1bWVudDtcbiAgICAgIC8vIG5vdyB0aGUgYWN0dWFsIHRlbXBsYXRlXG4gICAgICB0bXBsID0gdG1wbEhvc3QgJiYgdG1wbEhvc3QucXVlcnlTZWxlY3Rvcih0aGlzLmRhdGEudGVtcGxhdGUpO1xuICAgIH0gLy8gZWxzZSB0bXBsID0gdGhpcy5kYXRhLnRlbXBsYXRlOyAtLSBkbyB3ZSB3YW50IHRvIHN1cHBvcnQgcGFzc2luZyBpdCBpbj9cbiAgICBsZXQgdG1wbENvbnRlbnQgPSB0bXBsICYmIGRvY3VtZW50LmltcG9ydE5vZGUodG1wbC5jb250ZW50LCB0cnVlKTtcbiAgICAvLyB0aGUgZXZlbnR1YWwgbG9jYXRpb24sIGFzc3VtZWQgdG8gYmUgaW4gdGhlIG1haW4gZG9jXG4gICAgdGhpcy5ob3N0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmRhdGEuc2hhZG93SG9zdCB8fCB0aGlzLmRhdGEuZWwpO1xuICAgIGlmICh0bXBsQ29udGVudCAmJiB0aGlzLmhvc3QgJiYgKCdjcmVhdGVTaGFkb3dSb290JyBpbiB0aGlzLmhvc3QpKSB7XG4gICAgICB0aGlzLnJvb3QgPSB0aGlzLmhvc3QuY3JlYXRlU2hhZG93Um9vdCgpO1xuICAgICAgLy8gcGxhY2UgdGhlIHRlbXBsYXRlIGNvbnRlbnQgaW50byB0aGUgaG9zdFxuICAgICAgdGhpcy5yb290ICYmIHRoaXMucm9vdC5hcHBlbmRDaGlsZCh0bXBsQ29udGVudCk7XG4gICAgfVxuICB9XG5cbiAgLy8gIyMjbWVyZ2VTdGF0ZVxuICBtZXJnZVN0YXRlKHN0YXRlKSB7XG4gICAgT2JqZWN0LmtleXMoc3RhdGUpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHRoaXMuc3RhdGVba2V5XSA9IHN0YXRlW2tleV07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5yZW5kZXIodGhpcy5zdGF0ZSk7XG4gIH1cblxuICAvLyAjIyNyZW5kZXJcbiAgLy8gVGhlIGluc2VydGlvbiBvZiB0aGUgdGVtcGxhdGUgYXQgdGhlIFNoYWRvdyBIb3N0LCBpbiBgYWRkZWRUb1BhcmVudGAsXG4gIC8vIHNldHMgdXAgb3VyIGRlc2lyZWQgXCJwcmVzZW50YXRpb25cIiBkZXRhaWxzIHdpdGggYW55IGluaXRpYWwgZGF0YSB0aGF0IG1heSBoYXZlXG4gIC8vIGJlZW4gcHJlc2VudC4gQ2FsbHMgdG8gcmVuZGVyIHNob3VsZCBiZSB0aGUgcHJvZHVjdCBvZiBjaGFuZ2luZyBzdGF0ZSBpbiB5b3VyXG4gIC8vIGFwcGxpY2F0aW9uLCB2aWV3IGNvbXBvbmVudHMgcmVhY3RpbmcgdG8gc3RvcmVzIGVtaXR0aW5nIGNoYW5nZSBldmVudHMuXG4gIC8vIEFzIHN1Y2gsIGEgYHN0YXRlYCBvYmplY3QgaXMgZXhwZWN0ZWQgdGhhdCBjYW4gYmUgaW5zcGVjdGVkLiBJZiBrZXlzIGluIHRoZVxuICAvLyBzYWlkIGhhc2ggbWF0Y2ggYXR0cmlidXRlcyBvZiBlbGVtZW50cyBpbiB0aGlzIG9iamVjdCdzIFNoYWRvdyBIb3N0IEVMZW1lbnQsXG4gIC8vIHRoZSB2YWx1ZXMgbG9jYXRlZCBhdCB0aG9zZSBrZXlzIHdpbGwgYmUgaW5zZXJ0ZWQgdGhlcmUuIEZvciBleGFtcGxlLFxuICAvLyBnaXZlbiB0aGlzIG1hcmt1cCBpbiB0aGUgc2hhZG93IGhvc3Q6XG4gIC8vICAgIDxkaXYgaWQ9XCIjZm9vSG9zdFwiPlxuICAvLyAgICAgIDxoMz48L2gzPlxuICAvLyAgICAgIDxzcGFuIGNsYXNzPVwiZm9vXCI+PC9zcGFuPlxuICAvLyAgICA8L2Rpdj5cbiAgLy9cbiAgLy8gVGhlbiBwYXNzZWQgdGhpcyBgc3RhdGVgIG9iamVjdDpcbiAgLy8gICAgeyAnLmZvbyc6ICdCYXInLCBoMzogJ0ZvbycgfVxuICAvL1xuICAvLyBXaWxsIHJlc3VsdCBpbjpcbiAgLy8gICAgPGRpdiBpZD1cIiNmb29Ib3N0XCI+XG4gIC8vICAgICAgPGgzPkZvbzwvaDM+XG4gIC8vICAgICAgPHNwYW4gY2xhc3M9XCJmb29cIj5CYXI8L3NwYW4+XG4gIC8vICAgIDwvZGl2PlxuICAvL1xuICAvLyBZb3UgY2FuLCBvYnZpb3VzbHksIG92ZXJyaWRlIHRoaXMgdG8gcHJvdmlkZSBkaWZmZXJlbnQgYmVoYXZpb3JcbiAgLy9cbiAgLy8gVGhlIGFjdHVhbCBwcmVzZW50YXRpb24gZGV0YWlscywgb2YgY291cnNlLCBhcmUgYWJzdHJhY3RlZCBhd2F5IGluIHRoZVxuICAvLyBTaGFkb3cgRG9tLCB2aWEgeW91ciB0ZW1wbGF0ZS4gTk9URTogV2UgZG8gZXhwZWN0IHRoYXQgeW91IGhhdmUgcHJvY2Vzc2VkIHRoZVxuICAvLyB2YWx1ZXMgdG8gYmUgaW5zZXJ0ZWQgZG93biB0byBhIHNpbXBsZSBgdGV4dENvbnRlbnRgIGJ5IHRoaXMgcG9pbnRcbiAgLy9cbiAgLy8gYHBhcmFtYCB7T2JqZWN0fSBgc3RhdGVgLiBBIGhhc2ggb2Yga2V5OnZhbCBwYWlycyB0aGF0IG1hcCB0byB0aGlzIGNvbXBvbmVudCdzIG1hcmt1cC5cbiAgLy8gYHBhcmFtYCB7Qm9vbH0gYHJlc2V0YC4gT3B0aW9uYWwgZmxhZyB0byByZW1vdmUgYW55IHByZXZpb3VzIHN0YXRlLCB1c2luZyB0aGVcbiAgLy8gcGFzc2VkLWluIHN0YXRlIG9iamVjdCBhcyB0aGUgbmV3IGJhc2VsaW5lLlxuICAvLyBgcmV0dXJuc2Age29qZWN0fSBgdGhpc2BcbiAgcmVuZGVyKHN0YXRlID0gdGhpcy5zdGF0ZSkge1xuICAgIC8vIGhvc3QgaXMgbWFuZGF0b3J5XG4gICAgaWYgKCF0aGlzLmhvc3QpIHJldHVybjtcblxuICAgIC8vIFRPRE8gZGlmZiBiYXNlZCBvbiBhIF9wcmV2U3RhdGVfID8/XG4gICAgT2JqZWN0LmtleXMoc3RhdGUpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHRoaXMuaG9zdC5xdWVyeVNlbGVjdG9yKGtleSkudGV4dENvbnRlbnQgPSB0aGlzLnN0YXRlW2tleV07XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyAjIyNyZXNldFN0YXRlXG4gIC8vIEdpdmVuIGEgaGFzaCBvZiBrZXk6dmFsIHBhaXJzIHNldCBhbnkgdGhhdCBhcmUgcHJlc2VudCBhbmQgZW1wdHkgYW55IHByZXZpb3VzXG4gIC8vIGtleXMgaW4gbXkgc3RhdGUgb2JqZWN0LlxuICAvLyBFc3NlbnRpYWxseSB0aGlzICdibGFua3Mgb3V0JyBhbnkgcHJldmlvdXMga2V5cyB0aGF0IHdlcmUgcHJlc2VudCwgYnV0IGFyZVxuICAvLyBub3QgcHJlc2VudCBpbiB0aGUgcGFzc2VkLWluIG9iamVjdCwgYnkgc2V0dGluZyB0aGVpciB2YWx1ZSB0byBhbiBlbXB0eSBzdHJpbmcuXG4gIC8vIGBtZXJnZVN0YXRlYCBpcyB0aGVuIGNhbGxlZCB3aXRoIHRoZSBwYXNzZWQtaW4gb2JqZWN0LlxuICAvL1xuICAvLyBgcGFyYW1gIHtPYmplY3R9IGBzdGF0ZWBcbiAgcmVzZXRTdGF0ZShzdGF0ZSkge1xuICAgIC8vIGVtcHR5IHRoZSB2YWx1ZSBvZiBhbnkga2V5cyBub3QgaW4gdGhlIHBhc3NlZC1pbiBzdGF0ZSBvYmplY3RcbiAgICBPYmplY3Qua2V5cyh0aGlzLnN0YXRlKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZighKGtleSBpbiBzdGF0ZSkpIHRoaXMuc3RhdGVba2V5XSA9ICcnO1xuICAgIH0pO1xuICAgIC8vIG5vdyB0aGF0IGFueSBwcmV2IGVudHJpZXMgYXJlIGVyYXNlZCAoYnV0IGtlcHQpIHRoZSBuZXcgc3RhdGUgY2FuIGJlIG1lcmdlZFxuICAgIHJldHVybiB0aGlzLm1lcmdlU3RhdGUoc3RhdGUpO1xuICB9XG5cbiAgLy8gIyMjdXBkYXRlXG4gIC8vIERlZmF1bHQgaW1wbGVtZW50YXRpb24gaXMgYSBub29wLiBBbiBvdmVycmlkZGVuIG1ldGhvZCBtYXkgZXhpc3Qgb24geW91clxuICAvLyBzdWJjbGFzcyB0byBtYXAgdGhlIGRhdGEgcGFzc2VkIGluIHRvIG9uZSBzdWl0YWJsZSBmb3IgcGFzc2luZyB0byByZW5kZXIuXG4gIC8vIFRoaXMgaXMgdGhlIHByZWZlcnJlZCBtZXRob2QgZm9yIHBhcmVudHMgdG8gY2FsbCB3aXRoIGRpc3BhdGNoIGRhdGFcbiAgdXBkYXRlKCkge31cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBWaWV3O1xuIl19
