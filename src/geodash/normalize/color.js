/**
 * Normalizes a representation of a color to a RGBA array of numbers.
 *
 * @function color
 * @param {(ol.geom.Point|L.point)} x - The original value
 * @return {Object} The value as a GeoDash Object
 * @memberof geodash.normalize
 *
 * @see http://openlayers.org/en/latest/apidoc/olhtml#.Color
 *
 * @example <caption>Basic</caption>
 * var color = geodash.normalize.color("#AAAA00");
 * color == [170, 170, 0, 1];
 *
 * @example <caption>RGB</caption>
 * var color = geodash.normalize.color([170, 170, 0]);
 * color == [170, 170, 0, 1];
 */

module.exports = function(color)
{
  if(Array.isArray(color))
  {
    if(color.length == 3){ color = [].concat(color, [1.0]); }

    if(angular.isString(color[0])){ color[0] = parseInt(color[0], 10); }
    if(angular.isString(color[1])){ color[1] =  parseInt(color[1], 10); }
    if(angular.isString(color[2])){ color[2] =  parseInt(color[2], 10); }
    if(angular.isString(color[3])){ color[3] =  parseFloat(color[3]); }
  }
  else if(angular.isString(color))
  {
    if(color.startsWith("#") || color.startsWith("rgb"))
    {
      try{ color = ol.color.fromString(color); }catch(err){ color = undefined; }
    }
    else
    {
      color = [0, 0, 0, 0];
    }
  }

  return color;
};
