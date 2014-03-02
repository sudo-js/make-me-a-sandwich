//##Data Delegate

// Delegates, if present, can extend the behavior
// of objects, lessening the need for subclassing. 
// The data delegate is specifically designed to
// filter through an object, looking for specified keys or paths
// and returning values for those if found
//
// `param` {Object} data
// `returns` {*} the value found at the specified key/path if found
sudo.delegates.Data = function(data) {
  this.construct(data);
};
// inherits from the Filtered Delegate
sudo.delegates.Data.prototype = Object.create(sudo.delegates.Filtered.prototype);
// ###filter
// iterates over a given object literal and returns a value (if present)
// located at a given key or path
//
// `param` {Object} `obj`
sudo.delegates.Data.prototype.filter = function(obj) {
  var filters = this.data.filters, sl, o;
  Object.keys(filters).forEach(function(k) {
    // keys and paths need different handling
    if(k.indexOf('.') === -1) {
      if(k in obj) this.delegator[filters[k]].call(this.delegator, obj[k]);	
    } else {
      // the chars after the last refinement are the key we need to check for
      sl = k.slice(k.lastIndexOf('.') + 1);
      // and the ones prior are the object
      o = sudo.getPath(k.slice(0, k.lastIndexOf('.')), obj);
      if(o && sl in o) this.delegator[filters[k]].call(this.delegator, o[sl]);
    }
  }.bind(this));
};
// `private`
sudo.delegates.Data.prototype.role = 'data';

