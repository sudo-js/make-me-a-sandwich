// ##DataView Class Object

// Create an instance of an Object, inheriting from sudo.View that:
// 1. Expects to have a template located in its internal data Store accessible via `this.model.get('template')`.
// 2. Can have a `renderTarget` property in its data store. If so this will be the location
//		the child injects itself into (if not already in) the DOM
// 3. Can have a 'renderMethod' property in its data store. If so this is the DOM method
//		that the child will use to place itself in it's `renderTarget`.
// 4. Has a `render` method that when called re-hydrates it's el by passing its
//		internal data store to its template
// 5. Handles event binding/unbinding by implementing the sudo.extensions.listener
//		extension object
//
//`constructor`
sudo.DataView = function(el, data) {
  sudo.View.call(this, el, data);
  // implements the listener extension
  $.extend(this, sudo.extensions.listener);
  // dont autoRender on the setting of events,
  this.modelChangeBlacklist = {event: true, events: true};
  // renderOnModelChange types observe their own model
  if(this.model.data.renderOnModelChange) {
    if(!this.model.observe) $.extend(this.model, sudo.extensions.observable);
  }
};
// `private`
sudo.inherit(sudo.View, sudo.DataView);
// ###addedToParent
// Container's will check for the presence of this method and call it if it is present.
// Options affecting this method are: 
// `renderOnModelChange`: render not called until this view's model is changed via
// a `set`, `sets` or `unsets` operation.
// `renderOnAddedToParent`: render is called from this method.
// If neither is set in this view's model it is up to the developer to call render().
// Regardless of the rendering options any events in the `event(s)` property are bound
//
// `param` {object} `parent` this view's parent
// `returns` {object} `this`
sudo.DataView.prototype.addedToParent = function(parent) {
  this.bindEvents();
  // these two are not necessarily exclusive
  if(this.model.data.renderOnModelChange) this.observer = this.model.observe(this.render.bind(this));
  if(this.model.data.renderOnAddedToParent) return this.render();
  return this;
};
// ###removeFromParent
// Remove this object from the DOM and its parent's list of children.
// Overrides `sudo.View.removeFromParent` to unbind events and `remove` its el 
//
// `returns` {Object} `this`
sudo.DataView.prototype.removeFromParent = function removeFromParent() {
  this.parent.removeChild(this);
  this.unbindEvents();
  this.el.parentNode && this.el.parentNode.removeChild(this.el);
  // in the case that this.model is 'foreign'
  if(this.observer) {
    this.model.unobserve(this.observer);
    delete this.observer;
  }
  return this;
};
// ###render
// (Re)hydrate the innerHTML of this object via its template and data store.
// If a `renderTarget` is present this Object will inject itself into the target via
// `this.get('renderMethod')` or defualt to `appendChild`. After injection, the `renderTarget`
// is deleted from this Objects data store (to prevent multiple injection).
// Event unbinding/rebinding is generally not necessary for the Objects innerHTML as all events from the
// Object's list of events (`this.get('event(s)'))` are delegated to the el when added to parent.
//
// `param` {object} `change` dataviews may be observing their model if `renderOnModelChange: true`
//
// `returns` {Object} `this`
sudo.DataView.prototype.render = function render(change) {
  // return early if a `blacklisted` key is set to my model
  if(change && this.modelChangeBlacklist[change.name]) return this;
  var d = this.model.data;
  // (re)hydrate the innerHTML
  if(typeof d.template === 'string') d.template = sudo.template(d.template);
  this.el.innerHTML = d.template(d);
  // am I in the dom yet?
  if(d.renderTarget) {
    this._normalizedEl_(d.renderTarget)[d.renderMethod || 'appendChild'](this.el);
    delete d.renderTarget;
  }
  return this;
};
// `private`
sudo.DataView.prototype.role = 'dataview';
