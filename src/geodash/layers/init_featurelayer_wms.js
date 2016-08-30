module.exports = function($scope, live, map_config, id, layerConfig)
{
  var w = layerConfig.wms;
  if(extract("auth", layerConfig, "") == "basic")
  {
    var auth_url = w.url + (w.url.indexOf("?") != -1 ? '&' : '?') + "SERVICE=WMS&REQUEST=GetCapabilities"
    $.ajax({
      url: auth_url,
      type: "GET",
      dataType: "jsonp",
      jsonp: "callback",
      beforeSend: function(xhr){
        xhr.setRequestHeader("Authorization", "Basic "+btoa("null:null"));
        console.log(xhr);
      },
      error: function(){},
      success: function(){},
      complete: function(response){
        var params = {
          "LAYERS": geodash.codec.formatArray('layers', w, ''),
          "STYLES": geodash.codec.formatArray('styles', w, ''),
          "buffer": w.buffer || 0,
          "version": w.version || "1.1.1",
          "format": w.format || "image/png",
          transparent: extract('transparent', w, true)
        };
        var cql_filter = extract('cql_filter', w, undefined);
        if(angular.isDefined(cql_filter))
        {
          params["CQL_FILTER"] = cql_filter;
        }
        var options = {
          url: w.url,
          params: params,
          serverType: 'geoserver',
          crossOrigin: 'anonymous'
        };
        var source = new ol.source.ImageWMS(options);
        var fl = new ol.layer.Image({
          source: source
        });
        live["featurelayers"][id] = fl;
        geodash.layers.init_featurelayer_post_ol3($scope, live, id, fl, layerConfig.visible);
      }
    });
  }
  else
  {
    var params = {
      "LAYERS": geodash.codec.formatArray('layers', w, ''),
      "STYLES": geodash.codec.formatArray('styles', w, ''),
      "buffer": w.buffer || 0,
      "version": w.version || "1.1.1",
      "format": w.format || "image/png",
      transparent: extract('transparent', w, true)
    };
    var cql_filter = extract('cql_filter', w, undefined);
    if(angular.isDefined(cql_filter))
    {
      params["CQL_FILTER"] = cql_filter;
    }
    var options = {
      url: w.url,
      params: params,
      serverType: 'geoserver',
      crossOrigin: 'anonymous'
    };
    var source = new ol.source.ImageWMS(options);
    var fl = new ol.layer.Image({
      source: source
    });
    live["featurelayers"][id] = fl;
    geodash.layers.init_featurelayer_post_ol3($scope, live, id, fl, layerConfig.visible);
  }
};
