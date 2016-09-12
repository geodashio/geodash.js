module.exports = function (query, syncFn, asyncFn)
{
  // https://github.com/twitter/typeahead.js/pull/719#issuecomment-43083651
  // http://pastebin.com/adWHFupF
  //query == "" ? cb(data) : engine.ttAdapter()(query, cb);
  var search = geodash.codec.parseSearch(query);

  var filters = [];

  this.engine.ttAdapter()(
    search.free,
    filterByKeyWord,
    asyncFn,
    filters);
};
