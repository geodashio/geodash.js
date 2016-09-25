module.exports = function(featureLayers, $scope, live, map_config, state)
{
  $.each(featureLayers, function(i, layerConfig){
    geodash.layers.init_featurelayer(layerConfig.id, layerConfig, $scope, live, map_config, state);
  });
};
