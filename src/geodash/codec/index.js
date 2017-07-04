'use strict';

/**
 * Variety of codecs to convert between formats or parse objects from strings
 * @namespace codec
 * @memberof geodash
 */

module.exports = {
  formatArray: require("./formatArray"),
  formatCSS: require("./formatCSS"),
  formatInteger: require("./formatInteger"),
  formatTelephone: require("./formatTelephone"),
  md2html: require("./md2html"),
  parseAttributes: require("./parseAttributes"),
  parseFeatures: require("./parseFeatures"),
  parseGeometry: require("./parseGeometry"),
  parseURL: require("./parseURL")
};
