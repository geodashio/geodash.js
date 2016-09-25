'use strict';

/**
 * Functions to initialize Twitter typeahead seach interfaces.
 * @namespace typeahead
 * @memberof geodash
 */

module.exports = {
  datasets: require("./datasets"),
  displayFn: require("./displayFn"),
  footer: require("./footer"),
  templates: require("./templates"),
  listeners: require("./listeners"),
  getResultsFromDatasets: require("./getResultsFromDatasets")
};
