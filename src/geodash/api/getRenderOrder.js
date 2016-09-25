module.exports = function(options)
{
  var dashboard = extract("dashboard", options) || geodash.api.getDashboardConfig();
  var layerID = extract("fl.id", options) || extract("layerID", options) || extract("id", options);
  var reverse = extract("reverse", options, false);

  if(reverse)
  {
    return dashboard.renderlayers.length - $.inArray(layerID, dashboard.renderlayers);
  }
  else
  {
    return $.inArray(layerID, dashboard.renderlayers);
  }
};
