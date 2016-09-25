'use strict';

/**
 * Functions to create layers
 * @namespace layers
 * @memberof geodash
 */

module.exports = {
  aggregate_fields: require("./aggregate_fields"),
  init_baselayers_leaflet: require("./init_baselayers_leaflet"),
  init_baselayers_ol3: require("./init_baselayers_ol3"),
  init_featurelayer_post: require("./init_featurelayer_post"),
  init_featurelayer_post_ol3: require("./init_featurelayer_post_ol3"),
  init_featurelayer: require("./init_featurelayer"),
  init_featurelayers: require("./init_featurelayers"),
  featurelayer: require("./featurelayer"),
  source: require("./source"),
  translate: require("./translate")
};
