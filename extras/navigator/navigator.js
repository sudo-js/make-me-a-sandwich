/*global slice create*/

// ##Navigator Class Object

// Abstracts location and history events, parsing their information into a
// normalized object that is then set to an Observable class instance
//
// `constructor`
sudo.Navigator = function(data) {
  this.started = false;
  this.slashStripper = /^\/+|\/+$/g;
  this.leadingStripper = /^[#\/]|\s+$/g;
  this.trailingStripper = /\/$/;
  this.construct(data);
};
// Navigator inherits from `sudo.Model`
sudo.Navigator.prototype = create(sudo.Model.prototype);
// ###buildPath
// Put together a path from the arguments passed in.
// If you want a hash paramaterized pass it as the last arg.
//
// `params` {*} N number of path fragments
// `returns` {string} /a/completed/path?withParams=ifPresent
sudo.Navigator.prototype.buildPath = function() {
  var args = slice.call(arguments), query;
  // check if the last arg is a hash
  if($.isObject(args[args.length - 1])) {query = this.getQuery(args.pop());}
  return this.data.root + args.join('/') + (query || '');
};
// ###buildRelativePath
// Extend the already existing getUrl type functionality with the ability to append
// to that path as well as paramaterize a hash
//
// `params` {*} N number of path fragments
// `returns` {string} /a/completed/path?withParams=ifPresent
sudo.Navigator.prototype.buildRelativePath = function() {
  var args = slice.call(arguments);
  args.unshift(this.data.fragment);
  return this.buildPath.apply(this, args);
};
// ###getFragment
// 'Fragment' is defined as any URL information after the 'root' path
// including the `search` or `hash`
//
// `returns` {String} `fragment`
// `returns` {String} the normalized current fragment
sudo.Navigator.prototype.getFragment = function(fragment) {
  var root = this.data.root;
  if(!fragment) {
    // intentional use of coersion
    if (this.isPushState) {
      fragment = window.location.pathname + window.location.search;
      root = root.replace(this.trailingStripper, '');
      if(!fragment.indexOf(root)) fragment = fragment.substr(root.length);
    } else {
      fragment = this.getHash();
    }
  }
  return decodeURIComponent(fragment.replace(this.leadingStripper, ''));
};
// ###getHash
// Check either the passed in fragment, or the full location.href
// for a `hash` value
//
// `param` {string} `fragment` Optional fragment to check
// `returns` {string} the normalized current `hash`
sudo.Navigator.prototype.getHash = function(fragment) {
  fragment || (fragment = window.location.href);
  var match = fragment.match(/#(.*)$/);
  return match ? match[1] : '';
};
// ###getQuery
// Take a hash and convert it to a `search` query
//
// `param` {object} `obj`
// `returns` {string} the serialized query string
sudo.Navigator.prototype.getQuery = function(obj) {
  return '?' + ($.serialize(obj));
};

// ###getSearch
// Check either the passed in fragment, or the full location.href
// for a `search` value
//
// `param` {string} `fragment` Optional fragment to check
// `returns` {String} the normalized current `search`
sudo.Navigator.prototype.getSearch = function(fragment) {
  fragment || (fragment = window.location.href);
  var match = fragment.match(/\?(.*)$/);
  return match ? match[1] : '';
};
// ###getUrl
// fetch the URL in the form <root + fragment>
//
// `returns` {String}
sudo.Navigator.prototype.getUrl = function() {
  // note that delegate(_role_) returns the deleagte
  return this.data.root + this.data.fragment;
};
// ###go
// If the passed in 'fragment' is different than the currently stored one,
// push a new state entry / hash event and set the data where specified.
// If the second argument is true and pushState is being used, replaceState
// rather than pushing a new state onto window.history.
//
// `param` {string} `fragment`
// `param` {boolean} `bool`
// `returns` {*} call to `setData`
sudo.Navigator.prototype.go = function(fragment, bool) {
  if(!this.started) return false;
  if(!this.urlChanged(fragment)) return;
  if(this.isPushState) {
    window.history[bool ? 'replaceState' : 'pushState']({}, document.title, this.getUrl());
  } else if(this.isHashChange) {
    window.location.hash = '#' + this.data.fragment;
  }
  return this.setData();
};
// ###handleChange
// Bound to either the `popstate` or `hashchange` events, if the
// URL has indeed changed then parse the relevant data and set it -
// triggering change observers
//
// `returns` {*} call to `setData` or undefined
sudo.Navigator.prototype.handleChange = function() {
  if(this.urlChanged()) {
    return this.setData();
  }
};
// ###parseQuery
// Parse and return a hash of the key value pairs contained in
// the current `query` if there is one
//
// `returns` {object}
sudo.Navigator.prototype.parseQuery = function() {
  return this.data.query && $.deserialize(this.data.query);
};
// ###setData
// Using the current `fragment` (minus any search or hash data) as a key,
// use `parseQuery` as the value for the key, setting it into the specified
// model (a stated `Observable` or `this.data`)
//
// `returns` {object} `this`
sudo.Navigator.prototype.setData = function() {
  var frag = this.data.fragment,
    // data is set in a specified model or in self
    observable = this.data.observable || this;
  if(this.data.query) {
    // we want to set the key minus any search/hash
    frag = ~frag.indexOf('?') ? frag.split('?')[0] : frag.split('#')[0];
  }
  observable.set(frag, this.parseQuery());
  return this;
};
// ###start
// Gather the necessary information about the current environment and
// bind to either (push|pop)state or hashchange.
// Also, if given an imcorrect URL for the current environment (hashchange
// vs pushState) normalize it and set accordingly (or don't).
//
// `returns` {object} `this`
sudo.Navigator.prototype.start = function() {
  var hasPushState, atRoot, tmp;
  if(this.started) return;
  hasPushState = window.history && window.history.pushState;
  this.started = true;
  // setup the initial configuration
  this.isHashChange = this.data.useHashChange && 'onhashchange' in window ||
    (!hasPushState && 'onhashchange' in window);
  this.isPushState = !this.isHashChange && !!hasPushState;
  // normalize the root to always contain a leading and trailing slash
  this.data.root = ('/' + this.data.root + '/').replace(this.slashStripper, '/');
  // Get a snapshot of the current fragment
  this.urlChanged();
  // monitor URL changes via popState or hashchange
  if (this.isPushState) {
    $(window).on('popstate', this.handleChange.bind(this));
  } else if (this.isHashChange) {
    $(window).on('hashchange', this.handleChange.bind(this));
  } else return;
  atRoot = window.location.pathname.replace(/[^\/]$/, '$&/') === this.data.root;
  // somehow a URL got here not in my 'format', unless explicitly told not too, correct this
  if(!this.data.stay) {
   if(this.isHashChange && !atRoot) {
      window.location.replace(this.data.root + window.location.search + '#' +
        this.data.fragment);
      // return early as browser will redirect
      return true;
      // the converse of the above
    } else if(this.isPushState && atRoot && window.location.hash) {
      tmp = this.getHash().replace(this.leadingStripper, '');
      window.history.replaceState({}, document.title, this.data.root +
        tmp + window.location.search);
    }
  }
  // TODO provide option to `go` from inital `start` state?
  return this;
};
// ###urlChanged
// Is a passed in fragment different from the one currently set at `this.get('fragment')`?
// If so set the fragment to the passed fragment passed in (as well as any 'query' data), else
// simply return false
//
// `param` {String} `fragment`
// `returns` {bool}
sudo.Navigator.prototype.urlChanged = function(fragment) {
  var current = this.getFragment(fragment);
  // nothing has changed
  if (current === this.data.fragment) return false;
  this.data.fragment = current;
  // the fragment and the href need to checked here, optimized for the 'go' scenario
  this.data.query = this.getSearch(current) || this.getHash(current);
  return true;
};
