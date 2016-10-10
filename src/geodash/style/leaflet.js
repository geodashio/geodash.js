module.exports = function(f, layer)
{
  //
  //var state = angular.element(document.body).injector().get('state');
  var $scope = angular.element("#geodash-main").scope();
  var state = $scope.state;
  var dashboard = angular.element(document.body).injector().get('dashboard');
  //
  var style = {};
  var popatrisk = geodash.api.getFeatureLayer("popatrisk", {"$scope": $scope});
  if(angular.isDefined(popatrisk))
  {
    var style_static = extract(["cartography", 0, "styles", "default", "static"], popatrisk);
    $.extend(style, style_static);
    var style_dynamic = extract(["cartography", 0, "styles", "default", "dynamic", "func"], popatrisk);
    var options = extract(["cartography", 0, "styles", "default", "dynamic", "options"], popatrisk);
    var delta = angular.isFunction(geodash[style_dynamic]) ? geodash[style_dynamic](f, state, dashboard, options) : undefined;
    if(delta != undefined)
    {
      $.extend(style, delta);
    }
  }
  return style;
};
