module.exports = function(feature)
{
  return {
    'attributes': feature.attributes || feature.properties,
    'geometry': feature.geometry
  };
};
