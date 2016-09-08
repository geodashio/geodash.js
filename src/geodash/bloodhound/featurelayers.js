module.exports = function(featurelayers)
{
  var bloodhoundData = [];

  featurelayers = featurelayers || geodash.api.listFeatureLayers();
  if(angular.isDefined(featurelayers))
  {
    bloodhoundData = bloodhoundData.concat($.map(featurelayers, function(x, i){
      return {'id': x.id, 'text': x.id};
    }));
  }

  return bloodhoundData;
};
