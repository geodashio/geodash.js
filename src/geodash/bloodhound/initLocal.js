module.exports = function(localData, featurelayers, baselayers, servers)
{
  var bloodhoundData = undefined;

  if(geodash.util.isString(localData))
  {
    var localFn = extract(localData, geodash.bloodhound.local);
    if(geodash.util.isFunction(localFn))
    {
      bloodhoundData = localFn({
        'featurelayers': featurelayers,
        'baselayers': baselayers,
        'servers': servers
      });
    }
    else if(localData.length > 0)
    {
      bloodhoundData = [].concat(geodash.initial_data["data"][localData]);
      for(var i = 0; i < bloodhoundData.length; i++)
      {
        if(geodash.util.isString(bloodhoundData[i]))
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
  else if(Array.isArray(localData))
  {
    bloodhoundData = [].concat(localData);
    for(var i = 0; i < bloodhoundData.length; i++)
    {
      if(geodash.util.isString(bloodhoundData[i]))
      {
        bloodhoundData[i] = {'id': bloodhoundData[i], 'text': bloodhoundData[i]};
      }
    }
  }
  else
  {
    var localDataFnName = extract("name", localData);
    if(geodash.util.isDefined(localDataFnName))
    {
      var localFn = extract(localDataFnName, geodash.bloodhound.local);
      if(geodash.util.isFunction(localFn))
      {
        var localFnOptions = {
          'featurelayers': featurelayers,
          'baselayers': baselayers,
          'servers': servers
        };
        geodash.util.extend(localFnOptions, extract("args", localData, {}));
        bloodhoundData = localFn(localFnOptions);
      }
    }
  }

  if(geodash.util.isDefined(bloodhoundData))
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
