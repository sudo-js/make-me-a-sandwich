_.namespace('lib.views');

// a child of the slideView
lib.views.slidView = function(el) {
  // the slideview will pass the template
  this.construct(el, {sendMethod: 'removeChild'});
  this.transitionEnd = 'webkitTransitionEnd';
};

lib.views.slidView.prototype = $.extend(Object.create(_.View.prototype), {
  addedToParent: function addedToParent(parent) {
    // i might still have the .template on me, remove it if so
    if(this.el.classList.contains('template')) this.el.classList.remove('template');
    // parent has saved a ref to this, I might be the first
    if(!parent.direction) parent.slides.appendChild(this.el);
    // otherwise do the anim/trans when i am added
    else this[parent.direction === 'left' ? 'inRight': 'inLeft']();
  },

  removedFromParent: function removedFromParent(parent) {
    $(this.el).off(this.transitionEnd);
    parent.slides.removeChild(this.el);
  },

  inLeft: function inLeft() {
    //debugger;
    this.el.classList.add('off-left');
    this.parent.slides.appendChild(this.el);
    this.el.classList.add('slide-in');
  },

  outLeft: function outLeft() {
    // regardless, i remove my DOM
    $(this.el).on(this.transitionEnd, this.send.bind(this));
    this.el.classList.remove('slide-in');
    this.el.classList.remove('slide-out-right');
    this.el.classList.add('slide-out-left');
    //debugger;
  },

  inRight: function inRight() {
    // so this would need to be already moved to not be visible when added
    // to the parent or the css wont work -- a trans here will not work
    this.el.classList.add('off-right');
    // then it has to be added
    this.parent.slides.appendChild(this.el);
    // then the slide shit needs to happen
    this.el.classList.add('slide-in');
  },

  outRight: function outRight() {
    $(this.el).on(this.transitionEnd, this.send.bind(this));
    this.el.classList.remove('slide-in');
    this.el.classList.remove('slide-out-left');
    this.el.classList.add('slide-out-right');
  }
});