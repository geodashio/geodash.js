/**
 * Normalizes a representation of an integer to a {integer}.
 *
 * @function integer
 * @param {(string|integer)} x - The original values_
 * @param {Object} fallback - If not a {integer} or {string}, return this value.
 * @return {float} The value as a {integer} object.
 * @memberof geodash.normalize
 *
 * @example
 * var x = "51";
 * var y = geodash.normalize.integer(51);
 * y == 51
 */

module.exports = function(x, fallback)
{
  if(angular.isNumber(x))
  {
    return x;
  }
  else if(angular.isString(x))
  {
    if(x.length > 0)
    {
      return parseInt(x, 10);
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
