module.exports = function(name)
{
  var c = undefined;
  for(var i = 0; i < geodash.meta.controllers.length; i++)
  {
    if(geodash.meta.controllers[i]['name'] == name)
    {
      c = geodash.meta.controllers[i];
      break
    }
  }
  return c;
};
