var assert = require('assert');
var geodash = require("./../../geodash");

describe("Testing geodash.util.formatCSS(x)", function(){

  var fn = geodash.codec.formatCSS;

  var y = 'display: block; color: blue;';

  it("with object", function(){
    assert.equal(fn({'display': 'block', 'color': 'blue'}), y);
  });

  it("with array", function(){
    assert.equal(fn([{'name': 'display', 'value': 'block'},{'name': 'color', 'value': 'blue'}]), y);
  });

  it("with undefined", function(){
    assert.equal(fn(undefined), "");
  });

});
