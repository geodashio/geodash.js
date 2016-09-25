module.exports = function(options)
{
  var source = undefined;

  var projection = "EPSG:4326";
  var local = extract("local", options);
  var url = extract("url", options);

  if(angular.isDefined(local))
  {
    source = new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(local),
      projection: projection,
    });
  }
  else if(angular.isDefined(url))
  {
    source = new ol.source.Vector({
      url: url,
      projection: projection,
      format: new ol.format.GeoJSON()
    });
  }

  return source;
};
