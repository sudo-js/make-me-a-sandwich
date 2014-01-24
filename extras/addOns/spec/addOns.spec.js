describe('sudo native class add-ons', function() {
  
  it('uses the native matchesSelector', function() {
    var div = document.createElement('div');
    div.innerHTML = '<span class="foo"></span><input type="button"></input>';
    expect(Element.matches(div.firstChild, '.foo')).toBe(true);
    expect(Element.matches(div.lastChild, '[type="button"]')).toBe(true);
  });
  
  it('finds the closest parent matching a selector', function() {
    var div = document.createElement('div');
    div.innerHTML = '<section><span class="foo"></span><input type="button"></input></section>';
    expect(Node.closestParent(div.lastChild, 'div')).toEqual(div);
  });
  
  it('can use NodeList.forEach', function() {
    var div = document.createElement('div'), spn1, spn2;
    div.innerHTML = '<section><span></span><input type="button"></input><span></span><input type="button"></input></section>';
    NodeList.forEach(div.querySelectorAll('span'), function(spn) {
      spn.classList.add('foo');
    });
    spn1 = div.childNodes[0].childNodes[0];
    expect(spn1.classList.contains('foo')).toBe(true);
    spn2 = div.childNodes[0].childNodes[2];
    expect(spn2.classList.contains('foo')).toBe(true);
  });
  
  it('can use NodeList.filter', function() {
    var div = document.createElement('div'), filtered;
    div.innerHTML = '<section><span></span><a href="#" data-foo="foo"></a><span></span><a href="#"></input></section>';
    filtered = NodeList.filter(div.querySelectorAll('a'), function(spn) {
      return !spn.getAttribute('data-foo');
    });
    expect(filtered.length).toBe(1);
  });
  
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