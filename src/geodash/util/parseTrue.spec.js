var assert = require('assert');
var geodash = require("./../../geodash");

describe("Testing geodash.util.parseTrue(value)", function(){

  //['on', 'true', 't', '1', 1, true]

  var y = true;

  it("with string 'on'", function(){
    assert.equal(geodash.util.parseTrue('on'), true);
  });

  it("with string 'true'", function(){
    assert.equal(geodash.util.parseTrue('true'), true);
  });

  it("with string 't'", function(){
    assert.equal(geodash.util.parseTrue('t'), true);
  });

  it("with string '1'", function(){
    assert.equal(geodash.util.parseTrue('1'), true);
  });

  it("with int 1", function(){
    assert.equal(geodash.util.parseTrue(1), true);
  });

  it("with boolean true", function(){
    assert.equal(geodash.util.parseTrue(true), true);
  });

  it("with boolean false", function(){
    assert.equal(geodash.util.parseTrue(false), false);
  });

});
