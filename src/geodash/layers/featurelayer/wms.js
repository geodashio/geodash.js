module.exports = function(options)
{
  var dashboard = extract("dashboard", options) || geodash.api.getDashboardConfig();
  var layerConfig = extract("layerConfig", options);
  var layerID = extract("id", layerConfig) || extract("layerID", layerConfig) || extract("id", options) || extract("layerID", options);

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
        var source = geodash.layers.source.wms({ "wms": w });
        if(angular.isDefined(source))
        {
          var fl = new ol.layer.Image({
            source: source,
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
      }
    });
  }
  else
  {
    var source = geodash.layers.source.wms({ "wms": w });
    if(angular.isDefined(source))
    {
      var fl = new ol.layer.Image({
        source: source,
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
  }
};
