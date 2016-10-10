module.exports = function(f, state, dashboard, options)
{
  var idx = parseInt(f.id_.split(".")[1], 10);
  var colors = [
    '#ADD8E6',  // 'lightBlue',
    '#FF7F50', // 'coral',
    '#FF8C00', // 'darkOrange',
    '#FF1493', // 'deepPink',
    '#008000', // 'green',
    '#4B0082', // 'indigo'
  ];
  var delta = {
    'fillColor': colors[idx % colors.length],
    'fillOpacity': (6 + (idx % 5)) * 0.10
  };
  return delta;
};
