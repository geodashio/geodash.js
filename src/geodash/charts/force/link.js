module.exports = function(options)
{
  var linkDistance = extract("linkDistance", options, 40);

  var link = d3.forceLink()
    .id(function(d) {
      return d.id;
    })
    .distance(function(d) {
      return linkDistance;
    });

  return link;
};
