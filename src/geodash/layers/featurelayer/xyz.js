module.exports = function(options)
{
  var dashboard = extract("dashboard", options) || geodash.api.getDashboardConfig();
  var layerConfig = extract("layerConfig", options);
  var layerID = extract("id", layerConfig) || extract("layerID", layerConfig) || extract("id", options) || extract("layerID", options);

  var source = geodash.layers.source.xyz({ "layer": layerConfig });

  if(geodash.util.isDefined(source))
  {
    var snapToPower = ol.ResolutionConstraint.createSnapToPower(2, 156543.03392804097, 18);
    var minZoom = extract("view.minZoom", layerConfig) || extract("source.minZoom", layerConfig);
    var minResolution = geodash.util.isDefined(minZoom) ? snapToPower(156543.03392804097, minZoom, 0) : undefined;
    var maxZoom = extract("view.maxZoom", layerConfig) || extract("source.maxZoom", layerConfig);
    var maxResolution = geodash.util.isDefined(maxZoom) ? snapToPower(156543.03392804097, maxZoom, 0) : undefined;

    var fl = new ol.layer.Tile({
      source: source,
      zIndex: geodash.api.getRenderOrder({ "dashboard": dashboard, "id": layerID, "reverse": true }),
      minResolution: minResolution,
      maxResolution: maxResolution
    });
    geodash.api.addFeatureLayer(layerID, fl);

    var cb = extract("cb.success", options);
    if(geodash.util.isDefined(cb))
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
