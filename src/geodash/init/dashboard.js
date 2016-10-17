module.exports = function(appName, mainElement, loaders)
{
  var app = angular.module(appName, ['ngRoute', 'ngSanitize', 'ngCookies']);
  geodash.var.apps[appName] = app;

  var steps = [
    {"id": "internals", "label": "Internals", "status": "pending"},
    {"id": "dashboard", "label": "Dashboard", "status": "waiting"},
    {"id": "resources", "label": "External Resources", "status": "waiting"}
  ];
  geodash.bootloader.ui.update({ "element": mainElement, "steps": steps });
  geodash.bootloader.internals({ "app": app, "element": mainElement });
  steps = geodash.bootloader.step.status({ "element": mainElement, "steps": steps, "id": "internals", "status": "complete" });
  steps = geodash.bootloader.step.status({ "element": mainElement, "steps": steps, "id": "dashboard", "status": "pending" });

  // Initialize UI interaction for intents.
  // Listen's for events bubbling up to body element, so can initialize before children.
  geodash.init.listeners();

  var system_resources = [
    {
      "name": "state",
      "local": "data-geodash-dashboard-initial-state-path",
      "remote": "data-geodash-dashboard-initial-state-url",
      "hash": "state",
      "querystring": "state",
      "fallback": "initial_state"
    },
    {
      "name": "stateschema",
      "local": "data-geodash-dashboard-state-schema-path",
      "remote": "data-geodash-dashboard-state-schema-url",
      "hash": "stateschema",
      "querystring": "stateschema",
      "fallback": "state_schema"
    }
  ];

  var result_dashboard = geodash.bootloader.process({
    "app": app,
    "appName": appName,
    "element": mainElement,
    "resource": {
      "name": "dashboard",
      "local": "data-geodash-dashboard-config-path",
      "remote": "data-geodash-dashboard-config-url",
      "hash": "config",
      "querystring": "config",
      "fallback": "dashboard"
    }
  });

  // See: https://blog.mariusschulz.com/2014/10/22/asynchronously-bootstrapping-angularjs-applications-with-server-side-data
  var initInjector = angular.injector(["ng"]);
  var $q = initInjector.get("$q");
  var $http = initInjector.get("$http");

  if(angular.isDefined(extract("request", result_dashboard)))
  {
    $http.get(result_dashboard.request.url, {}).then(
      function(response)
      {
        var success = geodash.bootloader.handle({
          "request": result_dashboard.request,
          "response": response,
          "app": app,
          "loaders": loaders
        });

        if(success)
        {
          steps = geodash.bootloader.step.status({ "element": mainElement, "steps": steps, "id": "dashboard", "status": "complete" });
          steps = geodash.bootloader.step.status({ "element": mainElement, "steps": steps, "id": "resources", "status": "pending" });
          geodash.bootloader.resources({
            "app": app,
            "appName": appName,
            "loaders": loaders,
            "element": mainElement,
            "system_resources": system_resources,
            "$q": $q,
            "$http": $http,
            "steps": steps
          });
        }
      },
      function(response)
      {
        steps = geodash.bootloader.step.status({ "element": mainElement, "steps": steps, "id": "dashboard", "status": "error" });
        if(response.status == 500)
        {
          geodash.log.error("bootloader", [
            "Could not load resource at \"" + response.config.url + "\" due to HTTP 500 Error (Internal Server Error)."
          ]);
        }
        else
        {
          geodash.log.error("bootloader", [
            "Could not load resource at \"" + response.config.url + "\" due to unknown HTTP Error."
          ]);
        }
      }
    );
  }
  else
  {
    steps = geodash.bootloader.step.status({ "element": mainElement, "steps": steps, "id": "dashboard", "status": "complete" });
    steps = geodash.bootloader.step.status({ "element": mainElement, "steps": steps, "id": "resources", "status": "pending" });
    geodash.bootloader.resources({
      "app": app,
      "appName": appName,
      "loaders": loaders,
      "element": mainElement,
      "system_resources": system_resources,
      "$q": $q,
      "$http": $http,
      "steps": steps
    });
  }

};
