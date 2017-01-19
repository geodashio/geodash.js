module.exports = function(extent, options)
{
  var newExtent = undefined;
  if(geodash.util.isDefined(extent))
  {
    if(angular.isString(extent))
    {
      if(extent.length > 0 )
      {
        newExtent = extent.split(",").map(parseFloat);
      }
      else
      {
        return undefined;
      }
    }
    else if(Array.isArray(extent))
    {
      newExtent = geodash.util.deepCopy(extent);
    }
    else
    {
      return undefined;
    }
  }
  else
  {
    newExtent = geodash.util.deepCopy(extent);
  }

  var sourceProjection = extract("sourceProjection", options);
  var targetProjection = extract("targetProjection", options);
  if(geodash.util.isDefined(sourceProjection) && geodash.util.isDefined(targetProjection))
  {
    if(sourceProjection != targetProjection)
    {
      newExtent = ol.proj.transformExtent(newExtent, sourceProjection, targetProjection);
    }
  }
  else
  {
    return newExtent;
  }

};
