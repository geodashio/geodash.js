module.exports = function(options)
{
  var request = extract("request", options);
  var response = extract("response", options);
  var app = extract("app", options);
  var loaders = extract("loaders", options);

  if(response.status == 200)
  {
    if(angular.isDefined(request.loader))
    {
      var loaderFn = extract(request.loader, loaders);
      if(angular.isDefined(loaderFn))
      {
        loaderFn(response);
      }
      return { "success": true };
    }
    else
    {
      var value = undefined;
      var contentType = response.headers("content-type");
      if(contentType == "application/json")
      {
        value = response.data;
      }
      else
      {
        try { value = YAML.parse(response.data); }catch(err){ value = undefined; };
      }
      app.value(request.name, value);
      return { "success": true };
    }
  }
  else if(response.status == 500)
  {
    var message = "Could not load resource at \"" + response.config.url + "\" due to HTTP 500 Error (Internal Server Error).";
    return { "success": false, "message": message };
  }
};
