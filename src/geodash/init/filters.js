/**
 * Injects GeoDash filters into the Angular application.  Run before `bootstrap`.
 *
 * @function filters
 * @param {(Object)} app - the Angular Application
 * @memberof geodash.init
 *
 * @example
 * geodash.init.filters(app);
 */

module.exports = function(app)
{
  if(geodash.filters != undefined)
  {
    geodash.meta.filters = [];
    $.each(geodash.filters, function(name, func){
      geodash.meta.filters.push(name);
      app.filter(name, func);
    });
  }
};
