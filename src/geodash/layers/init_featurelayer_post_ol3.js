module.exports = function(options)
{
  if(geodash.api.isVisible(options))
  {
    var fl = extract("fl", options);
    var layerID = extract("id", options) || extract("layerID", options);
    var $scope = extract("$scope", options) || extract("scope", options);

    geodash.var.map.addLayer(fl);
    if(geodash.util.isDefined($scope))
    {
      geodash.api.intend("layerLoaded", {'type':'featurelayer', 'layer': layerID, 'visible': true}, $scope);  
    }
  }
};
