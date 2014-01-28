// Minimal Static.js build for sudo.js, you can, of course use the full build or
// any permutation of it (as long as these ore there) https://github.com/sudo-js/static
(function(window) {
// ###deserialize
// Placed on the Object Object to allow a 'paramaterized' string to be turned
// into a hash and returned
//
// `param` {string} `str`
// `returns` {object}
Object.deserialize = function deserialize(str) {
  var obj = {}, seg = str.split('&'), i, s;
  for(i = 0; i < seg.length; i++) {
    if(!seg[i]) continue;
    s = seg[i].split('=');
    obj[s[0]] = s[1];
  }
  return obj;
};
// ###extend
// Copy the (non-inherited) key:value pairs from <n> source objects to a single target object.
//
// `params` {objects} A target object followed by <n> source objects
// `returns` {object} A single object
Object.extend = function extend() {
  var args = Array.prototype.slice.call(arguments),
    targ = args.shift(), i, obj, keys;
  // iterate over each passed in obj remaining
  for(obj; args.length && (obj = args.shift());) {
    keys = Object.keys(obj);
    for(i = 0; i < keys.length; i++) {
      targ[keys[i]] = obj[keys[i]];
    }
  }
  return targ;
};
// ###serialize
// Placed on the Object Object to allow a hash of data to be turned into a 
// 'paramaterized' string and returned.
//
// `param` {object} `obj`
// `returns` {string}
Object.serialize = function serialize(obj) {
  var keys = Object.keys(obj), len = keys.length, params = [], i;
  params.add = function(k, v) {this.push(window.escape(k) + '=' + window.escape(v));};
  for (i = 0; i < len; i++) {params.add(keys[i], obj[keys[i]]);}
  return params.join('&').replace(/%20/g, '+');
};
// ###matches (Element)
// Unfortunately the matchesSelector methods are all hidden behind prefixes ATM.
// set the useable one, if not, then return the bool.
//
// `param` {element} `el`. A DOM 1 nodetype
// `param` {string}  `sel`. A CSS selector
// `returns` {bool}
Element.matches = function matches(el, sel) {
  if (el.nodeType !== 1) return false;
  // normalize the native selector match fn until all the prefixes are dropped
  if(!window._normalizedMatchesSelector_) {
    window._normalizedMatchesSelector_ = el.webkitMatchesSelector || el.mozMatchesSelector ||
    el.msMatchesSelector || el.oMatchesSelector || el.matchesSelector;
  }
  return window._normalizedMatchesSelector_.call(el, sel);
};
window._staticJsVersion_ = "0.1.1";

}).call(this, this);