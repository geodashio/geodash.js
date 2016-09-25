module.exports = function(options)
{
  var bloodhoundData = [];

  var locations = options.locations;
  if(angular.isArray(locations))
  {
    var functions = undefined;
    for(var i = 0; i < locations.length; i++)
    {
      functions = Object.keys(extract(locations[i], geodash));
      if(angular.isArray(functions))
      {
        bloodhoundData = bloodhoundData.concat($.map(functions, function(x, i){
          return {'id': x, 'text': x};
        }));
      }
    }
  }

  return bloodhoundData;
};
