/**
 * Injects GeoDash directives into the Angular application.  Run before `bootstrap`.
 *
 * @function directives
 * @param {(Object)} app - the Angular Application
 * @memberof geodash.init
 *
 * @example
 * geodash.init.directives(app);
 */

module.exports = function(app)
{
  if(geodash.directives != undefined)
  {
    geodash.meta.directives = [];
    $.each(geodash.directives, function(name, dir){
      geodash.meta.directives.push(name);
      app.directive(name, dir);
    });
  }
};
