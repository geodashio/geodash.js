var util = require("geodash-util");

module.exports = function(options)
{
  var id = extract("id", options, "map");

  var lonlat = [0, 0];
  var zoom = 3;
  if(util.isDefined(extract("state.view.extent", options)))
  {
    lonlat = ol.extent.getCenter(extract("state.view.extent", options));
  }
  else if(util.isDefined(extract("state.view.lon", options)) && util.isDefined(extract("state.view.lat", options)))
  {
    lonlat = [
      extract("state.view.lon", options),
      extract("state.view.lat", options)
    ];
    zoom = extract("state.view.z", options, 3);
  }

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


  if(util.isDefined(extract("listeners.map", options)))
  {
    $.each(extract("listeners.map", options), function(e, f){ map.on(e, f); });
  }

  if(util.isDefined(extract("listeners.view", options)))
  {
    var v = map.getView();
    $.each(extract("listeners.view", options), function(e, f){ v.on(e, f); });
  }

  return map;
};
