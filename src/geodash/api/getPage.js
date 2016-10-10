/**
 * Gets a page url from a dashboard config by id
 *
 * @function getPage
 * @param {(string)} id - The page id
 * @return {(string| undefined)} If found, returns page url.  If not found, returns undefined.
 * @memberof geodash.api
 *
 * @example <caption>Basic</caption>
 * var url = geodash.api.getPage('home');
 * // url == "/home"
 * @example <caption>With Slug</caption>
 * var url = geodash.api.getPage('dashboard');
 * // url == "/dashboard/{{ slug }}"
 */

module.exports = function(id, options)
{
  if(angular.isDefined(id))
  {
    var config = geodash.api.getDashboardConfig(options);
    var matches = $.grep(config.pages, function(x, i){return x.id == id;});
    if(matches.length == 1)
    {
      return matches[0]["url"];
    }
    else
    {
      return undefined;
    }
  }
  else
  {
    return undefined;
  }
};
