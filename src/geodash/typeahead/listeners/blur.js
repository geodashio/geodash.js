module.exports = function(event)
{
  console.log("Blur Event: ", event);
  if(angular.isDefined($(this).data('datasets')))
  {
    var valueFromInput = $(this).val();
    var datasets = $(this).data('datasets');
    //
    var results = geodash.typeahead.getResultsFromDatasets(datasets, valueFromInput);
    var resultIndex = $(this).attr('data-search-output')|| 'id';
    var newValue = results.length == 1 ? extract(resultIndex, results[0]) : null;

    geodash.ui.saveToInput(this, newValue);
    geodash.ui.saveToScope(this, newValue);
  }
};
