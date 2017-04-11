/**
 * Loads urls to apges into runtime framework
 *
 * @function pages
 * @param {(Object)} response - The response
 * @memberof geodash.bootloader.loaders
 *
 * @example <caption>Basic</caption>
 * geodash.bootloader.loaders.pages(response);
 * // geodash.var.pages == {"home": "/", "dashboard": "/dashboard/{{ uuid }}"}
 *
 */

module.exports = function(response)
{
  var contentType = response.headers("Content-Type");
  if(contentType == "application/json")
  {
    var pages = response.data;
    if(geodash.util.isDefined(pages))
    {
      geodash.util.extend(geodash.var.pages, pages);
    }
  }
};
