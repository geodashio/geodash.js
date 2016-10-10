/**
 * init_state will overwrite the default state from the server with params in the url.
 * @param {Object} state - Initial state from server
 */
//module.exports = function(state, stateschema)
module.exports = function(options)
{
  var newState = {};
  if(angular.isDefined(extract("state", options)))
  {
    angular.extend(newState, extract("state", options));
  }

  // Update View
  var lat = getHashValueAsFloat(["latitude", "lat", "y"]) || extract("state.lat", options, 0.0);
  var lon = getHashValueAsFloat(["longitude", "lon", "long", "lng", "x"]) || extract("state.lon", options, 0.0);
  var z = getHashValueAsInteger(["zoom", "z"]) || extract("state.z", options, 3);
  var delta = {'lat': lat, 'lon': lon, 'z': z};
  newState["view"] = angular.isDefined(extract("view", newState)) ? angular.extend(newState["view"], delta) : delta;

  if(! angular.isDefined(extract("view.baselayer", newState)))
  {
    newState["view"]["baselayer"] = extract(["dashboard", "baselayers", 0, "id"], options);
  }
  if(! angular.isDefined(extract("view.featurelayers", newState)))
  {
    newState["view"]["featurelayers"] = $.map(extract(["dashboard", "featurelayers"], options, []), function(fl){
      return fl.id;
    });
  }

  // Update Filters
  if(Array.isArray(extract("filters", newState)))
  {
    $.each(newState["filters"], function(layer_id, layer_filters){
      $.each(layer_filters, function(filter_id, filer_value){
        var type = stateschema["filters"][layer_id][filter_id].toLowerCase();
        var value = geodash.util.getHashValue(layer_id+":"+filter_id, type);
        if(value != undefined && value != "")
        {
          newState["filters"][layer_id][filter_id] = value;
        }
      });
    });
  }

  // Update Filters
  if(newState["styles"] != undefined)
  {
    /*
    $.each(newState["styles"], function(layer_id, layer_style){
      var type = stateschema["filters"][layer_id][filter_id].toLowerCase();
      var value = geodash.util.getHashValue("style:"+layer_id, type);
      if(value != undefined && value != "")
      {
        newState["filters"][layer_id][filter_id] = value;
      }
    });*/
  }

  return newState;
};
