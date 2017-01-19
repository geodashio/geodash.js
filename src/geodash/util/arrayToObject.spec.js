var assert = require('assert');
var geodash = require("./../../geodash");

describe("Testing geodash.util.arrayToObject(x, options)", function(){

  var y = {'x': 'y', 'q': 'r'};

  it("with object", function(){
    assert.deepEqual(geodash.util.arrayToObject([{'name': 'x', 'value': 'y'}, {'name': 'q', 'value': 'r'}]), y);
  });

});
