module.exports = function(options)
{
  var element = extract("element", options);
  var step = extract("step", options);

  var heading = extract("config.bootloader.ui.heading", geodash, "h5");
  var fontSize = extract("config.bootloader.ui.fontSize", geodash, "2rem");
  var padding = extract("config.bootloader.ui.padding", geodash, "8px");

  var html_margin = "<div class=\"col-md-2\"></div>";
  var html_label = "<div class=\"col-md-4\"><"+heading+">"+step.label+"</"+heading+"></div>";
  var html_status = "";

  if(step.status == "complete")
  {
    html_status = "<div class=\"col-md-4 geodash-bootloader-status\"><a><i class=\"fa fa-check\" style=\"font-size: "+fontSize+";\"></i></a></div>";
  }
  else if(step.status == "pending")
  {
    html_status = "<div class=\"col-md-4 geodash-bootloader-status\"><a><i class=\"fa fa-refresh fa-spin\" style=\"font-size: "+fontSize+";\"></i></a></div>";
  }
  else if(step.status == "waiting")
  {
    html_status = "<div class=\"col-md-4 geodash-bootloader-status\"><a><i class=\"fa fa-minus\" style=\"font-size: "+fontSize+";\"></i></a></div>";
  }

  var html = "<div class=\"row geodash-bootloader-step geodash-bootloader-step-"+step.id+"\" style=\"padding:"+padding+";\">"+html_margin+html_label+html_status+html_margin+"</div>";
  element.append(html);
};
