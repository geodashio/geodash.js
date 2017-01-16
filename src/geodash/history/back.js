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
      h.cursor = h.cursor - 1;
      return geodash.util.deepCopy(h.list[h.cursor]);
    }
    else
    {
      return undefined;
    }
  }
};
