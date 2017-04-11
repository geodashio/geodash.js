var assert = require('assert');
var formatInteger = require("./formatInteger");

describe("Testing geodash.codec.formatInteger(value, type, delimiter)", function(){

  var y = 'display: block; color: blue;';

  it("with delimited by space", function(){
    assert.equal(formatInteger(1000000, 'delimited', ' '), '1 000 000');
  });

  it("with delimited by explicit comma", function(){
    assert.equal(formatInteger(1000000, 'delimited', ','), '1,000,000');
  });

  it("with delimited by inferred comma", function(){
    assert.equal(formatInteger(1000000, 'delimited'), '1,000,000');
  });

  it("with not delimited", function(){
    assert.equal(formatInteger(1000000), '1000000');
  });

  it("with undefined", function(){
    assert.equal(formatInteger(undefined), "");
  });

  it("with blank string", function(){
    assert.equal(formatInteger(""), "");
  });

});
