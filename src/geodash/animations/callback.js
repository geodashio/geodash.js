module.exports = function($scope){
  return function(success){
    if(! success)
    {
      var m = geodash.var.map;
      var v = m.getView();
      var h = extract(["var", "history", "extent"], geodash);
      h.list = h.list.slice(0, h.cursor); // Removes Future
      var delta = {
        "extent": v.calculateExtent(m.getSize()), //"extent": v.calculateExtent(m.getSize()).join(","),
        "location": {
          "lat": c[1],
          "lon": c[0]
        },
        "z": v.getZoom()
      };
      geodash.api.intend("viewChanged", delta, $scope);
    }
  };
};
