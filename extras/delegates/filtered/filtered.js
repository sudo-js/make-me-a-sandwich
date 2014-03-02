//##Filtered Delegate

// The base type for both the Data and Change delegates.
//
// `param` {Object} data
sudo.delegates.Filtered = function(data) {
  sudo.Base.call(this);
  this.data = data;
};
// The filtered delegate
sudo.inherit(sudo.Base, sudo.delegates.Filtered);
// ###addFilter
// Place an entry into this object's hash of filters
//
// `param` {string} `k`
// `param` {string} `v`
// `returns` {object} this
sudo.delegates.Filtered.prototype.addFilter = function addFilter(k, v) {
  this.data.filters[k] = v;
  return this;
};
// ###removeFilter
// Remove an entry from this object's hash of filters
//
// `param` {string} `k`
// `returns` {object} this
sudo.delegates.Filtered.prototype.removeFilter = function removeFilter(k) {
  delete this.data.filters[k];
  return this;
};
// `private`
sudo.delegates.Filtered.prototype.role = 'filtered';
