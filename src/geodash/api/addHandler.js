module.exports = function(controllerName, eventName, fn)
{
  var c = geodash.api.getController(controllerName);
  c.handlers.push({
    "event": eventName,
    "handler": fn
  });
};
