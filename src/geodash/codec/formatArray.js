var extract = require("geodash-extract");
var util = require("geodash-util");

module.exports = function(path, obj, fallback)
{
  var result = fallback || '';

  var x = util.isDefined(obj) ? extract(path, obj) : path;

  if(Array.isArray(x))
  {
    result = x.join(",");
  }
  else if(util.isString(x))
  {
    result = x;
  }
  return result;
};
