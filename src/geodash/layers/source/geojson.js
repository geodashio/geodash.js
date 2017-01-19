module.exports = function(options)
{
  var source = undefined;

  var local = extract("local", options);
  var url = extract("url", options);
  var projection = extract("projection", options, "EPSG:4326");

  if(geodash.util.isDefined(local))
  {
    // For discussion on handling projections, see
    // http://stackoverflow.com/questions/32455040/how-to-specify-the-projection-for-geojson-in-openlayers3
    source = new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(local, {
        dataProjection: projection,
        featureProjection: "EPSG:3857"
      })
    });
  }
  else if(geodash.util.isDefined(url))
  {
    source = new ol.source.Vector({
      url: url,
      projection: projection,
      format: new ol.format.GeoJSON()
    });
  }

  return source;
};
