module.exports = function(app)
{

  app.factory('state', function(){return angular.extend({}, geodash.initial_state);});
  app.factory('stateschema', function(){return angular.extend({}, geodash.state_schema);});
  app.factory('map_config', function(){return angular.extend({}, geodash.map_config);});
  app.factory('live', function(){
    return {
      "map": undefined,
      "baselayers": {},
      "featurelayers": {}
    };
  });

};
