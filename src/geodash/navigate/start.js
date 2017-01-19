module.exports = function($scope)
{
  setTimeout(function(){
    var m = geodash.var.map;
    var v = m.getView();
    var args = geodash.animations.chain(m, v, {"extent": geodash.var.history.extent.list[0]});
    if(args.length > 0)
    {
      args.push(geodash.animations.callback($scope));
      v.animate.apply(v, args);
    }
  }, 0);
};
