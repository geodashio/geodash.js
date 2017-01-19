module.exports = function(options)
{
  var symbolizer = options.symbolizer;
  var styleFnWorkspaces = options.styleFnWorkspaces || extract('dynamicStyleFunctionWorkspaces', geodash.config, [geodash.dynamicStyleFn]);
  //
  var style_static = extract(["static", "properties"], symbolizer);
  var style_dynamic_fn_name = extract(["dynamic", "func"], symbolizer);
  var style_dynamic_fn = undefined;
  if(geodash.util.isDefined(style_dynamic_fn_name))
  {
    for(var j = 0; j < styleFnWorkspaces.length; j++)
    {
      style_dynamic_fn = extract(style_dynamic_fn_name, styleFnWorkspaces[j]);
      if(angular.isFunction(style_dynamic_fn))
      {
        break;
      }
    }
  }
  var style = geodash.style.translate.ol3({
    'feature': options.feature,
    'state': options.state,
    'dashboard': options.dashboard,
    'style_static': style_static,
    'style_dynamic_fn': style_dynamic_fn,
    'style_dynamic_options': extract(["dynamic", "options"], symbolizer)
  });

  return style;
};
