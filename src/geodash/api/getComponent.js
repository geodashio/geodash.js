module.exports = function(name)
{
  return extract(["var","components", name], geodash);
};
