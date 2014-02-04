// #Sudo Namespace
var sudo = {
  // Namespace for `Delegate` Class Objects used to delegate functionality
  // from a `delegator`
  //
  // `namespace`
  delegates: {},
  // The sudo.extensions namespace holds the objects that are stand alone `modules` which
  // can be `implemented` (mixed-in) in sudo Class Objects
  //
  // `namespace`
  extensions: {},
  // ###getPath
  // Extract a value located at `path` relative to the passed in object
  //
  // `param` {String} `path`. The key in the form of a dot-delimited path.
  // `param` {object} `obj`. An object literal to operate on.
  //
  // `returns` {*|undefined}. The value at keypath or undefined if not found.
  getPath: function getPath(path, obj) {
    var key, p;
    p = path.split('.');
    for (key; p.length && (key = p.shift());) {
      if(!p.length) return obj[key];
      else obj = obj[key] || {};
    }
    return obj;
  },
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
  getXhr: function(params) {
    var xhr =  new XMLHttpRequest(), keys = Object.keys(sudo.xhrHeaders),
      len = keys.length, i;
    params.verb || (params.verb = 'GET');
    // check if we need a QS
    if(params.verb === 'GET' && params.params) {
      // assumed to be an object literal
      if(typeof params.params !== 'string') params.params = Object.serialize(params.params);
      params.url += ('?' + params.params);
    }
    xhr.responseType = params.responseType || 'text';
    xhr.open(params.verb, params.url, true, params.user, params.password);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    // so that some common use-case request headers can be set automagically, for blob, 
    // document, buffer and others handle manually after getting the xhr back.
    if(xhr.responseType === 'text') {
      // could be json or plain string TODO expand this to a hash lookup for other types later
      if(params.contentType && params.contentType === 'json') {
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        // TODO does this work as expected?
      } else {
        xhr.setRequestHeader('Accept', 'text/plain');
        xhr.setRequestHeader('Content-Type', 'text/plain');
      }
    }
    // set any custom headers
    if(len) for(i = 0; i < len; i++) xhr.setRequestHeader(keys[i], sudo.xhrHeaders[keys[i]]);
    // The native xhr considers many status codes a success that we do not, wrap the onload
    // so that we can call success or error based on code
    xhr.onload = function(e) {
      if(this.status >= 200 && this.status < 300 || this.status === 304) this._onload_(e);
      else this.onerror(e);
    };
    xhr._onload_ = params.onload || sudo.noop;
    xhr.onerror = params.onerror || sudo.noop;
    if(params.onloadend) xhr.onloadend = params.onloadend;
    return xhr;
  },
  // ###inherit
  // Inherit the prototype from a parent to a child.
  // Set the childs constructor for subclasses of child.
  // Subclasses of the library base classes will not 
  // want to use this function in *most* use-cases. Why? User Sudo Class Objects
  // possess their own constructors and any call back to a `superclass` constructor
  // will generally be looking for the library Object's constructor.
  //
  // `param` {function} `parent`
  // `param` {function} `child`
  inherit: function inherit(parent, child) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
  },
  // ###makeMeASandwich
  // Notice there is no need to extrinsically instruct *how* to
  // make the sandwich, just the elegant single command.
  //
  // `returns` {string}
  makeMeASandwich: function makeMeASandwich() {return 'Okay.';},
  // ###namespace
  // Method for assuring a Namespace is defined.
  //
  // `param` {string} `path`. The path that leads to a blank Object.
  namespace: function namespace(path) {
    if (!this.getPath(path, window)) {
      this.setPath(path, {}, window);
    }
  },
  // ###premier
  // The premier object takes precedence over all others so define it at the topmost level.
  //
  // `type` {Object}
  premier: null,
  // ###setPath
  // Traverse the keypath and get each object 
  // (or make blank ones) eventually setting the value 
  // at the end of the path
  //
  // `param` {string} `path`. The path to traverse when setting a value.
  // `param` {*} `value`. What to set.
  // `param` {Object} `obj`. The object literal to operate on.
  setPath: function setPath(path, value, obj) {
    var p = path.split('.'), key;
    for (key; p.length && (key = p.shift());) {
      if(!p.length) obj[key] = value;
      else if (obj[key]) obj = obj[key];
      else obj = obj[key] = {};
    }
  },
  // ####uid
  // Some sudo Objects use a unique integer as a `tag` for identification.
  // (Views for example). This ensures they are indeed unique.
  uid: 0,
  // ####unique
  // An integer used as 'tags' by some sudo Objects as well
  // as a unique string for views when needed
  //
  // `param` {string} prefix. Optional string identifier
  unique: function unique(prefix) {
    return prefix ? prefix + this.uid++ : this.uid++;
  },
  // ###unsetPath
  // Remove a key:value pair from this object's data store
  // located at <path>
  //
  // `param` {String} `path`
  // `param` {Object} `obj` The object to operate on.
  unsetPath: function unsetPath(path, obj) {
    var p = path.split('.'), key;
    for (key; p.length && (key = p.shift());) {
      if(!p.length) delete obj[key];
      // this can fail if a faulty path is passed.
      // using getPath beforehand can prevent that
      else obj = obj[key];
    }
  }
};
