module.exports = function(options)
{
  var result = undefined;

  var edges = extract("edges", options);
  var source_id = extract("source", options);
  var target_id = extract("target", options);
  var group = extract("group", options);
  var path = extract("path", options);

  if(Array.isArray(edges))
  {
    var matches = [];

    if(geodash.util.isDefined(source_id))
    {
      matches = edges.filter(function(edge){
        return edge.source.id == source_id && edge.group == group;
      });
    }
    else if(geodash.util.isDefined(target_id))
    {
      matches = edges.filter(function(edge){
        return edge.target.id == target_id && edge.group == group;
      });
    }

    if(matches.length > 0)
    {
      result = geodash.util.isDefined(path) ?  extract(path, matches[0]) : matches[0];
    }
  }

  return result;
};
