module.exports = function(options)
{
  var request = extract("request", options);
  var response = extract("response", options);
  var app = extract("app", options);
  var loaders = extract("loaders", options) || extract("config.bootloader.loaders", geodash) || [geodash.bootloader.loaders];

  if(response.status == 200)
  {
    if(angular.isString(request.loader))
    {
      var success = false;
      for(var i = 0; i < loaders.length; i++)
      {
        var loaderCollection = loaders[i];
        if(geodash.util.isDefined(loaderCollection))
        {
          var loaderFn = extract(request.loader, loaderCollection);
          if(geodash.util.isDefined(loaderFn))
          {
            loaderFn(response);
            success = true;
          }
        }
      }

      if(success)
      {
        return { "success": true };
      }
      else
      {
        var message = "Could not find loader with name \""+request.loader+"\" for \"" + response.config.url + "\".";
        return { "success": false, "message": message };
      }
    }
    else
    {
      var success = true;
      var value = undefined;
      var contentType = response.headers("content-type");
      if(contentType == "application/json")
      {
        value = response.data;
      }
      else
      {
        try {
          value = YAML.parse(response.data);
        }catch(err){
          value = undefined;
          success = false;
        };
      }
      if(success)
      {
        app.value(request.name, value);
        geodash.var.resources[request.name] = value;
      }
      return { "success": success };
    }
  }
  else if(response.status == 500)
  {
    var message = "Could not load resource at \"" + response.config.url + "\" due to HTTP 500 Error (Internal Server Error).";
    return { "success": false, "message": message };
  }
};
