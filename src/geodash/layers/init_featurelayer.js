module.exports = function(id, layerConfig, $scope, live, map_config)
{
  if(layerConfig.enabled == undefined || layerConfig.enabled == true)
  {
    var t = extract("type", layerConfig, "").toLowerCase();
    if(t == "geojson")
    {
      if(angular.isDefined(extract("heatmap", layerConfig, undefined)))
      {
        geodash.layers.init_featurelayer_heatmap($scope, live, map_config, id, layerConfig);
      }
      else
      {
        geodash.layers.init_featurelayer_geojson($scope, live, map_config, id, layerConfig);
      }
    }
    else if(t == "wms")
    {
      if(angular.isDefined(extract("heatmap", layerConfig, undefined)))
      {
        geodash.layers.init_featurelayer_heatmap($scope, live, map_config, id, layerConfig);
      }
      else
      {
        geodash.layers.init_featurelayer_wms($scope, live, map_config, id, layerConfig);
      }
    }
    else if(t == "tegola")
    {
      geodash.layers.init_featurelayer_tegola($scope, live, map_config, id, layerConfig);
    }
    else if(t == "wmts")
    {
      geodash.layers.init_featurelayer_wmts($scope, live, map_config, id, layerConfig);
    }
  }
};
