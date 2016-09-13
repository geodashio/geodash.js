module.exports = function(f, state, map_config, options)
{
  var idx = parseInt(f.id_.split(".")[1],10);
  var colors = [
    'lightBlue',
    'coral',
    'darkOrange',
    'deepPink',
    'green',
    'indigo'
  ];
  var delta = {
    'fillColor': colors[idx % colors.length]
  };
  return delta;
};
