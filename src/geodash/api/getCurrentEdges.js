var getEdges = require("./getEdges");

module.exports = function(graph_id)
{
  var state = geodash.var.state();
  var edges_all = getEdges(graph_id);
  var groups_current = extract("view.groups", state);
  var graph_filters = extract(["filters", "charts", chart.id], state, {});

  var edges_current = edges_all.filter(function(edge){
    if(currentGroups.indexOf(edge.source.group) != -1 && currentGroups.indexOf(edge.target.group) != -1)
    {
      var valid = true;
      var group_filters = extract(edge.source.group, graph_filters, []);
      var property_values = extract("obj", edge.source, {});
      var address_values = geodash.util.arrayToObject(extract("obj.address", edge.source, {}));
      var attribute_values = geodash.util.arrayToObject(extract("obj.attributes", edge.source, {}));
      for(var j = 0; j < group_filters.length; j++)
      {
        var f = group_filters[j];
        if(f["type"] == "property")
        {
          if(property_values[f["name"]] != f["value"])
          {
            valid = false;
            break;
          }
        }
        else if(f["type"] == "attribute")
        {
          if(attribute_values[f["name"]] != f["value"])
          {
            valid = false;
            break;
          }
        }
        else if(f["type"] == "address")
        {
          if(address_values[f["name"]] != f["value"])
          {
            valid = false;
            break;
          }
        }
      }
      if(! valid)
      {
        return false;
      }
      else
      {
        var group_filters = extract(edge.target.group, graph_filters, []);
        var property_values = extract("obj", edge.target, {});
        var address_values = geodash.util.arrayToObject(extract("obj.address", edge.target, {}));
        var attribute_values = geodash.util.arrayToObject(extract("obj.attributes", edge.target, {}));
        for(var j = 0; j < group_filters.length; j++)
        {
          var f = group_filters[j];
          if(f["type"] == "property")
          {
            if(property_values[f["name"]] != f["value"])
            {
              valid = false;
              break;
            }
          }
          else if(f["type"] == "attribute")
          {
            if(attribute_values[f["name"]] != f["value"])
            {
              valid = false;
              break;
            }
          }
          else if(f["type"] == "address")
          {
            if(address_values[f["name"]] != f["value"])
            {
              valid = false;
              break;
            }
          }
        }
        return valid;
      }
    }
    else
    {
      return false;
    }
  });

  return edges_current;
};
