module.exports = function(element, newValue)
{
  if(geodash.util.isDefined(element))
  {
    var input_id = $(element).attr('data-target-input-id');
    if(angular.isString(input_id))
    {
      var input_element = $('#'+input_id);
      if(input_element.length > 0)
      {
        if(geodash.util.isDefined(newValue) && newValue != null)
        {
          if(angular.isString(newValue))
          {
            input_element.val(newValue)
              .trigger('input')
              .change();

            if(input_element.hasClass("typeahead"))
            {
              input_element.trigger('typeahead:change');
            }
          }
          else
          {
            input_element.val(JSON.stringify(newValue))
              .trigger('input')
              .change();

            if(input_element.hasClass("typeahead"))
            {
              input_element.trigger('typeahead:change');
            }
          }
        }
        else
        {
          input_element.val(null)
            .trigger('input')
            .change();

          if(input_element.hasClass("typeahead"))
          {
            input_element.trigger('typeahead:change');
          }
        }
      }
    }
  }
};
