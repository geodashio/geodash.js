var getEntities = require("./getEntities");

module.exports = function(graph_id)
{
  var entities_current = undefined;
  var entities_all = getEntities(graph_id);
  if(geodash.util.isDefined(edges_all) && edges_all.length > 0)
  {
    var state = geodash.var.state();

    var filterFunction = (function(groups_current, graph_filters){

      return function(entity){
        if(groups_current.indexOf(entity.group) != -1)
        {
          var valid = true;
          var group_filters = extract(entity.group, graph_filters, []);
          var property_values = extract("obj", entity, {});
          var address_values = geodash.util.arrayToObject(extract("obj.address", entity, {}));
          var attribute_values = geodash.util.arrayToObject(extract("obj.attributes", entity, {}));
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
        else
        {
          return false;
        }
      };

    })(
      extract("view.groups", state),
      extract(["filters", "charts", graph_id], state, {})
    );

    entities_current = entities_all.filter(filterFunction);
  }
  else
  {
    entities_current = [];
  }
  return entities_current;
};
