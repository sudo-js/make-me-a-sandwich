// ##View Class Object

// Create an instance of a sudo.View object. A view is any object
// that maintains its own `el`, that being some type of DOM element.
// Pass in a string selector or an actual dom node reference to have the object
// set that as its `el`. If no `el` is specified one will be created upon instantiation
// based on the `tagName` (`div` by default). Specify `className`, `id` (or other attributes if desired)
// as an (optional) `attributes` object literal on the `data` arg.
//
// The view object uses some jbone for dom manipulation
// and event delegation etc... A `this` reference is located
// at `this.el` and `this.qs` scopes queries to this objects `el`, i.e it's
// a shortcut for `this.el.querySelector(selector)`
// in addition `this.qsa` does the same for the querySelectorAll method
//
// `param` {string|element|query} `el`. Otional el for the View instance.
// `param` {Object} `data`. Optional data object-literal which becomes the initial state
// of a new model located at `this.model`. Also can be a reference to an existing sudo.Model instance
//
// `constructor`
sudo.View = function(el, data) {
  sudo.Container.call(this);
  // allow model instance to be passed in as well
  if(data) {
    this.model = data.role === 'model' ? data :
      this.model = new sudo.Model(data);
  } 
  this.setEl(el);
};
// View inherits from Container
// `private`
sudo.inherit(sudo.Container, sudo.View);
// ###becomePremier
// Premier functionality provides hooks for behavioral differentiation
// among elements or class objects.
//
// `returns` {Object} `this`
sudo.View.prototype.becomePremier = function becomePremier() {
  var p, f = function() {
      this.isPremier = true;
      sudo.premier = this;
    }.bind(this);
  // is there an existing premier that isn't me?
  if((p = sudo.premier) && p.uid !== this.uid) {
    // ask it to resign and call the cb
    p.resignPremier(f);
  } else f(); // no existing premier
  return this;
};
// the el needs to be normalized before use
// `private`
sudo.View.prototype._normalizedEl_ = function _normalizedEl_(el) {
  var _el = typeof el === 'string' ? document.querySelector(el) : el;
    // if there is not a top level query returned the desired node may be 
    // in a document fragment not in the DOM yet. We will check the parent's el
    // if available, or return the empty query
    return _el ? _el : (this.parent ? this.parent.qs(el) : _el);
};
// ### resignPremier
// Resign premier status
//
// `param` {Function} `cb`. An optional callback to execute
// after resigning premier status.
// `returns` {Object} `this`
sudo.View.prototype.resignPremier = function resignPremier(cb) {
  var p;
  this.isPremier = false;
  // only remove the global premier if it is me
  if((p = sudo.premier) && p.uid === this.uid) {
    sudo.premier = null;
  }
  // fire the cb if passed
  if(cb) cb();
  return this;
};
// `private`
sudo.View.prototype.role = 'view';
// ###setEl
// A view must have an element, set that here.
// Node is always then available as `this.el`.
//
// `param` {string=|element} `el`
// `returns` {Object} `this`
sudo.View.prototype.setEl = function setEl(el) {
  var d = this.model && this.model.data, a, i, k, t;
  if(!el) {
    // normalize any relevant data
    t = d ? d.tagName || 'div': 'div';
    this.el = document.createElement(t);
    if(d && (a = d.attributes)) {
      // iterate and set the attributes
      k = Object.keys(a);
      for(i = 0; i < k.length; i++) {
        this.el.setAttribute(k[i], a[k[i]]);
      }
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
