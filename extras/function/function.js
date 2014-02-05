// ###debounce
// Thanks to http://underscorejs.org/
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
//
// `param` {function} `fn`
// `param` {number} `wait`
// `param` {*} `immediate`
// `returns` {function}
Function.debounce = function debounce(fn, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if(!immediate) fn.apply(context, args);
    };
    var callNow = immediate && !timeout;
    window.clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
    if(callNow) fn.apply(context, args);
  };
};