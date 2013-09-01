//##Filtered Delegate

// The base type for both the Data and Change delegates.
//
// `param` {Object} data
sudo.delegates.Filtered = function(data) {
  sudo.Model.call(this, data);
};
// The filtered delegate
sudo.inherit(sudo.Model, sudo.delegates.Filtered);
// ###addFilter
// Place an entry into this object's hash of filters
//
// `param` {string} `key`
// `param` {string} `val`
// `returns` {object} this
sudo.delegates.Filtered.prototype.addFilter = function addFilter(key, val) {
  this.data.filters[key] = val;
  return this;
};
// ###removeFilter
// Remove an entry from this object's hash of filters
//
// `param` {string} `key`
// `returns` {object} this
sudo.delegates.Filtered.prototype.removeFilter = function removeFilter(key) {
  delete this.data.filters[key];
  return this;
};
// `private`
sudo.delegates.Filtered.prototype.role = 'filtered';
