module.exports = function(response, url)
{
  var encoded = [];

  var dashboards = response.dashboards;
  for(var i = 0; i < dashboards.length; i++)
  {
    var dashboard = dashboards[i];
    var id = dashboard.id;
    var slug = dashboard.slug;
    var title = dashboard.title;
    var x = {
      'id': id,
      'slug': slug,
      'text': title,
    };
    encoded.push(x);
  }

  return encoded;
};
