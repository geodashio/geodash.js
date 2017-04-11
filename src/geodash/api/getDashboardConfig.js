module.exports = function(options)
{
  if(geodash.util.isDefined(geodash.var.dashboard))
  {
    return geodash.var.dashboard();
  }
  else
  {
    var scope = extract("$scope", options) || extract("scope", options) || geodash.util.getScope("geodash-main");
    return scope.dashboard;
  }
};
