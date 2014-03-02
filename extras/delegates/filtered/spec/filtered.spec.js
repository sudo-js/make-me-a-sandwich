describe('Sudo Filtered Delegate', function() {

  beforeEach(function() {
    model = $.extend(new _.Model(), _.extensions.observable);
    view = new _.View();
    view.addDelegate(new _.delegates.Filtered({
      filters: {
        foo: 'foo'
      }
    }));
  });

  it('establishes a delegate', function() {
    expect(view.delegates[0]).toBeTruthy();
    expect(view.delegates[0].delegator).toBeTruthy();
  });
  
  it('establishes the filters', function() {
    expect(view.delegate('filtered').data.filters.foo).toBe('foo');
  });

  it('can add a filter', function() {
    view.delegate('filtered').addFilter('bar', 'bar');
    expect(view.delegate('filtered').data.filters.bar).toBe('bar');
  });

  it('can remove a filter', function() {
    view.delegate('filtered').removeFilter('bar');
    expect(view.delegate('filtered').data.filters.bar).toBeFalsy();
  });
});


