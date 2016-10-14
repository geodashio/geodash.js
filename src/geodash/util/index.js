'use strict';
/*global require, window, console, jQuery, $, angular, Bloodhound, location */

/**
 * Utility functions for GeoDashJS
 *
 * @namespace geodash.util
 */

module.exports = {
  arrayToObject: require("./arrayToObject"),
  clearValue: require("./clearValue"),
  deepCopy: require("./deepCopy"),
  diff: require("./diff"),
  flatten: require("./flatten"),
  getByID: require("./getByID"),
  getHashValue: require("./getHashValue"),
  getParameterByName: require("./getParameterByName"),
  getScope: require("./getScope"),
  hasHashValue: require("./hasHashValue"),
  objectToArray: require("./objectToArray"),
  parseTrue: require("./parseTrue"),
  setValue: require("./setValue"),
  unpack: require("./unpack"),
  updateValue: require("./updateValue")
};
