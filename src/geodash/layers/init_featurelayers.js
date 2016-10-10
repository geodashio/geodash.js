module.exports = function(featureLayers, $scope, live, dashboard, state)
{
  $.each(featureLayers, function(i, layerConfig){
    geodash.layers.init_featurelayer(layerConfig.id, layerConfig, $scope, live, dashboard, state);
  });
};
