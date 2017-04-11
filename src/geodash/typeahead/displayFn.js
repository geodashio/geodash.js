module.exports = function(data)
{
  return geodash.util.isString(data) ? data : (data.text || data.id);  // Order is critically important to have dataset.engine.get work
};
