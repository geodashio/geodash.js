module.exports = function(data)
{
  if(data.text == data.id)
  {
    if(data.text != undefined)
    {
      return '<p><strong>' + data.text + '</strong></p>';
    }
    else
    {
      return "";
    }
  }
  else
  {
    return '<p><strong>' + data.text + '</strong> (' + data.id + ')</p>';
  }
};
