module.exports = function(options)
{
  var bloodhoundData = [];

  var images = options.images || geodash.api.listImages();
  if(Array.isArray(images))
  {
    bloodhoundData = bloodhoundData.concat($.map(images, function(x, i){
      return {
        'id': (x.id || x.name),
        'text': (x.title || x.name || x.id),
        'obj': x
      };
    }));
  }

  return bloodhoundData;
};
