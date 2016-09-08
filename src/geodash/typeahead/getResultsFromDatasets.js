module.exports = function(datasets, value)
{
  var results = [];
  for(var i = 0; i < datasets.length; i++)
  {
    var x = datasets[i].engine.get(value);
    if(Array.isArray(x))
    {
      results = results.concat(x);
    }
  }
  return results;
};
