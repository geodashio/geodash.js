module.exports = function(options)
{
  var app = extract("app", options);
  var element = extract("element", options);

  var initFn = ['templates', 'filters', 'directives', 'factory', 'controllers'];
  for(var i = 0; i < initFn.length; i++)
  {
    geodash.init[initFn[i]]({
      "app": app,
      "mainElement": element
    });
  };
};
