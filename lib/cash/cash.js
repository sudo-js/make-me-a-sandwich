(function(win) {
  var proto = Array.prototype, slice = proto.slice,
    cash = function(arg) {return cash.init(arg);};
    function isDocument(arg) {return arg && arg.nodeType === arg.DOCUMENT_NODE;}
    function isWindow(arg) {return arg === win;}
    function isObject(arg) {return Object.prototype.toString.call(arg) === '[object Object]';}
    function isString(arg) {return typeof arg === 'string';}
    // ###cache
    // Hash that holds the event and display data
    cash.cache = {events: {}, display: {}};
    // generate a unique id for elements
    cash.cid = 0;
    // ###closest
    // Given a string selector, return the first parent node that matches it
    // for each element in the q.
    // 
    // `param` {string} `sel`
    // `returns` cash
    cash.closest = function(sel) {
      var ary = [];
      this.q.forEach(function(el) {
        while(el && !$.matches(el, sel)) el = !isDocument(el) && el.parentNode;
        if(!(~ary.indexOf(el))) ary.push(el);
      });
      return $(ary);
    };
    // ###contains
    // See if any element in the current q contains the passed in element,
    // setting the q as the container if found.
    //
    // `param` {element} `el`
    // `returns` cash
    cash.contains = function(el) {
      var res;
      this.q.reverse().some(function(node) {
        if(node.contains(el)) return res = node;
      });
      return $(res);
    };
    // ###create
    // Given a string, create a DOM element and store place in at the q. Notice 
    // that the input must be a single 'top-level' Element, but it may contain 
    // any number of children.
    //
    // `param` {string} `str`. An innerHTML compatible string
    // `returns` cash
    cash.create = function(str) {
      var wrap = document.createElement('div');
      wrap.innerHTML = str;
      return $(wrap.firstElementChild);
    };
    // ###deserialize
    // Given a 'paramaterized' string, convert it to a hash and return it
    //
    // `param` {string} `str`
    // `returns` {object}
    cash.deserialize = function(str) {
      var obj = {}, ary;
      str.split('&').forEach(function(spl) {
        if(spl) {
          ary = spl.split('=');
          obj[ary[0]] = ary[1];
        }
      });
      return obj;
    };
    // ###extend
    // Copy the (non-inherited) key:value pairs from <n> source objects to a single target object.
    //
    // `params` {objects} A target object followed by <n> source objects
    // `returns` {object} A single object
    cash.extend = function() {
      var args = slice.call(arguments),
        targ = args.shift(), i, len, obj, keys;
        // iterate over each passed in obj remaining
      for(obj; args.length && (obj = args.shift());) {
        keys = Object.keys(obj);
        for(i = 0, len = keys.length; i < len; i++) {
          targ[keys[i]] = obj[keys[i]];
        }
      }
      return targ;
    };
    // ###find
    // From the existing q, rebuild it by performing a querySelectorAll
    // with the given selector on each element in the q, pushing those elements 
    // found into the new q.
    //
    // `param` {string} `sel`
    // `returns` cash
    cash.find = function(sel) {
      var ary = [];
      this.q.forEach(function(el) {
        if(el.querySelectorAll) {
          proto.forEach.call(el.querySelectorAll(sel), function(node) {
            ary.push(node);
          });
        }
      });
      return $(ary);
    };
    // ###height
    // Given a value this method is a setter for each element in the q.
    // If the arg is truthy and a number it is converted to a string with 'px'
    // added, if it is a string nothing is added.
    // Minus that, it returns the height of the 0th item in the q;
    //
    // `param` {number|string} `val`. Optional value to be set
    // `returns` {number|object} The height if a getter, cash if a setter
    cash.height = function(val) {return this._hw_('height', val);};
    // ###hide
    // Makes elements in the q invisible in the DOM by modifying
    // the `display` attribute, if necessary.
    //
    // `returns` cash
    cash.hide = function() {return this._sh_('hide');};
    // ###_hw_
    // Abstracted logic for the height and width operations
    // `private`
    cash._hw_ = function(key, val) {
      var obj = {
        height: {w:'innerHeight',d:'scrollHeight',e:'offsetHeight'},
        width: {w:'innerWidth',d:'scrollWidth',e:'offsetWidth'}
      }, node = this.q[0], type = obj[key];
      function what(el) {return isWindow(el) ? type.w : isDocument(el) ? type.d : type.e;}
      if(!val) return node[what(node)];
      this.q.forEach(function(el) {
        el.style[what(el)] = isString(val) ? val : val + 'px';
      });
      return this;
    };
    // init
    // Breaking from the jQuery pattern, only a singile DOM node or NodeList is
    // expected as arguments (though an array is acceptable). The passed in arg 
    // is normalized into an array and set as $.q. All chainable methods then 
    // operate on the q.
    //
    // `param` {element|nodeList|array} `arg`
    // `returns` cash
    cash.init = function(arg) {
      // guard against falsey arg
      this.q = arg && arg.length ? (Array.isArray(arg) ? arg : 
        slice.call(arg)) : (arg ? [arg] : []);
      return this;
    };
    // ###isObject
    // Ye olde toString fallback to see if a passed in argument is an object.
    // Really you should test the other cases (Array.isArray for example) but this
    // does 'even' the API a little
    //
    // `param` {*}
    // `returns` {bool}
    cash.isObject = isObject;
    // ###matches
    // Unfortunately the matchesSelector methods are all hidden behind prefixes ATM.
    // set the useable one, if not, then return the bool.
    //
    // `param` {element} `el`. A DOM 1 nodetype
    // `param` {string}  `sel`. A CSS selector
    // `returns` {bool}
    cash.matches = function(el, sel) {
      if (el.nodeType !== 1) return false;
      // normalize the native selector match fn until all the prefixes are dropped
      if(!this._matchesSelector_) {
        this._matchesSelector_ = el.webkitMatchesSelector || el.mozMatchesSelector ||
        el.msMatchesSelector || el.oMatchesSelector || el.matchesSelector;
      }
      return this._matchesSelector_.call(el, sel);
    };
    // ###off
    cash.off = function(type, fn) {
      this.q.forEach(function(el) {
        var cid = isWindow(el) ? 'window' : el.cid, 
          events = $.cache.events[cid], cb;
        if(!events) return;
        if(events[type]) {
          events[type].forEach(function(obj, i) {
            if(fn && fn === obj.fn || !fn) cb = obj.cb;
            if(events[type][i].cb === cb) {
              el.removeEventListener(type, cb);
              // this does leave the array in a strange state, but acceptable
              delete $.cache.events[cid][type][i];
            }
          });
        }
      });
      return this;
    };
    // ###on
    // Given an event type, a callback, an optional selector for delegation, and
    // an optional hash of data to be appended to the event, bind them to each
    // element in the q.
    //
    // `param` {string} `type`
    // `param` {function} `fn`
    // `param` {string} `sel` optional CSS selector for delegation
    // `param` {object} `data` optional hash to be appended to the event object
    // `returns` cash
    cash.on = function(type, fn, sel, data) {
      var cb, events, targ;
      this.q.forEach(function(el) {
        events = $._setCache_('events', el)[el.cid];
        events[type] || (events[type] = []);
        cb = function(e) {
          // pass any custom data along to the listener
          if(data) e.data = data;
          // base case is that this is not 'delegated'
          if(!sel) fn.call(el, e);
          // there is a sel, check for matches and call if so.
          else if(~$(el).find(sel).q.indexOf(e.target) || (targ = $.contains(e.target).q[0])) {
            targ || (targ = e.target);
            e.currentTarget = targ;
            fn.call(targ, e);
          }
        };
        // cb === ours, fn === theirs.
        events[type].push({cb:cb,fn:fn});
        el.addEventListener && el.addEventListener(type, cb);
      });
      return this;
    };
    // ###serialize
    // Given a hash of data, convert it to a 'paramaterized' string and return it.
    //
    // `param` {object} `obj`
    // `returns` {string}
    cash.serialize = function(obj) {
      var ary = [];
      Object.keys(obj).forEach(function(key) {
        ary.push(escape(key) +'='+ escape(obj[key]));
      });
      return ary.join('&').replace(/%20/g, '+');
    };
    // ###setCache
    // private. 
    cash._setCache_ = function(ref, el) {
      var cid = isWindow(el) ? 'window' : el.cid,
        obj = this.cache[ref];
      if(!cid) el.cid = cid = String(++this.cid);
      obj[cid] || (obj[cid] = ref === 'events' ? {} : undefined);
      return obj;
    };
    // ###show
    // Makes elements in the q visible in the DOM by modifying
    // the `display` attribute, if necessary.
    //
    // `returns` cash
    cash.show = function() {return this._sh_('show');};
    // ###_sh_
    // Abstracted logic for the show and hide methods
    // `private`
    cash._sh_ = function(key) {
      var isShow = key === 'show';
      function state(el) {return isShow ? getComputedStyle(el).display !== 'none' : getComputedStyle(el).display === 'none';}
      function none(arg) {return isShow ? arg !== 'none': arg === 'none';}
      function notNone(arg) {return isShow ? arg === 'none': arg !== 'none';}
      
      this.q.forEach(function(el) {
        var display = $._setCache_('display', el),
          old = display[el.cid];
        if(state(el)) {
          if(none(old)) delete display[el.cid];
        // does an old display value exist?
        } else if (old && none(old)) {
          el.style.display = old;
          delete display[el.cid];
        // the element is not visible and does not have an old display value
        } else {
          // is the element hidden with inline styling?
          if(el.style.display && notNone(el.style.display)) {
            display[el.cid] = el.style.display;
            el.style.display = isShow ? '' : 'none';
          // the element is hidden through css
          } else el.style.display = isShow ? 'block': 'none';
        }
      });
      return this;
    };
    // ###toggle
    // Toggles the visibility of elements in the DOM by modifying
    // the `display` attribute, if necessary.
    //
    // `returns` cash
    cash.toggle = function() {
      var ary = slice.call(this.q);
      ary.forEach(function(el) {
        getComputedStyle(el).display === 'none' ?
          $(el).show() : $(el).hide();
      });
      return $(ary);
    };
    // ###trigger
    // Given an event type, init a DOM event and dispatch it to each element in the q.
    //
    // `param` {string} `e`
    // `returns` cash
    cash.trigger = function(e) {
      var evt = document.createEvent('Event');
      evt.initEvent(e, true, true);
      this.q.forEach(function(el) {
        el.dispatchEvent && el.dispatchEvent(evt);
      });
      return this;
    };
    // ###width
    // Given a value this method is a setter for each element in the q.
    // If the arg is truthy and a number it is converted to a string with 'px'
    // added, if it is a string nothing is added.
    // Minus that, it returns the width of the 0th item in the q;
    //
    // `param` {number|string} `val`. Optional value to be set
    // `returns` {number|object} The height if a getter, cash if a setter
    cash.width = function(val) {return this._hw_('width', val);};

    // Not checking for window ATM, or trying to play nice
    win.$ = cash;
}(window));