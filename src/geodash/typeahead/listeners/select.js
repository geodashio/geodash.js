module.exports = function(event, obj) {
  console.log("Select Event: ", event, obj);
  //
  var resultIndex = $(this).attr('data-search-output')|| 'id';
  var newValue = extract(resultIndex, obj, null);

  geodash.ui.saveToInput(this, newValue);
  geodash.ui.saveToScope(this, newValue);
};
