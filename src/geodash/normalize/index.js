'use strict';

/**
 * Functions to normalize OpenLayers 3 and Leaflet native objects into GeoDash objects.
 * @namespace normalize
 * @memberof geodash
 */

module.exports = {
  feature: require("./feature"),
  point: require("./point"),
  float: require("./float")
};
