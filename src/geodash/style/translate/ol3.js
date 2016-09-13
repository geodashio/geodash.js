//module.exports = function(f, style_static, style_dynamic_fn, style_dynamic_options)
module.exports = function(options)
{
  var style = {};
  var f = extract('feature', options) || extract('f', options);
  var state = extract('state', options);
  var config = extract('map_config', options) || extract('config', options);
  var style_static = angular.isArray(extract('style_static', options)) ? geodash.api.arrayToObject(extract('style_static', options)) : {};
  var style_dynamic_fn = extract('style_dynamic_fn', options);
  var style_dynamic_options = extract('style_dynamic_options', options);
  ////
  var styleStaticAndDynamic = {};
  angular.extend(styleStaticAndDynamic, style_static);
  if(angular.isFunction(style_dynamic_fn))
  {
    var delta = style_dynamic_fn(f, state, config, style_dynamic_options);
    if(angular.isDefined(delta))
    {
      angular.extend(styleStaticAndDynamic, delta);
    }
  }

  var geometryType = f.getGeometry().getType();

  if(geometryType == "Point")
  {
    var circleOptions = {
        radius: geodash.normalize.float(extract("radius", styleStaticAndDynamic, 5.0))
    };
    if(angular.isDefined(extract("strokeColor", style_static)))
    {
      circleOptions["stroke"] = new ol.style.Stroke({
        color: extract("strokeColor", styleStaticAndDynamic),
        width: geodash.normalize.float(extract("strokeWidth", styleStaticAndDynamic, 1.0))
      });
    }
    if(angular.isDefined(extract("fillColor", styleStaticAndDynamic)))
    {
      circleOptions["fill"] = new ol.style.Fill({
        color: extract("fillColor", styleStaticAndDynamic, undefined)
      })
    }
    style["image"] = new ol.style.Circle(circleOptions);
  }

  if(geometryType == "Polygon" || geometryType == "MultiLineString" || geometryType == "MultiPolygon")
  {
    if(angular.isDefined(extract("strokeColor", styleStaticAndDynamic)))
    {
      style["stroke"] = new ol.style.Stroke({
        color: extract("strokeColor", styleStaticAndDynamic),
        width: geodash.normalize.float(extract("strokeWidth", styleStaticAndDynamic, 1.0))
      });
    }
  }

  if(geometryType == "Polygon" || geometryType == "MultiPolygon")
  {
    if(angular.isDefined(extract("fillColor", styleStaticAndDynamic)))
    {
      style["fill"] = new ol.style.Fill({
        color: extract("fillColor", styleStaticAndDynamic)
      })
    }
  }

  return style;
};
