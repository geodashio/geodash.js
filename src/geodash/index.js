'use strict';
/*global require, window, console, jQuery, $, angular, Bloodhound, location */

/**
 * GeoDash.js is the Low-level Javascript API for GeoDash
 *
 * @namespace geodash
 * @summary Low-level Javascript API for GeoDash
 */

module.exports = {
  animations: require("./animations"),
  api: require("./api"),
  assert: require("./assert"),
  bloodhound: require("./bloodhound"),
  bootloader: require("./bootloader"),
  codec: require("./codec"),
  dynamicStyleFn: require("./dynamicStyleFn"),
  http: require("./http"),
  controllers: {},
  directives: {},
  filters: {},
  handlers: {},
  history: require("./history"),
  init: require("./init"),
  layers: require("./layers"),
  listeners: require("./listeners"),
  log: require("./log"),
  normalize: require("./normalize"),
  navigate: require("./navigate"),
  popup: require("./popup"),
  style: require("./style"),
  tilemath: require("./tilemath"),
  transform: require("./transform"),
  typeahead: require("./typeahead"),
  ui: require("./ui"),
  util: require("./util"),
  vecmath: require("./vecmath"),
  var: {
    apps: {},
    baselayers: {},
    cache: {
      styles: {}
    },
    endpoints: {},
    geolocation: {
      watch: undefined,
      lonlat: undefined
    },
    logs: {},
    featurelayers: {},
    pages: {},
    resources: {},
    timeouts: {}
  }
};
