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
    var resource = system_resources[i];
    var result = geodash.bootloader.process({
      "app": app,
      "appName": appName,
      "element": element,
      "resource": resource
    });

    if(result.success == true)
    {
      if(angular.isDefined(extract("request", result)))
      {
        requests.push(result.request);
        steps = geodash.bootloader.step.status({
          "element": element,
          "steps": steps,
          "id": "resource"+resource.name,
          "status": "pending"
        });
      }
      else
      {
        steps = geodash.bootloader.step.status({
          "element": element,
          "steps": steps,
          "id": "resource"+resource.name,
          "status": "complete"
        });
      }
    }
    else
    {
      geodash.log.error("bootloader", [result.message]);
      steps = geodash.bootloader.step.status({
        "element": element,
        "steps": steps,
        "id": "resource"+resource.name,
        "status": "error",
        "messsage": result.message
      });
      break;
    }
  }

  if(angular.isDefined(element.attr("data-geodash-dashboard-resources")))
  {
    var dashboard_resources = undefined;
    try { dashboard_resources = JSON.parse(element.attr("data-geodash-dashboard-resources")); }catch(err){ dashboard_resources = undefined; };
    for(var i = 0; i < dashboard_resources.length; i++)
    {
      var resource = dashboard_resources[i];
      steps.push({
        "id": "resource-"+(resource.id || resource.name || resource.loader),
        "label": (resource.title || resource.name || resource.id || resource.loader),
        "status": "pending"
      });
      requests.push(resource);
    }
  }

  if(requests.length > 0)
  {
    var urls = $.map(requests, function(x){ return x["url"]; });
    var promises = geodash.http.build_promises($http, urls);
    var responseFn = function(request)
    {
      return function(response)
      {
        var result = geodash.bootloader.handle({
          "request": request,
          "response": response,
          "app": app,
          "loaders": loaders
        });

        if(result.success)
        {
          steps = geodash.bootloader.step.status({
            "element": element,
            "steps": steps,
            "id": "resource-"+(request.id || request.name || request.loader),
            "status": "complete"
          });
        }
        else
        {
          steps = geodash.bootloader.step.status({
            "element": element,
            "steps": steps,
            "id": "resource-"+(request.id || request.name || request.loader),
            "status": "error",
            "message": result.message
          });
        }
      };
    };
    for(var i = 0; i < requests.length; i++)
    {
      promises[i].then(responseFn(requests[i])).catch(responseFn(requests[i]));
    }
    $q.all(promises)
      .then(function(responses){ geodash.bootloader.bootstrap({ "appName": appName }); })
      .catch(function(responses){ geodash.bootloader.bootstrap({ "appName": appName }); });
  }
  else
  {
    steps = geodash.bootloader.step.status({ "element": element, "steps": steps, "id": "resources", "status": "complete" });
    geodash.bootloader.bootstrap({ "appName": appName });
  }

};
