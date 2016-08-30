module.exports = function(path, obj, fallback)
{
  var result = fallback || '';
  var x = extract(path, obj);
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
