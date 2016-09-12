module.exports = function(text)
{
  if(angular.isString(text))
  {
    var data = undefined;
    var free = $.trim(text.replace(new RegExp("(\\s*)keyword:(\\S*)(\\s*)", "gi"), ""));
    var keywords = $.map($.map($.grep(text.match(new RegExp("(\\s*)(\\S*)(\\s*)", "gi")), function(x, i){
      return x.startsWith("keyword:");
    }), $.trim), function(x){return x.substring("keyword:".length)});
    data = {
      'text': text,
      'free': free,
      'keywords': keywords
    };
    return data;
  }
  else
  {
    return undefined;
  }
};
