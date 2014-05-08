_.namespace('lib.views');

// a child of the slideView
lib.views.slidView = function(el, data) {
  // the slideview will pass the template
  this.construct(el, data);
};

lib.views.slidView.prototype = $.extend(Object.create(_.View.prototype), {
  addedToParent: function addedToParent(parent) {
    // i might still have the .template on me, remove it if so
    if(this.el.classList.contains('template')) this.el.classList.remove('template');
    // parent has saved a ref to this, I might be the first
    if(!parent.direction) parent.slides.appendChild(this.el);
    // otherwise do the anim/trans when i am added
    else this[parent.direction === 'left' ? 'inRight': 'inleft']();
  },
  
  inLeft: function inLeft() {
    this.parent.slides.appendChild(this.el);
  },
  
  outLeft: function swipedLeft() {
    // regardless, i remove my DOM
    this.parent.slides.removeChild(this.el);
  },
  
  inRight: function inRight() {
    this.parent.slides.appendChild(this.el);
  },
  
  outRight: function swipedRight() {
    this.parent.slides.removeChild(this.el);
  }
});