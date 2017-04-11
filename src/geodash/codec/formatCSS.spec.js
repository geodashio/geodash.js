var assert = require('assert');
var formatCSS = require("./formatCSS");

describe("Testing geodash.codec.formatCSS(x)", function(){

  var y = 'display: block; color: blue;';

  it("with object", function(){
    assert.equal(formatCSS({'display': 'block', 'color': 'blue'}), y);
  });

  it("with array", function(){
    assert.equal(formatCSS([{'name': 'display', 'value': 'block'},{'name': 'color', 'value': 'blue'}]), y);
  });

  it("with undefined", function(){
    assert.equal(formatCSS(undefined), "");
  });

});
