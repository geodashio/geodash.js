module.exports = function()
{
  $("[data-geodash-dashboard-name]").each(function(){
    var that = $(this);
    var name = that.attr("data-geodash-dashboard-name");
    geodash.init.dashboard(name, that);
  });
};
