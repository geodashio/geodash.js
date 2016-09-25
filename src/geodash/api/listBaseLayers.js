/**
 * Lists the baselayers in the GeoDash dashboard config
 *
 * @function listBaseLayers
 * @param {(Object)} options - The id of the element for the Angular Controller
 * @return {(Object[])} Returns as an array the list of base layers in the dashboard
 * @memberof geodash.api
 *
 * @example <caption>Basic</caption>
 * var baselayers = geodash.api.listBaseLayers();
 *
 * @example <caption>With Options</caption>
 * var baselayers = geodash.api.listBaseLayers({"scope": "geodash-main"});
 */

module.exports = function(options)
{
  var config = geodash.api.getDashboardConfig(options);
  return extract("baselayers", config, []);
};
