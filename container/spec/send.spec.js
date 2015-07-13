require('babel/register');
var Child = require('./fixture.js').Child;
var Parent = require('./fixture.js').Parent;
var Grandparent = require('./fixture.js').Grandparent;

describe('Container Send Functionality', function() {

  var one = new Child('one');
  var two = new Child('two');
  var parent = new Parent('parent');
  var grandParent = new Grandparent('gp');

  parent.addChildren([one, two]);
  grandParent.addChild(parent);

  it('successfully sends its message to an unknown target (1 step in heirarchy)', function() {
    // parent has foo 'sendTarget'
    one.send('foo', {from: one.name, key: 'hey', value: 'gimme some money!'});
    expect(parent.fooRecieved.one).toBeTruthy();
    // two has sent nothing...
    expect(parent.fooRecieved.two).toBeFalsy();
    // grandParent does as well, but as parent did not send it again it will not have reached...
    expect(grandParent.fooRecieved.one).toBeFalsy();
    expect(parent.fooRecieved.one.key).toBe('hey');
    expect(parent.fooRecieved.one.value).toBe('gimme some money!');
  });

  it('successfully sends its message to an unknown target (2 steps in heirarchy)', function() {
    // grandParent has bar 'sendTarget'
    one.send('bar', {from: one.name, key: 'hey', value: 'gimme some money?'});
    expect(grandParent.barRecieved.one).toBeTruthy();
    expect(grandParent.barRecieved.two).toBeFalsy();
    // parent does not have bar...
    expect(parent.barRecieved).toBeFalsy();
    expect(grandParent.barRecieved.one.key).toBe('hey');
    expect(grandParent.barRecieved.one.value).toBe('gimme some money?');
  });

  // same, but from other child
  it('successfully sends its message to an unknown target again (1 step in heirarchy)', function() {
    // two is the nice one...
    two.send('foo', {from: two.name, key: 'hello', value: 'please gimme some money?'});
    expect(parent.fooRecieved.two).toBeTruthy();
    // grandParent does as well, but as parent did not send it again it will not have reached...
    expect(grandParent.fooRecieved.two).toBeFalsy();
    expect(parent.fooRecieved.two.key).toBe('hello');
    expect(parent.fooRecieved.two.value).toBe('please gimme some money?');
  });

  it('successfully sends its message to an unknown target again (2 steps in heirarchy)', function() {
    // grandParent has bar 'sendTarget'
    two.send('bar', {from: two.name, key: 'hello', value: 'blah blah money...'});
    expect(grandParent.barRecieved.two).toBeTruthy();
    expect(parent.barRecieved).toBeFalsy();
    expect(grandParent.barRecieved.two.key).toBe('hello');
    expect(grandParent.barRecieved.two.value).toBe('blah blah money...');
  });
});
