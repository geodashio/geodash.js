module.exports = function(event, value)
{
  console.log("Keyup Event: ", event, value);
  if(event.which == 40)
  {
    geodash.ui.showOptions(this);
  }
  return true;
};
