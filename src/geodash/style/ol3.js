module.exports = function(options)
{
  var feature = extract("feature", options);
  var resolution = extract("resolution", options);
  var layerID = extract("layerID", options);
  var styleFnWorkspaces = extract("styleFnWorkspaces", options);
  //
  var styles = undefined;
  //var layerID = this.layerID;
  var dashboard = undefined;
  var state = undefined;
  if(typeof angular != "undefined")
  {
    dashboard = geodash.util.getScope("geodash-main").dashboard;
    state = geodash.util.getScope("geodash-main").state;
  }
  else
  {
    dashboard = geodash.var.dashboard();
    state = geodash.var.state();
  }
  var fl = geodash.api.getFeatureLayer(layerID);
  if(geodash.util.isDefined(fl))
  {
    var currentStyle = 0;

    var cacheStyles = extract(["carto", "styles", currentStyle, "cache"], fl, false);
    var styles_cached = undefined;
    if(cacheStyles)
    {
      styles_cached = extract(["var", "cache", "styles", layerID], geodash);
    }

    if(geodash.util.isDefined(styles_cached))
    {
      styles = styles_cached;
    }
    else
    {
      var geometryType = feature.getGeometry().getType();
      var symbolizers = extract(["carto", "styles", currentStyle, "symbolizers"], fl, []);
      if(symbolizers.length > 0){ styles = []; }
      for(var i = 0; i < symbolizers.length; i++)
      {
        var symbolizer = symbolizers[i];
        var symbolizerType = extract("type", symbolizer);
        var symbolizerFn = extract(symbolizerType || "default", geodash.style.symbolizer);
        var style = symbolizerFn({
          "feature": feature,
          "symbolizer": symbolizer,
          "styleFnWorkspaces": styleFnWorkspaces,
          "state": state,
          "dashboard": dashboard
        });
        if(geodash.util.isDefined(style))
        {
          styles.push(new ol.style.Style(style))
        }
      }
      if(cacheStyles)
      {
        geodash.var.cache.styles[layerID] = styles;
      }
    }
  }
  return styles;
};
