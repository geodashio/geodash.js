'use strict';

/**
 * Bootloader functions for GeoDash
 * @namespace bootloader
 * @memberof geodash
 */

module.exports = {
  loaders: require("./loaders"),
  ui: require("./ui"),
  step: require("./step"),
  bootstrap: require("./bootstrap"),
  handle: require("./handle"),
  internals: require("./internals"),
  process: require("./process"),
  resources: require("./resources")
};
