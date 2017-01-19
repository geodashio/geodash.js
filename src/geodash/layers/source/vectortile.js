module.exports = function(options)
{
  var source = undefined;

  var maxZoom = 18;
  var tilePixelRatio = 16;

  var tegola = extract("fl.tegola", options);
  var mapzen = extract("fl.mapzen", options);

  var url = undefined;

  if(geodash.util.isDefined(tegola))
  {
    url = tegola.url+"/maps/"+tegola.map+"/{z}/{x}/{y}.vector.pbf";
    if(extract("debug", tegola, false))
    {
      url += "?debug=true";
    }
  }

  if(geodash.util.isDefined(mapzen))
  {
    url = "http://tile.mapzen.com/mapzen/vector/"+extract("version", mapzen, "v1")+"/"+extract("layers", mapzen, []).join(",")+"/{z}/{x}/{y}."+extract("format", mapzen, "mvt");
    url += "?api_key="+extract("api_key", mapzen, "");
  }

  if(geodash.util.isDefined(url))
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
