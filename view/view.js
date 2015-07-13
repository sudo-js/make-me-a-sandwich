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
    // locate the template
    this.tmpl = document.querySelector(this.data.template);
    // the eventual location
    this.host = document.querySelector(this.data.shadowHost);
    if (this.host && ("createShadowRoot" in this.host)) {
      this.root = this.host.createShadowRoot();
    }
  }
}
