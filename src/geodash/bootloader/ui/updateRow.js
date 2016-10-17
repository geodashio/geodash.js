module.exports = function(options)
{
  var row = extract("row", options);
  var step = extract("step", options);

  if(step.status == "complete")
  {
    $(".geodash-bootloader-status i", row).addClass("fa fa-check");
    $(".geodash-bootloader-status i", row).removeClass("fa-refresh fa-spin");
  }
  else if(step.status == "pending")
  {
    $(".geodash-bootloader-status i", row).addClass("fa fa-refresh fa-spin");
    $(".geodash-bootloader-status i", row).removeClass("fa-minus");
  }
  else if(step.status == "waiting")
  {
    $(".geodash-bootloader-status i", row).addClass("fa fa-minus");
    $(".geodash-bootloader-status i", row).removeClass("fa-refresh fa-spin");
  }
  else if(step.status == "error")
  {
    $(".geodash-bootloader-status i", row).css({ "color": "red" });
    $(".geodash-bootloader-status i", row).addClass("fa fa-exclamation-triangle");
    $(".geodash-bootloader-status i", row).removeClass("fa-minus fa-refresh fa-spin");
  }
};
