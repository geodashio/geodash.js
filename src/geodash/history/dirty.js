module.exports = function(h, cursor, x)
{
  var dirty = false;
  if(Array.isArray(h))
  {
    if(h.length == 0)
    {
      dirty = true;
    }
    else
    {
      if(JSON.stringify(x) != JSON.stringify(h[cursor]))
      {
        dirty = true;
      }
    }
  }
  else
  {
    dirty = true;
  }
  return dirty;
};
