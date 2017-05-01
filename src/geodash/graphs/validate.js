module.exports = function(group_filters, entity)
{
  var valid = true;
  var values = {
    "property": extract("obj", entity, {}),
    "address": geodash.util.arrayToObject(extract("obj.address", entity, {})),
    "attribute": geodash.util.arrayToObject(extract("obj.attributes", entity, {}))
  };
  for(var j = 0; j < group_filters.length; j++)
  {
    var f = group_filters[j];
    var fn = extract("fn", f, "equals").toLowerCase();
    var value = extract([f["type"], f["name"]], values);
    if(fn == "collectioncontains")
    {
      if(Array.isArray(value))
      {
        if(value.indexOf(f["value"]) == -1)
        {
          valid = false;
          break;
        }
      }
      else
      {
        valid = false;
        break;
      }
    }
    else
    {
      if(value != f["value"])
      {
        valid = false;
        break;
      }
    }
  }
  return valid;
};
