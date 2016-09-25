/**
 * Converts a tile y-coordinate to its corresponding latitude value.
 *
 * @function tile_to_lat
 * @param {(int)} y - the y coordinate of the tile
 * @param {(int)} z - the zoom level in web mercator
 * @return {(float)} the latitude
 * @memberof geodash.tilemath
 *
 * @example
 * var bbox = geodash.tilemath.tile_to_lat(12, 4);
 */

module.exports = function(y, z)
{
  n = Math.pi - 2 * Math.PI * y / Math.pow(2,z);
  return ( R2D * Math.atan(0.5 * ( Math.exp(n) - Math.exp(-n))));
};
