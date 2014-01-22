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