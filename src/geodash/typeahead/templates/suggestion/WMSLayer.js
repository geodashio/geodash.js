module.exports = function(data)
{
  return '<p><img src="'+data.extra.thumbnail+'" width="40" height="40" style="margin-right: 4px;"><strong>' + data.text + '</strong><br><span style="color:#999;">Keywords:</span> <span style="color:#00C;">' + extract('obj.metadata.keywords', data, []).sort().join(", ") + '</span></p>';
};
