/**
 * Normalizes a representation of an OpenLayers 3 or Leaflet point to a GeoDash point.
 *
 * @function point
 * @param {(ol.geom.Point|L.point)} x - The original value
 * @return {Object} The value as a GeoDash Object
 * @memberof geodash.normalize
 *
 * @see http://openlayers.org/en/latest/apidoc/ol.geom.Point.html
 * @see http://leafletjs.com/reference.html#point
 *
 * @example
 * var x = "1.0";
 * var y = geodash.normalize.point(x);
 * y == {'lat': 0.0, 'lon': 0.0}
 */

module.exports = function(point)
{
  if("flatCoordinates" in point)
  {
    var coords = point.flatCoordinates;
    return {
      'lat': coords[1],
      'lon': coords[0]
    };
  }
  else if(Array.isArray(point))
  {
    return {
      'lat': point[1],
      'lon': point[0]
    };
  }
  else
  {
    return {
      'lat': point.lat,
      'lon': (point.lon || point.lng || point.long || 0.0)
    };
  }
};
