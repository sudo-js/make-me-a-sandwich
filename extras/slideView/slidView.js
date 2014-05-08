_.namespace('lib.views');

// a child of the slideView
lib.views.slidView = function(el, data) {
  // the slideview will pass the template
  this.construct(el, data);
  
  // toss these out when done with touch and swipe testing
  this.touchStart = '<h1>TouchStarted</h1>';
  this.swipeLeft = '<h1>SwipingLeft</h1>';
  this.swipeRight = '<h1>SwipingRight</h1>';
};

lib.views.slidView.prototype = $.extend(Object.create(_.View.prototype), {
  addedToParent: function addedToParent(parent) {
    // i might still have the .template on me, remove it if so
    if(this.el.classList.contains('template')) this.el.classList.remove('template');
    // parent has saved a ref to this
    parent.slides.appendChild(this.el);
    // do the anim/trans out the parent can record a .direction to tell
    // me which way to go
  },
  removedFromParent: function removedFromParent(parent) {
    // do the anim/trans out the parent can record a .direction to tell
    // me which way to go
  },
  
  // touch and swipe testing, called by the parent who actually recieves the events
  swipedLeft: function swipedLeft() {
    this.el.innerHTML = this.swipeLeft;
  },
  
  swipedRight: function swipedRight() {
    this.el.innerHTML = this.swipeRight;
  },
  
  touchStarted: function touchStarted() {
    this.el.innerHTML = this.touchStart;
  }
});