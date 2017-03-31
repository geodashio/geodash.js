module.exports = function(a, b) {
  if(Array.isArray(a) && Array.isArray(b))
  {
    if(a.length == b.length)
    {
      for(var i = 0; i < a.length; i++)
      {
        if(a[i] !== b[i])
        {
          return false;
        }
      }
      return true;
    }
    else
    {
      return false;
    }
  }
  else
  {
    return a == b;
  }
};
