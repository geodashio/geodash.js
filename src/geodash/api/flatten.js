/**
 * Flattens an object.
 *
 * @function flatten
 * @param {Object} obj - The original object
 * @param {string|undefined} prefix - A prefix, if any, to add to the new object's keys.
 * @return {Object} object - the flattened version of the object
 * @memberof geodash.api
 *
 * @example
 * var a = {'x': {'y': 'z' }}
 * var b = geodash.api.fatten(a);
 * b == {'x__y': 'z'}
 */

module.exports = function(obj, prefix)
{
  var newObject = {};
  $.each(obj, function(key, value){
    var newKey = prefix != undefined ? prefix+"__"+key : key;
    if(
      (value === undefined) ||
      (value === null) ||
      angular.isString(value) ||
      angular.isNumber(value) ||
      (typeof value == "boolean")
    )
    {
      newObject[newKey] = value;
    }
    else if(angular.isArray(value))
    {
      $.each(geodash.api.flatten(value, newKey), function(key2, value2){
        newObject[""+key2] = value2;
      });
    }
    else
    {
      $.each(geodash.api.flatten(value, newKey), function(key2, value2){
        newObject[key2] = value2;
      });
    }
  });
  return newObject;
};
