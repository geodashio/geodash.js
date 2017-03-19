'use strict';

/**
 * Functions to normalize OpenLayers 3 and Leaflet native objects into GeoDash objects.
 * @namespace normalize
 * @memberof geodash
 */

module.exports = {
  color: require("./color"),
  date: require("./date"),
  extent: require("./extent"),
  feature: require("./feature"),
  float: require("./float"),
  integer: require("./integer"),
  geometry: require("./geometry"),
  point: require("./point"),
  polygon: require("./polygon")
};
