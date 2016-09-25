'use strict';

/**
 * Functions to log messages and errors with GeoDash's logging framework
 * @namespace log
 * @memberof geodash
 */

module.exports = {
  error: require("./error"),
  info: require("./info"),
  print: require("./print")
};
