module.exports = function(e)
{
  var targetSelector = $(this).attr("href");
  if(geodash.util.isDefined(targetSelector))
  {
    var targetElement = $(targetSelector);
    if(targetElement.length > 0)
    {
      $('[data-toggle="tooltip"]', targetElement).tooltip();

      $(".c3", targetElement).each(function(){
        $(this).data('chart').resize();
      });
    }
  }
};
