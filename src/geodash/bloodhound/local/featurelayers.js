module.exports = function(options)
{
  var bloodhoundData = [];

  var featurelayers = options.featurelayers || geodash.api.listFeatureLayers();
  if(angular.isDefined(featurelayers))
  {
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
