/**
 * Injects GeoDash factory variables into the Angular application.  Run before `bootstrap`.
 *
 * @function factory
 * @param {(Object)} app - the Angular Application
 * @memberof geodash.init
 *
 * @example
 * geodash.init.factory(app);
 */

module.exports = function(options)
{
  var app = extract("app", options);
  //app.factory('state', function(){return angular.extend({}, geodash.initial_state);});
  app.factory('stateschema', function(){return angular.extend({}, geodash.state_schema);});
  //app.factory('dashboard', function(){return angular.extend({}, geodash.dashboard);});
  app.factory('live', function(){
    return {
      "map": undefined,
      "baselayers": {},
      "featurelayers": {}
    };
  });

};
