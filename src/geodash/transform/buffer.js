module.exports = function(geom, options)
{
  var parser = extract("jsts_parser", geodash.var);
  var distance = extract("distance", options, 0.0);
  var feature = extract("feature", options);
  if(geodash.util.isDefined(parser) && geodash.util.isDefined(distance))
  {
    //var latlon = ol.proj.transform(geom, geodash.var.map.getView().getProjection(), "EPSG:4326");
    if(geodash.util.isString(distance))
    {
      if(distance.startsWith("$"))
      {
        if(geodash.util.isDefined(feature))
        {
          distance = feature.get(distance.substring(1));
        }
      }
      else
      {
        try{distance = parseFloat(distance);}catch(err){distance = 0.0;}
      }
    }

    return parser.write(parser.read(geom).buffer(geodash.normalize.float(distance)));
  }
  else
  {
    return geom;
  }
};
