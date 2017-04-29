module.exports = function(d)
{
  var title = (
    extract("obj.verbose_plural", d) ||
    extract("obj.verbose_singular", d) ||
    extract("obj.title", d) ||
    extract("obj.username", d)
  );

  if(! geodash.util.isDefined(title))
  {
    var attributes = geodash.util.arrayToObject(extract("obj.attributes", d, {}));
    title = (
      extract("name", attributes) ||
      extract("title", attributes) ||
      extract("label", attributes)
    );
  }

  if(! geodash.util.isDefined(title))
  {
    title = extract("id", d);
  }
  return title;
};
