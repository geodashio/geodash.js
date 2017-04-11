var assert = require('assert');
var normalizeExtent = require("./extent");

describe("Testing geodash.normalize.extent(extent, options)", function(){

  var y = [1,2,3,4];

  it("with string", function(){
    var x = normalizeExtent("1,2,3,4");
    assert.deepEqual(x, y);
  });

  it("with array", function(){
    var x = normalizeExtent([1,2,3,4]);
    assert.deepEqual(x, y);
  });

  it("with blank string", function(){
    var x = normalizeExtent("");
    assert.equal(x, undefined);
  });

});
