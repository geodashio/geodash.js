/**
 * Takes an array of objects with values name and value and creates and object.
 *
 * @function arrayToObject
 * @param {Object[]} x - The array to map to an object.
 * @param {string} x[].name - The name of the property.
 * @param {string} x[].value - The value of the property.
 * @return {Object} object - returns new object
 * @memberof geodash.api
 *
 * @example
 * var a = [{'name': 'x', 'value': 'y'}, {'name': 'q', 'value': 'r'}]
 * var b = geodash.util.arrayToObject(a);
 * b == {'x': 'y', 'q': 'r'}
 */

module.exports = function(x)
{
  var y = {};
  if(angular.isArray(x))
  {
    for(var i = 0; i < x.length; i++)
    {
      if("value" in x[i])
      {
        y[x[i].id || x[i].name] = x[i].value;
      }
      else
      {
        y[x[i].id || x[i].name] = x[i];
      }
    }
  }
  return y;
}
