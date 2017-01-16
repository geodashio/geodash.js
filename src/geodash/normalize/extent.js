module.exports = function(extent, options)
{
  var newExtent = undefined;
  if(angular.isDefined(extent))
  {
    if(angular.isString(extent))
    {
      newExtent = extent.split(",").map(parseFloat);
    }
    else
    {
      newExtent = geodash.util.deepCopy(extent);
    }
  }
  else
  {
    newExtent = geodash.util.deepCopy(extent);
  }

  var sourceProjection = extract("sourceProjection", options);
  var targetProjection = extract("targetProjection", options);
  if(angular.isDefined(sourceProjection) && angular.isDefined(targetProjection))
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
