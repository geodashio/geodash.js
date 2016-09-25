/**
 * Checks by id if the GeoDash dashboard config includes the base layer
 *
 * @function hasBaseLayer
 * @return {(string)} id - ID of the base layer
 * @param {(Object)} options - Options
 * @memberof geodash.api
 *
 * @example <caption>Basic</caption>
 * var bl = geodash.api.hasBaseLayer("osm");
 *
 * @example <caption>With Options</caption>
 * var bl = geodash.api.hasBaseLayer("osm", {"scope": "geodash-main"});
 */

module.exports = function(id, options)
{
  var config = geodash.api.getDashboardConfig(options);
  return geodash.api.hasLayer(id, config.baselayers);
};
