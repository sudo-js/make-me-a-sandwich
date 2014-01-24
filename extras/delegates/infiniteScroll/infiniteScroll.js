sudo.delegates.infiniteScroll = function(opts) {
  opts || (opts = {});
  // how far from the bottom until calling scroll action?
  this.trigger = opts.trigger || 10;
  // if truthy will trigger on distance from the TOP of the scrollable
  this.inverted = !!opts.inverted;
  // if only a certain Element is to be scrolled, not the default 'window'
  // can be a string selector (assumed to be in the scope of the delegator)
  // normalized further in the addedAsDelegate method. In a mobile scenario
  // this shourd be falsey
  this.scrollable = opts.scrollable || window;
  // the element that contains the scrollable, defalts to the outer wrapper,
  // same rules as the scrollable
  this.container = opts.container || document.querySelector('.main-content');
  // we must retain a ref to the bound function so we can remove it
  this._boundScroll = this.scrolled.bind(this);
  // normalize the correct operations for measuring height
};

sudo.delegates.infiniteScroll.prototype = {
  addedAsDelegate: function addedAsDelegate(delegator) {
    // normalize the passed in scrollable and container if present
    if(typeof this.scrollable === 'string') this.scrollable = delegator.$(this.scrollable);
    if(typeof this.container === 'string') this.container = delegator.$(this.container);
    // in the inverted case, do not setup until called. this is because unless the 
    // scrollable has been moved to the bottom, any scroll would trigger the call to infiniteScrollAction
    if(!this.inverted) this.setUp();
  },
  // all delegates require a role which the delegator can use 
  // when using this.delagate(<role>)...
  role: 'infiniteScroll',
  // common to either the inverted case or non-inverted 
  scroll: Function.debounce(function(e) {
    this.scrollable.removeEventListener('scroll', this._boundScroll);
    this.isListening = false;
    if('infiniteScrollAction' in this.delegator) {
      // pass my setup so the delegator can rebind if desired
      this.delegator.infiniteScrollAction(this.setUp.bind(this));
    }
  }, 300, true),
  // ---
  scrolled: function scrolled(e) {
    if(this.inverted) {
      if(this.scrollable.scrollTop <= this.trigger) this.scroll();
    } else {
      if(this.scrollable.scrollTop + this.trigger >= (sudo.getHeight(this.container) - sudo.getHeight(this.scrollable))) this.scroll();
    }
  },
  // sets up the scroll listening
  setUp: function setUp() {
    if(!this.isListening) {
      this.scrollable.addEventListener('scroll', this._boundScroll);
      this.isListening = true;
    }
    return this;
  },
  // when being unloaded the delegator should
  // make sure the scroll listener is off
  tearDown: function tearDown() {
    this.scrollable.removeEventListener('scroll', this._boundScroll);
    return this;
  },
  // force the scroll to the bottom of the scrollable
  toBottom: function toBottom() {
    this.scrollable.scrollTop = this.scrollable.scrollHeight;
    return this;
  },
  // force the scroll to the top of the scrollable
  toTop: function toTop() {
    this.scrollable.scrollTop = 0;
    return this;
  }
};
