module.exports = function(m, v, options)
{
  var chain = [];

  var extent = extract("extent", options);
  var lat = extract("lat", options);
  var lon = extract("lon", options);
  var zoom = extract("zoom", options);
  var minZoom = extract("minZoom", options);
  var duration = extract("duration", options, 1000);

  var current_res = v.getResolution();
  var target_center = undefined;
  var target_res = undefined;

  if(geodash.util.isDefined(extent))
  {
    target_center = ol.extent.getCenter(extent);
    target_res = v.constrainResolution(v.getResolutionForExtent(extent, m.getSize()));
  }
  else
  {
    if(geodash.util.isDefined(lon) && geodash.util.isDefined(lat))
    {
      target_center = ol.proj.transform(
        [geodash.normalize.float(lon), geodash.normalize.float(lat)],
        "EPSG:4326",
        v.getProjection()
      );
    }

    if(geodash.util.isDefined(zoom))
    {
      target_res = v.getMaxResolution() / Math.pow(2, geodash.normalize.integer(zoom));
    }
    else if(geodash.util.isDefined(minZoom))
    {
      target_res = v.getMaxResolution() / Math.pow(2, Math.max(v.getZoom(), geodash.normalize.integer(minZoom)));
    }
  }

  if(target_center != undefined)
  {
    if(target_res != undefined)
    {
      if(current_res == target_res)
      {
        if(! geodash.util.equals(v.getCenter(), target_center))
        {
          chain = [{center: target_center, duration: duration}];
        }
      }
      else if(current_res < target_res)
      {
        if(geodash.util.equals(v.getCenter(), target_center))
        {
          chain = [{resolution: target_res, duration: duration}];
        }
        else
        {
          //chain = [{resolution: target_res}, {center: target_center}]
          chain = [{resolution: target_res, center: target_center, duration: duration}];
        }
      }
      else if(current_res > target_res)
      {
        if(geodash.util.equals(v.getCenter(), target_center))
        {
          chain = [{resolution: target_res, duration: duration}];
        }
        else
        {
          //chain = [{center: target_center}, {resolution: target_res}]
          chain = [{center: target_center, resolution: target_res, duration: duration}];
        }
      }
    }
    else
    {
      if(! geodash.util.equals(v.getCenter(), target_center))
      {
        chain = [{center: target_center, duration: duration}];
      }
    }
  }
  else if(target_res != undefined)
  {
    chain = [{resolution: target_res, duration: duration}];
  }

  return chain;
  //return [{resolution: v.getMaxResolution()/8, duration: 10000}].concat(chain);
};
