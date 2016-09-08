module.exports = function(x)
{
  if(Array.isArray(x))
  {
    return $.extend(true, [], x);
  }
  else if(angular.isString(x) || angular.isNumber(x))
  {
    return x;
  }
  else if(angular.isDefined(x))
  {
    return $.extend(true, {}, x);
  }
};
