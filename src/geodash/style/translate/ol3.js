//module.exports = function(f, style_static, style_dynamic_fn, style_dynamic_options)
module.exports = function(options)
{
  var style = {};
  var symbolizerType = extract('symbolizerType', options).toLowerCase();
  var f = extract('feature', options) || extract('f', options);
  var state = extract('state', options);
  var config = extract('dashboard', options) || extract('config', options);
  var style_static = Array.isArray(extract('style_static', options)) ? geodash.util.arrayToObject(extract('style_static', options)) : extract('style_static', options);
  var style_dynamic_fn = extract('style_dynamic_fn', options);
  var style_dynamic_options = extract('style_dynamic_options', options);
  var style_transform_operations = extract('style_transform_operations', options);
  ////
  var styleStaticAndDynamic = {};
  geodash.util.extend(styleStaticAndDynamic, style_static);
  if(geodash.util.isFunction(style_dynamic_fn))
  {
    var delta = style_dynamic_fn(f, state, config, style_dynamic_options);
    if(geodash.util.isDefined(delta))
    {
      geodash.util.extend(styleStaticAndDynamic, delta);
    }
  }

  var geometryType = f.getGeometry().getType();

  var textContent = extract("textContent", styleStaticAndDynamic);
  var textCode = extract("textCode", styleStaticAndDynamic);
  if(geodash.util.isDefined(textContent) || geodash.util.isDefined(textCode))
  {
    if(! geodash.util.isDefined(textContent))
    {
      textContent = String.fromCharCode(parseInt(textCode, 16));
    }
    var textOptions = {
      textAlign: extract("textAlign", styleStaticAndDynamic, "center"),
      textBaseline: extract("textBaseline", styleStaticAndDynamic, "middle"),
      font: extract("textFont", styleStaticAndDynamic, "normal 10px Verdana"),
      text: textContent,
      fill: new ol.style.Fill({color: extract("textColor", styleStaticAndDynamic, "#000000")}),
      offsetX: 0,
      offsetY: 0,
      rotation: 0
    };
    style["text"] = new ol.style.Text(textOptions);
  }

  //if(geometryType == "Point")
  if(symbolizerType == "point")
  {
    var circleOptions = {
        radius: extractFloat("radius", styleStaticAndDynamic, 5.0)
    };
    if(geodash.util.isDefined(extract("strokeColor", styleStaticAndDynamic)))
    {
      var strokeWidth = extractFloat("strokeWidth", styleStaticAndDynamic, 1.0);
      if(strokeWidth > 0)
      {
        circleOptions["stroke"] = new ol.style.Stroke({
          color: geodash.normalize.color(extract("strokeColor", styleStaticAndDynamic)),
          width: strokeWidth
        });
      }
    }
    if(geodash.util.isDefined(extract("fillColor", styleStaticAndDynamic)))
    {
      var fillColor = geodash.normalize.color(extract("fillColor", styleStaticAndDynamic));
      var fillOpacity = extractFloat("fillOpacity", styleStaticAndDynamic);
      if(geodash.util.isDefined(fillOpacity))
      {
        try{
          var fillColorAsArray = ol.color.asArray(fillColor).slice();
          fillColorAsArray[3] = fillOpacity;
          fillColor = fillColorAsArray;
        }catch(err){}
      }
      circleOptions["fill"] = new ol.style.Fill({ color: "rgba("+fillColor.join(",")+")" })
    }
    style["image"] = new ol.style.Circle(circleOptions);
  }

  //if(geometryType == "Polygon" || geometryType == "MultiLineString" || geometryType == "MultiPolygon")
  if(symbolizerType == "polygon" || symbolizerType == "line")
  {
    if(geodash.util.isDefined(extract("strokeColor", styleStaticAndDynamic)))
    {
      var strokeWidth = extractFloat("strokeWidth", styleStaticAndDynamic, 1.0);
      if(strokeWidth > 0)
      {
        var strokeColor = geodash.normalize.color(extract("strokeColor", styleStaticAndDynamic));
        var strokeOpacity = extractFloat("strokeOpacity", styleStaticAndDynamic);
        if(geodash.util.isDefined(strokeOpacity))
        {
          try{
            var strokeColorAsArray = ol.color.asArray(strokeColor).slice();
            strokeColorAsArray[3] = strokeOpacity;
            strokeColor = strokeColorAsArray;
          }catch(err){}
        }
        style["stroke"] = new ol.style.Stroke({
          color: strokeColor,
          width: strokeWidth
        });
      }
    }
  }

  //if(geometryType == "Polygon" || geometryType == "MultiPolygon")
  if(symbolizerType == "polygon")
  {
    if(geodash.util.isDefined(extract("fillColor", styleStaticAndDynamic)))
    {
      var fillColor = geodash.normalize.color(extract("fillColor", styleStaticAndDynamic));
      var fillOpacity = extractFloat("fillOpacity", styleStaticAndDynamic)
      if(geodash.util.isDefined(fillOpacity))
      {
        try{
          var fillColorAsArray = ol.color.asArray(fillColor).slice();
          fillColorAsArray[3] = fillOpacity;
          fillColor = fillColorAsArray;
        }catch(err){}
      }
      style["fill"] = new ol.style.Fill({ color: "rgba("+fillColor.join(",")+")" })
    }
  }

  if(geodash.util.isDefined(style_transform_operations))
  {
    if(Array.isArray(style_transform_operations))
    {
      style["geometry"] = (function(operations){
        return function(feature){
          var geom = feature.getGeometry();
          for(var i = 0; i < operations.length; i++)
          {
            var op = operations[i];
            if(op.name == "buffer")
            {
              var fn = extract(op.name, geodash.transform);
              if(geodash.util.isDefined(fn))
              {
                var properties = geodash.util.arrayToObject(op.properties);
                properties["feature"] = feature;
                geom = fn(geom, properties)
              }
            }
          }
          return geom;
        }
      })(style_transform_operations)
    }
  }

  return style;
};
