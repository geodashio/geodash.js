module.exports = function(options)
{
  var dashboard = extract("dashboard", options) || geodash.api.getDashboardConfig();
  var layerConfig = extract("layerConfig", options);
  var layerID = extract("id", layerConfig) || extract("layerID", layerConfig) || extract("id", options) || extract("layerID", options);

  var source = geodash.layers.source.vectortile({ "fl": layerConfig });

  if(angular.isDefined(source))
  {
    var ws = extract("config.dynamicStyleFunctionWorkspaces", geodash) || [geodash.dynamicStyleFn];
    var styleFn = (function(_layerID, styleFnWorkspaces){
      return function(feature, resolution) {
        return geodash.style.ol3({
          "feature": feature,
          "resolution": resolution,
          "layerID": _layerID,
          "styleFnWorkspaces": styleFnWorkspaces
        }) || [];
      };
    })(layerID, extract('dynamicStyleFunctionWorkspaces', geodash.config, ws));
    var fl = new ol.layer.VectorTile({
      source: source,
      zIndex: geodash.api.getRenderOrder({ "dashboard": dashboard, "id": layerID, "reverse": true })
    });
    if(angular.isDefined(styleFn))
    {
      fl.setStyle(styleFn);
    }
    geodash.api.addFeatureLayer(layerID, fl);

    var cb = extract("cb.success", options);
    if(angular.isDefined(cb))
    {
      cb({
        "$scope": extract("$scope", options) || extract("scope", options),
        "id": layerID,
        "fl": fl,
        "state": options.state
      });
    }
  }
};
