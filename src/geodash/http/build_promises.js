/**
 * Create Angular promises from a set of urls
 *
 * @function build_promises
 * @param {(ol.geom.Point|L.point)} x - The original value
 * @return {Object} The value as a GeoDash Object
 * @memberof geodash.http
 *
 * @see https://docs.angularjs.org/api/ng/service/$http
 * @example
 * var urls = [...];
 * var promises = geodash.http.build_promises($http, urls);
 */

module.exports = function($http, urls)
{
  var promises = [];
  for(var i = 0; i < urls.length; i++)
  {
    var url = urls[i];
    var config = {};
    var promise = $http.get(url, config);
    promises.push(promise);
  }
  return promises;
};
