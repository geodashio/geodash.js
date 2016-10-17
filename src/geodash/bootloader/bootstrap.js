module.exports = function(options)
{
  var appName = extract("appName", options);
  var element = extract("element", options, document);

  angular.bootstrap(element, [appName]);
};
