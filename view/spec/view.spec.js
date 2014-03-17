describe('sudo.js View Object', function() {
  var v1, v2;

  beforeEach(function() {
    v1 = new _.View();
    v2 = new _.View(null, {
      tagName: 'span', 
      attributes: {
        id: 'spam', 
        'class': 'eggs',
        'data-foo': 'bar'
      }
    });
  });

  it('is an instance of the view class', function() {
    expect(v1 instanceof _.View).toBe(true);
  });

  it('creates a default div as its "el"', function() {
    expect(v1.el.tagName).toEqual('DIV');
  });

  it('creates a specific tag', function() {
    expect(v2.el.tagName).toEqual('SPAN');
  });

  it('with a specific id', function() {
    expect(v2.el.id).toEqual('spam');
  });

  it('with a specific class', function() {
    expect(v2.el.classList.contains('eggs')).toBe(true);
  });

  it('has the data object', function() {
    expect(v2.el.getAttribute('data-foo')).toBe('bar');
  });

  it('detects an element el passed to it', function() {
    var d = document.createElement('p');
    var v3 = new _.View(d);
    expect(v3.el).toBeTruthy();
    expect(v3.el.tagName).toEqual('P');
  });

  it('fetches its el from the DOM', function() {
    var d = document.createElement('div');
    d.setAttribute('id', 'fooDiv');
    document.body.appendChild(d);
    var v4 = new _.View('#fooDiv');
    expect(v4.el.id).toBe('fooDiv');
  });

  it('has an addedToParent method that is called if present when added', function() {
    var vc = new _.View();
    v1.addedToParent = function(p) {console.log(v1.role + ' added to ' + p.role);};
    var spy = spyOn(v1, 'addedToParent').andCallThrough();
    vc.addChild(v1);
    expect(spy).toHaveBeenCalled();
  });

  it('can remove itself from a parent', function() {
    var vc = new _.View();
    v2.addedToParent = function(parent) {parent.el.appendChild(this.el);};
    v2.removedFromParent = function(parent) {this.el.parentNode.removeChild(this.el);};
    vc.addChild(v2);
    expect(vc.children.length).toBe(1);
    expect(vc.qsa('#spam').length).toBe(1);
    
    vc.removeChild(v2);

    expect(vc.children.length).toBe(0);
    expect(vc.qsa('#spam').length).toBe(0);
  });

});
