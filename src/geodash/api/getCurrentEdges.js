var getEdges = require("./getEdges");

module.exports = function(graph_id)
{
  var edges_current = undefined;
  var edges_all = getEdges(graph_id);
  if(geodash.util.isDefined(edges_all) && edges_all.length > 0)
  {
    var state = geodash.var.state();

    var filterFunction = (function(graph_id, groups_current, graph_filters){

      return function(edge){
        var source = geodash.util.isString(edge.source) ? geodash.api.getEntity("force", edge.source) : edge.source;
        var target = geodash.util.isString(edge.target) ? geodash.api.getEntity("force", edge.source) : edge.targe;
        if(groups_current.indexOf(source.group) != -1 && groups_current.indexOf(target.group) != -1)
        {
          var valid = true;
          var group_filters = extract(source.group, graph_filters, []);
          var property_values = extract("obj", source, {});
          var address_values = geodash.util.arrayToObject(extract("obj.address", source, {}));
          var attribute_values = geodash.util.arrayToObject(extract("obj.attributes", source, {}));
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
            var group_filters = extract(target.group, graph_filters, []);
            var property_values = extract("obj", target, {});
            var address_values = geodash.util.arrayToObject(extract("obj.address", target, {}));
            var attribute_values = geodash.util.arrayToObject(extract("obj.attributes", target, {}));
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
      }
    })(
      graph_id,
      extract("view.groups", state),
      extract(["filters", "charts", graph_id], state, {})
    );

    edges_current = edges_all.filter(filterFunction);
  }
  else
  {
    edges_current = [];
  }

  return edges_current;
};
