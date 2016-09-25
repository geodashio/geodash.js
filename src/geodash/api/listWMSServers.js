/**
 * Lists the WMS servers in the GeoDash dashboard config
 *
 * @function listWMSServers
 * @param {(Object)} options - The id of the element for the Angular Controller
 * @return {(Object[])} Returns as an array the list of WMS servers in the dashboard
 * @memberof geodash.api
 *
 * @example
 * var baselayers = geodash.api.listWMSServers();
 * var baselayers = geodash.api.listWMSServers({"scope": "geodash-main"});
 */

module.exports = function(options)
{
  var config = geodash.api.getDashboardConfig(options);
  var servers = extract("servers", config, [])
  return $.grep(servers, function(x, i){
    return extract("type", x, undefined) == "wms";
  });
};
