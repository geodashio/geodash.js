module.exports = function (query, syncResults, asyncResults)
{
  // https://github.com/twitter/typeahead.js/pull/719#issuecomment-43083651
  // http://pastebin.com/adWHFupF
  //query == "" ? cb(data) : engine.ttAdapter()(query, cb);
  var search = geodash.codec.parseSearch(query);
  this.engine.ttAdapter()(search.free, syncResults, asyncResults);
};
