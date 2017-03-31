module.exports = function($interpolate, featureLayer, feature, state)
{
  var popupTemplate = geodash.popup.buildPopupTemplate(featureLayer.popup, featureLayer, feature, state);
  var ctx = {
    'layer': featureLayer,
    'feature': feature,
    'state': state
  };
  if(geodash.util.isDefined(extract("config.popup.context", geodash)))
  {
    angular.extend(ctx, extract("config.popup.context", geodash));
  }
  var content = geodash.util.isDefined(popupTemplate) ? $interpolate(popupTemplate)(ctx) : undefined;
  var title = angular.isString(featureLayer.popup.title) ? $interpolate(featureLayer.popup.title)(ctx) : "";
  return { 'content': content, 'title': title }
};
