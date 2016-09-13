module.exports = function($scope, live, map_config, id, layerConfig)
{
  var url = extract("geojson.url", layerConfig);
  if(! angular.isDefined(url))
  {
    if(angular.isDefined(extract("wfs.url", layerConfig)))
    {
      var srs = "EPSG%3A4326";
      var layers = extract('wfs.layers', layerConfig) || extract('wms.layers', layerConfig);
      var params = [
        "srsName="+srs,
        "typename="+layers,
        "outputFormat=json",
        "version=1.0.0",
        "service=WFS",
        "request=GetFeature"
      ];
      url = extract("wfs.url", layerConfig)+"?"+params.join("&")
    }
  }
  var source = new ol.source.Vector({
    url: url,
    projection: 'EPSG:4326',
    format: new ol.format.GeoJSON()
  });
  var styleFn = (function(layerID, styleFnWorkspaces){
    return function(feature, resolution) {
      return geodash.style.ol3(feature, resolution, layerID, styleFnWorkspaces);
    };
  })(id, extract('dynamicStyleFunctionWorkspaces', geodash.config, [geodash.dynamicStyleFn]));
  var fl = new ol.layer.Vector({
    id: id,
    source: source
  });
  fl.setStyle(styleFn);
  live["featurelayers"][id] = fl;
  geodash.layers.init_featurelayer_post_ol3($scope, live, id, fl, layerConfig.visible);
};
