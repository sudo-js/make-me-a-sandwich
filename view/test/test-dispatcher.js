var Dispatcher = require('../../dispatcher/dispatcher');

class TestDispatcher extends Dispatcher {
  // send target for button component
  buttonPressed(name) {
    console.log('send target hit');
    // which button was pressed ?
    this.dispatch({action: 'buttonPress', identifier: name});
  }
  
}

module.exports = TestDispatcher;
