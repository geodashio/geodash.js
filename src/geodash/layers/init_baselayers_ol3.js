module.exports = function(map, baselayers)
{
  var layers = {};
  for(var i = 0; i < baselayers.length; i++)
  {
      var bl = baselayers[i];
      //var type = extract("source.type", .bl, 'tile');
      //var type_lc = type.toLowerCase();
      var attribution = extract("source.attribution", bl, undefined);

      var source = geodash.layers.source.xyz({ "bl": bl });
      if(geodash.util.isDefined(source))
      {
        try{
          layers[bl.id] = new ol.layer.Tile({ source: source });
          /*layers[bl.id] = L.tileLayer(url, {
              id: bl.id,
              attribution: attribution
          });*/
        }catch(err){geodah.error.log("layers", "Could not add baselayer "+i);}
      }
  }
  return layers;
};
