module.exports = function(keys, type)
{
  var value = undefined;

  if(typeof keys === 'string')
  {
    keys = [keys];
  }

  var url = window.location.href;

  /*if(! geodash.util.isDefined(url))
  {
    url = window.location.href;
  }*/

  if(Array.isArray(keys))
  {
    for(var i = 0; i < keys.length; i++)
    {
      var key = keys[i].replace(/[\[\]]/g, "\\$&");
      var pattern = new RegExp("([?&]" + key + ")=(([^&#]*)|&|#|$)", "gi");
      var matches = pattern.exec(url);
      if(Array.isArray(matches) && matches.length == 4)
      {
        value = matches[3];
      }
    }
  }

  if(geodash.util.isDefined(value))
  {
    if(geodash.util.isDefined(type))
    {
      if(type == "integer" || type == "int")
      {
        value = geodash.normalize.integer(value, undefined);
      }
      else if(type == "float")
      {
        value = geodash.normalize.float(value, undefined);
      }
    }
  }
  //url.match(new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "gi"))
  //var results = regex.exec(url);
  //if (!results) return null;
  //if (!results[2]) return '';
  //return decodeURIComponent(results[2].replace(/\+/g, " "));
  return value;
};
