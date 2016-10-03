module.exports = function(data)
{
  return angular.isString(data) ? data : (data.text || data.id);  // Order is critically important to have dataset.engine.get work
};
