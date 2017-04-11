var assert = require('assert');
var formatArray = require("./formatArray");

describe("Testing geodash.codec.formatArray(path, obj, fallback)", function(){

  var y = 'x,y,z';

  it("with string keyChain", function(){
    assert.equal(formatArray("a.b", {'a':{'b': ['x','y','z']}}, undefined), y);
  });

  it("with array keyChain", function(){
    assert.equal(formatArray(['a', 'b'], {'a':{'b': ['x','y','z']}}, undefined), y);
  });

});
