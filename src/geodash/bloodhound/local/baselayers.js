module.exports = function(options)
{
  var bloodhoundData = [];

  var baselayers = options.baselayers || geodash.api.listBaseLayers();
  if(angular.isDefined(baselayers))
  {
    bloodhoundData = bloodhoundData.concat($.map(baselayers, function(x, i){
      return {
        'id': x.id,
        'text': (x.title || x.id),
        'obj': x
      };
    }));
  }

  return bloodhoundData;
};
