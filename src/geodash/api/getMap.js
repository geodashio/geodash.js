/**
 * Gets a map by id from the GeoDash dashboard config
 *
 * @function getMap
 * @return {(string)} id - ID of the map
 * @param {(Object)} options - Options
 * @memberof geodash.api
 *
 * @example <caption>Basic</caption>
 * var map = geodash.api.getMap("map");
 */

module.exports = function(id, options)
{
  var config = geodash.api.getDashboardConfig(options);
  return geodash.util.getByID(id, config.maps);
};
