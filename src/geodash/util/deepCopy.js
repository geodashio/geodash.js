/**
 * Returns a deep copy of an object or primitive using jQuery extend when needed.
 *
 * @function deepCopy
 * @param {Object[]|string|yObject} x - object or primitive to copy
 * @return {Object} - a deepy copy version of the original object.
 * @memberof geodash.api
 */

module.exports = function(x)
{
  if(Array.isArray(x))
  {
    return $.extend(true, [], x);
  }
  else if(geodash.util.isString(x) || geodash.util.isNumber(x))
  {
    return x;
  }
  else if(geodash.util.isDefined(x))
  {
    return $.extend(true, {}, x);
  }
};
