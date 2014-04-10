/*jsl:declare __dirname*/

var fs = require('fs'),
  $ = require('sudoclass');

// TODO chdir into build/ ?

/**
 * Node module which holds the path information
 */
var Pathfinder = function(config) {
  this.construct();
  // set the defaults first
  this.sets({
    // the directory this script is in
    dirname: __dirname,
    rel_build_path: '..',
    rel_root_path: '../..',
    rel_debug_path: '../debug',
    rel_wrap_path: '../../wrap'
  });
  // the config can override these
  if(config) this.sets(config);
  // paths can be set now
  this.sets({
    build_path: fs.realpathSync(this.get('rel_build_path')),
    root_path: fs.realpathSync(this.get('rel_root_path')),
    debug_path: fs.realpathSync(this.get('rel_debug_path')),
    wrap_path: fs.realpathSync(this.get('rel_wrap_path'))
  });	
};

Pathfinder.prototype = Object.create($.Model.prototype);

module.exports = Pathfinder;
