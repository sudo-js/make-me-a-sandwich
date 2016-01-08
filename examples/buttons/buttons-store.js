var Store = require('../../store/store');
var dispatcher = require('./buttons-dispatcher');

class TestStore extends Store {
  constructor() {
    super();
    this.register(dispatcher);

    this.sets({oneHappened: 0, twoHappened: 0});
  }

  handleDispatch(payload) {
    if (payload.type === 'buttonPress') {
      // if there were more than 2 we'd switch...
      if (payload.identifier === 'event-one') this.data.oneHappened += 1;
      else this.data.twoHappened += 1;

      this.data.currentEvent = payload.identifier;
      this.emit('change');
    }
  }

  getCurrentEvent() {
    let event = this.data.currentEvent;

    return {
      event: event,
      count: event === 'event-one' ? this.data.oneHappened :
        this.data.twoHappened
    };
  }
}

module.exports = new TestStore;
