module.exports = function(options)
{
  var id = extract("id", options, "map");
  var lonlat = [
    geodash.api.opt_i(options,["longitude", "lon", "lng", "long"], 0),
    geodash.api.opt_i(options,["latitude", "lat"], 0)];
  var zoom = geodash.api.opt_i(options, ["zoom", "z"], 0);

  var controls = [];
  if(extract("zoomControl", options, true)) { controls.push(new ol.control.Zoom()); }
  controls.push(new ol.control.Rotate());
  if(extract("attributionControl", options, true)) { controls.push(new ol.control.Attribution()); }

  var map = new ol.Map({
    target: id,
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    controls: controls,
    overlays: [
      new ol.Overlay({element: document.getElementById('popup')})
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat(lonlat),
      zoom: zoom,
      minZoom: geodash.api.opt_i(options, "minZoom", 3),
      maxZoom: geodash.api.opt_i(options, "maxZoom", 18)
    })
  });
  //var map = ol.Map('map',
  //{
  //  attributionControl: geodash.api.opt_b(options, "attributionControl", false),
  //  zoomControl: geodash.api.opt_b(options, "zoomControl", false),
  //});

  $.each(geodash.api.opt_j(options, "listeners"), function(e, f){
    map.on(e, f);
  });

  return map;
};
