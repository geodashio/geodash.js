'use strict';
/*global require, window, console, jQuery, $, angular, Bloodhound, location */

/**
 * GeoDash.js is the Low-level Javascript API for GeoDash
 *
 * @namespace geodash
 * @summary Low-level Javascript API for GeoDash
 */

module.exports = {
  api: require("./api"),
  assert: require("./assert"),
  bloodhound: require("./bloodhound"),
  codec: require("./codec"),
  dynamicStyleFn: require("./dynamicStyleFn"),
  http: require("./http"),
  controllers: {},
  directives: {},
  filters: {},
  handlers: {},
  init: require("./init"),
  layers: require("./layers"),
  listeners: require("./listeners"),
  log: require("./log"),
  normalize: require("./normalize"),
  popup: require("./popup"),
  style: require("./style"),
  tilemath: require("./tilemath"),
  typeahead: require("./typeahead"),
  ui: require("./ui"),
  vecmath: require("./vecmath"),
  var: {
    logs: {},
    baselayers: {},
    featurelayers: {}
  }
};
