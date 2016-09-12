module.exports = function(element, featurelayers, baselayers, servers)
{
  var datasets = [];
  var template_suggestion = extract(element.data('template-suggestion') || 'default', geodash.typeahead.templates.suggestion);
  var url = geodash.api.getEndpoint("geodash_capabilities_json");
  var local = undefined;
  var prefetchOptions = {
    url: url,
    dataType: 'json',
    codec: "GeoDashCapabilities",
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
    codec: "GeoDashCapabilities",
    rate: 1000
  };
  var remote = geodash.bloodhound.remote(
    remoteOptions,
    featurelayers,
    baselayers,
    servers);
  var engine = geodash.bloodhound.engine(local, prefetch, remote);
  var templates = {
    suggestion: template_suggestion
  };
  var dataset = {
    name: "geodash",
    engine: engine,
    minLength: 0,
    limit: 10,
    hint: false,
    highlight: true,
    display: geodash.typeahead.displayFn.default,
    source: geodash.typeahead.sourceFn.default,
    templates: templates
  };
  datasets.push(dataset);

  return datasets;
};
