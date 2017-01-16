module.exports = function($interpolate, $scope)
{
  geodash.var.history = geodash.var.history || {};
  var h = geodash.var.history;
  //
  h.state = h.state || {"list": [], cursor: 0};
  //h.extent = h.extent || {"list": [], cursor: 0, reattach: undefined, detached_cursor: 0, detached_list: []};
  h.extent = h.extent || {"list": [], cursor: 0};

  if(geodash.history.dirty(h.state.list, h.state.cursor, $scope.state))
  {
    h.state.list.push(geodash.util.deepCopy($scope.state));
    h.state.cursor = h.state.list.length -1;

    var newExtent = geodash.util.deepCopy(extract("state.view.extent", $scope));
    if(newExtent != undefined)
    {
      // Need to not reset the cursor to the newest extent if it matches the current extent at the cursor
      if(geodash.history.dirty(h.extent.list, h.extent.cursor, newExtent))
      {
        if(h.extent.cursor != h.extent.list.length -1)
        {
          h.extent.list = h.extent.list.slice(0, h.extent.cursor);
        }
        h.extent.list.push(newExtent);
        h.extent.cursor = h.extent.list.length -1;
      }

      /* Reattach future.  If user interrupted, then don't reattach.
      if(angular.isDefined(h.extent.reattach) && Array.isArray(h.extent.detached_list))
      {
        if(h.extent.reattach(newExtent))
        {
          h.extent.list = geodash.util.deepCopy(h.extent.detached_list);
          h.extent.cursor = h.extent.detached_cursor;

          h.extent.reattach = undefined;
          h.extent.detached_cursor = undefined;
          h.extent.detached_list = undefined;
        }
      }*/
    }

    var url = buildPageURL($interpolate, $scope.dashboard, $scope.state);
    if(url != undefined)
    {
      history.replaceState($scope.state, "", url);
    }
  }

};
