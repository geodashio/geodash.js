module.exports = function(args)
{
  if(geodash.mapping_library == "ol3")
  {
    var layer = geodash.var.featurelayers[args["layer"]];
    var v = geodash.var.map.getView();
    geodash.var.map.beforeRender(ol.animation.pan({ duration: 1000, source: v.getCenter() }));
    v.fit(layer.getSource().getExtent(), geodash.var.map.getSize());
  }
  else if(geodash.mapping_library == "leaflet")
  {
    geodash.var.map.fitBounds(geodash.var.featurelayers[args["layer"]].getBounds());
  }
};
