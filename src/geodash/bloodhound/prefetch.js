module.exports = function(options)
{
  if(angular.isDefined(options))
  {
    if(angular.isString(options))
    {
      return undefined;
    }
    else if(angular.isArray(options))
    {
      return undefined;
    }
    else if(angular.isString(options.url))
    {
      var url = options.url;
      var codec = extract(options.codec, geodash.bloodhound.codec, undefined);
      var data = {
        'url': url,
        'dataType': extract('dataType', options, 'json'),
        'transform': codec,
        'wildcard': extract('wildcard', options, '%QUERY'),
        'cache': extract('cache', options, false)
      };
      return data;
    }
    else
    {
      return undefined;
    }
  }
  else
  {
    return undefined;
  }
};
