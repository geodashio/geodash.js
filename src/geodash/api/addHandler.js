module.exports = function(name, eventName, fn)
{
  if(typeof angular != "undefined")
  {
    var c = geodash.api.getController(name);
    c.handlers.push({
      "event": eventName,
      "handler": fn
    });
  }
  else
  {
    var c = geodash.api.getComponent(name);
    c.bus.listen("intents", eventName, fn);
  }
};
