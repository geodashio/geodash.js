/**
 * init_state will overwrite the default state from the server with params in the url.
 * @param {Object} state - Initial state from server
 */
//module.exports = function(state, stateschema)
module.exports = function(options)
{
  var newState = {};
  if(geodash.util.isDefined(extract("state", options)))
  {
    angular.extend(newState, extract("state", options));
  }

  // Update View
  var newView = {
    "baselayer": (extract("view.baselayer", newState) || extract(["dashboard", "baselayers", 0, "id"], options)),
    "featurelayers": (extract("view.featurelayers", newState) || $.map(extract(["dashboard", "featurelayers"], options, []), function(fl){ return fl.id; })),
    "controls": extract("view.controls", newState) || extract("dashboard.view.controls", options) || []
  };

  if(Array.isArray(extract("view.extent", newState)))
  {
    newView["extent"] = extract("view.extent", newState);
  }
  else
  {
    var lat = getHashValueAsFloat(["latitude", "lat", "y"]) || extract("state.lat", options, 0.0);
    var lon = getHashValueAsFloat(["longitude", "lon", "long", "lng", "x"]) || extract("state.lon", options, 0.0);
    var z = getHashValueAsInteger(["zoom", "z"]) || extract("state.z", options, 3);
    var delta = {'lat': lat, 'lon': lon, 'z': z};
    angular.extend(newView, delta);
  }
  newState["view"] = newView;

  // Update Filters
  if(geodash.util.isDefined(extract("filters", newState)) && geodash.util.isDefined(extract("stateschema", options)))
  {
    var stateschema = extract("stateschema", options);
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
