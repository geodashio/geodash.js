'use strict';

/**
 * Contains basic access functions and utility functions
 * @namespace api
 * @memberof geodash
 */

module.exports = {
  addBaseLayer: require("./addBaseLayer"),
  addFeatureLayer: require("./addFeatureLayer"),
  addHandler: require("./addHandler"),
  buildScope: require("./buildScope"),
  getEntities: require("./getEntities"),
  geEdges: require("./getEdges"),
  getAsset: require("./getAsset"),
  getBaseLayer: require("./getBaseLayer"),
  getComponent: require("./getComponent"),
  getController: require("./getController"),
  getDashboardConfig: require("./getDashboardConfig"),
  getEndpoint: require("./getEndpoint"),
  getFeatureLayer: require("./getFeatureLayer"),
  getPage: require("./getPage"),
  getRenderOrder: require("./getRenderOrder"),
  getTemplate: require("./getTemplate"),
  hasBaseLayer: require("./hasBaseLayer"),
  hasFeatureLayer: require("./hasFeatureLayer"),
  hasLayer: require("./hasLayer"),
  intend: require("./intend"),
  isVisible: require("./isVisible"),
  listBaseLayers: require("./listBaseLayers"),
  listFeatureLayers: require("./listFeatureLayers"),
  listImages: require("./listImages"),
  listServers: require("./listServers"),
  listTegolaServers: require("./listTegolaServers"),
  listWMSServers: require("./listWMSServers"),
  opt_b: require("./opt_b"),
  opt_i: require("./opt_i"),
  opt_j: require("./opt_j"),
  opt_s: require("./opt_s"),
  opt: require("./opt"),
  welcome: require("./welcome")
};
