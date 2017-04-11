/**
 * Saves the typeahead value to an Angular Scope
 *
 * @function saveToInput
 * @param {Object} element - The input element
 * @param {(Object|string)} newValue - The new value to be saved
 * @memberof geodash.ui
 */

module.exports = function(element, newValue)
{
  if(geodash.util.isDefined(element))
  {
    var scope_id = $(element).attr('data-target-scope-id');
    if(geodash.util.isString(scope_id))
    {
      var $scope = geodash.util.getScope(scope_id);
      if(geodash.util.isDefined($scope))
      {
        if(geodash.util.isString($(element).attr('data-target-scope-path')))
        {
          var targetScopePath = $(element).attr('data-target-scope-path');
          try { targetScopePath = JSON.parse(targetScopePath); }catch(err){}

          var targetScopeChange = $(element).attr('data-target-scope-change');
          try { targetScopeChange = JSON.parse(targetScopePath); }catch(err){}

          var path = undefined;
          var path_array = undefined;
          var path_flat = undefined;
          if(Array.isArray(targetScopePath))
          {
            path_array = targetScopePath;
            path = path_array.join(".");
            path_flat = path_array.join("__");
          }
          else
          {
            path = targetScopePath;
            path_array = path.split(".");
            path_flat = path_array.join("__");
          }

          $scope.$apply(function(){
            $scope.setValue(path_array, newValue, $scope);
            $.each($scope, function(key, value){
              if(key.startsWith(path_flat+"__"))
              {
                $scope[key] = undefined;
              }
            });
            if(geodash.util.isDefined(newValue) && newValue != null)
            {
              if(! geodash.util.isString(newValue))
              {
                $.each(geodash.util.flatten(newValue), function(i, x){
                  $scope[path_flat+"__"+i] = x;
                });
              }
            }
          });

          if(Array.isArray(targetScopeChange))
          {
            var changeFn = extract(targetScopeChange[0], $scope);
            if(geodash.util.isFunction(changeFn))
            {
              changeFn.apply(this, targetScopeChange.slice(1));
            }
          }
        }
        else
        {
          $scope.$apply(function(){
            $scope.setValue($scope.path_array, newValue, $scope.workspace);
            $.each($scope.workspace_flat, function(key, value){
              if(key.startsWith($scope.path_flat+"__"))
              {
                $scope.workspace_flat[key] = $scope.stack.head.workspace_flat[key] = undefined;
              }
            });
            if(geodash.util.isDefined(newValue) && newValue != null)
            {
              $.each(geodash.util.flatten(newValue), function(i, x){
                $scope.workspace_flat[$scope.path_flat+"__"+i] = $scope.stack.head.workspace_flat[$scope.path_flat+"__"+i] = x;
              });
            }
          });

          if(Array.isArray(targetScopeChange))
          {
            var changeFn = extract(targetScopeChange[0], $scope);
            if(geodash.util.isFunction(changeFn))
            {
              changeFn.apply(this, targetScopeChange.slice(1));
            }
          }
        }
      }
    }
  }
};
