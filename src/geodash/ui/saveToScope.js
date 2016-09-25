module.exports = function(element, newValue)
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
          var path = $(element).attr('data-target-scope-path');
          var path_array = path.split(".");
          var path_flat = path_array.join("__");

          $scope.$apply(function(){
            $scope.setValue(path_array, newValue, $scope);
            $.each($scope, function(key, value){
              if(key.startsWith(path_flat+"__"))
              {
                $scope[key] = undefined;
              }
            });
            if(angular.isDefined(newValue) && newValue != null)
            {
              if(! angular.isString(newValue))
              {
                $.each(geodash.api.flatten(newValue), function(i, x){
                  $scope[path_flat+"__"+i] = x;
                });
              }
            }
          });
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
            if(angular.isDefined(newValue) && newValue != null)
            {
              $.each(geodash.api.flatten(newValue), function(i, x){
                $scope.workspace_flat[$scope.path_flat+"__"+i] = $scope.stack.head.workspace_flat[$scope.path_flat+"__"+i] = x;
              });
            }
          });
        }
      }
    }
  }
};
