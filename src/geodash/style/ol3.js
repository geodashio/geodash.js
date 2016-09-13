module.exports = function(f, resolution, layerID, styleFnWorkspaces)
{
  var styles = [];
  //var layerID = this.layerID;
  var mainScope = geodash.api.getScope("geodash-main");
  var fl = geodash.api.getFeatureLayer(layerID);
  if(angular.isDefined(fl))
  {
    var currentStyle = 0;
    var geometryType = f.getGeometry().getType();
    var symbolizers = extract(["carto", "styles", currentStyle, "symbolizers"], fl, []);
    for(var i = 0; i < symbolizers.length; i++)
    {
      var symbolizer = symbolizers[i];
      var style_static = extract(["static", "properties"], symbolizer);
      var style_dynamic_fn_name = extract(["dynamic", "func"], symbolizer);
      var style_dynamic_fn = undefined;
      if(angular.isDefined(style_dynamic_fn_name))
      {
        for(var j = 0; j < styleFnWorkspaces.length; j++)
        {
          style_dynamic_fn = extract(style_dynamic_fn_name, styleFnWorkspaces[j]);
          if(angular.isFunction(style_dynamic_fn))
          {
            break;
          }
        }
      }
      style = geodash.style.translate.ol3({
        'feature': f,
        'state': mainScope.state,
        'map_config': mainScope.map_config,
        'style_static': style_static,
        'style_dynamic_fn': style_dynamic_fn,
        'style_dynamic_options': extract(["dynamic", "options"], symbolizer)
      });
      styles.push(new ol.style.Style(style))
    }

    //$.extend(style, style_static);

    /*
    var style_dynamic = extract(["cartography", 0, "styles", "default", "dynamic", "func"], popatrisk);
    var options = extract(["cartography", 0, "styles", "default", "dynamic", "options"], popatrisk);
    var delta = angular.isFunction(geodash[style_dynamic]) ? geodash[style_dynamic](f, state, map_config, options) : undefined;
    if(delta != undefined)
    {
      $.extend(style, delta);
    }*/
  }
  return styles;
};
