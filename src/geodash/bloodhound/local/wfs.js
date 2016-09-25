module.exports = function(options)
{
  var bloodhoundData = [];

  var servers = options.servers || geodash.api.listServers();
  if(angular.isDefined(servers))
  {
    servers = $.grep(servers, function(x, i){
      return (extract("type", x, undefined) == "wms") && (extract('wfs.url', x, '').length > 0);
    });
    bloodhoundData = bloodhoundData.concat($.map(servers, function(x, i){
      var url = extract('wfs.url', x, '');
      return { 'id': url, 'text': url };
    }));
  }

  return bloodhoundData;
};
