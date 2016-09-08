module.exports = function($scope, live, map_config, id, layerConfig)
{
  var url = layerConfig.tegola.url+"/maps/"+layerConfig.tegola.map+"/{z}/{x}/{y}.vector.pbf";
  if(extract('tegola.debug', layerConfig, False))
  {
    url += "?debug=true"
  }
  var options = {
    attributions: '',
    format: new ol.format.MVT(),
    tileGrid: ol.tilegrid.createXYZ({maxZoom: 18}),
    tilePixelRatio: 16,
    url: url
  };
  var source = new ol.source.VectorTile(options);
  var fl = new ol.layer.VectorTile({
    source: source
  });
  live["featurelayers"][id] = fl;
  geodash.layers.init_featurelayer_post_ol3($scope, live, id, fl, layerConfig.visible);
};
