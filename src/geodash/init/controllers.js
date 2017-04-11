module.exports = function(options)
{
  var app = extract("app", options);
  var mainElement = extract("mainElement", options);
  
  app.controller("GeoDashControllerBase", geodash.controllers.GeoDashControllerBase);
  app.controller("GeoDashControllerModal", geodash.controllers.GeoDashControllerModal);

  /*
  * This pre-loads the controllers into Angular.  They aren't "executed" until a directive actually uses them,
  * b/c we aren't using ng-controller, but data-geodash-controller(s).
  */
  $("[data-geodash-controller], [data-geodash-controllers]", mainElement).each(function(){
    var controllerName = $(this).attr("data-geodash-controller") || $(this).attr("data-geodash-controllers");
    if(geodash.util.isString(controllerName) && controllerName.length > 0)
    {
      var controller = extract(controllerName, geodash.controllers);
      if(geodash.util.isDefined(controller))
      {
        app.controller(controllerName, controller);
      }
    }
  });
};
