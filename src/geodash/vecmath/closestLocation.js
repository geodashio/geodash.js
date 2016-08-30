module.exports = function(a, b)
{
  if(b.toString != undefined && b.toString().startsWith('LatLng'))
  {
    return b;
  }
  else
  {
    var p = L.Projection.SphericalMercator;
    var minDistance = undefined;
    var closestPoint = undefined;
    $.each(b._layers, function(id, layer)
    {
      var rings = [];
      if(layer.feature.geometry.type == "MultiPolygon")
      {
        for(var i = 0; i < layer._latlngs.length; i++)
        {
          for(var j = 0; j < layer._latlngs[i].length; j++)
          {
            rings.push(layer._latlngs[i][j]);
          }
        }
      }
      else
      {
        rings.push(layer._latlngs);
      }
      for(var r = 0; r < rings.length; r++)
      {
        var verticies = rings[r];
        var i = 0;
        if(minDistance == undefined)
        {
          minDistance = L.LineUtil.pointToSegmentDistance(
            p.project(a),
            p.project(verticies[i]),
            p.project(verticies[i+1]));
          closestPoint = L.LineUtil.closestPointOnSegment(
            p.project(a),
            p.project(verticies[i]),
            p.project(verticies[i+1]));
          i++;
        }
        for(; i < verticies.length -1; i++)
        {
          var d = L.LineUtil.pointToSegmentDistance(
            p.project(a),
            p.project(verticies[i]),
            p.project(verticies[i+1]));
          if(d < minDistance)
          {
            minDistance = d;
            closestPoint = L.LineUtil.closestPointOnSegment(
              p.project(a),
              p.project(verticies[i]),
              p.project(verticies[i+1]));
          }
        }
      }
    });
    return p.unproject(closestPoint);
  }
};
