module.exports = function(x)
{
  if(geodash.util.isString(x) && x.length > 0 )
  {
    // https://github.com/angular/angular.js/blob/master/src/ng/filter/filters.js#L581
    var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
    if ((match = x.match(R_ISO8601_STR))) {
      var date = new Date(0),
          tzHour = 0,
          tzMin  = 0,
          dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear,
          timeSetter = match[8] ? date.setUTCHours : date.setHours;

      if (match[9]) {
        tzHour = parseInt(match[9] + match[10], 10);
        tzMin = parseInt(match[9] + match[11], 10);
      }
      dateSetter.call(date, parseInt(match[1], 10), parseInt(match[2], 10) - 1, parseInt(match[3], 10));
      var h = parseInt(match[4] || 0, 10) - tzHour;
      var m = parseInt(match[5] || 0, 10) - tzMin;
      var s = parseInt(match[6] || 0, 10);
      var ms = Math.round(parseFloat('0.' + (match[7] || 0)) * 1000);
      timeSetter.call(date, h, m, s, ms);
      return date;
    }
    else
    {
      return undefined;
    }
  }
  else if(geodash.util.isDate(x))
  {
    return x;
  }
  else
  {
    return undefined;
  }
};
