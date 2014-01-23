// ###matches (Element)
// Unfortunately the matchesSelector methods are all hidden behind prefixes ATM.
// set the useable one, if not, then return the bool.
//
// `param` {element} `el`. A DOM 1 nodetype
// `param` {string}  `sel`. A CSS selector
// `returns` {bool}
Element.matches = function matches(el, sel) {
  if (el.nodeType !== 1) return false;
  // normalize the native selector match fn
  if(!sudo.matchesSelector) {
    sudo.matchesSelector = el.webkitMatchesSelector || el.mozMatchesSelector ||
    el.oMatchesSelector || el.msMatchesSelector || el.matchesSelector;
  }
  return sudo.matchesSelector.call(el, sel);
};