module.exports = function(options)
{
  var source = undefined;
  var w = extract("wms", options);
  if(geodash.util.isDefined(w))
  {
    var params = {
      "LAYERS": geodash.codec.formatArray('layers', w, ''),
      "STYLES": geodash.codec.formatArray('styles', w, ''),
      "buffer": w.buffer || 0,
      "version": w.version || "1.1.1",
      "format": w.format || "image/png",
      "transparent": extract('transparent', w, true)
    };

    var cql_filter = extract('cql_filter', w, undefined);
    if(geodash.util.isDefined(cql_filter))
    {
      params["CQL_FILTER"] = cql_filter;
    }

    source = new ol.source.ImageWMS({
      url: w.url,
      params: params,
      serverType: 'geoserver',
      crossOrigin: 'anonymous'
    });
  }
  else
  {
    geodash.log.error("source", ["Could not initialize wms source since fl.wms is undefined."]);
  }

  return source;
};
