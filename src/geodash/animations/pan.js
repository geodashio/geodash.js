module.exports = function(options)
{
  var duration = extract("duration", options, 2000);
  var start = extract("start", options, +new Date());
  var view = extract("view", options);

  return ol.animation.pan({
    duration: duration,
    start: start,
    source: view.getCenter()
  });
};
