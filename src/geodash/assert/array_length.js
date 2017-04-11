module.exports = function(x, length, fallback)
{
  if(x === undefined || x === "")
  {
    return fallback;
  }
  else if(geodash.util.isString(x))
  {
    x = x.split(",");
    if(x.length == length)
    {
      return x;
    }
    else
    {
      return fallback;
    }
  }
  else if(Array.isArray(x))
  {
    if(x.length == length)
    {
      return x;
    }
    else
    {
      return fallback;
    }
  }
};
