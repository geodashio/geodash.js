module.exports = function(options)
{
  options = options || {};
  var scope = options['$scope'] || options['scope'] || angular.element("#geodash-main").scope();
  var intentData = {
    "id": "geodash-modal-welcome",
    "dynamic": {},
    "static": {
      "welcome": scope.dashboard["welcome"]
    }
  };
  geodash.api.intend("toggleModal", intentData, scope);
};
