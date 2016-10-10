module.exports = function(options)
{
  var feature = extract("feature", options);
  var resolution = extract("resolution", options);
  var layerID = extract("layerID", options);
  var styleFnWorkspaces = extract("styleFnWorkspaces", options);
  //
  var styles = [];
  //var layerID = this.layerID;
  var mainScope = geodash.util.getScope("geodash-main");
  var fl = geodash.api.getFeatureLayer(layerID);
  if(angular.isDefined(fl))
  {
    var currentStyle = 0;
    var geometryType = feature.getGeometry().getType();
    var symbolizers = extract(["carto", "styles", currentStyle, "symbolizers"], fl, []);
    for(var i = 0; i < symbolizers.length; i++)
    {
      var symbolizer = symbolizers[i];
      var symbolizerFn = extract(symbolizer.type, geodash.style.symbolizer);
      var style = symbolizerFn({
        "feature": feature,
        "symbolizer": symbolizer,
        "styleFnWorkspaces": styleFnWorkspaces,
        "state": extract("state", mainScope),
        "dashboard": extract("dashboard", mainScope)
      });
      if(angular.isDefined(style))
      {
        styles.push(new ol.style.Style(style))
      }
  }
}
  return styles;
};
