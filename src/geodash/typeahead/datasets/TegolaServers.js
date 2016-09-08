module.exports = function(element, featurelayers, baselayers, servers)
{
  var datasets = [];
  var template_suggestion = extract(element.data('template-suggestion') || 'default', geodash.typeahead.templates.suggestion);
  var tegolaservers = geodash.api.listTegolaServers();
  for(var i = 0; i < tegolaservers.length; i++)
  {
    var server = wmsservers[i];
    var url = extract('wms.url', server)+'/capabilities';
    var local = undefined;
    var prefetchOptions = {
      url: url,
      dataType: 'json',
      codec: "TegolaCapabilities",
      cache: false
    };
    var prefetch = geodash.bloodhound.prefetch(
      prefetchOptions,
      featurelayers,
      baselayers,
      servers);
    var remoteOptions = {
      url: url,
      dataType: 'json',
      codec: "TegolaCapabilities",
      rate: 1000
    };
    var remote = geodash.bloodhound.remote(
      remoteOptions,
      featurelayers,
      baselayers,
      servers);
    var engine = geodash.bloodhound.engine(local, prefetch, remote);
    var templates = {
      header: '<h3 style="margin: 0 20px 5px 20px; padding: 3px 0; border-bottom: 1px solid #ccc;">'+ extract('title' || 'id', server, "") +'</h3>',
      suggestion: template_suggestion
    };
    var dataset = {
      name: extract('id', server, 'server_'+i),
      engine: engine,
      minLength: 0,
      limit: 10,
      hint: false,
      highlight: true,
      display: geodash.typeahead.displayFn,
      source: function (query, syncResults, asyncResults)
      {
        // https://github.com/twitter/typeahead.js/pull/719#issuecomment-43083651
        // http://pastebin.com/adWHFupF
        //query == "" ? cb(data) : engine.ttAdapter()(query, cb);
        this.engine.ttAdapter()(query, syncResults, asyncResults);
      },
      templates: templates
    };
    datasets.push(dataset);
  }

  return datasets;
};
