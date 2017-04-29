module.exports = function(options)
{
  var strength = extract("strength", options, -10);
  var minDistance = extract("minDistance", options, 3);
  var maxDistance = extract("maxDistance", options, 25);

  var charge = d3.forceManyBody()
    .strength(strength)
    .distanceMin(minDistance)
    .distanceMax(maxDistance);

  return charge;
};
