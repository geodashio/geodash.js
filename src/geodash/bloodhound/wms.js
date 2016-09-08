module.exports = function(servers)
{
  var bloodhoundData = [];

  servers = servers || geodash.api.listServers();
  if(angular.isDefined(servers))
  {
    servers = $.grep(servers, function(x, i){
      return extract("type", x, undefined) == "wms";
    });
    bloodhoundData = bloodhoundData.concat($.map(servers, function(x, i){
      var url = extract('wms.url', x, '');
      return { 'id': url, 'text': url };
    }));
  }

  return bloodhoundData;
};
