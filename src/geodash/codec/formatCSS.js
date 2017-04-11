var extract = require("geodash-extract");
var util = require("geodash-util");

module.exports = function(x)
{
  if(util.isDefined(x))
  {
    if(Array.isArray(x))
    {
      x = util.arrayToObject(x);
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
