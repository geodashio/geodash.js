module.exports = function(options)
{
  var fl = extract("fl", options);

  var url = undefined;

  var srs = "EPSG%3A4326";
  var layers = extract('wfs.layers', fl) || extract('wms.layers', fl);

  var params = [
    "srsName="+srs,
    "typename="+geodash.codec.formatArray(layers),
    "outputFormat=json",
    "version=1.0.0",
    "service=WFS",
    "request=GetFeature"
  ];

  url = extract("wfs.url", fl)+"?"+params.join("&");

  return url;
};
