module.exports = function(element, featurelayers, baselayers, servers, codecOptions)
{
  var datasets = [];
  var local = geodash.bloodhound.local(
    element.data('localData'),
    featurelayers,
    baselayers,
    servers);
  var prefetchOptions = element.data('prefetchData');
  var prefetch = geodash.bloodhound.prefetch(
    prefetchOptions,
    featurelayers,
    baselayers,
    servers,
    codecOptions);
  var remoteOptions = element.data('remoteData');
  var remote = geodash.bloodhound.remote(
    remoteOptions,
    featurelayers,
    baselayers,
    servers,
    codecOptions);

  if((angular.isDefined(local) && local.length > 0) || angular.isDefined(prefetch) || angular.isDefined(remote))
  {
    // Twitter Typeahead with
    //https://github.com/bassjobsen/typeahead.js-bootstrap-css
    var engine = geodash.bloodhound.engine(local, prefetch, remote);

    var templates = {
      empty: element.attr('data-template-empty'),
      suggestion: extract(element.data('template-suggestion') || 'default', geodash.typeahead.templates.suggestion),
      footer: geodash.typeahead.footer
    };
    var dataset = {
      name: element.attr('name'),
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
