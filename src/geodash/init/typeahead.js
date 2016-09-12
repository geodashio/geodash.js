module.exports = function($element, featurelayers, baselayers, servers, datasetOptions, codecOptions)
{
  datasetOptions = datasetOptions || [geodash.typeahead.datasets];
  codecOptions = codecOptions || [geodash.bloodhound.codec];

  $('.typeahead', $element).each(function(){

    var datasets = [];
    var engine = undefined;

    var s = $(this);
    var placeholder = s.data('placeholder');
    var w = s.data('width');
    var h = s.data('height');
    var css = 'geodashserver-welcome-select-dropdown';
    var template_empty = s.data('template-empty');

    if(angular.isString(s.attr('data-typeahead-datasets')) && s.attr('data-typeahead-datasets').length > 0)
    {
      var datasetsName = s.attr('data-typeahead-datasets');
      var datasetsFn = undefined;
      for(var i = 0; i < datasetOptions.length; i++)
      {
        datasetsFn = extract(datasetsName, datasetOptions[i]);
        if(angular.isDefined(datasetsFn))
        {
          break;
        }
      }
      datasets = datasetsFn(s, featurelayers, baselayers, servers, codecOptions);
    }
    else
    {
      var datasetsFn = extract('default', geodash.typeahead.datasets);
      datasets = datasetsFn(s, featurelayers, baselayers, servers, codecOptions);
    }

    if(datasets.length > 0)
    {
      s.typeahead('destroy','NoCached');
      var typeahead = s.typeahead(null, datasets);
      s.data('datasets', datasets);

      typeahead.on('blur', geodash.typeahead.listeners.blur);
      typeahead.on('typeahead:change', geodash.typeahead.listeners.change);
      typeahead.on('typeahead:select typeahead:autocomplete typeahead:cursorchange', geodash.typeahead.listeners.select);

      /*typeahead.on('typeahead:change', function(event, value) {
        console.log("Event: ", event, value);
        if(angular.isDefined($(this).data('datasets')))
        {
          var results = geodash.typeahead.getResultsFromDatasets($(this).data('datasets'), value);
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
              $scope.setValue($scope.path_flat, newValue, $scope.workspace);
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
      });

      typeahead.on('typeahead:select typeahead:autocomplete typeahead:cursorchange', function(event, obj) {
        console.log("Event: ", event, obj);
        var resultIndex = $(this).attr('data-search-output')|| 'id';
        var newValue = extract(resultIndex, obj, null)
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
            $scope.setValue($scope.path_flat, newValue, $scope.workspace);
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
      });
      */

    }

  });

};
