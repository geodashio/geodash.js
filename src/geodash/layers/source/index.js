'use strict';

/**
 * Functions to create layer sources
 * @namespace source
 * @memberof geodash.layers
 */

module.exports = {
  geojson: require("./geojson"),
  vectortile: require("./vectortile"),
  wms: require("./wms"),
  xyz: require("./xyz")
};
