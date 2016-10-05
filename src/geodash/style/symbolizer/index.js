'use strict';
/*global require, window, console, jQuery, $, angular, Bloodhound, location */

/**
 * Symbolizer functions
 * @namespace symbolizer
 * @memberof geodash.style
 */

module.exports = {
  default: require("./default"),
  line: require("./line"),
  point: require("./point"),
  polygon: require("./polygon")
};
