module.exports = function(baselayers)
{
  var bloodhoundData = [];

  baselayers = baselayers || geodash.api.listBaseLayers();
  if(angular.isDefined(baselayers))
  {
    bloodhoundData = bloodhoundData.concat($.map(baselayers, function(x, i){
      return {'id': x.id, 'text': x.id};
    }));
  }

  return bloodhoundData;
};
