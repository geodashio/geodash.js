module.exports = function(id, arr)
{
  var result = undefined;
  var matches = $.grep(arr, function(x, i){ return x.id == id; });
  if(matches.length == 1)
  {
    result = matches[0];
  }
  return result;
};
