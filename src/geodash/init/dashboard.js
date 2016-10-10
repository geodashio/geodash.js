module.exports = function(appName, mainElement)
{
  var app = angular.module(appName, ['ngRoute', 'ngSanitize', 'ngCookies']);
  geodash.var.apps[appName] = app;

  var initFn = ['templates', 'filters', 'directives', 'factory', 'controllers'];
  for(var i = 0; i < initFn.length; i++)
  {
    geodash.init[initFn[i]]({
      "app": app,
      "mainElement": mainElement
    });
  }

  // Initialize UI interaction for intents.
  // Listen's for events bubbling up to body element, so can initialize before children.
  geodash.init.listeners();

  /*
  If you miss a component with ng-controller, bootstrap will attempt
  to load it on its own within angular.bootstrap.  That'll error out
  and is not good.  So you NEED!!! to get to it first!!!!!!
  */

  var requests = [];

  var dependencies = [
    {
      "name": "dashboard",
      "local": "data-geodash-dashboard-config-path",
      "remote": "data-geodash-dashboard-config-url",
      "hash": "config",
      "querystring": "config",
      "fallback": "dashboard"
    },
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

  for(var i = 0; i < dependencies.length; i++)
  {
    var dep = dependencies[i];
    if(angular.isString(mainElement.attr(dep.local)))
    {
      app.value(dep.name, extract(mainElement.attr(dep.local), geodash));
    }
    else if(angular.isString(mainElement.attr(dep.remote)))
    {
      requests.push({
        'name': dep.name,
        'url': mainElement.attr(dep.remote)
      });
    }
    else if(geodash.util.hasHashValue(appName+":"+dep.hash))
    {
      requests.push({
        'name': dep.name,
        'url': geodash.util.getHashValue(appName+":"+dep.hash)
      });
    }
    else if(geodash.util.getParameterByName(appName+":"+dep.hash) != null)
    {
      requests.push({
        'name': dep.name,
        'url': geodash.util.getParameterByName(appName+":"+dep.hash)
      });
    }
    else
    {
      app.value(dep.name, extract(dep.fallback, geodash));
    }
  }

  if(requests.length > 0)
  {
    var urls = $.map(requests, function(x){ return x["url"]; });

    // See: https://blog.mariusschulz.com/2014/10/22/asynchronously-bootstrapping-angularjs-applications-with-server-side-data
    var initInjector = angular.injector(["ng"]);
    var $q = initInjector.get("$q");
    var $http = initInjector.get("$http");

    $q.all(geodash.http.build_promises($http, urls)).then(function(responses)
    {
      for(var i = 0; i < responses.length; i++)
      {
        var response = responses[i];
        if(response.status == 200)
        {
          app.value(requests[i].name, YAML.parse(response.data));
        }
      }
      angular.bootstrap(document, [appName]);
    });
  }
  else
  {
    angular.bootstrap(document, [appName]);
  }

};
