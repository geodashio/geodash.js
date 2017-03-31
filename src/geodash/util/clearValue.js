/**
 * Deletes the property in target at the given location given by keyChain.
 *
 * @function clearValue
 * @param {Object} keyChain - The key chain of the property
 * @param {Object} target - The object
 * @memberof geodash.api
 */

module.exports = function(keyChain, target)
{
  if(geodash.util.isString(keyChain))
  {
    keyChain = keyChain.split("__");
  }

  if(keyChain.length == 1)
  {
    delete target[keyChain[0]];
  }
  else
  {
    for(var j = 0; j < keyChain.length -1 ; j++)
    {
      var newKey = keyChain[j];
      if(!(newKey in target))
      {
        var iTest = -1;
        try{iTest = parseInt(keyChain[j+1], 10);}catch(err){iTest = -1;};
        target[newKey] = iTest >= 0 ? [] : {};
      }
      target = target[newKey];
    }
    var finalKey = keyChain[keyChain.length-1];
    delete target[finalKey];
  }
};
