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
  coalesce: require("./coalesce"),
  deepCopy: require("./deepCopy"),
  diff: require("geodash-diff"),
  flatten: require("geodash-flatten"),
  getByID: require("./getByID"),
  getHashValue: require("./getHashValue"),
  getQueryStringValue: require("./getQueryStringValue"),
  getScope: require("./getScope"),
  hasHashValue: require("./hasHashValue"),
  isDefined: require("./isDefined"),
  objectToArray: require("./objectToArray"),
  parseTrue: require("./parseTrue"),
  repeat: require("./repeat"),
  setValue: require("./setValue"),
  unpack: require("./unpack"),
  updateValue: require("./updateValue")
};
