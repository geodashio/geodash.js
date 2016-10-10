module.exports = function(options)
{
  if(extract("fl.enabled", options, true))
  {
    var t = extract("fl.type", options, "").toLowerCase();

    var initFn = undefined;

    if((t == "geojson" || t == "wms") && angular.isDefined(extract("fl.heatmap", options, undefined)))
    {
      initFn = extract("heatmap", geodash.layers.featurelayer)
    }
    else
    {
      initFn = extract(t, geodash.layers.featurelayer);
    }

    initFn({
      "$scope": extract("$scope", options),
      "dashboard": extract("dashboard", options),
      "id": extract("id", options),
      "layerConfig": extract("fl", options),
      "state": extract("state", options),
      "cb": {
        "success": geodash.layers.init_featurelayer_post_ol3,
        "failed": function(x){
          geodash.log.error("layers", ["Could not initialize feature layer" + extract("id", x) +".", extract("fl", x)]);
        }
      }
    });
  }
};
