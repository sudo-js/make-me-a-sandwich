// ###closestParent
// Traverse the DOM upwards in heirarchy from a given DOM node checking if
// a match to a given selector is found.
//
// `param` {node} `node`
// `param` {str} `sel`. A CSS selector
// `returns` {node}
Node.closestParent = function closestParent(node, sel) {
  while(node && !(Element.matches(node, sel))) {
    node = !Node.isDocument(node) && node.parentNode;
  }
  return node;
};
// ###isDocument
// Return truthy is the passed in node is the document object. Placed here on
// the Node Class Object as `document` is a `Node` type.
//
// `param` {node} `node`
// `returns` {bool}
Node.isDocument = function isDocument(node) {
  return node.nodeType === node.DOCUMENT_NODE;
};