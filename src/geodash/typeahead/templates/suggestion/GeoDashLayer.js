module.exports = function(data)
{
  var lines = [];

  lines.push('<strong>' + (extract('obj.title', data) || extract('obj.id', data)) + '</strong> ('+extract('obj.id', data)+')');

  if(extract('obj.type', data) == "geojson")
  {
    lines.push('<span style="color:#00C;">GeoJSON</span> | <span style="color:#00C;">' + geodash.codec.parseURL(extract('obj.geojson.url', data), 'geojson').domain);
  }
  else if(extract('obj.type', data) == "wms")
  {
    lines.push('<span style="color:#00C;">WMS</span> | <span style="color:#00C;">' + geodash.codec.parseURL(extract('obj.wms.url', data), 'wms').domain);
  }
  else if(extract('obj.source.type', data) == "tiles")
  {
    lines.push('<span style="color:#00C;">Tiles</span> | <span style="color:#00C;">' + geodash.codec.parseURL(extract('obj.source.tile.url', data), 'tiles').domain);
  }
  else
  {
    lines.push('<span style="color:#00C;">'+(extract('obj.type', data) || extract('obj.source.type', data))+'</span>');
  }
  
  return '<p>'+lines.join("<br>")+'</p>';
};
