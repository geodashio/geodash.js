module.exports = function(element, featurelayers, baselayers, servers, codecs)
{
  var datasets = [];
  var template_suggestion = extract(
    element.data('template-suggestion') || 'Image',
    geodash.typeahead.templates.suggestion);

  var local = geodash.bloodhound.initLocal(
    "images",
    featurelayers,
    baselayers,
    servers);
  var engine = geodash.bloodhound.engine({ 'local': local });
  var templates = {
    suggestion: template_suggestion
  };
  var dataset = {
    name: "images",
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

  return datasets;
};
