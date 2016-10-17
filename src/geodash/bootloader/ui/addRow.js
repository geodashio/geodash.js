module.exports = function(options)
{
  var element = extract("element", options);
  var step = extract("step", options);

  var html_margin = "<div class=\"col-md-2\"></div>";
  var html_label = "<div class=\"col-md-4\"><h4>"+step.label+"</h4></div>";
  var html_status = "";

  if(step.status == "complete")
  {
    html_status = "<div class=\"col-md-4 geodash-bootloader-status\"><i class=\"fa fa-check\" style=\"font-size: 3rem;\"></i></div>";
  }
  else if(step.status == "pending")
  {
    html_status = "<div class=\"col-md-4 geodash-bootloader-status\"><i class=\"fa fa-refresh fa-spin\" style=\"font-size: 3rem;\"></i></div>";
  }
  else if(step.status == "waiting")
  {
    html_status = "<div class=\"col-md-4 geodash-bootloader-status\"><i class=\"fa fa-minus\" style=\"font-size: 3rem;\"></i></div>";
  }

  var html = "<div class=\"row geodash-bootloader-step geodash-bootloader-step-"+step.id+"\" style=\"padding:10px;\">"+html_margin+html_label+html_status+html_margin+"</div>";
  element.append(html);
};
