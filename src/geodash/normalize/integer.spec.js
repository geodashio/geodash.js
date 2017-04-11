var assert = require('assert');
var normalizeInteger = require("./integer");

describe("Testing geodash.normalize.integer(x, fallback)", function(){

  var y = 5;

  it("with string", function(){
    assert.equal(normalizeInteger("5"), y);
  });

  it("with integer", function(){
    assert.equal(normalizeInteger(5), y);
  });

  it("with blank string", function(){
    assert.equal(normalizeInteger("", 5), y);
  });

  it("with array", function(){
    assert.equal(normalizeInteger([1, 2, 3], 5), y);
  });

});
