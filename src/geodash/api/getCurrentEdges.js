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
        var target = geodash.util.isString(edge.target) ? geodash.api.getEntity("force", edge.target) : edge.target;
        if(groups_current.indexOf(source.group) != -1 && groups_current.indexOf(target.group) != -1)
        {
          var group_filters = extract(entity.group, graph_filters, []);
          return geodash.graphs.validate(group_filters, source) && geodash.graphs.validate(group_filters, target);
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
