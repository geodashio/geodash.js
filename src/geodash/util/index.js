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
  equals: require("./equals"),
  extend: require("./extend"),
  flatten: require("geodash-flatten"),
  getByID: require("./getByID"),
  getCookieValue: require("./getCookieValue"),
  getHashValue: require("./getHashValue"),
  getQueryStringValue: require("./getQueryStringValue"),
  getScope: require("./getScope"),
  hasHashValue: require("./hasHashValue"),
  isDate: require("./isDate"),
  isDefined: require("./isDefined"),
  isString: require("./isString"),
  isNumber: require("./isNumber"),
  objectToArray: require("./objectToArray"),
  parseTrue: require("./parseTrue"),
  repeat: require("./repeat"),
  setValue: require("./setValue"),
  unpack: require("./unpack"),
  updateValue: require("./updateValue")
};
