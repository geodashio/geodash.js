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
    var fl = new ol.layer.Heatmap({
      source: source,
      blur: extract('heatmap.blur', layerConfig, 15),
      radius: extract('heatmap.radius', layerConfig, 5),
      weight: extract('heatmap.weight', layerConfig, undefined),
      zIndex: geodash.api.getRenderOrder({ "dashboard": dashboard, "id": layerID, "reverse": true })
    });
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
