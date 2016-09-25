/**
 * Checks if a value "means" true.
 *
 * @function parseTrue
 * @param {(boolean|int|string)} value - The original value
 * @return {boolean} whether the value means true
 * @memberof geodash.api
 *
 * @example
 * true == geodash.api.parseTrue('on');
 * true == geodash.api.parseTrue('true');
 * true == geodash.api.parseTrue('t');
 * true == geodash.api.parseTrue('1');
 * true == geodash.api.parseTrue(1);
 * true == geodash.api.parseTrue(true);
 */

module.exports = function(value)
{
  return ['on', 'true', 't', '1', 1, true].indexOf(value) != -1;
};
