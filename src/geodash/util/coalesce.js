module.exports = function(x)
{
  var y = undefined;
  if(Array.isArray(x))
  {
    for(var i = 0; i < x.length; i++)
    {
      if(geodash.util.isDefined(x[i]))
      {
        y = x[i];
        break;
      }
    }
  }
  return y;
};
