module.exports = function(options)
{
  var element = extract("element", options);
  var steps = extract("steps", options);
  var id = extract("id", options);
  var status = extract("status", options);

  steps = $.map(steps, function(x){
    if(x.id == id)
    {
      x.status = status;
    }
    return x;
  })

  geodash.bootloader.ui.update({ "element": element, "steps": steps });

  return steps;
};
