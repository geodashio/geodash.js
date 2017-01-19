module.exports = function (data)
{
  if(! geodash.util.isDefined(data.query))
  {
    return "";
  }
  else if(data.query.length == 0)
  {
    return "";
  }
  else
  {
    return '<div>Searched for <strong>' + data.query + '</strong></div>';
  }
};
