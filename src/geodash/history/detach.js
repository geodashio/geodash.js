module.exports = function(name)
{
  var h = extract(["var", "history", name], geodash);
  if(h.list.length > 0)
  {
    h.detached_cursor = h.cursor;
    h.detached_list = geodash.util.deepCopy(h.list.slice(h.cursor));
    h.list = geodash.util.deepCopy(h.list.slice(0, h.cursor));
  }
};
