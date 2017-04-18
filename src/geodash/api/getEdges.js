module.exports = function(id)
{
  return extract(["var", "graphs", id, "data", "edges"], geodash);
};
