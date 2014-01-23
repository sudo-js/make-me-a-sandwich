// ###forEach
// This is a, hopefully, shortlived bit of syntactic sugar for the fact that,
// pre-ES6, there isn't a succinct way to iterate over a NodeList. This method
// will simply construct a for loop around the passed in NodeList and call the
// provided function with each item in it
//
// `param` {nodeList} `list`
// `param` {function} `fn` 
NodeList.forEach = function nlforEach(list, fn) {
  var len = list.length, i;
  for (i = 0; i < len; i++) {
    fn(list[i]);
  }
};