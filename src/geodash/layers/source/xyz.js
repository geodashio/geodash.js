module.exports = function(options)
{
  var source = undefined;

  var mapbox = extract("bl.mapbox", options);
  var gwc = extract("bl.gwc", options);
  var tile = extract("bl.tile", options) || extract("bl.tiles", options) || extract("bl.source.tile", options);

  var url = undefined;

  if(geodash.util.isDefined(mapbox))
  {
    var layers = extract("layers", mapbox) || extract("layer", mapbox);
    var styles = extract("styles", mapbox) || extract("style", mapbox);
    var account = extract("account", mapbox) || extract("username", mapbox);
    var access_token = extract("access_token", mapbox, undefined);

    if(geodash.util.isString(layers)){ layers = layers.split(","); }
    if(geodash.util.isString(styles)){ styles = styles.split(","); }

    if(geodash.util.isString(access_token) && access_token.length > 0)
    {
      if(Array.isArray(layers) && layers.length > 0)
      {
        url = "http://{a-c}.tiles.mapbox.com/v4/"+layers.join(",")+"/{z}/{x}/{y}.png?access_token="+access_token;
      }
      else if(Array.isArray(styles) && styles.length > 0)
      {
        url = "https://api.mapbox.com/styles/v1/"+account+"/"+styles[0]+"/tiles/256/{z}/{x}/{y}?access_token="+access_token
      }
    }
  }
  else if(geodash.util.isDefined(gwc))
  {
    var baseurl = extract("url", gwc, undefined);
    var layers = extract("layers", gwc, undefined);
    var projection = extract("projection", gwc, "EPSG:900913");
    var format = extract("format", gwc, "png");

    if(geodash.util.isString(layers)){ layers = layers.split(","); }

    if(Array.isArray(layers) && layers.length > 0 && geodash.util.isDefined(access_token))
    {
      url = baseurl+(baseurl.endsWith("/")?'':'/')+"service/tms/1.0.0/"+layers.join(",")+"@"+projection+"@"+format+"/{z}/{x}/{y}."+format;
    }
  }
  else if(geodash.util.isDefined(tile))
  {
    url = extract("url", tile, undefined);
  }

  if(geodash.util.isDefined(url))
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
