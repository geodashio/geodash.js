/**
 * Lists the image assets in the GeoDash dashboard config
 *
 * @function listImages
 * @param {(Object)} options - The id of the element for the Angular Controller
 * @return {(Object[])} Returns as an array the list of image assets in the dashboard
 * @memberof geodash.api
 *
 * @example <caption>Basic</caption>
 * var images = geodash.api.listImages();
 *
 * @example <caption>With Options</caption>
 * var images = geodash.api.listImages({"scope": "geodash-main"});
 */

module.exports = function(options)
{
  var config = geodash.api.getDashboardConfig(options);
  var assets = extract("assets", config, []);
  return $.grep(assets, function(x, i){
    return extract("type", x, undefined) == "image";
  });
};
