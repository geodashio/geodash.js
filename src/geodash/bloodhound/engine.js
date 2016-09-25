module.exports = function(options)
{
  var engine = new Bloodhound({
    identify: geodash.bloodhound.identify,
    datumTokenizer: geodash.bloodhound.datumTokenizer,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: extract('local', options),
    prefetch: extract('prefetch', options),
    remote: extract('remote', options)
  });

  return engine;
};
