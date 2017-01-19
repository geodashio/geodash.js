var assert = require('assert');
var geodash = require("./../../geodash");

describe("Testing geodash.normalize.float(x, fallback)", function(){

  var y = 5.0;

  it("with string", function(){
    assert.equal(geodash.normalize.float("5"), y);
  });

  it("with float", function(){
    assert.equal(geodash.normalize.float(5.0), y);
  });

  it("with blank string", function(){
    assert.equal(geodash.normalize.float("", 5.0), y);
  });

  it("with array", function(){
    assert.equal(geodash.normalize.float([1, 2, 3], 5.0), y);
  });

});
