'use strict';

/**
 * Functions to normalize OpenLayers 3 and Leaflet native objects into GeoDash objects.
 * @namespace normalize
 * @memberof geodash
 */

module.exports = {
  feature: require("./feature"),
  float: require("./float"),
  geometry: require("./geometry"),
  point: require("./point"),
  polygon: require("./polygon")
};
