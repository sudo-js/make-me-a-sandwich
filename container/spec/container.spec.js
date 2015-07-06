require('babel/register');

var Container = require('../container');
var Store = require('../../store/store');

describe('Sudo Container Class', function() {
  beforeEach(function() {
    container = new Container;
    child1 = new Store({id: 'theChaste'});
    child2 = new Store({id: 'theBrave'});
    cid1 = child1.uid;
    cid2 = child2.uid;
  });

  it('Is an instance of Container', function() {
    expect(container instanceof Container).toBe(true);
  });

  it('has a children array', function() {
    expect(Array.isArray(container.children)).toBe(true);
  });

  it('has a childnames hash', function() {
    expect(typeof container.childNames).toBe('object');
  });

  it('Adds many children via an array', function() {
    var ary = [child1 , child2];
    container.addChildren(ary);
    expect(container.children.length).toBe(2);
  });

  it('Adds many children via an object literal', function() {
    var obj = {'Galahad': child1, 'Robin': child2};
    container.addChildren(obj);
    expect(container.children.length).toBe(2);
    expect(container.getChild('Galahad')).toBeTruthy();
    expect(container.getChild('Robin')).toBeTruthy();
  });

  it('Adds children passed to the constructor', function() {
    var c = new Container([child1, child2]);
    expect(c.children.length).toBe(2);
  });

  it('Can fetch a child by index or name', function() {
    container.addChild(child1, 'Galahad').addChild(child2, 'Robin');
    expect(container.getChild(0).uid).toBe(cid1);
    expect(container.getChild('Galahad').uid).toBe(cid1);
    expect(container.getChild(1).uid).toBe(cid2);
    expect(container.getChild('Robin').uid).toBe(cid2);
  });

  it('Removes children by name or Index', function() {
    // works because of pass-by-ref
    var c = container.children;
    container.addChild(child1, 'Galahad').addChild(child2, 'Robin');
    expect(c.length).toBe(2);
    container.removeChild(1);
    expect(container.getChild('Robin')).toBeFalsy();
    expect(c.length).toBe(1);
    container.removeChild('Galahad');
    expect(c.length).toBe(0);
  });

  it('Attempts removal by name but does not error if there is no child by that name', function() {
    var c = container.children;
    container.addChild(child1, 'Galahad');
    expect(c.length).toBe(1);
    expect(container.removeChild('OtherName')).toBe(container);
    expect(c.length).toBe(1);
    container.removeChild(child1);
    expect(c.length).toBe(0);
  });

  it('Removes all named children', function() {
    container.addChild(child1, 'Galahad').addChild(child2, 'Robin');
    expect(container.children.length).toBe(2);
    container.removeChildren();
    expect(container.children.length).toBe(0);
  });

  it('Removes all named children, even unnammed', function() {
    container.addChild(child1, 'Galahad').addChild(child2, 'Robin').addChild(new Store);
    expect(container.children.length).toBe(3);
    container.removeChildren();
    expect(container.children.length).toBe(0);
  });

  it('Indexes children correctly, maintaining when adjusted', function() {
    container.addChild(child1, 'Galahad').addChild(child2, 'Robin');
    expect(child1.index).toBe(0);
    expect(child2.index).toBe(1);
    container.removeChild(0);
    expect(child2.index).toBe(0);
  });

  it('uses the eachChild method correctly', function() {
      var foo = function(arg) {}, spy1, spy2;
      child1.bar = foo;
      child2.bar = foo;

      spy1 = spyOn(child1, 'bar');
      spy2 = spyOn(child2, 'bar');

      container.addChildren([child1, child2]);
      container.eachChild('bar', 'baz');

      expect(spy1).toHaveBeenCalledWith('baz');
      expect(spy2).toHaveBeenCalledWith('baz');
  });

});
