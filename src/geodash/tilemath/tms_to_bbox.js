/**
 * Converts a tile tms coordinate into its corresponding latitude longitude bounding box.
 *
 * @function tms_to_bbox
 * @param {(int)} x - the x coordinate of the tile
 * @param {(int)} y - the y coordinate of the tile
 * @param {(int)} z - the zoom level in web mercator
 * @return {(float)} the bounding box as [w, s, e, n]
 * @memberof geodash.tilemath
 *
 * @example
 * var bbox = geodash.tilemath.tms_to_bbox(12, 12, 4);
 */

module.exports = function(x, y, z)
{
  var e = geodash.tilemath.tile_to_lon(x+1, z);
  var w = geodash.tilemath.tile_to_lon(x, z);
  var s = geodash.tilemath.tile_to_lat(y+1, z);
  var n = geodash.tilemath.tile_to_lat(y, z);
  return [w, s, e, n];
};
