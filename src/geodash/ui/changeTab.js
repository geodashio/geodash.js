module.exports = function(element, newValue)
{
  if(geodash.util.isDefined(element))
  {
    var tab_id_template = $(element).attr('data-target-tab-id')
    if(geodash.util.isString(tab_id_template))
    {
      var tab_id = tab_id_template.replace("###value###", newValue);
      if(geodash.util.isString(tab_id))
      {
        var tab_element = $('#'+tab_id);
        var tab_content = tab_element.parents(".tab-content:first");
        $(".tab-pane", tab_content).removeClass("in active");
        tab_element.addClass("in active");
      }
    }
  }
};
