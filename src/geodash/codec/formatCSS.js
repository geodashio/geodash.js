module.exports = function(x)
{
  if(angular.isDefined(x))
  {
    if(Array.isArray(x))
    {
      x = geodash.api.arrayToObject(x);
    }
    if(Object.keys(x).length > 0)
    {
      return $.map(x, function(value, style){ return style+": "+value }).join(";") +";";
    }
    else
    {
      return "";
    }

  }
  else
  {
    return "";
  }
};
