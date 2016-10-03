/**
 * Gets a feature layer by id from the GeoDash dashboard config
 *
 * @function getFeatureLayer
 * @return {(string)} id - ID of the feature layer
 * @param {(Object)} options - Options
 * @memberof geodash.api
 *
 * @example <caption>Basic</caption>
 * var fl = geodash.api.getFeatureLayer("roads");
 *
 * @example <caption>With Options</caption>
 * var fl = geodash.api.getFeatureLayer("roads", {"scope": "geodash-main"});
 */

module.exports = function(id, options)
{
  var config = geodash.api.getDashboardConfig(options);
  return geodash.api.getByID(id, config.featurelayers);
};
