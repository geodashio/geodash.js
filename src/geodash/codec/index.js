'use strict';

/**
 * Variety of codecs to convert between formats or parse objects from strings
 * @namespace codec
 * @memberof geodash
 */

module.exports = {
  formatArray: require("./formatArray"),
  parseAttributes: require("./parseAttributes"),
  parseFeatures: require("./parseFeatures"),
  parseGeometry: require("./parseGeometry"),
  parseURL: require("./parseURL")
};
