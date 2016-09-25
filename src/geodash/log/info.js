/**
 * Adds one or messages to the log identified by name.
 *
 * @function info
 * @return {(string)} name - the name of the log
 * @param {(string|String[])} messages - either 1 {@link string} message or an array of {@link string}.
 * @memberof geodash.log
 *
 * @example <caption>One Message</caption>
 * geodash.log.info("init", "Layer roads loaded.");
 *
 * @example <caption>Multiple Messages</caption>
 * geodash.log.info("init", ["Layer roads loaded.", "Layer buildings loaded"]);
 */

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
      geodash.var.logs[name].push({level: 'info', message: messages[i]});
    }
  }
  else if(angular.isString(messages))
  {
    geodash.var.logs[name].push({level: 'info', message: messages});
  }

};
