/**
 * Converts a tile x-coordinate to its corresponding longitude value.
 *
 * @function tile_to_lon
 * @param {(int)} x - the x coordinate of the tile
 * @param {(int)} z - the zoom level in web mercator
 * @return {(float)} the longitde
 * @memberof geodash.tilemath
 *
 * @example
 * var bbox = geodash.tilemath.tile_to_lon(12, 4);
 */

module.exports = function(x, z)
{
  return x / Math.pow(2, z) * 360-180;
};
