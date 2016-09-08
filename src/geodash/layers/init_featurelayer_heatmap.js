module.exports = function($scope, live, map_config, id, layerConfig)
{
  var url = extract("geojson.url", layerConfig);
  if(! angular.isDefined(url))
  {
    //srsName=EPSG%3A4326&typename=geonode%3ASyria_RefugeeSites_2016Jan21_HIU_DoS0&outputFormat=json&version=1.0.0&service=WFS&request=GetFeature
    if(angular.isDefined(extract("wfs.url", layerConfig)))
    {
      var srs = "EPSG%3A4326";
      var layers = extract('wfs.layers', layerConfig) || extract('wms.layers', layerConfig);
      url = extract("wfs.url", layerConfig)+"?srsName="+srs+"&typename="+layers+"&outputFormat=json&version=1.0.0&service=WFS&request=GetFeature"
    }
  }
  var fl = undefined;
  var source = new ol.source.Vector({
    url: url,
    projection: 'EPSG:4326',
    format: new ol.format.GeoJSON()
  });
  var fl = new ol.layer.Heatmap({
    source: source,
    blur: parseInt(extract('heatmap.blur', layerConfig, 15), 10),
    radius: parseInt(extract('heatmap.radius', layerConfig, 5), 10)
  });
  live["featurelayers"][id] = fl;
  geodash.layers.init_featurelayer_post_ol3($scope, live, id, fl, layerConfig.visible);
};
