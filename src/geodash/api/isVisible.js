module.exports = function(options)
{
  var visible = false;

  var visibleFeatureLayers = extract("state.view.featurelayers", options);
  var fl = extract("fl", options);
  var layerID = extract("id", options) || extract("layerID", options);

  if(geodash.util.isDefined(fl))
  {
    if($.inArray(layerID, visibleFeatureLayers) != -1)
    {
      visible = true;
    }
  }
  return visible;
}
