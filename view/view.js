var Container = require('../container/container');

//##View
// Given a template identifier, `data.template`, use that for content
// Given a shadow host, `data.shadowHost`, create shadow root there
// Given a template import `data.import`, fetch my template from there
class View extends Container {
  constructor(data) {
    super();

    this.role = 'view';
    this.data = data;
  }

  // ###addedToParent
  // All view components will setup their shadow DOM when added to a container.
  // This does mean that we expect any view component to be housed in a container,
  // whether another view or the top level `Dispatcher`. Steps for setup are:
  //
  // * Locate my template, either in the main document or import it
  // * Locate my Shadow Host, save a ref `this.host`
  // * Create my Shadow Root at the Shadow Host, saved at `this.root`
  // * Clone the template and insert it at the Shadow Root
  //
  // There is a path for a simple, non-templated, non Shadow Dom element. Simply
  // provide a selector via `el` and it will become the `host`. Since the state
  // hydration for temlated (and non) is the same this will work
  addedToParent(parent) {
    let tmplHost, tmpl;
    // if my .template is a string identifier, locate it
    if(typeof this.data.template === 'string') {
      // locate the template host, can be in the main doc or an import
      if (this.data.import) {
        tmplHost = document.querySelector(this.data.import).import;
      } else tmplHost = document;
      // now the actual template
      tmpl = tmplHost && tmplHost.querySelector(this.data.template);
    } // else tmpl = this.data.template; -- do we want to support passing it in?
    let tmplContent = tmpl && document.importNode(tmpl.content, true);
    // the eventual location, assumed to be in the main doc
    this.host = document.querySelector(this.data.shadowHost || this.data.el);
    if (tmplContent && this.host && ("createShadowRoot" in this.host)) {
      this.root = this.host.createShadowRoot();
      // place the template content into the host
      this.root && this.root.appendChild(tmplContent);
    }
  }

  // ###render
  // The insertion of the template at the Shadow Host, in `addedToParent`,
  // sets up our desired "presentation" details with any initial data that may have
  // been present. Calls to render should be the product of changing state in your
  // application, view components reacting to stores emitting change events.
  // As such, a `state` object is expected that can be inspected. If keys in the
  // said hash match attributes of elements in this object's Shadow Host ELement,
  // the values located at those keys will be inserted there. For example,
  // given this markup in the shadow host:
  //    <div id="#fooHost">
  //      <h3></h3>
  //      <span class="foo"></span>
  //    </div>
  //
  // Then passed this `state` object:
  //    { '.foo': 'Bar', h3: 'Foo'}
  //
  // Will result in:
  //    <div id="#fooHost">
  //      <h3>Foo</h3>
  //      <span class="foo">Bar</span>
  //    </div>
  //
  // The actual presentation details, of course, are abstracted away in the
  // Shadow Dom, via your template. NOTE: We do expect that you have processed the
  // values to be inserted down to a simple `textContent` by this point
  render(state) {
    // state and host are mandatory
    if (!this.host || !state) return;
    Object.keys(state).forEach(key => {
      this.host.querySelector(key).textContent = state[key];
    });
    return this;
  }
}

module.exports = View;
