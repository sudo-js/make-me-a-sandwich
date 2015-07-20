var Container = require('../container/container');

//##View
//
// Given a template identifier, `data.template`, use that for content
// Given a shadow host, `data.shadowHost`, create shadow root there
//
class View extends Container {
  constructor(data) {
    super();

    this.role = 'view';
    this.data = data;
    this.preRender();
  }

  // ###preRender
  // Locate the template tag, create the shodow root etc...
  preRender() {
    // if my .template is a string identifier, locate it
    if(typeof this.data.template === 'string') {
      // locate the template host, can be in the main doc or an import
      let tmplHost;
      if (this.data.import) {
        tmplHost = document.querySelector(this.data.import).import;
      } else tmplHost = document;
      // now the actual template
      this.template = tmplHost && tmplHost.querySelector(this.data.template);
    } // else we will assume an actual template ref was passed in

    // the eventual location, assumed to be in the main doc
    this.host = document.querySelector(this.data.shadowHost);
    if (this.host && ("createShadowRoot" in this.host)) {
      this.root = this.host.createShadowRoot();
    }
  }
}
