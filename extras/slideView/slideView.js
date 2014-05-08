_.namespace('lib.views');

// for now I will constrain this to an x-axis

lib.views.slideView = function(el, data) {
  // set up some defaults
  this.construct(el, $.extend({
    minX: 10,
    preventDefaults: true
  }, data || {}));
  
  // where the junk happens
  this.slides = this.qs('#slides');
  
  this.bindListeners();
    
  // keep these in a nodeList to pass to the children
  this.childTemplates = document.querySelectorAll('.template');
  
  // which 'slide' is visible
  this.currentSlide = 0;
  
  // the swipable area is initally empty, important so that reverse sliding
  // back to 0 knows how to hydrate
  this.hydrateChild(this.currentSlide);

  // because this does not exist in static TODO needed?
  this.transitionEnd = '';
  this.animationEnd = '';
};

lib.views.slideView.prototype = $.extend(Object.create(_.View.prototype), {
  bindListeners: function bindListeners() {
    if(!('ontouchstart' in document.documentElement)) return;
    
    $(this.slides).on('touchstart', this.touchStarted.bind(this));
  },
  
  // stop listening, we have a swipe
  cancelTouch: function cancelTouch() {
    $(this.slides).off('touchmove');
    this.startX = undefined;
    this.isMoving = false;
  },
  
  dehydrateChild: function dehydrateChild(n, dir) {
    // a child will get removed from the swipable area before a new one is added
    this.visibleChild = null;
    this.children[n][dir === 'left' ? 'outLeft' : 'outRight']();
    // now add the next
    this.hydrateChild(this.currentSlide, dir);
  },
  
  hydrateChild: function hydrateChild(n, dir) {
    if(!this.children[n]) {
      // doubt they need a name
      this.addChild(new lib.views.slidView(this.childTemplates[n].cloneNode(true)));
    } else {
      // we have that child -- show it
      this.children[n][dir === 'left' ? 'inRight' : 'inLeft']();
    }

    // the visible child is either the index or the last one added
    this.visibleChild = this.children[n];
  },
  
  swipeLeft: function swipeLeft() {
    this.direction = 'left';
    // if we are at the last child there is nothing to do. we cannot have 
    // more children than templates
    if(this.currentSlide === (this.childTemplates.length - 1)) return;
    // we are increasing
    this.currentSlide++;
    // there should be a prev now that we are moving up
    if(this.children[this.currentSlide - 1]) this.dehydrateChild(this.currentSlide - 1, 'left');
    else this.hydrateChild(this.currentSlide, 'left');
  },
  
  swipeRight: function swipeRight() {
    this.direction = 'right';
    // if we are at the first child there is nothing to do.
    if(this.currentSlide === 0) return;
    // we are decreasing
    this.currentSlide--;
    // there should be a prev now that we are moving down, prob don't need the if
    // but i will look at that later
    if(this.children[this.currentSlide + 1]) this.dehydrateChild(this.currentSlide + 1, 'right');
  },
  // we have a swipe. maybe
  touchMoved: function touchMoved(e) {
    var x, deltaX;
    if(this.data.preventDefaults) e.preventDefault();
    
    if(this.isMoving) {
      x = e.touches[0].pageX;
      deltaX = this.startX - x;
      if(Math.abs(deltaX) >= this.data.minX) {
        this.cancelTouch();
        deltaX > 0 ? this.swipeLeft() : this.swipeRight();
      }
    }
  },
  // record the pageX, and set the fact that we are moving
  touchStarted: function touchStarted(e) {
    // the touches would represent fingers so we only care when it's 1
    if(e.touches.length !== 1) return;
    
    this.startX = e.touches[0].pageX;
    this.isMoving = true;
    $(this.slides).on('touchmove', this.touchMoved.bind(this));
  }
});