// ##Delegates mixin
// Used by the two base classes, Base and Emitterbase
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
