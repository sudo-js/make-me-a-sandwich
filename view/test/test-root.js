var Container = require('../../container/container');

var dispatcher = require('./test-dispatcher');
var store = require('./test-store');
var Buttons = require('./buttons-component');
var Main = require('./main-component');

class Root extends Container {
  constructor() {
    super();
    // we can listen for store changes here
    store.on('change', this.handleEmit.bind(this));
    // i am the root node, so add some children
    this.setupChildren();
  }
  // send target for button component
  buttonPressed(name) {
    // which button was pressed ?
    dispatcher.dispatch({ type: 'buttonPress', identifier: name });
  }

  handleEmit() {
    let data = store.getCurrentEvent();
    // i'll direct the payload to the correct child, could
    // be naive here and let the child decide by just blindly calling update
    // on each child, either is fine imo...
    this.getChild('main').update(data);
  }

  setupChildren() {
    // passed `el` as it's a  non-templated view component
    this.addChild(new Buttons({el: '#button-content'}), 'buttons');

    this.addChild(new Main({
      shadowHost: '#main-content',
      template: '#main',
      import: '#main-content-template'
    }), 'main');
  }
}

module.exports = new Root;
