module.exports = function(geometry)
{
  var geometryType = undefined;
  try{
    geometryType = geometry.getType();
  }catch(err){}

  if(geometryType == "Polygon")
  {
    return geodash.normalize.polygon(geometry);
  }
  else if(geometryType == "Point")
  {
    return geodash.normalize.point(geometry);
  }
  else
  {
    return undefined;
  }
};
