/**
 * Deletes the value from an Angular scope
 *
 * @function clearFromScope
 * @param {Object} element - The typeahead element
 * @param {(Object|string)} newValue - The new value to be saved
 * @return {Object} object - returns new object
 * @memberof geodash.ui
 */

module.exports = function(element)
{
  if(angular.isDefined(element))
  {
    var scope_id = $(element).attr('data-target-scope-id');
    if(angular.isString(scope_id))
    {
      var $scope = geodash.api.getScope(scope_id);
      if(angular.isDefined($scope))
      {
        if(angular.isString($(element).attr('data-target-scope-path')))
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
            $scope.clearValue(path_array, $scope);
            $.each($scope, function(key, value){
              if(key.startsWith(path_flat+"__"))
              {
                delete $scope[key];
              }
            });
          });

          if(Array.isArray(targetScopeChange))
          {
            var changeFn = extract(targetScopeChange[0], $scope);
            if(angular.isFunction(changeFn))
            {
              changeFn.apply(this, targetScopeChange.slice(1));
            }
          }
        }
        else
        {
          $scope.$apply(function(){
            $scope.clearValue($scope.path_array, $scope.workspace);
            $.each($scope.workspace_flat, function(key, value){
              if(key.startsWith($scope.path_flat+"__"))
              {
                delete $scope.workspace_flat[key];
                delete $scope.stack.head.workspace_flat[key];
              }
            });
          });

          if(Array.isArray(targetScopeChange))
          {
            var changeFn = extract(targetScopeChange[0], $scope);
            if(angular.isFunction(changeFn))
            {
              changeFn.apply(this, targetScopeChange.slice(1));
            }
          }
        }
      }
    }
  }
};
