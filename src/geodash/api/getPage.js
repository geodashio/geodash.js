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

 module.exports = function(id)
 {
   return extract(["pages", id], geodash.var);
 };
