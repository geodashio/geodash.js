module.exports = function(options)
{
  // http://openlayers.org/en/latest/apidoc/ol.source.Vector.html
  var source = undefined;

  var fid = extract("fid", options);
  var features = extract("features", options);
  var url = extract("url", options);
  var strategy_name = extract("strategy", options, "all");
  var projection = extract("projection", options, "EPSG:4326");

  if(geodash.util.isDefined(features))
  {
    // For discussion on handling projections, see
    // http://stackoverflow.com/questions/32455040/how-to-specify-the-projection-for-geojson-in-openlayers3
    var geojsondata = {
      'type': 'FeatureCollection',
      'crs': {
        'type': 'name',
        'properties': { 'name': 'EPSG:4326' }
      },
      'features': features
    };
    source = new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(geojsondata, {
        dataProjection: projection,
        featureProjection: "EPSG:3857"
      })
    });
  }
  else if(geodash.util.isDefined(url))
  {
    var strategy = extract(strategy_name, ol.loadingstrategy, undefined);
    if(geodash.util.isDefined(strategy))
    {
      source = new ol.source.Vector({
        url: (function(baseurl){
          return function(extent, resolution, projection) {
            var url = ""+baseurl;
            var bbox = "";
            if(geodash.util.isDefined(extent) && geodash.util.isDefined(projection))
            {
              bbox = geodash.normalize.extent(extent, {
                sourceProjection: projection,
                targetProjection: "EPSG:4326"
              });
              //bbox = ol.proj.transformExtent(extent, projection, "EPSG:4326");
              //return url + (url.indexOf("?") == -1 ? "?" : "&") + "bbox="+bbox.join(",");
              url = url.replace(new RegExp("{bbox}", 'g'), bbox.join(","));
            }
            else
            {
              //url = url.replace("{bbox}", "");
              url = url.replace(new RegExp("{bbox}", 'g'), "");
            }
            // pageview_token is globally set in header
            if(typeof PAGEVIEW_TOKEN != "undefined")
            {
              url = url.replace(new RegExp("{token}", 'g'), PAGEVIEW_TOKEN);
            }
            return url;
          };
        })(url),
        projection: projection,
        format: new ol.format.GeoJSON(),
        strategy: strategy
      });
    }
    else
    {
      source = new ol.source.Vector({
        url: url,
        projection: projection,
        format: new ol.format.GeoJSON(),
      });
    }
  }
  else
  {
    source = new ol.source.Vector({
      features: []
    });
  }

  if(geodash.util.isDefined(fid))
  {
    source.set("fid", fid);
  }

  return source;
};
