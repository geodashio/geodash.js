/**
 * Gets a group by id from the GeoDash dashboard config
 *
 * @function getGroup
 * @return {(string)} id - ID of the group
 * @param {(Object)} options - Options
 * @memberof geodash.api
 *
 * @example <caption>Basic</caption>
 * var fl = geodash.api.getGroup("Origin");
 *
 * @example <caption>With Options</caption>
 * var fl = geodash.api.getGroup("roads", {"scope": "geodash-main"});
 */

module.exports = function(id, options)
{
  var config = geodash.api.getDashboardConfig(options);
  return geodash.util.getByID(id, config.groups);
};
