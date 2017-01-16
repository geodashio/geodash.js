module.exports = function(chart, layer, feature, state)
{
  var title = geodash.codec.md2html(chart.title) || chart.id;
  var html = "";
  html += "<div style=\"text-align:center;\">"+title+"</div><br>";
  html += "<div id=\""+chart.id+"\" class=\"geodash-popup-chart\"></div>";
  return html;
};
