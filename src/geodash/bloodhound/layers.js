module.exports = function(featurelayers, baselayers)
{
  var bloodhoundData = [];

  featurelayers = featurelayers || geodash.api.listFeatureLayers();
  if(angular.isDefined(featurelayers))
  {
    bloodhoundData = bloodhoundData.concat($.map(featurelayers, function(x, i){
      return {
        'id': x.id,
        'text': x.title,
        'obj': x
      };
    }));
  }

  baselayers = baselayers || geodash.api.listBaseLayers();
  if(angular.isDefined(baselayers))
  {
    bloodhoundData = bloodhoundData.concat($.map(baselayers, function(x, i){
      return {
        'id': x.id,
        'text': x.title,
        'obj': x
      };
    }));
  }

  return bloodhoundData;
};
