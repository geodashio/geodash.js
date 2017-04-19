var getEntities = require("./getEntities");

module.exports = function(graph_id, entity_id)
{
  var entities = getEntities(graph_id);
  var matches = entities.filter(function(e){ return e.id == entity_id; });
  return matches.length > 0 ? matches[0] : undefined;
};
