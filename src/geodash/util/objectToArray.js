/**
 * Takes an object and creates an array of keys and values.
 *
 * @function objectToArray
 * @param {Object[]} x - The object to transform to an array
 * @return {Object} object - returns new array
 * @memberof geodash.api
 *
 * @example
 * var a = {'x': 'y', 'q': 'r'};
 * var b = geodash.util.objectToArray(a);
 * b == [{'name': 'x', 'value': 'y'}, {'name': 'q', 'value': 'r'}]
 */

module.exports = function(x)
{
  var y = [];
  if(geodash.util.isDefined(x))
  {
    var keys = Object.keys(x);
    for(var i = 0; i < keys.length; i++)
    {
      y.push({'name': keys[i], 'value': x[keys[i]]});
    }
  }
  return y;
}
