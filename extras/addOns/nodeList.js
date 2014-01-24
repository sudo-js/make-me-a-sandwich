// ###forEach (NodeList)
// This is a, hopefully, shortlived bit of syntactic sugar for the fact that,
// at the moment, there isn't a succinct way to iterate over a NodeList such as `Array.forEach`. 
// This method will simply construct a `for` loop around the passed in NodeList and call the
// provided function with each item in it, returning the list
//
// `param` {nodeList} `list`
// `param` {function} `fn`
// `returns` {nodeList} `list` 
NodeList.forEach = function nlforEach(list, fn) {
  var len = list.length, i;
  for (i = 0; i < len; i++) {
    fn(list[i]);
  }
  return list;
};
// ###filter (NodeList)
// This is a, hopefully, shortlived bit of syntactic sugar for the fact that,
// at the moment, there isn't an equivalent way to filter a NodeList the same as 
// an Array. This method will simply construct a for loop around the passed in NodeList and call the
// provided function with each item in it, appending the items that pass a truthy test to a 
// new nodeList and returning that
//
// `param` {nodeList} `list`
// `param` {function} `fn` 
// `returns` {nodeList}  
NodeList.filter = function nlfilter(list, fn) {
  var len = list.length, frag = document.createDocumentFragment(), i;
  for (i = 0; i < len; i++) {
    // there is no accessible constructor for a nodeList, so use childNodes
    if(fn(list[i])) frag.appendChild(list[i]);
  }
  return frag.childNodes;
};