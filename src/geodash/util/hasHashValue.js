module.exports = function(keys)
{
    var value = geodash.util.getHashValue(keys);
    return value != undefined && value != null && value != "";
};
