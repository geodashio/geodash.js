module.exports = function(id, layerConfig, $scope, live, map_config, state)
{
  if(extract("enabled", layerConfig, true))
  {
    var t = extract("type", layerConfig, "").toLowerCase();

    var initFn = undefined;

    if((t == "geojson" || t == "wms") && angular.isDefined(extract("heatmap", layerConfig, undefined)))
    {
      initFn = extract("heatmap", geodash.layers.featurelayer)
    }
    else
    {
      initFn = extract(t, geodash.layers.featurelayer);
    }

    initFn({
      "$scope": $scope,
      "live": live,
      "dashboard": map_config,
      "id": id,
      "layerConfig": layerConfig,
      "state": state,
      "cb": {
        "success": geodash.layers.init_featurelayer_post_ol3,
        "failed": function(options){
          geodash.log.error("layers", ["Could not initialize feature layer" + extract("id", options) +".", extract("fl", options)]);
        }
      }
    });
  }
};
