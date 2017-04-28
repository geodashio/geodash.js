var getEntities = require("./getEntities");

module.exports = function(graph_id)
{
  var entities_current = undefined;
  var entities_all = getEntities(graph_id);
  if(geodash.util.isDefined(entities_all) && entities_all.length > 0)
  {
    var state = geodash.var.state();

    var filterFunction = (function(groups_current, graph_filters){

      return function(entity){
        if(groups_current.indexOf(entity.group) != -1)
        {
          return geodash.graphs.validate(extract(entity.group, graph_filters, []), entity);
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
