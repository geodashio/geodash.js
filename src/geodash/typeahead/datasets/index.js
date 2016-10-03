'use strict';

/**
 * Constructors to return datasets for typeahead
 * @namespace datasets
 * @memberof geodash.typeahead
 */

module.exports = {
  default: require("./default"),
  FeatureLayers: require("./FeatureLayers"),
  FeatureLayersWithFilters: require("./FeatureLayersWithFilters"),
  GeoDashDashboards: require("./GeoDashDashboards"),
  Images: require("./Images"),
  TegolaServers: require("./TegolaServers"),
  WMSServers: require("./WMSServers")
};
