module.exports = function(suggestions, q2)
{
  var queryKeywords = q2.keywords;
  suggestions = $.grep(suggestions, function(x,i)
  {
    var includeSuggestion = true;
    var objectKeywords = extract("obj.metadata.keywords", x, []);
    for(var j = 0; j < queryKeywords; j++)
    {
      if($.inArray(queryKeywords[j], objectKeywords) == -1))
      {
        includeSuggestion = false;
        break;
      }
    }
    return includeSuggestion;
  });
};
