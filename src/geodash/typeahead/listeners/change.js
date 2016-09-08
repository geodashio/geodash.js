module.exports = function(event, value)
{
  console.log("Event: ", event, value);
  if(angular.isDefined($(this).data('datasets')))
  {
    var datasets = $(this).data('datasets');
    //
    var results = geodash.typeahead.getResultsFromDatasets(datasets, value);
    var resultIndex = $(this).attr('data-search-output')|| 'id';
    var newValue = results.length == 1 ? extract(resultIndex, results[0]) : null;
    if(angular.isString($(this).data('backend')))
    {
      var backend = $('#'+$(this).data('backend'))
        .val(angular.isString(newValue) ? newValue : JSON.stringify(newValue))
        .trigger('input')
        .change();
    }
    else if(angular.isString($(this).attr('data-typeahead-scope')))
    {
      var $scope = geodash.api.getScope($(this).attr('data-typeahead-scope'));
      $scope.$apply(function(){
        $scope.setValue($scope.path_array, newValue, $scope.workspace);
        $.each($scope.workspace_flat, function(key, value){
          if(key.startsWith($scope.path_flat+"__"))
          {
            $scope.workspace_flat[key] = $scope.stack.head.workspace_flat[key] = undefined;
          }
        });
        if(angular.isDefined(newValue) && newValue != null)
        {
          $.each(geodash.api.flatten(newValue), function(i, x){
            $scope.workspace_flat[$scope.path_flat+"__"+i] = $scope.stack.head.workspace_flat[$scope.path_flat+"__"+i] = x;
          });
        }
      });
    }
  }
};
