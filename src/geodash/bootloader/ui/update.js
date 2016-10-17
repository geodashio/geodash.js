module.exports = function(options)
{
  var element = extract("element", options);
  var steps = extract("steps", options);

  for(var i = 0; i < steps.length; i++)
  {
    var step = steps[i];
    if(angular.isDefined(step.status))
    {
      var row = $(".geodash-bootloader-step-"+step.id, element);
      if(row.length > 0)
      {
        geodash.bootloader.ui.updateRow({ "element": element, "step": step, "row": row });
      }
      else
      {
        geodash.bootloader.ui.addRow({ "element": element, "step": step });
      }
    }
  }
};
