module.exports = function(x)
{
  var y = {};
  if(angular.isArray(x))
  {
    for(var i = 0; i < x.length; i++)
    {
      y[x[i].name] = x[i].value;
    }
  }
  return y;
}
