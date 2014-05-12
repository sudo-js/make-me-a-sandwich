_.namespace('lib.views');

// a child of the slideView
lib.views.slidView = function(el, data) {
  // the slideview will pass the template
  this.construct(el, data);
  this.transitionEnd = 'webkitTransitionEnd';
};

lib.views.slidView.prototype = $.extend(Object.create(_.View.prototype), {
  addedToParent: function addedToParent(parent) {
    // i might still have the .template on me, remove it if so
    if(this.el.classList.contains('template')) this.el.classList.remove('template');
    // parent has saved a ref to this, I might be the first
    if(!parent.direction) parent.slides.appendChild(this.el);
    // otherwise do the anim/trans when i am added
    else this[parent.direction === 'left' ? 'inRight': 'inleft']();

    $(this.el).on(this.transitionEnd, function() {
      debugger;
    });
  },

  removedFromParent: function removedFromParent(parent) {
    this.parent.removeChild(this.el);
  },

  inLeft: function inLeft() {
    //debugger;
    this.el.classList.add('slide-out-left');
    this.parent.slides.appendChild(this.el);
    this.el.classList.add('slide-in');
  },

  outLeft: function outLeft() {
    // regardless, i remove my DOM
    this.el.classList.remove('slide-in');
    this.el.classList.remove('slide-out-right');
    this.el.classList.add('slide-out-left');
    //debugger;
  },

  inRight: function inRight() {
    debugger;
    this.el.classList.add('slide-out-right');
    this.parent.slides.appendChild(this.el);
    this.el.classList.add('slide-in');
  },

  outRight: function outRight() {
    this.el.classList.remove('slide-in');
    this.el.classList.remove('slide-out-left');
    this.el.classList.add('slide-out-right');
    //debugger;
    //$(this.el).on(this.transitionEnd, this.parent.removeChild.bind(this));
  }
});