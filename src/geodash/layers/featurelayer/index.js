'use strict';

/**
 * Functions to create feature layers
 * @namespace featurelayer
 * @memberof geodash.layers
 */

module.exports = {
  esrijson: require("./esrijson"),
  geojson: require("./geojson"),
  heatmap: require("./heatmap"),
  mapzen: require("./mapzen"),
  tegola: require("./tegola"),
  wms: require("./wms"),
  wmts: require("./wmts")
};
