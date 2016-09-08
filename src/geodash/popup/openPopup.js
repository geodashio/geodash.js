module.exports = function($interpolate, featureLayer, feature, location, map, state)
{
  var popupContentAndTitle = geodash.popup.buildPopupContentAndTitle($interpolate, featureLayer, feature, state);
  if(geodash.mapping_library = "ol3")
  {
    var popup = map.getOverlays().item(0);
    var element = $("#popup");
    element.popover('destroy');
    popup.setPosition(ol.proj.fromLonLat([location.lon, location.lat], map.getView().getProjection()));
    element.popover({
      'container': 'body',
      'placement': 'top',
      'animation': false,
      'html': true,
      'content': popupContentAndTitle.content,
      'title': popupContentAndTitle.title
    });
    element.popover('show');
  }
  else
  {
    var popup = new L.Popup({maxWidth: (featureLayer.popup.maxWidth || 400)}, undefined);
    popup.setLatLng(new L.LatLng(location.lat, location.lon));
    popup.setContent(popupContentAndTitle.content);
    map.openPopup(popup);
  }
};
