module.exports = function(options)
{
  var app = extract("app", options);
  var appName = extract("appName", options);
  var loaders = extract("loaders", options);
  var element = extract("element", options);
  var system_resources = extract("system_resources", options);
  var $q = extract("$q", options);
  var $http = extract("$http", options);
  var steps = extract("steps", options);

  var requests = [];

  for(var i = 0; i < system_resources.length; i++)
  {
    var result = geodash.bootloader.process({
      "app": app,
      "appName": appName,
      "element": element,
      "resource": system_resources[i]
    });

    if(result.success == true)
    {
      if(angular.isDefined(extract("request", result)))
      {
        requests.push(result.request);
      }
    }
    else
    {
      break;
    }
  }

  if(angular.isDefined(element.attr("data-geodash-dashboard-resources")))
  {
    var dashboard_resources = undefined;
    try { dashboard_resources = JSON.parse(element.attr("data-geodash-dashboard-resources")); }catch(err){ dashboard_resources = undefined; };
    for(var i = 0; i < dashboard_resources.length; i++)
    {
      requests.push(dashboard_resources[i]);
    }
  }

  if(requests.length > 0)
  {
    var urls = $.map(requests, function(x){ return x["url"]; });

    $q.all(geodash.http.build_promises($http, urls)).then(function(responses)
    {
      for(var i = 0; i < responses.length; i++)
      {
        geodash.bootloader.handle({
          "request": requests[i],
          "response": responses[i],
          "app": app,
          "loaders": loaders
        });
      }
      steps = geodash.bootloader.step.status({ "element": element, "steps": steps, "id": "resources", "status": "complete" });
      geodash.bootloader.bootstrap({"appName": appName});
    });
  }
  else
  {
    steps = geodash.bootloader.step.status({ "element": element, "steps": steps, "id": "resources", "status": "complete" });
    geodash.bootloader.bootstrap({"appName": appName});
  }

};
