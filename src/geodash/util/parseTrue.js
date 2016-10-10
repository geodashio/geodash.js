/**
 * Checks if a value "means" true.
 *
 * @function parseTrue
 * @param {(boolean|int|string)} value - The original value
 * @return {boolean} whether the value means true
 * @memberof geodash.api
 *
 * @example
 * true == geodash.util.parseTrue('on');
 * true == geodash.util.parseTrue('true');
 * true == geodash.util.parseTrue('t');
 * true == geodash.util.parseTrue('1');
 * true == geodash.util.parseTrue(1);
 * true == geodash.util.parseTrue(true);
 */

module.exports = function(value)
{
  return ['on', 'true', 't', '1', 1, true].indexOf(value) != -1;
};
