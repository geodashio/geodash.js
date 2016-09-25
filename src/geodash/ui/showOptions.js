module.exports = function(selector)
{
  try{
    var input = $(selector);
    input.typeahead('open');
    input.data('ttTypeahead').menu.update.apply(input.data('ttTypeahead').menu, [""]);
    var engine = input.data('engine');
    engine.search.apply(engine, [""])
  }catch(err){};
};
