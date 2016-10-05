'use strict';
/*global require, window, console, jQuery, $, angular, Bloodhound, location */

/**
 * Functions for building OpenLayes 3 and Leaflet Styles from GeoDash layer configuration.
 * @namespace style
 * @memberof geodash
 */

module.exports = {
  ol3: require("./ol3"),
  leaflet: require("./leaflet"),
  symbolizer: require("./symbolizer"),
  translate: require("./translate")
};
