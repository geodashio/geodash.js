module.exports = function(value)
{
  return Object.prototype.toString.call(value) == "[object Date]";
};
