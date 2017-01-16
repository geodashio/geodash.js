module.exports = function(options)
{
  var row = extract("row", options);
  var step = extract("step", options);

  if(step.status == "complete")
  {
    var i =
    $(".geodash-bootloader-status i", row)
      .addClass("fa fa-check")
      .removeClass("fa-refresh fa-spin");
  }
  else if(step.status == "pending")
  {
    $(".geodash-bootloader-status i", row)
      .addClass("fa fa-refresh fa-spin")
      .removeClass("fa-minus");
  }
  else if(step.status == "waiting")
  {
    $(".geodash-bootloader-status i", row)
      .addClass("fa fa-minus")
      .removeClass("fa-refresh fa-spin");
  }
  else if(step.status == "error")
  {
    $(".geodash-bootloader-status i", row)
      .css({ "color": "red" })
      .addClass("fa fa-exclamation-triangle")
      .removeClass("fa-minus fa-refresh fa-spin");
  }

  if(angular.isString(step.message) && step.message.length > 0)
  {
    $(".geodash-bootloader-status i", row)
      .attr({
        "data-toggle": "tooltip",
        "data-placement": "bottom",
        "title": step.message
      })
      .tooltip();
  }
  else
  {
    $(".geodash-bootloader-status i", row)
      .removeAttr("data-toggle")
      .removeAttr("data-placement")
      .removeAttr("title");
  }

  if(angular.isString(step.link) && step.link.length > 0)
  {
    $(".geodash-bootloader-status a", row).attr({
        "href": step.link,
        "target": "_blank"
    })
  }
  else
  {
    $(".geodash-bootloader-status a", row)
      .removeAttr("href")
      .removeAttr("target")
  }
};
