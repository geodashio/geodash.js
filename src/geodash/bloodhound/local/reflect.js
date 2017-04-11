module.exports = function(options)
{
  var bloodhoundData = [];

  var locations = options.locations;
  if(Array.isArray(locations))
  {
    for(var i = 0; i < locations.length; i++)
    {
      var target = extract(locations[i], geodash);
      if(Array.isArray(target))
      {
        bloodhoundData = bloodhoundData.concat($.map(target, function(x, i){
          if(geodash.util.isString(x))
          {
            return {'id': x, 'text': x};
          }
          else
          {
            return {
              'id': (x.id || x.name),
              'text': (x.title || x.name || x.id),
              'obj': x
            };
          }
        }));
      }
      else
      {
        bloodhoundData = bloodhoundData.concat($.map(Object.keys(target), function(x, i){
          return {'id': x, 'text': x};
        }));
      }
    }
  }

  return bloodhoundData;
};
