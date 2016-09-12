module.exports = function(element, featurelayers, baselayers, servers)
{
  var datasets = [];
  var template_suggestion = extract(element.data('template-suggestion') || 'default', geodash.typeahead.templates.suggestion);
  var wmsservers = geodash.api.listWMSServers();
  for(var i = 0; i < wmsservers.length; i++)
  {
    var server = wmsservers[i];
    var url = extract('wms.url', server)+'?service=wms&request=GetCapabilities';
    var local = undefined;
    var prefetchOptions = {
      url: url,
      dataType: 'xml',
      codec: "WMSCapabilities",
      cache: false
    };
    var prefetch = geodash.bloodhound.prefetch(
      prefetchOptions,
      featurelayers,
      baselayers,
      servers);
    var remoteOptions = {
      url: url,
      dataType: 'xml',
      codec: "WMSCapabilities",
      rate: 1000
    };
    var remote = geodash.bloodhound.remote(
      remoteOptions,
      featurelayers,
      baselayers,
      servers);
    var engine = geodash.bloodhound.engine(local, prefetch, remote);
    var templates = {
      header: geodash.typeahead.templates.header.WMSServer(server),
      suggestion: template_suggestion
    };
    var dataset = {
      name: extract('id', server, 'server_'+i),
      engine: engine,
      minLength: 0,
      limit: 10,
      hint: false,
      highlight: true,
      display: geodash.typeahead.displayFn.default,
      source: geodash.typeahead.sourceFn.WMSServer,
      templates: templates
    };
    datasets.push(dataset);
  }

  return datasets;
};
