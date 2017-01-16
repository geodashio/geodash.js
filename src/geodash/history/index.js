'use strict';

/**
 * Functions to manage state history
 * @namespace history
 * @memberof geodash
 */

module.exports = {
  back: require("./back"),
  detach: require("./detach"),
  dirty: require("./dirty"),
  forward: require("./forward"),
  pushState: require("./pushState")
};
