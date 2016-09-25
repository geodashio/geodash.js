/**
 * Gets the click radius for a given point for web mercator maps
 *
 * @function point_to_radius
 * @param {(int)} z - the zoom level in web mercator
 * @return {(float)} The click radius
 * @memberof geodash.tilemath
 *
 * @example
 * var bbox = geodash.tilemath.point_to_radius(4);
 */

module.exports = function(z)
{
  return (geodash.config.click_radius || 4.0) / z;
};
