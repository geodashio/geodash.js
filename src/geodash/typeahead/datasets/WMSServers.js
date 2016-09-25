module.exports = function(element, featurelayers, baselayers, servers, codecs)
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
      cache: false,
      codecs: codecs
    };
    var prefetch = geodash.bloodhound.prefetch(prefetchOptions);
    var remoteOptions = {
      url: url,
      dataType: 'xml',
      codec: "WMSCapabilities",
      rate: 1000,
      codecs: codecs
    };
    var remote = geodash.bloodhound.remote(remoteOptions);
    var engine = geodash.bloodhound.engine({
      'local': local,
      'prefetch': prefetch,
      'remote': remote
    });
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
