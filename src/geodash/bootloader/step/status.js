module.exports = function(options)
{
  var element = extract("element", options);
  var steps = extract("steps", options);
  var id = extract("id", options);
  var status = extract("status", options);
  var message = extract("message", options);
  var link = extract("link", options);

  steps = $.map(steps, function(x){
    if(x.id == id)
    {
      x.status = status;
      x.message = message || "";
      x.link = link || "";
    }
    return x;
  })

  geodash.bootloader.ui.update({ "element": element, "steps": steps });

  return steps;
};
