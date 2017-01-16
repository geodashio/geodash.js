module.exports = function($interpolate, $scope)
{
  geodash.var.history = geodash.var.history || {};
  
  var h = geodash.var.history;

  h.state = h.state || {"list": [], cursor: 0};
  h.extent = h.extent || {"list": [], cursor: 0};

  if(geodash.history.dirty(h.state.list, h.state.cursor, $scope.state))
  {
    h.state.list.push(geodash.util.deepCopy($scope.state));
    h.state.cursor = h.state.list.length -1;

    var newExtent = geodash.util.deepCopy(extract("state.view.extent", $scope));
    if(newExtent != undefined)
    {
      if(geodash.history.dirty(h.extent.list, h.extent.cursor, newExtent))
      {
        if(h.extent.cursor != h.extent.list.length -1)
        {
          h.extent.list = h.extent.list.slice(0, h.extent.cursor);
        }
        h.extent.list.push(newExtent);
        h.extent.cursor = h.extent.list.length -1;
      }
    }

    var url = buildPageURL($interpolate, $scope.dashboard, $scope.state);
    if(url != undefined)
    {
      history.replaceState($scope.state, "", url);
    }
  }

};
