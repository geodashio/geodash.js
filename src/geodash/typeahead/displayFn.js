module.exports = function(data)
{
  return data.text || data.id;  // Order is critically important to have dataset.engine.get work
};
