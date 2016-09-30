module.exports = function(element, newValue)
{
  if(angular.isDefined(element))
  {
    var tab_id_template = $(element).attr('data-target-tab-id')
    if(angular.isString(tab_id_template))
    {
      var tab_id = tab_id_template.replace("###value###", newValue);
      if(angular.isString(tab_id))
      {
        var tab_element = $('#'+tab_id);
        var tab_content = tab_element.parents(".tab-content:first");
        $(".tab-pane", tab_content).removeClass("in active");
        tab_element.addClass("in active");
      }
    }
  }
};
