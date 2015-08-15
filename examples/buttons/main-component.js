var View = require('../view');

class Main extends View {
  constructor(data) {
    super(data);

    this.CLICKTEXT = 'Clicked!';
    this.NOTCLICKED = 'aww...';
  }
  // map the recieved dispatch data to what my render can use
  update(data) {
    // class 'targets' depend on which event happened
    let isOne = data.event === 'event-one';

    let state = {
      '.one-notification': isOne ? this.CLICKTEXT : this.NOTCLICKED,
      '.two-notification': isOne ? this.NOTCLICKED : this.CLICKTEXT
    };

    let count = isOne ? '.one-count': '.two-count';
    state[count] = data.count;

    this.mergeState(state);
  }
}

module.exports = Main;
