module.exports = function(name)
{
  if(geodash.util.isDefined(name))
  {
    var log = extract('var.logs.'+name, geodash);
    if(Array.isArray(log))
    {
      console.group('GeoDash Log: '+name);
      for(var i = 0; i < log.length; i++)
      {
        var message = log[i];
        if(message.level == "error")
        {
          console.warn(message.message);
        }
        else
        {
          console.log(message.message);
        }
      }
      console.groupEnd();
    }
  }
  else
  {
    $.each(geodash.var.logs, function(name, log){
      console.group("Printing log "+name+"...");
      for(var i = 0; i < log.length; i++)
      {
        var message = log[i];
        if(message.level == "error")
        {
          console.warn(message.message);
        }
        else
        {
          console.log(message.message);
        }
      }
      console.groupEnd();
    });
  }
};
