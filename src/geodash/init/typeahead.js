module.exports = function($element, featurelayers, baselayers, servers, datasetOptions, codecOptions)
{
  datasetOptions = datasetOptions || extract("config.search.datasets", geodash) || [geodash.typeahead.datasets];
  codecOptions = codecOptions || extract("config.search.codecs", geodash) || [geodash.bloodhound.codec];

  $('.typeahead', $element).each(function(){

    var datasets = [];
    var engine = undefined;

    var that = $(this);
    var placeholder = that.data('placeholder');
    var w = that.data('width');
    var h = that.data('height');
    var css = 'geodashserver-welcome-select-dropdown';
    var template_empty = that.data('template-empty');
    var initialValue = that.data('initial-value');

    if(angular.isString(that.attr('data-typeahead-datasets')) && that.attr('data-typeahead-datasets').length > 0)
    {
      var datasetsName = that.attr('data-typeahead-datasets');
      var datasetsFn = undefined;
      for(var i = 0; i < datasetOptions.length; i++)
      {
        datasetsFn = extract(datasetsName, datasetOptions[i]);
        if(angular.isDefined(datasetsFn))
        {
          break;
        }
      }
      datasets = datasetsFn(that, featurelayers, baselayers, servers, codecOptions);
    }
    else
    {
      var datasetsFn = extract('default', geodash.typeahead.datasets);
      datasets = datasetsFn(that, featurelayers, baselayers, servers, codecOptions);
    }

    if(datasets.length > 0)
    {
      that.typeahead('destroy','NoCached');
      var typeahead = that.typeahead(null, datasets);
      that.data('datasets', datasets);
      if(angular.isDefined(initialValue))
      {
        that.typeahead('val', geodash.typeahead.displayFn(initialValue));
        var newValue = extract(that.attr('data-search-output') || 'id', initialValue);
        geodash.ui.saveToInput(this, newValue);
        geodash.ui.saveToScope(this, newValue);
      }

      that.on('keydown', geodash.typeahead.listeners.keydown);
      that.on('keyup', geodash.typeahead.listeners.keyup);
      //
      typeahead.on('blur', geodash.typeahead.listeners.blur);
      // Don't hook to change, since is triggered with null on typeaheads when new box is being opened.
      // Need to manually trigger listener when doing geodash-clear
      //typeahead.on('change', geodash.typeahead.listeners.change);
      typeahead.on('typeahead:change', geodash.typeahead.listeners.change);
      typeahead.on('typeahead:select typeahead:autocomplete typeahead:cursorchange', geodash.typeahead.listeners.select);
    }

  });

};
