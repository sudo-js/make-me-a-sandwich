require('babel/register');

var View = require('../view');

describe('View Class', function() {

  beforeEach(function() {
    this.view = new View({el: '#foo'});
  });

  it('has an empty state', function() {
    var keys = Object.keys(this.view.state);
    expect(keys.length).toBe(0);
  });

  it('sets state values', function() {
    this.view.mergeState({foo: 'foo', bar: 'bar'});
    expect(this.view.state).toEqual({foo: 'foo', bar: 'bar'});
  });

  it('merges state values', function() {
    this.view.mergeState({foo: 'foo', bar: 'bar'});
    expect(this.view.state).toEqual({foo: 'foo', bar: 'bar'});
    this.view.mergeState({baz: 'baz'});
    expect(this.view.state).toEqual({foo: 'foo', bar: 'bar', baz: 'baz'});
  });

  it('resets state values', function() {
    this.view.mergeState({foo: 'foo', bar: 'bar'});
    expect(this.view.state).toEqual({foo: 'foo', bar: 'bar'});
    this.view.mergeState({baz: 'baz'});
    expect(this.view.state).toEqual({foo: 'foo', bar: 'bar', baz: 'baz'});
    this.view.resetState({foo: 'bar'});
    expect(this.view.state).toEqual({foo: 'bar', bar: '', baz: ''});
  });
});
