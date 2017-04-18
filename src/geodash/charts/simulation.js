module.exports = function()
{

  var width = extract("width", options);
  var height = extract("height", options);
  var link = extract("link", options) || geodash.charts.link(options);
  var charge = extract("charge", options) || geodash.charts.charge(options);

  var simulation = d3.forceSimulation()
      .force("link", link)
      .force("charge", charge)
      .force("center", d3.forceCenter(width / 2, height / 2));

  return simulation;
};
