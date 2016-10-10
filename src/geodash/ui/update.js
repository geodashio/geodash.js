/**
 * Updates the elements user interface
 *
 * @function update
 * @param {(String|Object)} element - The DOM element or it's id
 * @param {(String)} tab - The id of the tab to show, if applicable.
 * @memberof geodash.ui
 */

module.exports = function(element, tab)
{
  var id = angular.isString(element) ? element : $(element).attr("id");
  element = angular.isString(element) ? $("#"+id) : element;

  var $scope = geodash.util.getScope(id);

  $('[data-toggle="tooltip"]', element).tooltip();

  geodash.init.typeahead(
    element,
    extract('workspace.config.featurelayers', $scope),
    extract('workspace.config.baselayers', $scope),
    extract('workspace.config.servers', $scope)
  );

  var tab_element = $('a[href="#'+tab+'"]');
  tab_element.parents("nav-tabs:first").find("li").removeClass("active");
  tab_element.parents("li:first").addClass("active");

  var pane_element = $('#'+tab);
  var tab_content = pane_element.parents(".tab-content:first");
  $(".tab-pane", tab_content).removeClass("in active");
  pane_element.addClass("in active");
};
