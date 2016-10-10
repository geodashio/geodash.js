module.exports = function(options)
{
  var scope = extract("$scope", options) || extract("scope", options) || geodash.util.getScope("geodash-main");
  return scope.dashboard;
};
