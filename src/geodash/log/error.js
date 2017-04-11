module.exports = function(name, messages)
{
  if(!Array.isArray(geodash.var.logs[name]))
  {
    geodash.var.logs[name] = [];
  }
  if(Array.isArray(messages))
  {
    for(var i = 0; i < messages.length; i++)
    {
      geodash.var.logs[name].push({level: 'error', message: messages[i]});
      console.error(message[i]);
    }
  }
  else if(geodash.util.isString(messages))
  {
    geodash.var.logs[name].push({level: 'error', message: messages});
    console.error(messages);
  }
};
