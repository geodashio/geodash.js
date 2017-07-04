module.exports = function(value, delimiter)
{
  if(value != undefined && value !== "")
  {
    delimiter = geodash.util.isDefined(delimiter) ? delimiter : ' ';
    var str = ""+value;
    var pattern = new RegExp("[,+\\-;\\s]+","gi");
    while(pattern.test(str)){str=str.replace(pattern,"");}
    if(str.length >= 7)
    {
      if(str.length > 10)
      {
        return str.substring(0, str.length - 10) + delimiter + str.substring(str.length - 10, str.length - 7) + delimiter + str.substring(str.length - 7, str.length - 4) + delimiter +  str.substring(str.length - 4, str.length);
      }
      else if(str.length >= 8 && str.length <= 10)
      {
        return str.substring(0, str.length - 7) + delimiter + str.substring(str.length - 7, str.length - 4) + delimiter +  str.substring(str.length - 4, str.length);
      }
      else if(str.length == 7)
      {
        return str.substring(0, 3) + delimiter +  str.substring(3, 7);
      }
    }
    else
    {
      return "";
    }
  }
  else
  {
    return "";
  }
};
