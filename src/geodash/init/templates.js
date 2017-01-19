/**
 * Injects GeoDash templates into the Angular application.  Run before `bootstrap`.
 *
 * @function templates
 * @param {(Object)} app - the Angular Application
 * @memberof geodash.init
 *
 * @example
 * geodash.init.templates(app);
 */


module.exports = function(options)
{
  var app = extract("app", options);
  geodash.meta.templates = [];

  geodash.templates.merged = {};
  if(geodash.util.isDefined(extract("templates.static", geodash)))
  {
    $.each(geodash.templates.static, function(name, template){
      geodash.templates.merged[name] = template;
    });
  }

  if(geodash.util.isDefined(extract("templates.server", geodash)))
  {
    $.each(geodash.templates.server, function(name, template){
      geodash.templates.merged[name] = template;
    });
  }

  $.each(geodash.templates.merged, function(name, template){
    geodash.meta.templates.push(name);
    app.run(function($templateCache){$templateCache.put(name, template);});
  });
};
