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
