module.exports = function(name)
{
  var h = extract(["var", "history", name], geodash);
  if(h.list.length == 0)
  {
    return undefined;
  }
  else
  {
    if(h.cursor > 0)
    {
      //h.detached_list = geodash.util.deepCopy(h.list);
      //h.list = geodash.util.deepCopy(h.list.slice(0, h.cursor));
      h.cursor = h.cursor - 1;
      //h.detached_cursor = h.cursor;
      return geodash.util.deepCopy(h.list[h.cursor]);
    }
    else
    {
      return undefined;
    }
  }
};
