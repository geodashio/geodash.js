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
  else
  {
    return {
      'lat': point.lat,
      'lon': (point.lon || point.lng || point.long || 0.0)
    };
  }
};
