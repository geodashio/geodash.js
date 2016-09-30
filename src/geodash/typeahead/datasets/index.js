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
  TegolaServers: require("./TegolaServers"),
  WMSServers: require("./WMSServers")
};
