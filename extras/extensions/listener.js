// ##Listener Extension Object

// Handles event binding/unbinding via an events array in the form:
// events: [{
//	on: `eventName`,
//	sel: `an_optional_delegator`,
//  data: an_optional_hash_of_data,
//	fn: `function name`
// }, {...
//	This array will be searched for via `this.data.events`. There is a 
//	single-event use case as well, pass a single object literal in the above form.
//	with the key `event`:
//	event: {...same as above}
//	Details about the hashes in the array:
//	A. on -> DOM compatible event name
//	B. sel -> Optional DOM compatible selector used to delegate events
//  C. data: A hash that will be passed as the custom Event.data object
//	D. fn -> If a {String} bound to the named function on this object, if a 
//		function assumed to be anonymous and called with no scope manipulation
sudo.extensions.listener = {
  // ###bindEvents
  // Bind the events in the data store to this object's el
  //
  // `returns` {Object} `this`
  bindEvents: function bindEvents() {
    var e;
    if((e = this.data.event || this.data.events)) this._handleEvents_(e, 1);
    return this;
  },
  // Use the cash `on` or 'off' method, optionally delegating to a selector if present
  // `private`
  _handleEvents_: function _handleEvents_(e, which) {
    Array.isArray(e) ? 
      e.forEach(function(ev) {this._handleEvent_(ev, which);}.bind(this)) :
      this._handleEvent_(e, which);
  },
  // helper for binding and unbinding an individual event
  // `param` {Object} e. An event descriptor
  // `param` {String} which. `on` or `off`
  // `private`
  _handleEvent_: function _handleEvent_(e, which) {
    which ?
      $(this.el).on(e.on, typeof e.fn === 'string' ? this[e.fn].bind(this) : e.fn, e.sel, e.data) :
      // do not send the fn going to off otherwise the unbind will fail
      // because of how we bind the string names, if this is ever an issue we
      // can hash them and look it up, but I don't see that as necessary atm
      $(this.el).off(e.on);
  },
  // ###rebindEvents
  // Convenience method for `this.unbindEvents().bindEvents()`
  //
  // 'returns' {object} 'this'
  rebindEvents: function rebindEvents() {
    return this.unbindEvents().bindEvents();
  },
  // ###unbindEvents
  // Unbind the events in the data store from this object's el
  //
  // `returns` {Object} `this`
  unbindEvents: function unbindEvents() {
    var e;
    if((e = this.data.event || this.data.events)) this._handleEvents_(e);
    return this;
  }
};
