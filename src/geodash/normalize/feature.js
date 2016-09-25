/**
 * Normalizes an OpenLayers 3 or Leaflet feature to internal GeoDash Representation
 *
 * @function feature
 * @param {Object} feature - The original feature
 * @return {Object} Normalized feature
 * @memberof geodash.normalize
 *
 * @example
 * var feature = ...
 * var normalizedFeature = geodash.normalize.feature(feature);
 * normalizedFeature = {'attributes': ..., 'geometry': ...}
 */

module.exports = function(feature)
{
  return {
    'attributes': feature.attributes || feature.properties || feature.values_,
    'geometry': geodash.normalize.geometry(feature.geometry || feature.getGeometry())
  };
};
