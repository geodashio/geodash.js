module.exports = function(options)
{
  var dashboard = extract("dashboard", options) || geodash.api.getDashboardConfig();
  var layerConfig = extract("layerConfig", options);
  var layerID = extract("id", layerConfig) || extract("layerID", layerConfig) || extract("id", options) || extract("layerID", options);

  var local = extract("geojson.local", layerConfig);
  var url = extract("geojson.url", layerConfig);

  var source = undefined;
  if(angular.isDefined(local))
  {
    var localData = extract(local, geodash.initial_data);
    if(angular.isDefined(localData))
    {
      source = geodash.layers.source.geojson({ "local": localData });
    }
    else
    {
      geodash.log.error("layers", ["Could not initialize GeoJSON layer "+id+" because local data at "+local+" was not found."]);
    }
  }
  else if(angular.isDefined(url))
  {
    source = geodash.layers.source.geojson({ "url": url });
  }
  else
  {
    if(angular.isDefined(extract("wfs.url", layerConfig)))
    {
      url = geodash.layers.translate.wfs_to_geojson({ "fl": layerConfig });
    }

    if(angular.isDefined(url))
    {
      source = geodash.layers.source.geojson({ "url": url });
    }
  }

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
    var fl = new ol.layer.Vector({
      id: layerID,
      source: source,
      zIndex: geodash.api.getRenderOrder({ "dashboard": dashboard, "id": layerID, "reverse": true })
    });
    fl.setStyle(styleFn);
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
