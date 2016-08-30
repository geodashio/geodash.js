module.exports = function(that, app, controller)
{
  var controllerName = that.data('controllerName') || that.attr('geodash-controller') || that.attr('name') || that.attr('id');
  if(controllerName == undefined || controllerName == null || controllerName == "")
  {
    console.log("Error: Could not load controller for element, because name could not be resolved");
    console.log(that, controller);
  }
  else
  {
    currentControllers.push({
      'controllerName': controllerName,
      'controller': (controller || geodash.controllers.controller_base)
    });
    app.controller(controllerName, controller || geodash.controllers.GeoDashControllerBase);
  }
};
