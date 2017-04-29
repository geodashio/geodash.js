module.exports = function(c, data_entities, data_edges, sim, color)
{
  var node = extract(["var", "charts", c.id,  "node"], geodash);
  var link = extract(["var", "charts", c.id,  "link"], geodash);
  var onClick = extract(["var", "charts", c.id,  "onClick"], geodash);

  if(geodash.util.isDefined(node) && geodash.util.isDefined(link))
  {
    node = node.data(data_entities, function(d) { return d.id; });
    node.exit().remove();
    node = node.enter()
      .append("circle")
      .attr("class", "entity")
      .attr("geodash:id", function(d) { return d.id; })
      .attr("geodash:group", function(d) { return d.group; })
      .attr("r", function(d) {
        return extract(["style", "group", d.group, "circleRadius"], c, 8) - 0.75;
      })
      .attr("fill", function(d) {
        return extract(["style", "group", d.group, "fillColor"], c, color(d.group));
      })
      .on("click", onClick)
      .call(d3.drag()
        .on("start", function(d) {
          if (!d3.event.active) {
            sim.alphaTarget(0.3).restart();
          }
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", function(d) {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        })
        .on("end", function(d) {
          if (!d3.event.active) {
            simulation.alphaTarget(0);
          }
          d.fx = null;
          d.fy = null;
        })
      )
      .merge(node);
    node.append("title").text(geodash.charts.node.label);
    geodash.var.charts[c.id]['node'] = node;

    link = link.data(data_edges, function(d) { return d.group+"-"+d.source.id+"-"+d.target.id; });
    link.exit().remove();
    link = link
      .enter()
      .append("line")
      .attr("stroke-width", function(d) { return extract("style.edge.strokeWidth", c, 2); })
      .merge(link);
    geodash.var.charts[c.id]['link'] = link;

    sim.nodes(data_entities);
    sim.force("link").links(data_edges);
    sim.alpha(1).restart();
  }
  else
  {
    console.log("Error: Could not rebind data.  Node or link are undefined.", node, link);
  }
};
