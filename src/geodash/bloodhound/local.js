module.exports = function(initialData, featurelayers, baselayers, servers)
{
  var bloodhoundData = undefined;

  if(angular.isString(initialData))
  {
    if(initialData == "layers")
    {
      bloodhoundData = geodash.bloodhound.layers(featurelayers, baselayers);
    }
    else if(initialData == "featurelayers")
    {
      bloodhoundData = geodash.bloodhound.featurelayers(featurelayers);
    }
    else if(initialData == "baselayers")
    {
      bloodhoundData = geodash.bloodhound.baselayers(baselayers);
    }
    else if(initialData == "wms")
    {
      bloodhoundData = geodash.bloodhound.wms(servers);
    }
    else if(initialData.length > 0)
    {
      bloodhoundData = [].concat(geodash.initial_data["data"][initialData]);
      for(var i = 0; i < bloodhoundData.length; i++)
      {
        if(angular.isString(bloodhoundData[i]))
        {
          bloodhoundData[i] = {'id': bloodhoundData[i], 'text': bloodhoundData[i]};
        }
      }
    }
    else
    {
      bloodhoundData = undefined;
    }
  }
  else if(Array.isArray(initialData))
  {
    bloodhoundData = [].concat(initialData);
    for(var i = 0; i < bloodhoundData.length; i++)
    {
      if(angular.isString(bloodhoundData[i]))
      {
        bloodhoundData[i] = {'id': bloodhoundData[i], 'text': bloodhoundData[i]};
      }
    }
  }
  else
  {
    bloodhoundData = undefined;
  }

  if(angular.isDefined(bloodhoundData))
  {
    bloodhoundData.sort(function(a, b){
      var textA = a.text.toLowerCase();
      var textB = b.text.toLowerCase();
      if(textA < textB){ return -1; }
      else if(textA > textB){ return 1; }
      else { return 0; }
    });
  }

  return bloodhoundData;
};
