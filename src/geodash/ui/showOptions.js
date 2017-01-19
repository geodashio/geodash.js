module.exports = function(selector)
{
  try{
    var input = $(selector);
    if(geodash.util.isDefined(extract("ttTypeahead", input.data())))
    {
      if(! input.data('ttTypeahead').isOpen())
      {
        input.typeahead('open');
      }

      //var query = var x = datasets[i].engine.get(value);
      var query = input.val();
      var menu = input.data('ttTypeahead').menu;
      if(menu.getActiveSelectable() == null || menu.getActiveSelectable().length == 0)
      {
        menu.update.apply(menu, [query]);
        //menu will call .source(query, sync, async) for each dataset, so no need to cycle here.
      }
    }
  }catch(err){};
};
