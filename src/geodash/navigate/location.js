module.exports = function(options)
{
  if(extract("animate", options, true) == false)
  {
    var m = geodash.var.map;
    var v = m.getView();

    var zoom = extract("zoom", options);
    if(geodash.util.isDefined(zoom))
    {
      v.setZoom(geodash.normalize.integer(zoom));
    }

    var lat = extract("lon", options);
    var lon = extract("lat", options);
    if(geodash.util.isDefined(lon) && geodash.util.isDefined(lat))
    {
      v.setCenter(ol.proj.transform(
        [geodash.normalize.float(lon), geodash.normalize.float(lat)],
        "EPSG:4326",
        v.getProjection()
      ));
    }
  }
  else
  {
    setTimeout(function(){
      var m = geodash.var.map;
      var v = m.getView();
      var args = geodash.animations.chain(m, v, options);
      if(args.length > 0)
      {
        v.animate.apply(v, args);
      }
    }, 0);
  }
};
