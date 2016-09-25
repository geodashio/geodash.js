/**
 * Gets an [AngularJS](https://angularjs.org/) [scope](https://docs.angularjs.org/guide/scope) for a given element
 *
 * @function getScope
 * @param {(string)} id - The id of the element for the Angular Controller
 * @return {(Object|undefined)} If the element is found, will try isolateScope and then scope.  If not found, returns undefined.
 * @memberof geodash.api
 *
 * @see https://docs.angularjs.org/guide/scope
 *
 * @example
 * var $scope = geodash.api.getScope('geodash-main');
 * var $scope = geodash.api.getEndpoint('geodash-modal-welcome');
 */

module.exports = function(id)
{
  return angular.element("#"+id).isolateScope() || angular.element("#"+id).scope();
};
