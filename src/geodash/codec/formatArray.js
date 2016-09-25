module.exports = function(path, obj, fallback)
{
  var result = fallback || '';

  var x = angular.isDefined(obj) ? extract(path, obj) : path;

  if(Array.isArray(x))
  {
    result = x.join(",");
  }
  else if(angular.isString(x))
  {
    result = x;
  }
  return result;
};
