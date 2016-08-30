module.exports = function(opts)
{
  var lonlat = [
    geodash.api.opt_i(opts,["longitude", "lon", "lng", "long"], 0),
    geodash.api.opt_i(opts,["latitude", "lat"], 0)];
  var zoom = geodash.api.opt_i(opts, ["zoom", "z"], 0);

  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat(lonlat),
      zoom: zoom,
      minZoom: geodash.api.opt_i(opts, "minZoom", 3),
      maxZoom: geodash.api.opt_i(opts, "maxZoom", 18)
    })
  });
  //var map = ol.Map('map',
  //{
  //  attributionControl: geodash.api.opt_b(opts, "attributionControl", false),
  //  zoomControl: geodash.api.opt_b(opts, "zoomControl", false),
  //});

  $.each(geodash.api.opt_j(opts, "listeners"), function(e, f){
    map.on(e, f);
  });

  return map;
};
