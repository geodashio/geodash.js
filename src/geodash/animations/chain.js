module.exports = function(m, v, targetExtent)
{
  var chain = [];

  var current_res = v.getResolution();
  var target_res = v.constrainResolution(v.getResolutionForExtent(targetExtent, m.getSize()));
  var target_center = ol.extent.getCenter(targetExtent);

  if(current_res == target_res)
  {
    if(! ol.array.equals(v.getCenter(), target_center))
    {
      chain = [{center: target_center}]
    }
  }
  else if(current_res < target_res)
  {
    if(ol.array.equals(v.getCenter(), target_center))
    {
      chain = [{resolution: target_res}]
    }
    else
    {
      //chain = [{resolution: target_res}, {center: target_center}]
      chain = [{resolution: target_res, center: target_center}]
    }
  }
  else if(current_res > target_res)
  {
    if(ol.array.equals(v.getCenter(), target_center))
    {
      chain = [{resolution: target_res}]
    }
    else
    {
      //chain = [{center: target_center}, {resolution: target_res}]
      chain = [{center: target_center, resolution: target_res}]
    }
  }
  return chain;
};
