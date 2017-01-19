module.exports = function($scope)
{
  var targetExtent = geodash.history.forward("extent");
  if(geodash.util.isDefined(targetExtent))
  {
    setTimeout(function(){
      var m = geodash.var.map;
      var v = m.getView();
      var args = geodash.animations.chain(m, v, {"extent": targetExtent});
      if(args.length > 0)
      {
        args.push(geodash.animations.callback($scope));
        v.animate.apply(v, args);
      }
    }, 0);
  }
  else
  {
    geodash.log.info("general", ["Could not find requested extent."])
  }
};
