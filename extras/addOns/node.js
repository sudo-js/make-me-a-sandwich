// ###closestParent
// Traverse the DOM upwards in heirarchy from a given DOM node checking if
// a match to a given selector is found.
//
// `param` {node} `node`
// `param` {str} `sel`. A CSS selector
// `returns` {node}
Node.closestParent = function closestParent(node, sel) {
  while(node && !(Element.matches(node, sel))) {
    node = node.parentNode;
  }
  return node;
};