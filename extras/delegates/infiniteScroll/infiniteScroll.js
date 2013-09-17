sudo.delegates.infiniteScroll = function(opts) {
  opts || (opts = {});
  // how far from the bottom until calling scroll action?
  this.trigger = opts.trigger || 10;
  // if truthy will trigger on distance from the TOP of the scrollable
  this.inverted = !!opts.inverted;
  // if only a certain Element is to be scrolled, not the default 'window'
  // can be a string selector (assumed to be in the scope of the delegator)
  // or a $wrapped object
  // must be normalized later in the addedAsDelegate method
  this.$scrollable = opts.scrollable || $(window);
  // the element that contains the scrollable, defalts to the outer wrapper,
  // same rules as the scrollable
  this.$container = opts.container || $('.main-content');
};

sudo.delegates.infiniteScroll.prototype = {
  addedAsDelegate: function addedAsDelegate(delegator) {
    // normalize the passed in scrollable and container if present
    if(typeof this.$scrollable === 'string') this.$scrollable = delegator.$(this.$scrollable);
    if(typeof this.$container === 'string') this.$container = delegator.$(this.$container);
    // in the inverted case, do not setup until called. this is because unless the 
    // scrollable has been moved to the bottom, any scroll would trigger the call to infiniteScrollAction
    if(!this.inverted) this.setUp();
  },
  // all delegates require a role which the delegator can use 
  // when using this.delagate(<role>)...
  role: 'infiniteScroll',
  scrolled: function scrolled(ev) {
    // common to either inverted or not
    var fn = function() {
      this.$scrollable.off('scroll');
      this.isListening = false;
      if('infiniteScrollAction' in this.delegator) {
        // pass my setup so the delegator can rebind if desired
        this.delegator.infiniteScrollAction(this.setUp.bind(this));
      }
    }.bind(this);

    if(this.inverted) {
      if(this.$scrollable.scrollTop() <= this.trigger) fn();
    } else {
      if(this.$scrollable.scrollTop() + this.trigger >= (this.$container.height() - this.$scrollable.height())) fn();
    }
  },
  // sets up the scroll listening
  setUp: function setUp() {
    if(!this.isListening) {
      this.$scrollable.on('scroll', this.scrolled.bind(this));
      this.isListening = true;
    }
    return this;
  },
  // when being unloaded the delegator should
  // make sure the scroll listener is off
  tearDown: function tearDown() {
    this.$scrollable.off('scroll');
    return this;
  },
  // force the scroll to the bottom of the scrollable
  toBottom: function toBottom() {
    this.$scrollable[0].scrollTop = this.$container.height();
    return this;
  },
  // force the scroll to the top of the scrollable
  toTop: function toTop() {
    this.$scrollable[0].scrollTop = 0;
    return this;
  }
};
