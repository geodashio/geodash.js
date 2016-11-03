module.exports = function(options)
{
  var duration = extract("duration", options, 2000);
  var start = extract("start", options, +new Date());
  var view = extract("view", options);

  return ol.animation.bounce({
    duration: duration,
    start: start,
    resolution: 4 * view.getResolution()
  });
};
