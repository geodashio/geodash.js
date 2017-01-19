var assert = require('assert');
var geodash = require("./../../geodash");

describe("Testing geodash.normalize.integer(x, fallback)", function(){

  var y = 5;

  it("with string", function(){
    assert.equal(geodash.normalize.integer("5"), y);
  });

  it("with integer", function(){
    assert.equal(geodash.normalize.integer(5), y);
  });

  it("with blank string", function(){
    assert.equal(geodash.normalize.integer("", 5), y);
  });

  it("with array", function(){
    assert.equal(geodash.normalize.integer([1, 2, 3], 5), y);
  });

});
