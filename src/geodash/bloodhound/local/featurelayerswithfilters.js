module.exports = function(options)
{
  var bloodhoundData = [];

  var featurelayers = options.featurelayers || geodash.api.listFeatureLayers();
  if(angular.isDefined(featurelayers))
  {
    featurelayers = $.grep(featurelayers, function(x, i){
      var filters = extract("filters", x);
      return Array.isArray(filters) && filters.length > 0;
    });

    bloodhoundData = bloodhoundData.concat($.map(featurelayers, function(x, i){
      return {
        'id': x.id,
        'text': (x.title || x.id),
        'obj': x
      };
    }));
  }

  return bloodhoundData;
};
