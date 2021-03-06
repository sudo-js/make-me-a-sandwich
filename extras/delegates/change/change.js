/*global create*/

//##Change Delegate

// Delegates, if present, can override or extend the behavior
// of objects. The change delegate is specifically designed to
// filter change records from an Observable instance and only forward
// the ones matching a given `filters` criteria (key or path).
// The forwarded messages will be sent to the specified method
// on the delegates `delegator` (bound to the _delegator_ scope)
//
// `param` {Object} data
sudo.delegates.Change = function(data) {
  this.construct(data);
};
// Delegates inherit from the Filtered Delegate
sudo.delegates.Change.prototype = create(sudo.delegates.Filtered.prototype);
// ###filter
// Change records are delivered here and filtered, calling any matching
// methods specified in `this.get('filters')`.
//
// `returns` {Object} a call to the specified _delegator_ method, passing
// a hash containing:
// 1. the `type` of Change
// 2. the `name` of the changed property
// 3. the value located at the key/path
// 4. the `oldValue` of the key if present
// 5. the `object` that was changed
sudo.delegates.Change.prototype.filter = function filter(change) {
  var filters = this.data.filters, name = change.name,
    type = change.type, obj = {object: change && change.object};
  // does my delegator care about this?
  if(name in filters && filters.hasOwnProperty(name)) {
    // assemble the object to return to the method
    obj.type = type;
    obj.name = name;
    obj.oldValue = change.oldValue;
    // delete operations will not have any value so no need to look
    if(type !== 'deleted') {
      obj.value = !~name.indexOf('.') ? change.object[change.name] :
        sudo.getPath(name, change.object);
    }
    return this.delegator[filters[name]].call(this.delegator, obj);
  }
};
// `private`
sudo.delegates.Change.prototype.role = 'change';
