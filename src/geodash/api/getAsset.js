/**
 * Gets an asset by id from the GeoDash dashboard config
 *
 * @function getAsset
 * @return {(string)} id - ID of the asset
 * @param {(Object)} options - Options
 * @memberof geodash.api
 *
 * @example <caption>Basic</caption>
 * var asset = geodash.api.getAsset("logo");
 *
 * @example <caption>With Options</caption>
 * var asset = geodash.api.getAsset("logo", {"scope": "geodash-main"});
 */

module.exports = function(id, options)
{
  var config = geodash.api.getDashboardConfig(options);
  return geodash.api.getByID(id, config.assets);
};
