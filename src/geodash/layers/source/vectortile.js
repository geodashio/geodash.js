module.exports = function(options)
{
  var source = undefined;

  var maxZoom = 18;
  var tilePixelRatio = 16;

  var tegola = extract("fl.tegola", options);

  var url = undefined;

  if(angular.isDefined(tegola))
  {
    url = tegola.url+"/maps/"+tegola.map+"/{z}/{x}/{y}.vector.pbf";
    if(extract("debug", tegola, false))
    {
      url += "?debug=true";
    }
  }

  if(angular.isDefined(url))
  {
    source = new ol.source.VectorTile({
      attributions: '',
      format: new ol.format.MVT(),
      tileGrid: ol.tilegrid.createXYZ({ maxZoom: maxZoom }),
      tilePixelRatio: tilePixelRatio,
      url: url
    });
  }

  return source;
};
