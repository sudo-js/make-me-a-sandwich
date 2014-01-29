// ###getXhr
// While getting a new XMLHttpRequest is standardized now, we are still going 
// to provide this syntactic sugar to allow the setting of global headers (will
// be set on each request) as well as the onload, onerrer, and onloadend callbacks
// to be set with one call.
// Does not have a default for params.url all others are:
//   {
//     verb: 'GET',
//     responseType: 'text',
//     url: mandatory,
//     params: optional,
//     onload: _.noop,
//     onerrer: optional,
//     onloadend: optional,
//     user: optional,
//     password: optional
//   }
// If the verb is 'GET' and params is truthy it will be appended to the url as a 
// queryString (after being serialized if a hash -- assumed to be a string if not).
// This method does not call send() so do that once you have the xhr back, remember
// to set any pertinant MIME types if sending data via setRequestHeader (unless its 
// already in the sudo.xhrHeaders).
//
// `param` {object} attributes for the XHR
// `returns` {object} the xhr object
sudo.getXhr = function getXhr(params) {
  var xhr =  new XMLHttpRequest(), keys = Object.keys(sudo.xhrHeaders),
    len = keys.length, i;
  params.verb || (params.verb = 'GET');
  // check if we need a QS
  if(params.verb === 'GET' && params.params) {
    // assumed to be an object literal
    if(typeof params.params !== 'string') params.params = Object.serialize(params.params);
    params.url += ('?' + params.params);
  }
  xhr.open(params.verb, params.url, true, params.user, params.password);
  // TODO possibly implement the mime type song and dance in the xhr2 world
  xhr.setRequestHeader('Accept', '*/*');
  // set any custom headers
  if(len) for(i = 0; i < len; i++) xhr.setRequestHeader(keys[i], sudo.xhrHeaders[keys[i]]);
  xhr.responseType = params.responseType || 'text';
  xhr.onload = params.onload || sudo.noop;
  if(params.onerror) xhr.onerror = params.onerror;
  if(params.onloadend) xhr.onloadend = params.onloadend;
  return xhr;
};
// ###xhrHeaders
// Any 'global' headers that should go out with every XHR request 
sudo.xhrHeaders = {};