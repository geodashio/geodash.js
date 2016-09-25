/**
 * Lists the tegola servers in the GeoDash dashboard config
 *
 * @function listTegolaServers
 * @param {(Object)} options - The id of the element for the Angular Controller
 * @return {(Object[])} Returns as an array the list of tegola servers in the dashboard
 * @memberof geodash.api
 *
 * @example
 * var baselayers = geodash.api.listTegolaServers();
 * var baselayers = geodash.api.listTegolaServers({"scope": "geodash-main"});
 */

module.exports = function(options)
{
  var config = geodash.api.getDashboardConfig(options);
  var servers = extract("servers", config, [])
  return $.grep(servers, function(x, i){
    return extract("type", x, undefined) == "tegola";
  });
};
