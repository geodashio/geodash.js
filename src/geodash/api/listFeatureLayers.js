/**
 * Lists the feature layers in the GeoDash dashboard config
 *
 * @function listFeatureLayers
 * @param {(Object)} options - The id of the element for the Angular Controller
 * @return {(Object[])} Returns as an array the list of feature layers in the dashboard
 * @memberof geodash.api
 *
 * @example <caption>Basic</caption>
 * var featurelayers = geodash.api.listFeatureLayers();
 *
 * @example <caption>With Options</caption>
 * var featurelayers = geodash.api.listFeatureLayers({"scope": "geodash-main"});
 */

module.exports = function(options)
{
  var config = geodash.api.getDashboardConfig(options);
  return extract("featurelayers", config, []);
};
