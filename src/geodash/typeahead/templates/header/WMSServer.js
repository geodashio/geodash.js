module.exports = function(server)
{
  return '<p style="margin: 0 20px 5px 20px; padding: 3px 0; border-bottom: 1px solid #ccc;"><span class="h3" style="margin-right: 10px;">'+ extract('title' || 'id', server, "") +'</span><span style="color:#999;">' + geodash.codec.parseURL(extract('wms.url', server), 'wms').domain + '</span></p>';
};
