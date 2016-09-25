/**
 * Converts a point to it's corresponding lat lon bounding box.
 *
 * @function point_to_bbox
 * @param {(int|float)} x - the x coordinate of the point
 * @param {(int|float)} y - the y coordinate of the point
 * @param {(int)} z - the zoom level in web mercator
 * @param {(int)} digits - the zoom level in web mercator
 * @return {Object[]} The bounding box as an array [w, s, e, n].
 * @memberof geodash.tilemath
 *
 * @example
 * var bbox = geodash.tilemath.point_to_bbox(12, 12, 4, 4);
 */

module.exports = function(x, y, z, digits)
{
  var radius = geodash.tilemath.point_to_radius(z);
  var e = x + radius; if(digits != undefined && digits >= 0){e = e.toFixed(digits);}
  var w = x - radius; if(digits != undefined && digits >= 0){w = w.toFixed(digits);}
  var s = y - radius; if(digits != undefined && digits >= 0){s = s.toFixed(digits);}
  var n = y + radius; if(digits != undefined && digits >= 0){n = n.toFixed(digits);}
  return [w, s, e, n];
};
