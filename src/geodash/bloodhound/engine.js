module.exports = function(local, prefetch, remote)
{
  var options = {
    identify: geodash.bloodhound.identify,
    datumTokenizer: geodash.bloodhound.datumTokenizer,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: local,
    prefetch: prefetch,
    remote: remote
  };
  var engine = new Bloodhound(options);
  return engine;
};
