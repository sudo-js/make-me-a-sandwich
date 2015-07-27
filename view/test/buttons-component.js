var View = require('../view');

class Buttons extends View {
  addedToParent(parent) {
    super.addedToParent(parent);

    // listen at the container level as a delegate
    this.host.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(e) {
    // which button was clicked?
    // console.log('button clicked: ' + e.target.name);
    if (e.target.name) {
      this.send('buttonPressed', e.target.name);
    }
  }
}

module.exports = Buttons;
