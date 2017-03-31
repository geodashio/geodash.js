/**
 * Normalizes a representation of a float to a {float}.
 *
 * @function float
 * @param {(string|float)} x - The original values_
 * @param {Object} fallback - If not a {float} or {string}, return this value.
 * @return {float} The value as a {float} object.
 * @memberof geodash.normalize
 *
 * @example
 * var x = "1.0";
 * var y = geodash.normalize.float(x);
 * y == 1.0
 */

module.exports = function(x, fallback)
{
  if(geodash.util.isNumber(x))
  {
    return x;
  }
  else if(geodash.util.isString(x))
  {
    if(x.length > 0)
    {
      return parseFloat(x);
    }
    else
    {
      return fallback;
    }
  }
  else
  {
    return fallback;
  }
};
