module.exports = function(x)
{
  if(geodash.util.isDefined(x))
  {
    if(Array.isArray(x))
    {
      x = geodash.util.arrayToObject(x);
    }
    if(Object.keys(x).length > 0)
    {
      return $.map(x, function(value, style){ return style+": "+value }).join("; ") +";";
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
