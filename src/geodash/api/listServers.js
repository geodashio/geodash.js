/**
 * Lists the servers in the GeoDash dashboard config
 *
 * @function listServers
 * @param {(Object)} options - The id of the element for the Angular Controller
 * @return {(Object[])} Returns as an array the list of servers in the dashboard
 * @memberof geodash.api
 *
 * @example
 * var baselayers = geodash.api.listServers();
 * var baselayers = geodash.api.listServers({"scope": "geodash-main"});
 */

module.exports = function(options)
{
  var config = geodash.api.getDashboardConfig(options);
  return extract("servers", config, []);
};
