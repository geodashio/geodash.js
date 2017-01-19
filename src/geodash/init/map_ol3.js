module.exports = function(options)
{
  var id = extract("id", options, "map");
  var lonlat = [
    extract("dashboard.view.lon", options) || extract('dashboard.view.longitude', options, 0),
    extract("dashboard.view.lat", options) || extract('dashboard.view.latitude', options, 0),
  ];
  var zoom = extract("dashboard.view.zoom", options) || extract('dashboard.view.z', options, 0);

  var controls = [];
  if(extract("dashboard.controls.zoom", options, true)) { controls.push(new ol.control.Zoom()); }
  controls.push(new ol.control.Rotate());
  if(extract("dashboard.controls.attribution", options, true)) { controls.push(new ol.control.Attribution()); }

  var map = new ol.Map({
    target: id,
    layers: [],
    controls: controls,
    overlays: [
      new ol.Overlay({element: document.getElementById('popup')})
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat(lonlat),
      zoom: zoom,
      minZoom: extract("dashboard.view.minZoom", options, 3),
      maxZoom: extract("dashboard.view.maxZoom", options, 18)
    })
  });


  if(geodash.util.isDefined(extract("listeners.map", options)))
  {
    $.each(extract("listeners.map", options), function(e, f){ map.on(e, f); });
  }

  if(geodash.util.isDefined(extract("listeners.view", options)))
  {
    var v = map.getView();
    $.each(extract("listeners.view", options), function(e, f){ v.on(e, f); });
  }

  return map;
};
