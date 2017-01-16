module.exports = function(options)
{
  var source = undefined;

  var mapbox = extract("bl.mapbox", options);
  var gwc = extract("bl.gwc", options);
  var tile = extract("bl.tile", options) || extract("bl.tiles", options) || extract("bl.source.tile", options);

  var url = undefined;

  if(angular.isDefined(mapbox))
  {
    var layers = extract("layers", mapbox) || extract("layer", mapbox);
    var access_token = extract("access_token", mapbox, undefined);

    if(angular.isString(layers)){ layers = layers.split(","); }

    if(Array.isArray(layers) && layers.length > 0 && angular.isDefined(access_token))
    {
      url = "http://{a-c}.tiles.mapbox.com/v4/"+layers+"/{z}/{x}/{y}.png?access_token="+access_token;
    }
  }
  else if(angular.isDefined(gwc))
  {
    var baseurl = extract("url", gwc, undefined);
    var layers = extract("layers", gwc, undefined);
    var projection = extract("projection", gwc, "EPSG:900913");
    var format = extract("format", gwc, "png");

    if(angular.isString(layers)){ layers = layers.split(","); }

    if(Array.isArray(layers) && layers.length > 0 && angular.isDefined(access_token))
    {
      url = baseurl+(baseurl.endsWith("/")?'':'/')+"service/tms/1.0.0/"+layers.join(",")+"@"+projection+"@"+format+"/{z}/{x}/{y}."+format;
    }
  }
  else if(angular.isDefined(tile))
  {
    url = extract("url", tile, undefined);
  }

  if(angular.isDefined(url))
  {
    source = new ol.source.XYZ({
      url: url,
      maxZoom: extract("bl.maxZoom", options, 18)
    })
  }
  else
  {
    geodash.log.error("source", ["Could not initialize xyz source", JSON.stringify(options)]);
  }

  return source;
};
