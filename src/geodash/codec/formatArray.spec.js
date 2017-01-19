var assert = require('assert');
var geodash = require("./../../geodash");

describe("Testing geodash.util.formatArray(path, obj, fallback)", function(){

  var fn = geodash.codec.formatArray;

  var y = 'x,y,z';

  it("with string keyChain", function(){
    assert.equal(fn("a.b", {'a':{'b': ['x','y','z']}}, undefined), y);
  });

  it("with array keyChain", function(){
    assert.equal(fn(['a', 'b'], {'a':{'b': ['x','y','z']}}, undefined), y);
  });

});
