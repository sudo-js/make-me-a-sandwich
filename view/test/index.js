var Store = require ('./test-store');
var Dispatcher = require('./test-dispatcher');
var Buttons = require('./buttons-component');
// var Main = require('./main-component');

var store = new Store();
var dispatcher = new Dispatcher();

// store knows how to register with the dispatcher
store.register(dispatcher);
// the dispatcher listents for store emit change here, and passes data to the main child
store.on('emit', dispatcher.handleEmit.bind(dispatcher));

// not a templated view component, pass it an 'el'
var buttons = new Buttons({el: '#button-content'});
// is a templated view, pass in the file to import
// var main = new Main({template: 'template', import: '#main-content-template'});
// dispatcher is the root object, parent of all children
dispatcher.addChildren([buttons]);
