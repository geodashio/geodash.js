/**
 * Gets an API url ednpoint from a dashboard config by id
 *
 * @function getEndpoint
 * @param {(string)} id - The API endpoint id
 * @return {(string| undefined)} If found, returns API endpoint url.  If not found, returns undefined.
 * @memberof geodash.api
 *
 * @example <caption>Capabilities</caption>
 * var url = geodash.api.getEndpoint("geodash_capabilities_json");
 * url == "/api/capabilities"
 * @example <caption>Save</caption>
 * var payload = ...;
 * var url = $interpolate(geodash.api.getEndpoint('save'))({'slug': slug});
 * $http.post(url, payload, httpConfig).success(...
 */

module.exports = function(id)
{
  return extract(["endpoints", id], geodash.var);
};
