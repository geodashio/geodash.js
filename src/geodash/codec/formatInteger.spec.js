var assert = require('assert');
var geodash = require("./../../geodash");

describe("Testing geodash.util.formatInteger(value, type, delimiter)", function(){

  var fn = geodash.codec.formatInteger;

  var y = 'display: block; color: blue;';

  it("with delimited by space", function(){
    assert.equal(fn(1000000, 'delimited', ' '), '1 000 000');
  });

  it("with delimited by explicit comma", function(){
    assert.equal(fn(1000000, 'delimited', ','), '1,000,000');
  });

  it("with delimited by inferred comma", function(){
    assert.equal(fn(1000000, 'delimited'), '1,000,000');
  });

  it("with not delimited", function(){
    assert.equal(fn(1000000), '1000000');
  });

  it("with undefined", function(){
    assert.equal(fn(undefined), "");
  });

  it("with blank string", function(){
    assert.equal(fn(""), "");
  });

});
