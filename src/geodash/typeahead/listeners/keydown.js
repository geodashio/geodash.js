module.exports = function(event, value)
{
  console.log("Keydown Event: ", event, value);
  if(event.which == 27)
  {
    if($(this).hasClass("typeahead"))
    {
      event.preventDefault();
      $(this).typeahead('close');
      return false;
    }
  }
};
