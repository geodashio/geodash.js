module.exports = function(data)
{
  if(extract('obj.type', data) == "geojson")
  {
    return '<p><strong>' + (extract('obj.title', data) || extract('obj.id', data)) + '</strong> ('+extract('obj.id', data)+')<br><span style="color:#00C;">' + (extract('obj.type', data) || extract('obj.source.type', data)) + '</span> | <span style="color:#00C;">' + geodash.codec.parseURL(extract('obj.geojson.url', data), 'geojson').domain + '</p>';
  }
  else if(extract('obj.type', data) == "wms")
  {
    return '<p><strong>' + (extract('obj.title', data) || extract('obj.id', data)) + '</strong> ('+extract('obj.id', data)+')<br><span style="color:#00C;"> wms </span> | <span style="color:#00C;">' + geodash.codec.parseURL(extract('obj.wms.url', data), 'wms').domain + '</p>';
  }
  else if(extract('obj.source.type', data) == "tiles")
  {
    return '<p><strong>' + (extract('obj.title', data) || extract('obj.id', data)) + '</strong> ('+extract('obj.id', data)+')<br><span style="color:#00C;"> tiles </span> | <span style="color:#00C;">' + geodash.codec.parseURL(extract('obj.source.tile.url', data), 'tiles').domain + '</p>';
  }
  else
  {
    return '<p><strong>' + (extract('obj.title', data) || extract('obj.id', data)) + '</strong> ('+extract('obj.id', data)+')<br><span style="color:#00C;">' + (extract('obj.type', data) || extract('obj.source.type', data)) + '</span></p>';
  }
};
