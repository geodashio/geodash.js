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
    geodash.util.extend(newState, extract("state", options));
  }

  // Update View
  var newView = {
    "maps": (
      extract("view.maps", newState) ||
      extract("dashboard.view.maps", options) ||
      extract("dashboard.maps", options, []).map(function(nb){return nb.id;})
    ),
    "baselayer": (extract("view.baselayer", newState) || extract(["dashboard", "baselayers", 0, "id"], options)),
    "featurelayers": (
      extract("view.featurelayers", newState) ||
      extract("dashboard.view.featurelayers", options) ||
      extract("dashboard.featurelayers", options, []).map(function(fl){return fl.id;})
    ),
    "charts": (
      extract("view.charts", newState) ||
      extract("dashboard.view.charts", options) ||
      extract("dashboard.charts", options, []).map(function(nb){return nb.id;})
    ),
    "groups": (
      extract("view.groups", newState) ||
      extract("dashboard.view.groups", options) ||
      extract("dashboard.groups", options, []).map(function(g){return g.id;})
    ),
    "controls": (extract("view.controls", newState) || extract("dashboard.view.controls", options) || []),
    "overlays": (
      extract("view.overlays", newState) ||
      extract("dashboard.view.overlays", options) ||
      extract("dashboard.overlays", options, []).map(function(nb){return nb.id;})
    ),
    "navbars": (
      extract("view.navbars", newState) ||
      extract("dashboard.view.navbars", options) ||
      extract("dashboard.navbars", options, []).map(function(nb){return nb.id;})
    )
  };

  if(Array.isArray(extract("view.extent", newState)))
  {
    newView["extent"] = extract("view.extent", newState);
  }
  else if(Array.isArray(extract("dashboard.view.extent", options)))
  {
    newView["extent"] = extract("dashboard.view.extent", options);
  }
  else
  {
    var lat = geodash.util.coalesce([
      geodash.util.getHashValue(["latitude", "lat", "y"], "float"),
      geodash.util.getQueryStringValue(["latitude", "lat", "y"], "float"),
      extract("state.view.lat", options),
      extract("state.view.latitude", options),
      extract("dashboard.view.lat", options),
      extract('dashboard.view.latitude', options, 0)
    ]);
    var lon = geodash.util.coalesce([
      geodash.util.getHashValue(["longitude", "lon", "long", "lng", "x"], "float"),
      geodash.util.getQueryStringValue(["longitude", "lon", "long", "lng", "x"], "float"),
      extract("state.view.lon", options),
      extract("state.view.longitude", options),
      extract("dashboard.view.lon", options),
      extract('dashboard.view.longitude', options, 0)
    ]);
    var z = geodash.util.coalesce([
      geodash.util.getHashValue(["zoom", "z"], "integer"),
      extract("state.view.z", options),
      extract("dashboard.view.zoom", options),
      extract('dashboard.view.z', options, 3)
    ]);
    var delta = {'lat': lat, 'lon': lon, 'z': z};
    geodash.util.extend(newView, delta);
  }
  newState["view"] = newView;

  // Update Filters
  if(geodash.util.isDefined(extract("filters", newState)) && geodash.util.isDefined(extract("stateschema", options)))
  {
    var stateschema = extract("stateschema", options);

    /*
    geodash.util.objectToArray(newState["filters"]).forEach(x => {
      geodash.util.objectToArray(x.value).forEach(y => {
        var type = stateschema["filters"][x.name][y.name].toLowerCase();
        var value = geodash.util.getHashValue(x.name+":"+y.name, type);
        if(value != undefined && value != "")
        {
          newState["filters"][x.name][y.name] = value;
        }
      });
    });*/

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
