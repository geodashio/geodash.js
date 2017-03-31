module.exports = function(extent, options)
{
  var newExtent = undefined;
  if(geodash.util.isDefined(extent))
  {
    if(geodash.util.isString(extent))
    {
      if(extent.length > 0 )
      {
        newExtent = extent.split(",").map(parseFloat);
      }
    }
    else if(Array.isArray(extent))
    {
      newExtent = geodash.util.deepCopy(extent);
    }
  }

  if(geodash.util.isDefined(newExtent))
  {
    var sourceProjection = extract("sourceProjection", options);
    var targetProjection = extract("targetProjection", options);
    if(geodash.util.isDefined(sourceProjection) && geodash.util.isDefined(targetProjection))
    {
      if(sourceProjection != targetProjection)
      {
        newExtent = ol.proj.transformExtent(newExtent, sourceProjection, targetProjection);
      }

      var maxExtent = ol.proj.get(targetProjection).getExtent();
      newExtent = newExtent.map(function(x, index, arr) {
        if(x == Number.NEGATIVE_INFINITY) { return maxExtent[index % 2]; }
        else if(x == Number.POSITIVE_INFINITY) { return maxExtent[(index % 2) + 2]; }
        else { return x; }
      });
    }
  }

  return newExtent;
};
