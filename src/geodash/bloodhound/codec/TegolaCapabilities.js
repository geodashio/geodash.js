module.exports = function(response, url)
{
  var layers = [];

  var tegolaMaps = response.maps;
  for(var i = 0; i < tegolaMaps.length; i++)
  {
    var tegolaMap = tegolaMaps[i];
    var name = tegolaMap.name;
    var newLayer = {
      'id': name,
      'text': name,
      'obj': {
        'id': name,
        'title': name,
        'description': name,
        'type': 'wms',
        'tegola': {
          'map': name,
          'url': extract("tegola.base", geodash.codec.parseURL(url, 'tegola'), ""),
          'debug': false
        }
      }
    };
    layers.push(newLayer);
  }

  return layers;
};
