describe('sudo native class add-ons', function() {
  
  it('serializes a hash into a "params" type string', function() {
    expect(Object.serialize({foo: 'bar', baz: 'qux'})).toEqual("foo=bar&baz=qux");
  });
  
  it('deserializes a params-type str into a hash', function() {
    expect(Object.deserialize("foo=bar&baz=qux")).toEqual({foo: 'bar', baz: 'qux'});
  });
  
  it('interpolates values from a hash in a string', function() {
    var str = "Frankly my ${foo}, I don't give a ${bar}.";
    expect(String.expand(str, {foo: 'dear', bar: 'damn'})).toEqual("Frankly my dear, I don't give a damn.");
  });
  
  it('escapes an html string', function() {
    var str = "<>'\"&\/";
    expect(String.escape(str)).toEqual('&lt;&gt;&#x27;&quot;&amp;&#x2F;');
  });
  
  it('debounces a function', function() {
    var counter = 0;
    var incr = function(){ counter++; };
    var debouncedIncr = Function.debounce(incr, 32);
    debouncedIncr(); debouncedIncr();
    waits(33);
    debouncedIncr();
    runs(function() {
      expect(counter).toEqual(1);
    });
  });
});