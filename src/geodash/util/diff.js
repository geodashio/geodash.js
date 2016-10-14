module.exports = function(paths, a, b)
{
  var diff = [];
  if(angular.isDefined(a) && angular.isDefined(b))
  {
    for(var i = 0; i < paths.length; i++)
    {
      var path = paths[i];
      var text_a = JSON.stringify(extract(path, a, ""));
      var text_b = JSON.stringify(extract(path, b, ""));
      if(text_a != text_b)
      {
        diff.push(path);
      }
    }
  }
  else if(angular.isDefined(a) && (! angular.isDefined(b)))
  {
    diff = paths;
  }
  else if((! angular.isDefined(a)) && angular.isDefined(b))
  {
    diff = paths;
  }
  else
  {
    diff = [];
  }
  return diff;
};
