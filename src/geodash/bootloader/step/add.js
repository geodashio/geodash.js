module.exports = function(options)
{
  var element = extract("element", options);
  var steps = extract("steps", options);
  var newStep = extract("newStep", options);

  steps.push(newStep);

  geodash.bootloader.ui.update({ "element": element, "steps": steps });

  return steps;
};
