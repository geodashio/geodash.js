/**
 * Checks by id if the GeoDash dashboard config includes the feature layer
 *
 * @function hasFeatureLayer
 * @return {(string)} id - ID of the feature layer
 * @param {(Object)} options - Options
 * @memberof geodash.api
 *
 * @example <caption>Basic</caption>
 * var fl = geodash.api.hasFeatureLayer("roads");
 *
 * @example <caption>With Options</caption>
 * var fl = geodash.api.hasFeatureLayer("roads", {"scope": "geodash-main"});
 */

module.exports = function(id, options)
{
  var config = geodash.api.getDashboardConfig(options);
  return geodash.api.hasLayer(id, config.featurelayers);
};
