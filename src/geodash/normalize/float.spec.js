var assert = require('assert');
var normalizeFloat = require("./float");

describe("Testing geodash.normalize.float(x, fallback)", function(){

  var y = 5.0;

  it("with string", function(){
    assert.equal(normalizeFloat("5"), y);
  });

  it("with float", function(){
    assert.equal(normalizeFloat(5.0), y);
  });

  it("with blank string", function(){
    assert.equal(normalizeFloat("", 5.0), y);
  });

  it("with array", function(){
    assert.equal(normalizeFloat([1, 2, 3], 5.0), y);
  });

});
