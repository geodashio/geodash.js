module.exports = function(options)
{
  // http://openlayers.org/en/latest/apidoc/ol.source.Vector.html
  var source = undefined;

  var features = extract("features", options);
  var url = extract("url", options);
  var strategy_name = extract("strategy", options, "all");
  var projection = extract("projection", options, "EPSG:4326");

  if(geodash.util.isDefined(features))
  {
    // For discussion on handling projections, see
    // http://stackoverflow.com/questions/32455040/how-to-specify-the-projection-for-geojson-in-openlayers3
    /*var esrijsondata = {
      'type': 'FeatureCollection',
      'crs': {
        'type': 'name',
        'properties': { 'name': 'EPSG:4326' }
      },
      'features': features
    };
    source = new ol.source.Vector({
      features: (new ol.format.EsriJSON()).readFeatures(esrijsondata, {
        dataProjection: projection,
        featureProjection: "EPSG:3857"
      })
    });*/
  }
  else if(geodash.util.isDefined(url))
  {
    source = new ol.source.Vector({
      loader: (function(){
        return function(extent, resolution, projection){
          return undefined;
        };
      })(),
      strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({ tileSize: 512 }))
    });
  }
  else
  {
    source = new ol.source.Vector({
      features: []
    });
  }

  return source;
};
