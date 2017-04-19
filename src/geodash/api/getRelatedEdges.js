var getEdges = require("./getEdges");

module.exports = function(graph_id, entity_id)
{
  var edges = getEdges(graph_id);
  var matches = edges.filter(function(edge){
    return edge.source.id == entity_id && edge.target.id == entity_id;
  });
  return matches;
};
