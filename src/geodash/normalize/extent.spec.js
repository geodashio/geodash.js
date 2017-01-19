var assert = require('assert');
var geodash = require("./../../geodash");

describe("Testing geodash.normalize.extent(extent, options)", function(){

  var y = [1,2,3,4];

  it("with string", function(){
    var x = geodash.normalize.extent("1,2,3,4");
    assert.deepEqual(x, y);
  });

  it("with array", function(){
    var x = geodash.normalize.extent([1,2,3,4]);
    assert.deepEqual(x, y);
  });

  it("with blank string", function(){
    var x = geodash.normalize.extent("");
    assert.equal(x, undefined);
  });

});
