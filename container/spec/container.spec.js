require('babel/register');

var Container = require('../container');
var Store = require('../../store/store');

describe('Sudo Container Class', function() {
  beforeEach(function() {
    this.container = new Container;
    this.child1 = new Store({id: 'theChaste'});
    this.child2 = new Store({id: 'theBrave'});
    this.cid1 = this.child1.uid;
    this.cid2 = this.child2.uid;
  });

  it('Is an instance of Container', function() {
    expect(this.container instanceof Container).toBe(true);
  });

  it('has a children array', function() {
    expect(Array.isArray(this.container.children)).toBe(true);
  });

  it('has a childnames hash', function() {
    expect(typeof this.container.childNames).toBe('object');
  });

  it('Adds many children via an array', function() {
    var ary = [this.child1 , this.child2];
    this.container.addChildren(ary);
    expect(this.container.children.length).toBe(2);
  });

  it('Adds many children via an object literal', function() {
    var obj = {'Galahad': this.child1, 'Robin': this.child2};
    this.container.addChildren(obj);
    expect(this.container.children.length).toBe(2);
    expect(this.container.getChild('Galahad')).toBeTruthy();
    expect(this.container.getChild('Robin')).toBeTruthy();
  });

  it('Adds children passed to the constructor', function() {
    var c = new Container([this.child1, this.child2]);
    expect(c.children.length).toBe(2);
  });
  //
  it('Can fetch a child by index or name', function() {
    this.container.addChild(this.child1, 'Galahad').addChild(this.child2, 'Robin');
    expect(this.container.getChild(0).uid).toBe(this.cid1);
    expect(this.container.getChild('Galahad').uid).toBe(this.cid1);
    expect(this.container.getChild(1).uid).toBe(this.cid2);
    expect(this.container.getChild('Robin').uid).toBe(this.cid2);
  });
  //
  it('Removes children by name or Index', function() {
    // works because of pass-by-ref
    var c = this.container.children;
    this.container.addChild(this.child1, 'Galahad').addChild(this.child2, 'Robin');
    expect(c.length).toBe(2);
    this.container.removeChild(1);
    expect(this.container.getChild('Robin')).toBeFalsy();
    expect(c.length).toBe(1);
    this.container.removeChild('Galahad');
    expect(c.length).toBe(0);
  });

  it('Attempts removal by name but does not error if there is no child by that name', function() {
    var c = this.container.children;
    this.container.addChild(this.child1, 'Galahad');
    expect(c.length).toBe(1);
    expect(this.container.removeChild('OtherName')).toEqual(this.container);
    expect(c.length).toBe(1);
    this.container.removeChild(this.child1);
    expect(c.length).toBe(0);
  });

  it('Removes all named children', function() {
    this.container.addChild(this.child1, 'Galahad').addChild(this.child2, 'Robin');
    expect(this.container.children.length).toBe(2);
    this.container.removeChildren();
    expect(this.container.children.length).toBe(0);
  });

  it('Removes all named children, even unnammed', function() {
    this.container.addChild(this.child1, 'Galahad').addChild(this.child2, 'Robin').addChild(new Store);
    expect(this.container.children.length).toBe(3);
    this.container.removeChildren();
    expect(this.container.children.length).toBe(0);
  });

  it('Indexes children correctly, maintaining when adjusted', function() {
    this.container.addChild(this.child1, 'Galahad').addChild(this.child2, 'Robin');
    expect(this.child1.index).toBe(0);
    expect(this.child2.index).toBe(1);
    this.container.removeChild(0);
    expect(this.child2.index).toBe(0);
  });

  it('uses the eachChild method correctly', function() {
      var foo = function() {}, spy1, spy2;
      this.child1.bar = foo;
      this.child2.bar = foo;

      spy1 = spyOn(this.child1, 'bar');
      spy2 = spyOn(this.child2, 'bar');

      this.container.addChildren([this.child1, this.child2]);
      this.container.eachChild('bar', 'baz');

      expect(spy1).toHaveBeenCalledWith('baz');
      expect(spy2).toHaveBeenCalledWith('baz');
  });
});
