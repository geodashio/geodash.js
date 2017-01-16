/**
 * Loads API Endpoints into runtime framework
 *
 * @function endpoints
 * @param {(Object)} response - The response
 * @memberof geodash.bootloader.loaders
 *
 * @example <caption>Basic</caption>
 * geodash.bootloader.loaders.endpoints(response);
 * // geodash.var.endpoints == {"save_dashboard": "...", "delete_dashboard": "..."}
 *
 */

module.exports = function(response)
{
  var contentType = response.headers("Content-Type");
  if(contentType == "application/json")
  {
    var endpoints = response.data;
    if(angular.isDefined(endpoints))
    {
      angular.extend(geodash.var.endpoints, endpoints);
    }
  }
};
