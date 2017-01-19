var assert = require('assert');
var geodash = require("./../../geodash");

describe("Testing geodash.util.repeat(input, count)", function(){

  it("with -1 count", function(){
    assert.equal(geodash.util.repeat("a", -1), "");
  });

  it("with zero count", function(){
    assert.equal(geodash.util.repeat("a", 0), "");
  });

  it("with 1 count", function(){
    assert.equal(geodash.util.repeat("a", 1), "a");
  });

  it("with 2 counts", function(){
    assert.equal(geodash.util.repeat("a", 2), "aa");
  });

  it("with 3 counts", function(){
    assert.equal(geodash.util.repeat("a", 3), "aaa");
  });

});
