var util = require("geodash-util");

module.exports = function(name, fallback)
{
  var templates = extract(["config", "templates"], geodash, ["merged", "server", "static"]);
  for(var i = 0; i < templates.length; i++)
  {
    var template = extract(util.expand(templates[i]).concat([name]), geodash);
    if(geodash.util.isDefined(template))
    {
      return template;
    }
  }
  return fallback;
};
