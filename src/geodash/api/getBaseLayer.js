/**
 * Gets a base layer by id from the GeoDash dashboard config
 *
 * @function getBaseLayer
 * @return {(string)} id - ID of the base layer
 * @param {(Object)} options - Options
 * @memberof geodash.api
 *
 * @example <caption>Basic</caption>
 * var bl = geodash.api.getBaseLayer("osm");
 *
 * @example <caption>With Options</caption>
 * var bl = geodash.api.getBaseLayer("osm", {"scope": "geodash-main"});
 */

module.exports = function(id, options)
{
  var config = geodash.api.getDashboardConfig(options);
  return geodash.api.getLayer(id, config.baselayers);
};
