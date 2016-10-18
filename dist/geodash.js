(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(id, layer)
{
  geodash.var.baselayers[id] = layer;
};

},{}],2:[function(require,module,exports){
module.exports = function(id, layer)
{
  geodash.var.featurelayers[id] = layer;
};

},{}],3:[function(require,module,exports){

/**
 * Builds a new [AngularJS](https://angularjs.org/) [scope](https://docs.angularjs.org/guide/scope) for a object.
 *
 * @function buildScope
 * @param {Object} event - of objects with properties name and value
 * @param {Object} args - of objects with properties name and value
 * @return {Object} scope - object new scope
 * @memberof geodash.api
 * @see https://docs.angularjs.org/guide/scope
 */

module.exports = function(event, args)
{
  var mainScope = geodash.util.getScope("geodash-main");
  //
  var id = args["id_target"] || args["id_show"] || args["id"];
  var sourceScope = event.targetScope;
  var scope_new = {
    "state": mainScope.state,
    "meta": geodash.meta
  };
  if(angular.isDefined(args))
  {
    if("static" in args)
    {
      scope_new = $.extend(scope_new, args["static"]);
    }
    if("dynamic" in args)
    {
      $.each(args["dynamic"],function(key, value){
        if(angular.isString(value))
        {
          if(value == "dashboard")
          {
            scope_new[key] = mainScope.dashboard;
          }
          else if(value == "state")
          {
            scope_new[key] = mainScope.state;
          }
        }
        else if(angular.isArray(value))
        {
          var value_0_lc = value[0].toLowerCase();
          if(value_0_lc == "source")
          {
            scope_new[key] = extract(expand(value.slice(1)), event.targetScope);
          }
          else if(value_0_lc == "baselayer" || value_0_lc == "bl")
          {
              scope_new[key] = geodash.api.getBaseLayer(value[1]) || undefined;
          }
          else if(value_0_lc == "featurelayer" || value_0_lc == "fl")
          {
              scope_new[key] = geodash.api.getFeatureLayer(value[1]) || undefined;
          }
          else
          {
            if(value_0_lc == "dashboard")
            {
              scope_new[key] = extract(expand(value.slice(1)), mainScope.dashboard);
            }
            else if(value_0_lc == "state")
            {
              scope_new[key] = extract(expand(value.slice(1)), mainScope.state);
            }
          }
        }
        else
        {
          scope_new[key] = value;
        }
      });
    }
  }
  return $.extend(true, {}, scope_new);  // Returns a deep copy of variables
};

},{}],4:[function(require,module,exports){
/**
 * Gets an asset by id from the GeoDash dashboard config
 *
 * @function getAsset
 * @return {(string)} id - ID of the asset
 * @param {(Object)} options - Options
 * @memberof geodash.api
 *
 * @example <caption>Basic</caption>
 * var asset = geodash.api.getAsset("logo");
 *
 * @example <caption>With Options</caption>
 * var asset = geodash.api.getAsset("logo", {"scope": "geodash-main"});
 */

module.exports = function(id, options)
{
  var config = geodash.api.getDashboardConfig(options);
  return geodash.util.getByID(id, config.assets);
};

},{}],5:[function(require,module,exports){
/**
 * Gets a base layer by id from the GeoDash dashboard config
 *
 * @function getBaseLayer
 * @return {(string)} id - ID of the base layer
 * @param {(Object)} options - Options
 * @memberof geodash.api
 *
 * @example <caption>Basic</caption>
 * var bl = geodash.api.getBaseLayer("osm");
 *
 * @example <caption>With Options</caption>
 * var bl = geodash.api.getBaseLayer("osm", {"scope": "geodash-main"});
 */

module.exports = function(id, options)
{
  var config = geodash.api.getDashboardConfig(options);
  return geodash.util.getByID(id, config.baselayers);
};

},{}],6:[function(require,module,exports){
module.exports = function(options)
{
  var scope = extract("$scope", options) || extract("scope", options) || geodash.util.getScope("geodash-main");
  return scope.dashboard;
};

},{}],7:[function(require,module,exports){
/**
 * Gets an API url ednpoint from a dashboard config by id
 *
 * @function getEndpoint
 * @param {(string)} id - The API endpoint id
 * @return {(string| undefined)} If found, returns API endpoint url.  If not found, returns undefined.
 * @memberof geodash.api
 *
 * @example <caption>Capabilities</caption>
 * var url = geodash.api.getEndpoint("geodash_capabilities_json");
 * url == "/api/capabilities"
 * @example <caption>Save</caption>
 * var payload = ...;
 * var url = $interpolate(geodash.api.getEndpoint('save'))({'slug': slug});
 * $http.post(url, payload, httpConfig).success(...
 */

module.exports = function(name)
{
  return extract("initial_data.data.endpoints."+name, geodash);
};

},{}],8:[function(require,module,exports){
/**
 * Gets a feature layer by id from the GeoDash dashboard config
 *
 * @function getFeatureLayer
 * @return {(string)} id - ID of the feature layer
 * @param {(Object)} options - Options
 * @memberof geodash.api
 *
 * @example <caption>Basic</caption>
 * var fl = geodash.api.getFeatureLayer("roads");
 *
 * @example <caption>With Options</caption>
 * var fl = geodash.api.getFeatureLayer("roads", {"scope": "geodash-main"});
 */

module.exports = function(id, options)
{
  var config = geodash.api.getDashboardConfig(options);
  return geodash.util.getByID(id, config.featurelayers);
};

},{}],9:[function(require,module,exports){
/**
 * Gets a page url from a dashboard config by id
 *
 * @function getPage
 * @param {(string)} id - The page id
 * @return {(string| undefined)} If found, returns page url.  If not found, returns undefined.
 * @memberof geodash.api
 *
 * @example <caption>Basic</caption>
 * var url = geodash.api.getPage('home');
 * // url == "/home"
 * @example <caption>With Slug</caption>
 * var url = geodash.api.getPage('dashboard');
 * // url == "/dashboard/{{ slug }}"
 */

module.exports = function(id, options)
{
  if(angular.isDefined(id))
  {
    var config = geodash.api.getDashboardConfig(options);
    var matches = $.grep(config.pages, function(x, i){return x.id == id;});
    if(matches.length == 1)
    {
      return matches[0]["url"];
    }
    else
    {
      return undefined;
    }
  }
  else
  {
    return undefined;
  }
};

},{}],10:[function(require,module,exports){
module.exports = function(options)
{
  var dashboard = extract("dashboard", options) || geodash.api.getDashboardConfig();
  var layerID = extract("fl.id", options) || extract("layerID", options) || extract("id", options);
  var reverse = extract("reverse", options, false);

  if(reverse)
  {
    return dashboard.renderlayers.length - $.inArray(layerID, dashboard.renderlayers);
  }
  else
  {
    return $.inArray(layerID, dashboard.renderlayers);
  }
};

},{}],11:[function(require,module,exports){
/**
 * Checks by id if the GeoDash dashboard config includes the base layer
 *
 * @function hasBaseLayer
 * @return {(string)} id - ID of the base layer
 * @param {(Object)} options - Options
 * @memberof geodash.api
 *
 * @example <caption>Basic</caption>
 * var bl = geodash.api.hasBaseLayer("osm");
 *
 * @example <caption>With Options</caption>
 * var bl = geodash.api.hasBaseLayer("osm", {"scope": "geodash-main"});
 */

module.exports = function(id, options)
{
  var config = geodash.api.getDashboardConfig(options);
  return geodash.api.hasLayer(id, config.baselayers);
};

},{}],12:[function(require,module,exports){
/**
 * Checks by id if the GeoDash dashboard config includes the feature layer
 *
 * @function hasFeatureLayer
 * @return {(string)} id - ID of the feature layer
 * @param {(Object)} options - Options
 * @memberof geodash.api
 *
 * @example <caption>Basic</caption>
 * var fl = geodash.api.hasFeatureLayer("roads");
 *
 * @example <caption>With Options</caption>
 * var fl = geodash.api.hasFeatureLayer("roads", {"scope": "geodash-main"});
 */

module.exports = function(id, options)
{
  var config = geodash.api.getDashboardConfig(options);
  return geodash.api.hasLayer(id, config.featurelayers);
};

},{}],13:[function(require,module,exports){
module.exports = function(id, layers)
{
  var layer = undefined;
  var matches = $.grep(layers, function(x, i){ return x.id == id; });
  return matches.length == 1;
};

},{}],14:[function(require,module,exports){
'use strict';

/**
 * Contains basic access functions and utility functions
 * @namespace api
 * @memberof geodash
 */

module.exports = {
  addBaseLayer: require("./addBaseLayer"),
  addFeatureLayer: require("./addFeatureLayer"),
  buildScope: require("./buildScope"),
  getAsset: require("./getAsset"),
  getBaseLayer: require("./getBaseLayer"),
  getDashboardConfig: require("./getDashboardConfig"),
  getEndpoint: require("./getEndpoint"),
  getFeatureLayer: require("./getFeatureLayer"),
  getPage: require("./getPage"),
  getRenderOrder: require("./getRenderOrder"),
  hasBaseLayer: require("./hasBaseLayer"),
  hasFeatureLayer: require("./hasFeatureLayer"),
  hasLayer: require("./hasLayer"),
  intend: require("./intend"),
  isVisible: require("./isVisible"),
  listBaseLayers: require("./listBaseLayers"),
  listFeatureLayers: require("./listFeatureLayers"),
  listImages: require("./listImages"),
  listServers: require("./listServers"),
  listTegolaServers: require("./listTegolaServers"),
  listWMSServers: require("./listWMSServers"),
  opt_b: require("./opt_b"),
  opt_i: require("./opt_i"),
  opt_j: require("./opt_j"),
  opt_s: require("./opt_s"),
  opt: require("./opt"),
  welcome: require("./welcome")
};

},{"./addBaseLayer":1,"./addFeatureLayer":2,"./buildScope":3,"./getAsset":4,"./getBaseLayer":5,"./getDashboardConfig":6,"./getEndpoint":7,"./getFeatureLayer":8,"./getPage":9,"./getRenderOrder":10,"./hasBaseLayer":11,"./hasFeatureLayer":12,"./hasLayer":13,"./intend":15,"./isVisible":16,"./listBaseLayers":17,"./listFeatureLayers":18,"./listImages":19,"./listServers":20,"./listTegolaServers":21,"./listWMSServers":22,"./opt":23,"./opt_b":24,"./opt_i":25,"./opt_j":26,"./opt_s":27,"./welcome":28}],15:[function(require,module,exports){
/**
 * Used for intents (requesting and action), such as opening modals, zooming the map, etc.
 * @param {string} name of the intent (toggleModal, refreshMap, filterChanged)
 * @param {object} JSON package for intent
 * @param {object} Angular Scope object for emiting the event up the DOM.  This should correspond to an element's paranet controller.
*/
module.exports = function(name, data, scope)
{
  scope.$emit(name, data);
};

},{}],16:[function(require,module,exports){
module.exports = function(options)
{
  var visible = false;

  var visibleFeatureLayers = extract("state.view.featurelayers", options);
  var fl = extract("fl", options);
  var layerID = extract("id", options) || extract("layerID", options);

  if(angular.isDefined(fl))
  {
    if($.inArray(layerID, visibleFeatureLayers) != -1)
    {
      visible = true;
    }
  }
  return visible;
}

},{}],17:[function(require,module,exports){
/**
 * Lists the baselayers in the GeoDash dashboard config
 *
 * @function listBaseLayers
 * @param {(Object)} options - The id of the element for the Angular Controller
 * @return {(Object[])} Returns as an array the list of base layers in the dashboard
 * @memberof geodash.api
 *
 * @example <caption>Basic</caption>
 * var baselayers = geodash.api.listBaseLayers();
 *
 * @example <caption>With Options</caption>
 * var baselayers = geodash.api.listBaseLayers({"scope": "geodash-main"});
 */

module.exports = function(options)
{
  var config = geodash.api.getDashboardConfig(options);
  return extract("baselayers", config, []);
};

},{}],18:[function(require,module,exports){
/**
 * Lists the feature layers in the GeoDash dashboard config
 *
 * @function listFeatureLayers
 * @param {(Object)} options - The id of the element for the Angular Controller
 * @return {(Object[])} Returns as an array the list of feature layers in the dashboard
 * @memberof geodash.api
 *
 * @example <caption>Basic</caption>
 * var featurelayers = geodash.api.listFeatureLayers();
 *
 * @example <caption>With Options</caption>
 * var featurelayers = geodash.api.listFeatureLayers({"scope": "geodash-main"});
 */

module.exports = function(options)
{
  var config = geodash.api.getDashboardConfig(options);
  return extract("featurelayers", config, []);
};

},{}],19:[function(require,module,exports){
/**
 * Lists the image assets in the GeoDash dashboard config
 *
 * @function listImages
 * @param {(Object)} options - The id of the element for the Angular Controller
 * @return {(Object[])} Returns as an array the list of image assets in the dashboard
 * @memberof geodash.api
 *
 * @example <caption>Basic</caption>
 * var images = geodash.api.listImages();
 *
 * @example <caption>With Options</caption>
 * var images = geodash.api.listImages({"scope": "geodash-main"});
 */

module.exports = function(options)
{
  var config = geodash.api.getDashboardConfig(options);
  var assets = extract("assets", config, []);
  return $.grep(assets, function(x, i){
    return extract("type", x, undefined) == "image";
  });
};

},{}],20:[function(require,module,exports){
/**
 * Lists the servers in the GeoDash dashboard config
 *
 * @function listServers
 * @param {(Object)} options - The id of the element for the Angular Controller
 * @return {(Object[])} Returns as an array the list of servers in the dashboard
 * @memberof geodash.api
 *
 * @example
 * var baselayers = geodash.api.listServers();
 * var baselayers = geodash.api.listServers({"scope": "geodash-main"});
 */

module.exports = function(options)
{
  var config = geodash.api.getDashboardConfig(options);
  return extract("servers", config, []);
};

},{}],21:[function(require,module,exports){
/**
 * Lists the tegola servers in the GeoDash dashboard config
 *
 * @function listTegolaServers
 * @param {(Object)} options - The id of the element for the Angular Controller
 * @return {(Object[])} Returns as an array the list of tegola servers in the dashboard
 * @memberof geodash.api
 *
 * @example
 * var baselayers = geodash.api.listTegolaServers();
 * var baselayers = geodash.api.listTegolaServers({"scope": "geodash-main"});
 */

module.exports = function(options)
{
  var config = geodash.api.getDashboardConfig(options);
  var servers = extract("servers", config, [])
  return $.grep(servers, function(x, i){
    return extract("type", x, undefined) == "tegola";
  });
};

},{}],22:[function(require,module,exports){
/**
 * Lists the WMS servers in the GeoDash dashboard config
 *
 * @function listWMSServers
 * @param {(Object)} options - The id of the element for the Angular Controller
 * @return {(Object[])} Returns as an array the list of WMS servers in the dashboard
 * @memberof geodash.api
 *
 * @example
 * var baselayers = geodash.api.listWMSServers();
 * var baselayers = geodash.api.listWMSServers({"scope": "geodash-main"});
 */

module.exports = function(options)
{
  var config = geodash.api.getDashboardConfig(options);
  var servers = extract("servers", config, [])
  return $.grep(servers, function(x, i){
    return extract("type", x, undefined) == "wms";
  });
};

},{}],23:[function(require,module,exports){
module.exports = function(options, names, fallback, fallback2)
{
  if(options != undefined)
  {
    if($.isArray(names))
    {
      var value = undefined;
      for(var i = 0; i < names.length; i++)
      {
        value = options[names[i]];
        if(value != undefined)
            break;
      }
      return value || fallback || fallback2;
    }
    else
        return options[names] || fallback ||  fallback2;
  }
  else
      return fallback || fallback2;
};

},{}],24:[function(require,module,exports){
module.exports = function(options, names, fallback)
{
  return geodash.api.opt(options, names, fallback, false);
};

},{}],25:[function(require,module,exports){
module.exports = function(options, names, fallback)
{
  return geodash.api.opt(options, names, fallback, 0);
};

},{}],26:[function(require,module,exports){
module.exports = function(options, names, fallback)
{
  return geodash.api.opt(options, names, fallback, {});
};

},{}],27:[function(require,module,exports){
module.exports = function(options, names, fallback)
{
  return geodash.api.opt(options, names, fallback, "");
};

},{}],28:[function(require,module,exports){
module.exports = function(options)
{
  options = options || {};
  var scope = options['$scope'] || options['scope'] || angular.element("#geodash-main").scope();
  var intentData = {
    "id": "geodash-modal-welcome",
    "dynamic": {},
    "static": {
      "welcome": scope.dashboard["welcome"]
    }
  };
  geodash.api.intend("toggleModal", intentData, scope);
};

},{}],29:[function(require,module,exports){
module.exports = function(x, length, fallback)
{
  if(x === undefined || x === "")
  {
    return fallback;
  }
  else if(angular.isString(x))
  {
    x = x.split(",");
    if(x.length == length)
    {
      return x;
    }
    else
    {
      return fallback;
    }
  }
  else if(angular.isArray(x))
  {
    if(x.length == length)
    {
      return x;
    }
    else
    {
      return fallback;
    }
  }
};

},{}],30:[function(require,module,exports){
'use strict';

/**
 * Assert values
 * @namespace assert
 * @memberof geodash
 */

module.exports = {
  array_length: require("./array_length")
};

},{"./array_length":29}],31:[function(require,module,exports){
module.exports = function(response, url)
{
  var encoded = [];

  var dashboards = response.dashboards;
  for(var i = 0; i < dashboards.length; i++)
  {
    var dashboard = dashboards[i];
    var id = dashboard.id;
    var slug = dashboard.slug;
    var title = dashboard.title;
    var x = {
      'id': id,
      'slug': slug,
      'text': title,
    };
    encoded.push(x);
  }

  return encoded;
};

},{}],32:[function(require,module,exports){
module.exports = function(response, url)
{
  var layers = [];

  var tegolaMaps = response.maps;
  for(var i = 0; i < tegolaMaps.length; i++)
  {
    var tegolaMap = tegolaMaps[i];
    var name = tegolaMap.name;
    var newLayer = {
      'id': name,
      'text': name,
      'obj': {
        'id': name,
        'title': name,
        'description': name,
        'type': 'wms',
        'tegola': {
          'map': name,
          'url': extract("tegola.base", geodash.codec.parseURL(url, 'tegola'), ""),
          'debug': false
        }
      }
    };
    layers.push(newLayer);
  }

  return layers;
};

},{}],33:[function(require,module,exports){
module.exports = function(response, url)
{
  var layers = [];
  $(response).find('Capability').children('Layer').children('Layer').each(function(){
      //var f = $(this).find(typeName.indexOf(":") != -1 ? typeName.substring(typeName.indexOf(":") + 1) : typeName);
      var name = $(this).children('Name').text();
      var bbox = [
        $(this).children('EX_GeographicBoundingBox').children("westBoundLongitude").text(),
        $(this).children('EX_GeographicBoundingBox').children("southBoundLongitude").text(),
        $(this).children('EX_GeographicBoundingBox').children("eastBoundLongitude").text(),
        $(this).children('EX_GeographicBoundingBox').children("northBoundLongitude").text()
      ].join(",");
      var thumbnail = extract("wms.base", geodash.codec.parseURL(url, 'wms'), "") +
        "/reflect?" +
        [
          "format=image/png",
          "width=40",
          "height=40",
          "TIME=-99999999999-01-01T00:00:00.0Z/99999999999-01-01T00:00:00.0Z",
          "layers="+name
        ].join("&");
      var title = $(this).children('Title').text();
      var newLayer = {
        'id': name,
        'text': title,
        'obj': {
          'id': name,
          'title': title,
          'description': $(this).children('Abstract').text(),
          'type': 'wms',
          'wms': {
            'layers': name,
            'url': extract("wms.base", geodash.codec.parseURL(url, 'wms'), "")
          },
          'wfs': {
            'layers': name,
            'url': extract("wfs.base", geodash.codec.parseURL(url, 'wms'), "")
          }
        },
        'extra': {
          'bbox': bbox,
          'thumbnail': thumbnail
        }
      };
      layers.push(newLayer);
  });
  return layers;
};

},{}],34:[function(require,module,exports){
'use strict';
module.exports = {
  GeoDashCapabilities: require("./GeoDashCapabilities"),
  TegolaCapabilities: require("./TegolaCapabilities"),
  WMSCapabilities: require("./WMSCapabilities")
};

},{"./GeoDashCapabilities":31,"./TegolaCapabilities":32,"./WMSCapabilities":33}],35:[function(require,module,exports){
module.exports = function(d)
{
  return Bloodhound.tokenizers.whitespace(d.text);
};

},{}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
module.exports = function(obj) {
  return obj['text'];
};

},{}],38:[function(require,module,exports){
'use strict';

/**
 * Wrapper functions for Twitter Bloodhound
 * @namespace bloodhound
 * @memberof geodash
 */

module.exports = {
  codec: require("./codec"),
  datumTokenizer: require("./datumTokenizer"),
  local: require("./local"),
  engine: require("./engine"),
  identify: require("./identify"),
  initLocal: require("./initLocal"),
  prefetch: require("./prefetch"),
  remote: require("./remote")
};

},{"./codec":34,"./datumTokenizer":35,"./engine":36,"./identify":37,"./initLocal":39,"./local":44,"./prefetch":49,"./remote":50}],39:[function(require,module,exports){
module.exports = function(localData, featurelayers, baselayers, servers)
{
  var bloodhoundData = undefined;

  if(angular.isString(localData))
  {
    var localFn = extract(localData, geodash.bloodhound.local);
    if(angular.isFunction(localFn))
    {
      bloodhoundData = localFn({
        'featurelayers': featurelayers,
        'baselayers': baselayers,
        'servers': servers
      });
    }
    else if(localData.length > 0)
    {
      bloodhoundData = [].concat(geodash.initial_data["data"][localData]);
      for(var i = 0; i < bloodhoundData.length; i++)
      {
        if(angular.isString(bloodhoundData[i]))
        {
          bloodhoundData[i] = {'id': bloodhoundData[i], 'text': bloodhoundData[i]};
        }
      }
    }
    else
    {
      bloodhoundData = undefined;
    }
  }
  else if(Array.isArray(localData))
  {
    bloodhoundData = [].concat(localData);
    for(var i = 0; i < bloodhoundData.length; i++)
    {
      if(angular.isString(bloodhoundData[i]))
      {
        bloodhoundData[i] = {'id': bloodhoundData[i], 'text': bloodhoundData[i]};
      }
    }
  }
  else
  {
    var localDataFnName = extract("name", localData);
    if(angular.isDefined(localDataFnName))
    {
      var localFn = extract(localDataFnName, geodash.bloodhound.local);
      if(angular.isFunction(localFn))
      {
        var localFnOptions = {
          'featurelayers': featurelayers,
          'baselayers': baselayers,
          'servers': servers
        };
        angular.extend(localFnOptions, extract("args", localData, {}));
        bloodhoundData = localFn(localFnOptions);
      }
    }
  }

  if(angular.isDefined(bloodhoundData))
  {
    bloodhoundData.sort(function(a, b){
      var textA = a.text.toLowerCase();
      var textB = b.text.toLowerCase();
      if(textA < textB){ return -1; }
      else if(textA > textB){ return 1; }
      else { return 0; }
    });
  }

  return bloodhoundData;
};

},{}],40:[function(require,module,exports){
module.exports = function(options)
{
  var bloodhoundData = [];

  var baselayers = options.baselayers || geodash.api.listBaseLayers();
  if(angular.isDefined(baselayers))
  {
    bloodhoundData = bloodhoundData.concat($.map(baselayers, function(x, i){
      return {
        'id': x.id,
        'text': (x.title || x.id),
        'obj': x
      };
    }));
  }

  return bloodhoundData;
};

},{}],41:[function(require,module,exports){
module.exports = function(options)
{
  var bloodhoundData = [];

  var featurelayers = options.featurelayers || geodash.api.listFeatureLayers();
  if(angular.isDefined(featurelayers))
  {
    bloodhoundData = bloodhoundData.concat($.map(featurelayers, function(x, i){
      return {
        'id': x.id,
        'text': (x.title || x.id),
        'obj': x
      };
    }));
  }

  return bloodhoundData;
};

},{}],42:[function(require,module,exports){
module.exports = function(options)
{
  var bloodhoundData = [];

  var featurelayers = options.featurelayers || geodash.api.listFeatureLayers();
  if(angular.isDefined(featurelayers))
  {
    featurelayers = $.grep(featurelayers, function(x, i){
      var filters = extract("filters", x);
      return Array.isArray(filters) && filters.length > 0;
    });

    bloodhoundData = bloodhoundData.concat($.map(featurelayers, function(x, i){
      return {
        'id': x.id,
        'text': (x.title || x.id),
        'obj': x
      };
    }));
  }

  return bloodhoundData;
};

},{}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
'use strict';
module.exports = {
  baselayers: require("./baselayers"),
  layers: require("./layers"),
  featurelayers: require("./featurelayers"),
  featurelayerswithfilters: require("./featurelayerswithfilters"),
  images: require("./images"),
  reflect: require("./reflect"),
  wfs: require("./wfs"),
  wms: require("./wms")
};

},{"./baselayers":40,"./featurelayers":41,"./featurelayerswithfilters":42,"./images":43,"./layers":45,"./reflect":46,"./wfs":47,"./wms":48}],45:[function(require,module,exports){
module.exports = function(options)
{
  var bloodhoundData = [];

  var featurelayers = options.featurelayers || geodash.api.listFeatureLayers();
  if(angular.isDefined(featurelayers))
  {
    bloodhoundData = bloodhoundData.concat($.map(featurelayers, function(x, i){
      return {
        'id': x.id,
        'text': x.title,
        'obj': x
      };
    }));
  }

  var baselayers = options.baselayers || geodash.api.listBaseLayers();
  if(angular.isDefined(baselayers))
  {
    bloodhoundData = bloodhoundData.concat($.map(baselayers, function(x, i){
      return {
        'id': x.id,
        'text': x.title,
        'obj': x
      };
    }));
  }

  return bloodhoundData;
};

},{}],46:[function(require,module,exports){
module.exports = function(options)
{
  var bloodhoundData = [];

  var locations = options.locations;
  if(angular.isArray(locations))
  {
    for(var i = 0; i < locations.length; i++)
    {
      var target = extract(locations[i], geodash);
      if(angular.isArray(target))
      {
        bloodhoundData = bloodhoundData.concat($.map(target, function(x, i){
          if(angular.isString(x))
          {
            return {'id': x, 'text': x};
          }
          else
          {
            return {
              'id': (x.id || x.name),
              'text': (x.title || x.name || x.id),
              'obj': x
            };
          }
        }));
      }
      else
      {
        bloodhoundData = bloodhoundData.concat($.map(Object.keys(target), function(x, i){
          return {'id': x, 'text': x};
        }));
      }
    }
  }

  return bloodhoundData;
};

},{}],47:[function(require,module,exports){
module.exports = function(options)
{
  var bloodhoundData = [];

  var servers = options.servers || geodash.api.listServers();
  if(angular.isDefined(servers))
  {
    servers = $.grep(servers, function(x, i){
      return (extract("type", x, undefined) == "wms") && (extract('wfs.url', x, '').length > 0);
    });
    bloodhoundData = bloodhoundData.concat($.map(servers, function(x, i){
      var url = extract('wfs.url', x, '');
      return { 'id': url, 'text': url };
    }));
  }

  return bloodhoundData;
};

},{}],48:[function(require,module,exports){
module.exports = function(options)
{
  var bloodhoundData = [];

  var servers = options.servers || geodash.api.listServers();
  if(angular.isDefined(servers))
  {
    servers = $.grep(servers, function(x, i){
      return extract("type", x, undefined) == "wms";
    });
    bloodhoundData = bloodhoundData.concat($.map(servers, function(x, i){
      var url = extract('wms.url', x, '');
      return { 'id': url, 'text': url };
    }));
  }

  return bloodhoundData;
};

},{}],49:[function(require,module,exports){
module.exports = function(options)
{
  if(angular.isDefined(options))
  {
    if(angular.isString(options))
    {
      return undefined;
    }
    else if(angular.isArray(options))
    {
      return undefined;
    }
    else if(angular.isString(options.url))
    {
      var url = options.url;
      var codecs = options.codecs || [geodash.bloodhound.codec];
      var codec = undefined;
      for(var i = 0; i < codecs.length; i++)
      {
        codec = extract(options.codec, codecs[i], undefined);
        if(angular.isDefined(codec))
        {
          break;
        }
      }
      var data = {
        'url': url,
        'dataType': extract('dataType', options, 'json'),
        'transform': codec,
        'wildcard': extract('wildcard', options, '%QUERY'),
        'cache': extract('cache', options, false)
      };
      return data;
    }
    else
    {
      return undefined;
    }
  }
  else
  {
    return undefined;
  }
};

},{}],50:[function(require,module,exports){
module.exports = function(options)
{
  if(angular.isDefined(options))
  {
    if(angular.isString(options))
    {
      return undefined;
    }
    else if(angular.isArray(options))
    {
      return undefined;
    }
    else if(angular.isString(options.url))
    {
      var url = options.url;
      var codecs = options.codecs || [geodash.bloodhound.codec];
      var codec = undefined;
      for(var i = 0; i < codecs.length; i++)
      {
        codec = extract(options.codec, codecs[i], undefined);
        if(angular.isDefined(codec))
        {
          break;
        }
      }
      var data = {
        'url': url,
        'dataType': extract('dataType', options, 'json'),
        'transform': codec,
        'wildcard': extract('wildcard', options, '%QUERY'),
        'rateLimitWait': extract('rate', options, 1000)
      };
      return data;
    }
    else
    {
      return undefined;
    }
  }
  else
  {
    return undefined;
  }
};

},{}],51:[function(require,module,exports){
module.exports = function(options)
{
  var appName = extract("appName", options);
  var element = extract("element", options, document);

  angular.bootstrap(element, [appName]);
};

},{}],52:[function(require,module,exports){
module.exports = function(options)
{
  var request = extract("request", options);
  var response = extract("response", options);
  var app = extract("app", options);
  var loaders = extract("loaders", options);

  if(response.status == 200)
  {
    if(angular.isDefined(request.loader))
    {
      var loaderFn = extract(request.loader, loaders);
      if(angular.isDefined(loaderFn))
      {
        loaderFn(response);
      }
      return { "success": true };
    }
    else
    {
      var value = undefined;
      var contentType = response.headers("content-type");
      if(contentType == "application/json")
      {
        value = response.data;
      }
      else
      {
        try { value = YAML.parse(response.data); }catch(err){ value = undefined; };
      }
      app.value(request.name, value);
      return { "success": true };
    }
  }
  else if(response.status == 500)
  {
    var message = "Could not load resource at \"" + response.config.url + "\" due to HTTP 500 Error (Internal Server Error).";
    return { "success": false, "message": message };
  }
};

},{}],53:[function(require,module,exports){
'use strict';

/**
 * Bootloader functions for GeoDash
 * @namespace bootloader
 * @memberof geodash
 */

module.exports = {
  ui: require("./ui"),
  step: require("./step"),
  bootstrap: require("./bootstrap"),
  handle: require("./handle"),
  internals: require("./internals"),
  process: require("./process"),
  resources: require("./resources")
};

},{"./bootstrap":51,"./handle":52,"./internals":54,"./process":55,"./resources":56,"./step":58,"./ui":61}],54:[function(require,module,exports){
module.exports = function(options)
{
  var app = extract("app", options);
  var element = extract("element", options);

  var initFn = ['templates', 'filters', 'directives', 'factory', 'controllers'];
  for(var i = 0; i < initFn.length; i++)
  {
    geodash.init[initFn[i]]({
      "app": app,
      "mainElement": element
    });
  };
};

},{}],55:[function(require,module,exports){
module.exports = function(options)
{
  var resource = extract("resource", options);
  var element = extract("element", options);
  var app = extract("app", options);
  var appName = extract("appName", options);

  if(angular.isDefined(resource))
  {
    var request = undefined;
    if(angular.isString(element.attr(resource.local)))
    {
      app.value(resource.name, extract(element.attr(resource.local), geodash));
      return {"success": true};
    }
    else if(angular.isString(element.attr(resource.remote)))
    {
      return {
        "success": true,
        "request": {
          'name': resource.name,
          'url': element.attr(resource.remote)
        }
      };
    }
    else if(geodash.util.hasHashValue(appName+":"+resource.hash))
    {
      return {
        "success": true,
        "request": {
          'name': resource.name,
          'url': geodash.util.getHashValue(appName+":"+resource.hash)
        }
      };
    }
    else if(geodash.util.getParameterByName(appName+":"+resource.hash) != null)
    {
      return {
        "success": true,
        "request": {
          'name': resource.name,
          'url': geodash.util.getParameterByName(appName+":"+resource.hash)
        }
      };
    }
    else
    {
      app.value(resource.name, extract(resource.fallback, geodash));
      return {"success": true};
    }
  }
  else
  {
    return {"success": false, "message": "Could not process resource, because it is undefined."};
  }
};

},{}],56:[function(require,module,exports){
module.exports = function(options)
{
  var app = extract("app", options);
  var appName = extract("appName", options);
  var loaders = extract("loaders", options);
  var element = extract("element", options);
  var system_resources = extract("system_resources", options);
  var $q = extract("$q", options);
  var $http = extract("$http", options);
  var steps = extract("steps", options);

  var requests = [];

  for(var i = 0; i < system_resources.length; i++)
  {
    var resource = system_resources[i];
    var result = geodash.bootloader.process({
      "app": app,
      "appName": appName,
      "element": element,
      "resource": resource
    });

    if(result.success == true)
    {
      if(angular.isDefined(extract("request", result)))
      {
        requests.push(result.request);
        steps = geodash.bootloader.step.status({
          "element": element,
          "steps": steps,
          "id": "resource"+resource.name,
          "status": "pending"
        });
      }
      else
      {
        steps = geodash.bootloader.step.status({
          "element": element,
          "steps": steps,
          "id": "resource"+resource.name,
          "status": "complete"
        });
      }
    }
    else
    {
      geodash.log.error("bootloader", [result.message]);
      steps = geodash.bootloader.step.status({
        "element": element,
        "steps": steps,
        "id": "resource"+resource.name,
        "status": "error",
        "messsage": result.message
      });
      break;
    }
  }

  if(angular.isDefined(element.attr("data-geodash-dashboard-resources")))
  {
    var dashboard_resources = undefined;
    try { dashboard_resources = JSON.parse(element.attr("data-geodash-dashboard-resources")); }catch(err){ dashboard_resources = undefined; };
    for(var i = 0; i < dashboard_resources.length; i++)
    {
      var resource = dashboard_resources[i];
      steps.push({
        "id": "resource-"+(resource.id || resource.name || resource.loader),
        "label": (resource.title || resource.name || resource.id || resource.loader),
        "status": "pending"
      });
      requests.push(resource);
    }
  }

  if(requests.length > 0)
  {
    var urls = $.map(requests, function(x){ return x["url"]; });
    var promises = geodash.http.build_promises($http, urls);
    var responseFn = function(request)
    {
      return function(response)
      {
        var result = geodash.bootloader.handle({
          "request": request,
          "response": response,
          "app": app,
          "loaders": loaders
        });

        if(result.success)
        {
          steps = geodash.bootloader.step.status({
            "element": element,
            "steps": steps,
            "id": "resource-"+(request.id || request.name || request.loader),
            "status": "complete"
          });
        }
        else
        {
          steps = geodash.bootloader.step.status({
            "element": element,
            "steps": steps,
            "id": "resource-"+(request.id || request.name || request.loader),
            "status": "error",
            "message": result.message
          });
        }
      };
    };
    for(var i = 0; i < requests.length; i++)
    {
      promises[i].then(responseFn(requests[i])).catch(responseFn(requests[i]));
    }
    $q.all(promises)
      .then(function(responses){ geodash.bootloader.bootstrap({ "appName": appName }); })
      .catch(function(responses){ geodash.bootloader.bootstrap({ "appName": appName }); });
  }
  else
  {
    steps = geodash.bootloader.step.status({ "element": element, "steps": steps, "id": "resources", "status": "complete" });
    geodash.bootloader.bootstrap({ "appName": appName });
  }

};

},{}],57:[function(require,module,exports){
module.exports = function(options)
{
  var element = extract("element", options);
  var steps = extract("steps", options);
  var newStep = extract("newStep", options);

  steps.push(newStep);

  geodash.bootloader.ui.update({ "element": element, "steps": steps });

  return steps;
};

},{}],58:[function(require,module,exports){
'use strict';

/**
 * Bootloader functions for GeoDash
 * @namespace step
 * @memberof geodash.bootloader
 */

module.exports = {
  add: require("./add"),
  status: require("./status")
};

},{"./add":57,"./status":59}],59:[function(require,module,exports){
module.exports = function(options)
{
  var element = extract("element", options);
  var steps = extract("steps", options);
  var id = extract("id", options);
  var status = extract("status", options);
  var message = extract("message", options);

  steps = $.map(steps, function(x){
    if(x.id == id)
    {
      x.status = status;
      x.message = message || "";
    }
    return x;
  })

  geodash.bootloader.ui.update({ "element": element, "steps": steps });

  return steps;
};

},{}],60:[function(require,module,exports){
module.exports = function(options)
{
  var element = extract("element", options);
  var step = extract("step", options);

  var html_margin = "<div class=\"col-md-2\"></div>";
  var html_label = "<div class=\"col-md-4\"><h4>"+step.label+"</h4></div>";
  var html_status = "";

  if(step.status == "complete")
  {
    html_status = "<div class=\"col-md-4 geodash-bootloader-status\"><i class=\"fa fa-check\" style=\"font-size: 3rem;\"></i></div>";
  }
  else if(step.status == "pending")
  {
    html_status = "<div class=\"col-md-4 geodash-bootloader-status\"><i class=\"fa fa-refresh fa-spin\" style=\"font-size: 3rem;\"></i></div>";
  }
  else if(step.status == "waiting")
  {
    html_status = "<div class=\"col-md-4 geodash-bootloader-status\"><i class=\"fa fa-minus\" style=\"font-size: 3rem;\"></i></div>";
  }

  var html = "<div class=\"row geodash-bootloader-step geodash-bootloader-step-"+step.id+"\" style=\"padding:10px;\">"+html_margin+html_label+html_status+html_margin+"</div>";
  element.append(html);
};

},{}],61:[function(require,module,exports){
'use strict';

/**
 * Bootloader functions for GeoDash
 * @namespace ui
 * @memberof geodash.bootloader
 */

module.exports = {
  addRow: require("./addRow"),
  update: require("./update"),
  updateRow: require("./updateRow")
};

},{"./addRow":60,"./update":62,"./updateRow":63}],62:[function(require,module,exports){
module.exports = function(options)
{
  var element = extract("element", options);
  var steps = extract("steps", options);

  for(var i = 0; i < steps.length; i++)
  {
    var step = steps[i];
    if(angular.isDefined(step.status))
    {
      var row = $(".geodash-bootloader-step-"+step.id, element);
      if(row.length > 0)
      {
        geodash.bootloader.ui.updateRow({ "element": element, "step": step, "row": row });
      }
      else
      {
        geodash.bootloader.ui.addRow({ "element": element, "step": step });
      }
    }
  }
};

},{}],63:[function(require,module,exports){
module.exports = function(options)
{
  var row = extract("row", options);
  var step = extract("step", options);

  if(step.status == "complete")
  {
    var i =
    $(".geodash-bootloader-status i", row)
      .addClass("fa fa-check")
      .removeClass("fa-refresh fa-spin");
  }
  else if(step.status == "pending")
  {
    $(".geodash-bootloader-status i", row)
      .addClass("fa fa-refresh fa-spin")
      .removeClass("fa-minus");
  }
  else if(step.status == "waiting")
  {
    $(".geodash-bootloader-status i", row)
      .addClass("fa fa-minus")
      .removeClass("fa-refresh fa-spin");
  }
  else if(step.status == "error")
  {
    $(".geodash-bootloader-status i", row)
      .css({ "color": "red" })
      .addClass("fa fa-exclamation-triangle")
      .removeClass("fa-minus fa-refresh fa-spin");
  }

  if(angular.isString(step.message) && step.message.length > 0)
  {
    $(".geodash-bootloader-status i", row)
      .attr({
        "data-toggle": "tooltip",
        "data-placement": "bottom",
        "title": step.message
      })
      .tooltip();
  }
  else
  {
    $(".geodash-bootloader-status i", row)
      .removeAttr("data-toggle")
      .removeAttr("data-placement")
      .removeAttr("title");
  }
};

},{}],64:[function(require,module,exports){
module.exports = function(path, obj, fallback)
{
  var result = fallback || '';

  var x = angular.isDefined(obj) ? extract(path, obj) : path;

  if(Array.isArray(x))
  {
    result = x.join(",");
  }
  else if(angular.isString(x))
  {
    result = x;
  }
  return result;
};

},{}],65:[function(require,module,exports){
module.exports = function(x)
{
  if(angular.isDefined(x))
  {
    if(Array.isArray(x))
    {
      x = geodash.util.arrayToObject(x);
    }
    if(Object.keys(x).length > 0)
    {
      return $.map(x, function(value, style){ return style+": "+value }).join(";") +";";
    }
    else
    {
      return "";
    }

  }
  else
  {
    return "";
  }
};

},{}],66:[function(require,module,exports){
'use strict';

/**
 * Variety of codecs to convert between formats or parse objects from strings
 * @namespace codec
 * @memberof geodash
 */

module.exports = {
  formatArray: require("./formatArray"),
  formatCSS: require("./formatCSS"),
  parseAttributes: require("./parseAttributes"),
  parseFeatures: require("./parseFeatures"),
  parseGeometry: require("./parseGeometry"),
  parseURL: require("./parseURL")
};

},{"./formatArray":64,"./formatCSS":65,"./parseAttributes":67,"./parseFeatures":68,"./parseGeometry":69,"./parseURL":70}],67:[function(require,module,exports){
module.exports = function(element, fields)
{
  var attributes = {};
  if(fields != undefined)
  {
    for(var k = 0; k < fields.length; k++)
    {
      var field = fields[k];
      var attributeName = field['output'] || field['attribute'];
      attributes[attributeName] = undefined;
      var inputName = field['attribute'] || field['input'];
      var inputNames = inputName != undefined ? [inputName] : field['inputs'];
      if(inputNames!= undefined)
      {
        for(var l = 0; l < inputNames.length; l++)
        {
          var inputName = inputNames[l];
          if(element.find("geonode\\:"+inputName).length > 0)
          {
            attributes[attributeName] = element.find("geonode\\:"+inputName).text();
            break;
          }
        }
      }
    }
  }
  return attributes;
};

},{}],68:[function(require,module,exports){
module.exports = function(response, fields_by_featuretype)
{
  var features = [];
  //features = new ol.format.GML3().readFeatures(response)
  $(response).find('gml\\:featuremember').each(function(){
      //var f = $(this).find(typeName.indexOf(":") != -1 ? typeName.substring(typeName.indexOf(":") + 1) : typeName);
      var f = $(this).children();
      var typeName = f.prop("tagName").toLowerCase();
      var attributes = geodash.codec.parseAttributes(f, fields_by_featuretype[typeName]);
      var geom = geodash.codec.parseGeometry(f);
      var newFeature = {
        'featuretype': typeName,
        'attributes': attributes,
        'geometry': geom
      };
      features.push(newFeature);
  });
  return features;
};

},{}],69:[function(require,module,exports){
module.exports = function(element)
{
  var geom = undefined;

  var attribute = element.find("geonode\\:shape");
  if(attribute.length == 0){ attribute = element.find("geonode\\:the_geom"); }

  if(attribute.find("gml\\:point").length > 0)
  {
    var coords = attribute.find("gml\\:point").find("gml\\:coordinates").text().split(",");
    //(new ol.format.GML3().readFeatures(response),
    if(typeof ol != "undefined")
    {
      geom = new ol.geom.Point([parseFloat(coords[0]), parseFloat(coords[1])]);
    }
    else
    {
      geom = new L.LatLng(parseFloat(coords[1]), parseFloat(coords[0]));
    }
  }
  else if(attribute.find("gml\\:multilinestring").length > 0)
  {
    var coords = attribute.find("gml\\:multilinestring")
      .find("gml\\:linestringmember")
      .find("gml\\:linestring")
      .find("gml\\:coordinates")
      .text().split(" ");
    coords = $.map(coords, function(x, i){
      var a = x.split(",");
      return [[parseFloat(a[0]), parseFloat(a[1])]];
    });
    var geojson = [{"type": "LineString","coordinates": coords}];
    geom = new L.GeoJSON(geojson, {});
  }
  else if(attribute.find("gml\\:multipolygon").length > 0)
  {
    var coords = attribute.find("gml\\:multipolygon")
      .find("gml\\:polygonmember")
      .find("gml\\:polygon")
      .find("gml\\:outerboundaryis")
      .find("gml\\:linearring")
      .find("gml\\:coordinates")
      .text().split(" ");
    coords = $.map(coords, function(x, i){
      var a = x.split(",");
      return [[parseFloat(a[0]), parseFloat(a[1])]];
    });
    var ring = [coords];
    var multipolygon = [ring];
    var geojson = [{
      "type": "MultiPolygon",
      "coordinates": multipolygon
    }];
    geom = new L.GeoJSON(geojson, {});
  }
  return geom;
};

},{}],70:[function(require,module,exports){
module.exports = function(url, serverType)
{
  if(angular.isString(url))
  {
    var data = undefined;
    if(serverType == "wms")
    {
      data = {
        'domain': url.replace('http://','').replace('https://','').split(/[/?#]/)[0],
        'wms': {
          'base': url.substring(0, url.indexOf("?"))
        },
        'wfs': {
          'base': url.substring(0, url.indexOf("?")).replace('/wms', '/wfs')
        }
      };
    }
    else if(serverType == "tegola")
    {
      data = {
        'domain': url.replace('http://','').replace('https://','').split(/[/?#]/)[0],
        'tegola': {
          'base': url.substring(0, url.indexOf("/capabilities"))
        }
      };
    }
    else if(serverType == "geojson")
    {
      data = {
        'domain': url.replace('http://','').replace('https://','').split(/[/?#]/)[0]
      };
    }
    else if(serverType == "tiles")
    {
      data = {
        'domain': url.replace('http://','').replace('https://','').split(/[/?#]/)[0]
      };
    }
    return data;
  }
  else
  {
    return undefined;
  }
};

},{}],71:[function(require,module,exports){
'use strict';

/**
 * Contains dynamic style functions
 * @namespace dynamicStyleFn
 * @memberof geodash
 */

module.exports = {
  test: require("./test")
};

},{"./test":72}],72:[function(require,module,exports){
module.exports = function(f, state, dashboard, options)
{
  var idx = parseInt(f.id_.split(".")[1], 10);
  var colors = [
    '#ADD8E6',  // 'lightBlue',
    '#FF7F50', // 'coral',
    '#FF8C00', // 'darkOrange',
    '#FF1493', // 'deepPink',
    '#008000', // 'green',
    '#4B0082', // 'indigo'
  ];
  var delta = {
    'fillColor': colors[idx % colors.length],
    'fillOpacity': (6 + (idx % 5)) * 0.10
  };
  return delta;
};

},{}],73:[function(require,module,exports){

module.exports = function(responses, fields_by_featuretype)
{
  var features = [];
  for(var i = 0; i < responses.length; i++)
  {
    var response = responses[i];
    if(response.status == 200)
    {
      var data = response.data;
      features = features.concat(geodash.codec.parseFeatures(data, fields_by_featuretype));
    }
  }
  return features;
};

},{}],74:[function(require,module,exports){
/**
 * Create Angular promises from a set of urls
 *
 * @function build_promises
 * @param {(ol.geom.Point|L.point)} x - The original value
 * @return {Object} The value as a GeoDash Object
 * @memberof geodash.http
 *
 * @see https://docs.angularjs.org/api/ng/service/$http
 * @example
 * var urls = [...];
 * var promises = geodash.http.build_promises($http, urls);
 */

module.exports = function($http, urls)
{
  var promises = [];
  for(var i = 0; i < urls.length; i++)
  {
    var url = urls[i];
    var config = {};
    var promise = $http.get(url, config);
    promises.push(promise);
  }
  return promises;
};

},{}],75:[function(require,module,exports){
'use strict';

/**
 * Functions that wrap HTTP featres
 * @namespace http
 * @memberof geodash
 */

module.exports = {
  build_promises: require("./build_promises"),
  build_features: require("./build_features")
};

},{"./build_features":73,"./build_promises":74}],76:[function(require,module,exports){
'use strict';
/*global require, window, console, jQuery, $, angular, Bloodhound, location */

/**
 * GeoDash.js is the Low-level Javascript API for GeoDash
 *
 * @namespace geodash
 * @summary Low-level Javascript API for GeoDash
 */

module.exports = {
  api: require("./api"),
  assert: require("./assert"),
  bloodhound: require("./bloodhound"),
  bootloader: require("./bootloader"),
  codec: require("./codec"),
  dynamicStyleFn: require("./dynamicStyleFn"),
  http: require("./http"),
  controllers: {},
  directives: {},
  filters: {},
  handlers: {},
  init: require("./init"),
  layers: require("./layers"),
  listeners: require("./listeners"),
  log: require("./log"),
  normalize: require("./normalize"),
  popup: require("./popup"),
  style: require("./style"),
  tilemath: require("./tilemath"),
  typeahead: require("./typeahead"),
  ui: require("./ui"),
  util: require("./util"),
  vecmath: require("./vecmath"),
  var: {
    apps: {},
    logs: {},
    baselayers: {},
    featurelayers: {}
  }
};

},{"./api":14,"./assert":30,"./bloodhound":38,"./bootloader":53,"./codec":66,"./dynamicStyleFn":71,"./http":75,"./init":83,"./layers":97,"./listeners":111,"./log":117,"./normalize":123,"./popup":130,"./style":132,"./tilemath":142,"./typeahead":159,"./ui":177,"./util":197,"./vecmath":206}],77:[function(require,module,exports){
module.exports = function()
{
  $("[data-geodash-dashboard-name]").each(function(){
    var that = $(this);
    var name = that.attr("data-geodash-dashboard-name");
    geodash.init.dashboard(name, that);
  });
};

},{}],78:[function(require,module,exports){
module.exports = function(options)
{
  var app = extract("app", options);
  var mainElement = extract("mainElement", options);
  
  app.controller("GeoDashControllerBase", geodash.controllers.GeoDashControllerBase);
  app.controller("GeoDashControllerModal", geodash.controllers.GeoDashControllerModal);

  /*
  * This pre-loads the controllers into Angular.  They aren't "executed" until a directive actually uses them,
  * b/c we aren't using ng-controller, but data-geodash-controller(s).
  */
  $("[data-geodash-controller], [data-geodash-controllers]", mainElement).each(function(){
    var controllerName = $(this).attr("data-geodash-controller") || $(this).attr("data-geodash-controllers");
    if(angular.isString(controllerName) && controllerName.length > 0)
    {
      var controller = extract(controllerName, geodash.controllers);
      if(angular.isDefined(controller))
      {
        app.controller(controllerName, controller);
      }
    }
  });
};

},{}],79:[function(require,module,exports){
module.exports = function(appName, mainElement, loaders)
{
  var app = angular.module(appName, ['ngRoute', 'ngSanitize', 'ngCookies']);
  geodash.var.apps[appName] = app;

  var steps = [
    {"id": "internals", "label": "Internals", "status": "pending"},
    {"id": "dashboard", "label": "Dashboard", "status": "waiting"},
  ];
  geodash.bootloader.ui.update({ "element": mainElement, "steps": steps });
  geodash.bootloader.internals({ "app": app, "element": mainElement });
  steps = geodash.bootloader.step.status({ "element": mainElement, "steps": steps, "id": "internals", "status": "complete" });
  steps = geodash.bootloader.step.status({ "element": mainElement, "steps": steps, "id": "dashboard", "status": "pending" });

  // Initialize UI interaction for intents.
  // Listen's for events bubbling up to body element, so can initialize before children.
  geodash.init.listeners();

  var system_resources = [
    {
      "name": "state",
      "title": "State",
      "local": "data-geodash-dashboard-initial-state-path",
      "remote": "data-geodash-dashboard-initial-state-url",
      "hash": "state",
      "querystring": "state",
      "fallback": "initial_state"
    },
    {
      "name": "stateschema",
      "title": "State Schema",
      "local": "data-geodash-dashboard-state-schema-path",
      "remote": "data-geodash-dashboard-state-schema-url",
      "hash": "stateschema",
      "querystring": "stateschema",
      "fallback": "state_schema"
    }
  ];

  for(var i = 0; i < system_resources.length; i++)
  {
    var resource = system_resources[i];
    steps.push({"id": "resource-"+resource.name, "label": resource.title, "status": "waiting"});
  }

  var result_dashboard = geodash.bootloader.process({
    "app": app,
    "appName": appName,
    "element": mainElement,
    "resource": {
      "name": "dashboard",
      "local": "data-geodash-dashboard-config-path",
      "remote": "data-geodash-dashboard-config-url",
      "hash": "config",
      "querystring": "config",
      "fallback": "dashboard"
    }
  });

  // See: https://blog.mariusschulz.com/2014/10/22/asynchronously-bootstrapping-angularjs-applications-with-server-side-data
  var initInjector = angular.injector(["ng"]);
  var $q = initInjector.get("$q");
  var $http = initInjector.get("$http");

  if(angular.isDefined(extract("request", result_dashboard)))
  {
    $http.get(result_dashboard.request.url, {}).then(
      function(response)
      {
        var result = geodash.bootloader.handle({
          "request": result_dashboard.request,
          "response": response,
          "app": app,
          "loaders": loaders
        });

        if(result.success)
        {
          steps = geodash.bootloader.step.status({ "element": mainElement, "steps": steps, "id": "dashboard", "status": "complete" });
          geodash.bootloader.resources({
            "app": app,
            "appName": appName,
            "loaders": loaders,
            "element": mainElement,
            "system_resources": system_resources,
            "$q": $q,
            "$http": $http,
            "steps": steps
          });
        }
        else
        {
          geodash.log.error("bootloader", [result.message]);
          steps = geodash.bootloader.step.status({ "element": mainElement, "steps": steps, "id": "dashboard", "status": "error", "message": message });
        }
      },
      function(response)
      {
        var message = "";
        if(response.status == 500)
        {
          message = "Could not load resource at \"" + response.config.url + "\" due to HTTP 500 Error (Internal Server Error).";
        }
        else
        {
          message = "Could not load resource at \"" + response.config.url + "\" due to unknown HTTP Error.";
        }
        geodash.log.error("bootloader", [message]);
        steps = geodash.bootloader.step.status({ "element": mainElement, "steps": steps, "id": "dashboard", "status": "error", "message": message });
      }
    );
  }
  else
  {
    steps = geodash.bootloader.step.status({ "element": mainElement, "steps": steps, "id": "dashboard", "status": "complete" });
    geodash.bootloader.resources({
      "app": app,
      "appName": appName,
      "loaders": loaders,
      "element": mainElement,
      "system_resources": system_resources,
      "$q": $q,
      "$http": $http,
      "steps": steps
    });
  }

};

},{}],80:[function(require,module,exports){
/**
 * Injects GeoDash directives into the Angular application.  Run before `bootstrap`.
 *
 * @function directives
 * @param {(Object)} app - the Angular Application
 * @memberof geodash.init
 *
 * @example
 * geodash.init.directives(app);
 */

module.exports = function(options)
{
  var app = extract("app", options);
  if(geodash.directives != undefined)
  {
    geodash.meta.directives = [];
    $.each(geodash.directives, function(name, dir){
      geodash.meta.directives.push(name);
      app.directive(name, dir);
    });
  }
};

},{}],81:[function(require,module,exports){
/**
 * Injects GeoDash factory variables into the Angular application.  Run before `bootstrap`.
 *
 * @function factory
 * @param {(Object)} app - the Angular Application
 * @memberof geodash.init
 *
 * @example
 * geodash.init.factory(app);
 */

module.exports = function(options)
{
  var app = extract("app", options);
  //app.factory('state', function(){return angular.extend({}, geodash.initial_state);});
  app.factory('stateschema', function(){return angular.extend({}, geodash.state_schema);});
  //app.factory('dashboard', function(){return angular.extend({}, geodash.dashboard);});
  app.factory('live', function(){
    return {
      "map": undefined,
      "baselayers": {},
      "featurelayers": {}
    };
  });

};

},{}],82:[function(require,module,exports){
/**
 * Injects GeoDash filters into the Angular application.  Run before `bootstrap`.
 *
 * @function filters
 * @param {(Object)} app - the Angular Application
 * @memberof geodash.init
 *
 * @example
 * geodash.init.filters(app);
 */

module.exports = function(options)
{
  var app = extract("app", options);
  if(geodash.filters != undefined)
  {
    geodash.meta.filters = [];
    $.each(geodash.filters, function(name, func){
      geodash.meta.filters.push(name);
      app.filter(name, func);
    });
  }
};

},{}],83:[function(require,module,exports){
'use strict';

/**
 * Functions to initialize a variety of components
 * @namespace init
 * @memberof geodash
 */

module.exports = {
  all: require("./all"),
  controllers: require("./controllers"),
  dashboard: require("./dashboard"),
  directives: require("./directives"),
  factory: require("./factory"),
  filters: require("./filters"),
  listeners: require("./listeners"),
  map_leaflet: require("./map_leaflet"),
  map_ol3: require("./map_ol3"),
  state: require("./state"),
  templates: require("./templates"),
  typeahead: require("./typeahead")
};

},{"./all":77,"./controllers":78,"./dashboard":79,"./directives":80,"./factory":81,"./filters":82,"./listeners":84,"./map_leaflet":85,"./map_ol3":86,"./state":87,"./templates":88,"./typeahead":89}],84:[function(require,module,exports){
module.exports = function()
{
  $('body').on('click', '.btn-clear, .geodash-clear', function(event) {
    // "this" doesn't always point to what you think it does,
    // that's why need to use event.currentTarget

    var input_id = $(event.currentTarget).attr('data-target-input-id');
    if(angular.isString(input_id))
    {
      try{ $("#"+input_id).typeahead('close'); }catch(err){};
      geodash.ui.saveToInput(event.currentTarget, null);
    }

    geodash.ui.clearFromScope(event.currentTarget);
    geodash.ui.changeTab(event.currentTarget, null);
  });

  $('body').on('click', '.btn-off', function(event) {
    var input_id = $(event.currentTarget).attr('data-target-input-id');
    var input = $("#"+input_id);
    input.val("false");
    input.trigger('input');
    input.change();
  });
  $('body').on('click', '.btn-on', function(event) {
    var input_id = $(event.currentTarget).attr('data-target-input-id');
    var input = $("#"+input_id);
    input.val("true");
    input.trigger('input');
    input.change();
  });

  $('body').on('click', '.geodash-intent', function(event) {
    event.preventDefault();  // For anchor tags
    var that = $(this);
    //var scope = angular.element('[ng-controller='+that.data('intent-ctrl')+']').scope();
    var scope = geodash.util.getScope(that.attr('data-intent-ctrl'));
    if(that.hasClass('geodash-toggle'))
    {
      var intentData = JSON.parse(that.attr('data-intent-data')); // b/c jquery data not updated by angular
      if(that.hasClass('geodash-off'))
      {
        that.removeClass('geodash-off');
        geodash.api.intend(that.attr('data-intent-names')[0], intentData, scope);
      }
      else
      {
        that.addClass('geodash-off');
        geodash.api.intend(that.attr('data-intent-names')[1], intentData, scope);
      }
    }
    else if(that.hasClass('geodash-radio'))
    {
      var siblings = that.parents('.geodash-radio-group:first').find(".geodash-radio").not(that);
      if(!(that.hasClass('geodash-on')))
      {
        that.addClass('geodash-on');
        if(that.data("intent-class-on"))
        {
          that.addClass(that.data("intent-class-on"));
          siblings.removeClass(that.data("intent-class-on"));
        }
        siblings.removeClass('geodash-on');
        if(that.data("intent-class-off"))
        {
          that.removeClass(that.data("intent-class-off"));
          siblings.addClass(that.data("intent-class-off"));
        }
        var intentName = that.attr('data-intent-name');
        var intentData = JSON.parse(that.attr('data-intent-data')); // b/c jquery data not updated by angular
        geodash.api.intend(intentName, intentData, scope);
      }
    }
    else
    {
      var intentName = that.attr('data-intent-name');
      var intentData = JSON.parse(that.attr('data-intent-data'));
      angular.extend(intentData, {'element': this});
      geodash.api.intend(intentName, intentData, scope);
    }
  });
};

},{}],85:[function(require,module,exports){
module.exports = function(opts)
{
  var map = L.map('map',
  {
    attributionControl: geodash.api.opt_b(opts, "attributionControl", false),
    zoomControl: geodash.api.opt_b(opts, "zoomControl", false),
    minZoom: geodash.api.opt_i(opts, "minZoom", 3),
    maxZoom: geodash.api.opt_i(opts, "maxZoom", 18)
  });

  map.setView(
    [geodash.api.opt_i(opts,["latitude", "lat"],0), geodash.api.opt_i(opts,["longitude", "lon", "lng", "long"], 0)],
    geodash.api.opt_i(opts, ["zoom", "z"], 0));

  $.each(geodash.api.opt_j(opts, "listeners"), function(e, f){
    map.on(e, f);
  });

  return map;
};

},{}],86:[function(require,module,exports){
module.exports = function(options)
{
  var id = extract("id", options, "map");
  var lonlat = [
    geodash.api.opt_i(options,["longitude", "lon", "lng", "long"], 0),
    geodash.api.opt_i(options,["latitude", "lat"], 0)];
  var zoom = geodash.api.opt_i(options, ["zoom", "z"], 0);

  var controls = [];
  if(extract("zoomControl", options, true)) { controls.push(new ol.control.Zoom()); }
  controls.push(new ol.control.Rotate());
  if(extract("attributionControl", options, true)) { controls.push(new ol.control.Attribution()); }

  var map = new ol.Map({
    target: id,
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    controls: controls,
    overlays: [
      new ol.Overlay({element: document.getElementById('popup')})
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat(lonlat),
      zoom: zoom,
      minZoom: geodash.api.opt_i(options, "minZoom", 3),
      maxZoom: geodash.api.opt_i(options, "maxZoom", 18)
    })
  });
  //var map = ol.Map('map',
  //{
  //  attributionControl: geodash.api.opt_b(options, "attributionControl", false),
  //  zoomControl: geodash.api.opt_b(options, "zoomControl", false),
  //});

  $.each(geodash.api.opt_j(options, "listeners"), function(e, f){
    map.on(e, f);
  });

  return map;
};

},{}],87:[function(require,module,exports){
/**
 * init_state will overwrite the default state from the server with params in the url.
 * @param {Object} state - Initial state from server
 */
//module.exports = function(state, stateschema)
module.exports = function(options)
{
  var newState = {};
  if(angular.isDefined(extract("state", options)))
  {
    angular.extend(newState, extract("state", options));
  }

  // Update View
  var lat = getHashValueAsFloat(["latitude", "lat", "y"]) || extract("state.lat", options, 0.0);
  var lon = getHashValueAsFloat(["longitude", "lon", "long", "lng", "x"]) || extract("state.lon", options, 0.0);
  var z = getHashValueAsInteger(["zoom", "z"]) || extract("state.z", options, 3);
  var delta = {'lat': lat, 'lon': lon, 'z': z};
  newState["view"] = angular.isDefined(extract("view", newState)) ? angular.extend(newState["view"], delta) : delta;

  if(! angular.isDefined(extract("view.baselayer", newState)))
  {
    newState["view"]["baselayer"] = extract(["dashboard", "baselayers", 0, "id"], options);
  }
  if(! angular.isDefined(extract("view.featurelayers", newState)))
  {
    newState["view"]["featurelayers"] = $.map(extract(["dashboard", "featurelayers"], options, []), function(fl){
      return fl.id;
    });
  }

  // Update Filters
  if(Array.isArray(extract("filters", newState)))
  {
    $.each(newState["filters"], function(layer_id, layer_filters){
      $.each(layer_filters, function(filter_id, filer_value){
        var type = stateschema["filters"][layer_id][filter_id].toLowerCase();
        var value = geodash.util.getHashValue(layer_id+":"+filter_id, type);
        if(value != undefined && value != "")
        {
          newState["filters"][layer_id][filter_id] = value;
        }
      });
    });
  }

  // Update Filters
  if(newState["styles"] != undefined)
  {
    /*
    $.each(newState["styles"], function(layer_id, layer_style){
      var type = stateschema["filters"][layer_id][filter_id].toLowerCase();
      var value = geodash.util.getHashValue("style:"+layer_id, type);
      if(value != undefined && value != "")
      {
        newState["filters"][layer_id][filter_id] = value;
      }
    });*/
  }

  return newState;
};

},{}],88:[function(require,module,exports){
/**
 * Injects GeoDash templates into the Angular application.  Run before `bootstrap`.
 *
 * @function templates
 * @param {(Object)} app - the Angular Application
 * @memberof geodash.init
 *
 * @example
 * geodash.init.templates(app);
 */


module.exports = function(options)
{
  var app = extract("app", options);
  geodash.meta.templates = [];

  geodash.templates.merged = {};
  if(angular.isDefined(extract("templates.static", geodash)))
  {
    $.each(geodash.templates.static, function(name, template){
      geodash.templates.merged[name] = template;
    });
  }

  if(angular.isDefined(extract("templates.server", geodash)))
  {
    $.each(geodash.templates.server, function(name, template){
      geodash.templates.merged[name] = template;
    });
  }

  $.each(geodash.templates.merged, function(name, template){
    geodash.meta.templates.push(name);
    app.run(function($templateCache){$templateCache.put(name, template);});
  });
};

},{}],89:[function(require,module,exports){
module.exports = function($element, featurelayers, baselayers, servers, datasetOptions, codecOptions)
{
  datasetOptions = datasetOptions || extract("config.search.datasets", geodash) || [geodash.typeahead.datasets];
  codecOptions = codecOptions || extract("config.search.codecs", geodash) || [geodash.bloodhound.codec];

  $('.typeahead', $element).each(function(){

    var datasets = [];
    var engine = undefined;

    var that = $(this);
    var placeholder = that.data('placeholder');
    var w = that.data('width');
    var h = that.data('height');
    var css = 'geodashserver-welcome-select-dropdown';
    var template_empty = that.data('template-empty');
    var initialValue = that.data('initial-value');

    if(angular.isString(that.attr('data-typeahead-datasets')) && that.attr('data-typeahead-datasets').length > 0)
    {
      var datasetsName = that.attr('data-typeahead-datasets');
      var datasetsFn = undefined;
      for(var i = 0; i < datasetOptions.length; i++)
      {
        datasetsFn = extract(datasetsName, datasetOptions[i]);
        if(angular.isDefined(datasetsFn))
        {
          break;
        }
      }
      datasets = datasetsFn(that, featurelayers, baselayers, servers, codecOptions);
    }
    else
    {
      var datasetsFn = extract('default', geodash.typeahead.datasets);
      datasets = datasetsFn(that, featurelayers, baselayers, servers, codecOptions);
    }

    if(datasets.length > 0)
    {
      that.typeahead('destroy','NoCached');
      var typeahead = that.typeahead(null, datasets);
      that.data('datasets', datasets);
      if(angular.isString(initialValue))
      {
        var matches = undefined;
        for(var i = 0; i < datasets.length; i++)
        {
          matches = datasets[i].engine.getByPropertyName('id', initialValue);
          if(Array.isArray(matches) && matches.length > 0)
          {
            break;
          }
        }
        initialValue = matches[0];
      }

      if(angular.isDefined(initialValue))
      {
        that.typeahead('val', geodash.typeahead.displayFn(initialValue));
        var newValue = extract(that.attr('data-search-output') || 'id', initialValue);
        geodash.ui.saveToInput(this, newValue);
        geodash.ui.saveToScope(this, newValue);
        geodash.ui.changeTab(this, newValue);
      }

      that.on('keydown', geodash.typeahead.listeners.keydown);
      that.on('keyup', geodash.typeahead.listeners.keyup);
      //
      typeahead.on('blur', geodash.typeahead.listeners.blur);
      // Don't hook to change, since is triggered with null on typeaheads when new box is being opened.
      // Need to manually trigger listener when doing geodash-clear
      //typeahead.on('change', geodash.typeahead.listeners.change);
      typeahead.on('typeahead:change', geodash.typeahead.listeners.change);
      typeahead.on('typeahead:select typeahead:autocomplete typeahead:cursorchange', geodash.typeahead.listeners.select);
    }

  });

};

},{}],90:[function(require,module,exports){
module.exports = function(featureLayer)
{
  var fields = [];
  var panes = extract("popup.panes", featureLayer, undefined);
  if(panes != undefined)
  {
    for(var i = 0; i < panes.length; i++)
    {
      fields = fields.concat(panes[i].fields);
    }
  }
  return fields;
};

},{}],91:[function(require,module,exports){
module.exports = function(options)
{
  var dashboard = extract("dashboard", options) || geodash.api.getDashboardConfig();
  var layerConfig = extract("layerConfig", options);
  var layerID = extract("id", layerConfig) || extract("layerID", layerConfig) || extract("id", options) || extract("layerID", options);

  var local = extract("geojson.local", layerConfig);
  var url = extract("geojson.url", layerConfig);

  var source = undefined;
  if(angular.isDefined(local))
  {
    var localData = extract(local, geodash.initial_data);
    if(angular.isDefined(localData))
    {
      source = geodash.layers.source.geojson({ "local": localData });
    }
    else
    {
      geodash.log.error("layers", ["Could not initialize GeoJSON layer "+id+" because local data at "+local+" was not found."]);
    }
  }
  else if(angular.isDefined(url))
  {
    source = geodash.layers.source.geojson({ "url": url });
  }
  else
  {
    if(angular.isDefined(extract("wfs.url", layerConfig)))
    {
      url = geodash.layers.translate.wfs_to_geojson({ "fl": layerConfig });
    }

    if(angular.isDefined(url))
    {
      source = geodash.layers.source.geojson({ "url": url });
    }
  }

  if(angular.isDefined(source))
  {
    var ws = extract("config.dynamicStyleFunctionWorkspaces", geodash) || [geodash.dynamicStyleFn];
    var styleFn = (function(_layerID, styleFnWorkspaces){
      return function(feature, resolution) {
        return geodash.style.ol3({
          "feature": feature,
          "resolution": resolution,
          "layerID": _layerID,
          "styleFnWorkspaces": styleFnWorkspaces
        });
      };
    })(layerID, extract('dynamicStyleFunctionWorkspaces', geodash.config, ws));
    var fl = new ol.layer.Vector({
      id: layerID,
      source: source,
      zIndex: geodash.api.getRenderOrder({ "dashboard": dashboard, "id": layerID, "reverse": true })
    });
    fl.setStyle(styleFn);
    geodash.api.addFeatureLayer(layerID, fl);

    var cb = extract("cb.success", options);
    if(angular.isDefined(cb))
    {
      cb({
        "$scope": extract("$scope", options) || extract("scope", options),
        "id": layerID,
        "fl": fl,
        "state": options.state
      });
    }
  }
};

},{}],92:[function(require,module,exports){
module.exports = function(options)
{
  var dashboard = extract("dashboard", options) || geodash.api.getDashboardConfig();
  var layerConfig = extract("layerConfig", options);
  var layerID = extract("id", layerConfig) || extract("layerID", layerConfig) || extract("id", options) || extract("layerID", options);

  var local = extract("geojson.local", layerConfig);
  var url = extract("geojson.url", layerConfig);

  var source = undefined;
  if(angular.isDefined(local))
  {
    var localData = extract(local, geodash.initial_data);
    if(angular.isDefined(localData))
    {
      source = geodash.layers.source.geojson({ "local": localData });
    }
    else
    {
      geodash.log.error("layers", ["Could not initialize GeoJSON layer "+id+" because local data at "+local+" was not found."]);
    }
  }
  else if(angular.isDefined(url))
  {
    source = geodash.layers.source.geojson({ "url": url });
  }
  else
  {
    if(angular.isDefined(extract("wfs.url", layerConfig)))
    {
      url = geodash.layers.translate.wfs_to_geojson({ "fl": layerConfig });
    }

    if(angular.isDefined(url))
    {
      source = geodash.layers.source.geojson({ "url": url });
    }
  }

  if(angular.isDefined(source))
  {
    var fl = new ol.layer.Heatmap({
      source: source,
      blur: extract('heatmap.blur', layerConfig, 15),
      radius: extract('heatmap.radius', layerConfig, 5),
      weight: extract('heatmap.weight', layerConfig, undefined),
      zIndex: geodash.api.getRenderOrder({ "dashboard": dashboard, "id": layerID, "reverse": true })
    });
    geodash.api.addFeatureLayer(layerID, fl);

    var cb = extract("cb.success", options);
    if(angular.isDefined(cb))
    {
      cb({
        "$scope": extract("$scope", options) || extract("scope", options),
        "id": layerID,
        "fl": fl,
        "state": options.state
      });
    }
  }  
};

},{}],93:[function(require,module,exports){
'use strict';

/**
 * Functions to create feature layers
 * @namespace featurelayer
 * @memberof geodash.layers
 */

module.exports = {
  geojson: require("./geojson"),
  heatmap: require("./heatmap"),
  tegola: require("./tegola"),
  wms: require("./wms"),
  wmts: require("./wmts")
};

},{"./geojson":91,"./heatmap":92,"./tegola":94,"./wms":95,"./wmts":96}],94:[function(require,module,exports){
module.exports = function(options)
{
  var dashboard = extract("dashboard", options) || geodash.api.getDashboardConfig();
  var layerConfig = extract("layerConfig", options);
  var layerID = extract("id", layerConfig) || extract("layerID", layerConfig) || extract("id", options) || extract("layerID", options);

  var source = geodash.layers.source.vectortile({ "fl": layerConfig });
  if(angular.isDefined(source))
  {
    var fl = new ol.layer.VectorTile({
      source: source,
      zIndex: geodash.api.getRenderOrder({ "dashboard": dashboard, "id": layerID, "reverse": true })
    });
    geodash.api.addFeatureLayer(layerID, fl);

    var cb = extract("cb.success", options);
    if(angular.isDefined(cb))
    {
      cb({
        "$scope": extract("$scope", options) || extract("scope", options),
        "id": layerID,
        "fl": fl,
        "state": options.state
      });
    }
  }
};

},{}],95:[function(require,module,exports){
module.exports = function(options)
{
  var dashboard = extract("dashboard", options) || geodash.api.getDashboardConfig();
  var layerConfig = extract("layerConfig", options);
  var layerID = extract("id", layerConfig) || extract("layerID", layerConfig) || extract("id", options) || extract("layerID", options);

  var w = layerConfig.wms;
  if(extract("auth", layerConfig, "") == "basic")
  {
    var auth_url = w.url + (w.url.indexOf("?") != -1 ? '&' : '?') + "SERVICE=WMS&REQUEST=GetCapabilities"
    $.ajax({
      url: auth_url,
      type: "GET",
      dataType: "jsonp",
      jsonp: "callback",
      beforeSend: function(xhr){
        xhr.setRequestHeader("Authorization", "Basic "+btoa("null:null"));
        console.log(xhr);
      },
      error: function(){},
      success: function(){},
      complete: function(response){
        var source = geodash.layers.source.wms({ "wms": w });
        if(angular.isDefined(source))
        {
          var fl = new ol.layer.Image({
            source: source,
            zIndex: geodash.api.getRenderOrder({ "dashboard": dashboard, "id": layerID, "reverse": true })
          });
          geodash.api.addFeatureLayer(layerID, fl);

          var cb = extract("cb.success", options);
          if(angular.isDefined(cb))
          {
            cb({
              "$scope": extract("$scope", options) || extract("scope", options),
              "id": layerID,
              "fl": fl,
              "state": options.state
            });
          }
        }
      }
    });
  }
  else
  {
    var source = geodash.layers.source.wms({ "wms": w });
    if(angular.isDefined(source))
    {
      var fl = new ol.layer.Image({
        source: source,
        zIndex: geodash.api.getRenderOrder({ "dashboard": dashboard, "id": layerID, "reverse": true })
      });
      geodash.api.addFeatureLayer(layerID, fl);

      var cb = extract("cb.success", options);
      if(angular.isDefined(cb))
      {
        cb({
          "$scope": extract("$scope", options) || extract("scope", options),
          "id": layerID,
          "fl": fl,
          "state": options.state
        });
      }
    }
  }
};

},{}],96:[function(require,module,exports){
module.exports = function($scope, live, dashboard, id, layerConfig)
{
  var w = layerConfig.wmts;
  if(extract("auth", layerConfig, "") == "basic")
  {
    var auth_url = w.url + (w.url.indexOf("?") != -1 ? '&' : '?') + "SERVICE=WMS&REQUEST=GetCapabilities"
    $.ajax({
      url: auth_url,
      type: "GET",
      dataType: "jsonp",
      jsonp: "callback",
      beforeSend: function(xhr){
        xhr.setRequestHeader("Authorization", "Basic "+btoa("null:null"));
      },
      error: function(){},
      success: function(){},
      complete: function(response){
        var fl = L.tileLayer.wmts(w.url, {
          renderOrder: $.inArray(id, dashboard.renderlayers),
          version: w.version || "1.0.0",
          layers: geodash.codec.formatArray('layers', w, ''),
          styles: geodash.codec.formatArray('styles', w, ''),
          format: w.format || 'image/png',
          transparent: angular.isDefined(w.transparent) ? w.transparent : true,
          attribution: extract("source.attribution", layerConfig, undefined),
          tilematrixSet: "EPSG:3857",
          minZoom: extract("view.minZoom", layerConfig, 0),
          maxZoom: extract("view.maxZoom", layerConfig, 18),
          maxNativeZoom: extract("source.maxZoom", layerConfig, null)
        });
        live["featurelayers"][id] = fl;
        geodash.layers.init_featurelayer_post($scope, live, id, fl, layerConfig.visible);
      }
    });
  }
  else
  {
    var fl = L.tileLayer.wmts(w.url, {
      renderOrder: $.inArray(id, dashboard.renderlayers),
      version: w.version || "1.0.0",
      layers: geodash.codec.formatArray('layers', w, ''),
      styles: geodash.codec.formatArray('styles', w, ''),
      format: w.format || 'image/png',
      transparent: angular.isDefined(w.transparent) ? w.transparent : true,
      attribution: extract("source.attribution", layerConfig, undefined),
      tilematrixSet: "EPSG:3857",
      minZoom: extract("view.minZoom", layerConfig, 0),
      maxZoom: extract("view.maxZoom", layerConfig, 18),
      maxNativeZoom: extract("source.maxZoom", layerConfig, null)
    });
    live["featurelayers"][id] = fl;
    geodash.layers.init_featurelayer_post($scope, live, id, fl, layerConfig.visible);
  }
};

},{}],97:[function(require,module,exports){
'use strict';

/**
 * Functions to create layers
 * @namespace layers
 * @memberof geodash
 */

module.exports = {
  aggregate_fields: require("./aggregate_fields"),
  init_baselayers_leaflet: require("./init_baselayers_leaflet"),
  init_baselayers_ol3: require("./init_baselayers_ol3"),
  init_featurelayer_post: require("./init_featurelayer_post"),
  init_featurelayer_post_ol3: require("./init_featurelayer_post_ol3"),
  init_featurelayer: require("./init_featurelayer"),
  init_featurelayers: require("./init_featurelayers"),
  featurelayer: require("./featurelayer"),
  source: require("./source"),
  translate: require("./translate")
};

},{"./aggregate_fields":90,"./featurelayer":93,"./init_baselayers_leaflet":98,"./init_baselayers_ol3":99,"./init_featurelayer":100,"./init_featurelayer_post":101,"./init_featurelayer_post_ol3":102,"./init_featurelayers":103,"./source":105,"./translate":108}],98:[function(require,module,exports){
module.exports = function(map, baselayers)
{
  var layers = {};
  for(var i = 0; i < baselayers.length; i++)
  {
      var bl = baselayers[i];
      var type = extract("source.type", bl, 'tile');
      var attribution = extract("source.attribution", bl, undefined);
      var url = undefined;
      if(type.toLowerCase() == "mapbox")
      {
        var mb_layers = extract("source.mapbox.layers", bl, undefined);
        var mb_access_token = extract("source.mapbox.access_token", bl, undefined);
        if(mb_layers == undefined || mb_access_token == undefined)
        {
          console.log("MapBox Layers missing config.", bl);
        }
        else
        {
          url = "http://{s}.tiles.mapbox.com/v4/"+mb_layers+"/{z}/{x}/{y}.png?access_token="+mb_access_token;
        }
      }
      else if(type.toLowerCase() == "gwc")
      {
        var gwc_url = extract("source.gwc.url", bl, undefined);
        var gwc_layers = extract("source.gwc.layers", bl, undefined);
        if(gwc_url == undefined || gwc_layers == undefined)
        {
          console.log("GWC Layers missing config.", bl);
        }
        else
        {
          url = gwc_url+(gwc_url.endsWith("/")?'':'/')+"service/tms/1.0.0/"+gwc_layers+"@EPSG:900913@png/{z}/{x}/{y}.png";
        }
      }
      else if(type.toLowerCase() in ["tile", "tiles"])
      {
        url = extract("source.tile.url", bl, undefined);
      }
      url = url || extract("source.url", bl, undefined);
      try{
        layers[bl.id] = L.tileLayer(url, {
            id: bl.id,
            attribution: attribution
        });
      }catch(err){console.log("Could not add baselayer "+i);}
  }
  return layers;
};

},{}],99:[function(require,module,exports){
module.exports = function(map, baselayers)
{
  var layers = {};
  for(var i = 0; i < baselayers.length; i++)
  {
      var bl = baselayers[i];
      var type = extract("source.type", bl, 'tile');
      var attribution = extract("source.attribution", bl, undefined);
      var url = undefined;
      if(type.toLowerCase() == "mapbox")
      {
        var mb_layers = extract("source.mapbox.layers", bl, undefined);
        var mb_access_token = extract("source.mapbox.access_token", bl, undefined);
        if(mb_layers == undefined || mb_access_token == undefined)
        {
          console.log("MapBox Layers missing config.", bl);
        }
        else
        {
          url = "http://{a-c}.tiles.mapbox.com/v4/"+mb_layers+"/{z}/{x}/{y}.png?access_token="+mb_access_token;
        }
      }
      else if(type.toLowerCase() == "gwc")
      {
        var gwc_url = extract("source.gwc.url", bl, undefined);
        var gwc_layers = extract("source.gwc.layers", bl, undefined);
        if(gwc_url == undefined || gwc_layers == undefined)
        {
          console.log("GWC Layers missing config.", bl);
        }
        else
        {
          url = gwc_url+(gwc_url.endsWith("/")?'':'/')+"service/tms/1.0.0/"+gwc_layers+"@EPSG:900913@png/{z}/{x}/{y}.png";
        }
      }
      else if(type.toLowerCase() in ["tile", "tiles"])
      {
        url = extract("source.tile.url", bl, undefined);
      }
      url = url || extract("source.url", bl, undefined);
      try{
        layers[bl.id] = new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: url
          })
        });
        /*layers[bl.id] = L.tileLayer(url, {
            id: bl.id,
            attribution: attribution
        });*/
      }catch(err){console.log("Could not add baselayer "+i);}
  }
  return layers;
};

},{}],100:[function(require,module,exports){
module.exports = function(options)
{
  if(extract("fl.enabled", options, true))
  {
    var t = extract("fl.type", options, "").toLowerCase();

    var initFn = undefined;

    if((t == "geojson" || t == "wms") && angular.isDefined(extract("fl.heatmap", options, undefined)))
    {
      initFn = extract("heatmap", geodash.layers.featurelayer)
    }
    else
    {
      initFn = extract(t, geodash.layers.featurelayer);
    }

    initFn({
      "$scope": extract("$scope", options),
      "dashboard": extract("dashboard", options),
      "id": extract("id", options),
      "layerConfig": extract("fl", options),
      "state": extract("state", options),
      "cb": {
        "success": geodash.layers.init_featurelayer_post_ol3,
        "failed": function(x){
          geodash.log.error("layers", ["Could not initialize feature layer" + extract("id", x) +".", extract("fl", x)]);
        }
      }
    });
  }
};

},{}],101:[function(require,module,exports){
module.exports = function($scope, live, id, fl, visible)
{
  if(fl != undefined)
  {
    if(visible != undefined ? visible : true)
    {
      fl.addTo(live["map"]);
    }
    geodash.api.intend("layerLoaded", {'type':'featurelayer', 'layer': id, 'visible': visible}, $scope);
  }
  else
  {
    console.log("Could not add featurelayer "+id+" because it is undefined.");
  }
};

},{}],102:[function(require,module,exports){
module.exports = function(options)
{
  if(geodash.api.isVisible(options))
  {
    var fl = extract("fl", options);
    var layerID = extract("id", options) || extract("layerID", options);
    var $scope = extract("$scope", options) || extract("scope", options);

    geodash.var.map.addLayer(fl);
    geodash.api.intend("layerLoaded", {'type':'featurelayer', 'layer': layerID, 'visible': true}, $scope);
  }
};

},{}],103:[function(require,module,exports){
module.exports = function(featureLayers, $scope, live, dashboard, state)
{
  $.each(featureLayers, function(i, layerConfig){
    geodash.layers.init_featurelayer(layerConfig.id, layerConfig, $scope, live, dashboard, state);
  });
};

},{}],104:[function(require,module,exports){
module.exports = function(options)
{
  var source = undefined;

  var projection = "EPSG:4326";
  var local = extract("local", options);
  var url = extract("url", options);

  if(angular.isDefined(local))
  {
    source = new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(local),
      projection: projection,
    });
  }
  else if(angular.isDefined(url))
  {
    source = new ol.source.Vector({
      url: url,
      projection: projection,
      format: new ol.format.GeoJSON()
    });
  }

  return source;
};

},{}],105:[function(require,module,exports){
'use strict';

/**
 * Functions to create layer sources
 * @namespace source
 * @memberof geodash.layers
 */

module.exports = {
  geojson: require("./geojson"),
  vectortile: require("./vectortile"),
  wms: require("./wms")
};

},{"./geojson":104,"./vectortile":106,"./wms":107}],106:[function(require,module,exports){
module.exports = function(options)
{
  var source = undefined;

  var maxZoom = 18;
  var tilePixelRatio = 16;

  var tegola = extract("fl.tegola", options);

  var url = undefined;

  if(angular.isDefined(tegola))
  {
    url = tegola.url+"/maps/"+tegola.map+"/{z}/{x}/{y}.vector.pbf";
    if(extract("debug", tegola, false))
    {
      url += "?debug=true";
    }
  }

  if(angular.isDefined(url))
  {
    source = new ol.source.VectorTile({
      attributions: '',
      format: new ol.format.MVT(),
      tileGrid: ol.tilegrid.createXYZ({ maxZoom: maxZoom }),
      tilePixelRatio: tilePixelRatio,
      url: url
    });
  }

  return source;
};

},{}],107:[function(require,module,exports){
module.exports = function(options)
{
  var source = undefined;
  var w = extract("wms", options);
  if(angular.isDefined(w))
  {
    var params = {
      "LAYERS": geodash.codec.formatArray('layers', w, ''),
      "STYLES": geodash.codec.formatArray('styles', w, ''),
      "buffer": w.buffer || 0,
      "version": w.version || "1.1.1",
      "format": w.format || "image/png",
      "transparent": extract('transparent', w, true)
    };

    var cql_filter = extract('cql_filter', w, undefined);
    if(angular.isDefined(cql_filter))
    {
      params["CQL_FILTER"] = cql_filter;
    }

    source = new ol.source.ImageWMS({
      url: w.url,
      params: params,
      serverType: 'geoserver',
      crossOrigin: 'anonymous'
    });
  }
  else
  {
    geodash.log.error("source", ["Could not initialize wms source since fl.wms is undefined."]);
  }

  return source;
};

},{}],108:[function(require,module,exports){
'use strict';

/**
 * Functions to translate feature layer types
 * @namespace translate
 * @memberof geodash.layers
 */

module.exports = {
  wfs_to_geojson: require("./wfs_to_geojson")
};

},{"./wfs_to_geojson":109}],109:[function(require,module,exports){
module.exports = function(options)
{
  var fl = extract("fl", options);

  var url = undefined;

  var srs = "EPSG%3A4326";
  var layers = extract('wfs.layers', fl) || extract('wms.layers', fl);

  var params = [
    "srsName="+srs,
    "typename="+geodash.codec.formatArray(layers),
    "outputFormat=json",
    "version=1.0.0",
    "service=WFS",
    "request=GetFeature"
  ];

  url = extract("wfs.url", fl)+"?"+params.join("&");

  return url;
};

},{}],110:[function(require,module,exports){
module.exports = function(event, args)
{
  var id = args["id_hide"] || args["id"];
  try {
    $("#"+id).modal('hide');
    var modal_scope = geodash.util.getScope(id);
    var aClear = args["clear"];
    if("clear" in args && args["clear"] != undefined)
    {
      modal_scope.$apply(function () {
        $.each(aClear,function(i, x){
          modal_scope[x] = undefined;
        });
      });
    }
  }
  catch(err){};
};

},{}],111:[function(require,module,exports){
'use strict';

/**
 * Generic AngularJS listeners for GeoDash
 * @namespace log
 * @memberof geodash
 */

module.exports = {
  hideModal: require("./hideModal"),
  saveAndHide: require("./saveAndHide"),
  showModal: require("./showModal"),
  switchModal: require("./switchModal"),
  toggleModal: require("./toggleModal")
};

},{"./hideModal":110,"./saveAndHide":112,"./showModal":113,"./switchModal":114,"./toggleModal":115}],112:[function(require,module,exports){
module.exports = function(event, args)
{
  geodash.listeners.hideModal(event, args);
  //
  var target = args["id_target"] || args["id"];
  var modal_scope_target = geodash.util.getScope(target);
  var modal_scope_new = geodash.api.buildScope(event, args);
  modal_scope_target.$apply(function () {
    $.each(modal_scope_new, function(key, value){
      modal_scope_target[key] = value;
    });
    // OR
    //$.extend(modal_scope_target, modal_scope_new);
  });
};
/*
geodash.listeners.saveAndSwitch = function(event, args)
{
  geodash.listeners.hideModal(event, args);
  //
  var target = args["id_show"] || args["id"];
  var modal_scope_target = geodash.util.getScope(target);
  var modal_scope_new = geodash.api.buildScope(event, args);
  modal_scope_target.$apply(function () {
    $.each(modal_scope_new, function(key, value){ modal_scope_target[key] = value; });
  });
};*/

},{}],113:[function(require,module,exports){
module.exports = function(event, args)
{
    console.log('event', event);
    console.log('args', args);
    //
    var id = args["id_show"] || args["id"];
    var modal_scope = geodash.util.getScope(id);
    var modal_scope_new = geodash.api.buildScope(event, args);
    var modalOptions = args['modal'] || {};
    modalOptions['show'] = false;
    modal_scope.$apply(function () {
        // Update Scope
        //modal_scope = $.extend(modal_scope, modal_scope_new);
        //$.each(modal_scope_new, function(key, value){ modal_scope[key] = value; });
        /////////////////
        modal_scope.push(modal_scope_new);// Pushes New Scope to Modal's Stack
        /////////////////
        setTimeout(function(){
          // Update Modal Tab Selection
          // See https://github.com/angular-ui/bootstrap/issues/1741
          var modalElement = $("#"+id);
          var targetTab = modal_scope.tab;
          if(targetTab != undefined)
          {
            modalElement.find('.nav-tabs li').each(function(){
              var that = $(this);
              var thisTab = that.find('a').attr('href').substring(1);
              if(targetTab == thisTab)
              {
                  that.addClass('active');
              }
              else
              {
                  that.removeClass('active');
              }
            });
            modalElement.find('.tab-pane').each(function(){
              var that = $(this);
              if(targetTab == that.attr('id'))
              {
                  that.addClass('in active');
              }
              else
              {
                  that.removeClass('in active');
              }
            });
          }
          else
          {
            modalElement.find('.nav-tabs li').slice(0, 1).addClass('active');
            modalElement.find('.nav-tabs li').slice(1).removeClass('active');
            modalElement.find('.tab-pane').slice(0, 1).addClass('in active');
            modalElement.find('.tab-pane').slice(1).removeClass('in active');
          }
          geodash.ui.update(id);
          $("#"+id).modal(modalOptions);
          $("#"+id).modal('toggle');
        },0);
    });
};

},{}],114:[function(require,module,exports){
module.exports = function(event, args)
{
  geodash.listeners.hideModal(event, args);
  geodash.listeners.showModal(event, args);
};

},{}],115:[function(require,module,exports){
module.exports = function(event, args)
{
  geodash.listeners.showModal(event, args);
};

},{}],116:[function(require,module,exports){
module.exports = function(name, messages)
{
  if(!Array.isArray(geodash.var.logs[name]))
  {
    geodash.var.logs[name] = [];
  }
  if(Array.isArray(messages))
  {
    for(var i = 0; i < messages.length; i++)
    {
      geodash.var.logs[name].push({level: 'error', message: messages[i]});
    }
  }
  else if(angular.isString(messages))
  {
    geodash.var.logs[name].push({level: 'error', message: messages});
  }

};

},{}],117:[function(require,module,exports){
'use strict';

/**
 * Functions to log messages and errors with GeoDash's logging framework
 * @namespace log
 * @memberof geodash
 */

module.exports = {
  error: require("./error"),
  info: require("./info"),
  print: require("./print")
};

},{"./error":116,"./info":118,"./print":119}],118:[function(require,module,exports){
/**
 * Adds one or messages to the log identified by name.
 *
 * @function info
 * @return {(string)} name - the name of the log
 * @param {(string|String[])} messages - either 1 {@link string} message or an array of {@link string}.
 * @memberof geodash.log
 *
 * @example <caption>One Message</caption>
 * geodash.log.info("init", "Layer roads loaded.");
 *
 * @example <caption>Multiple Messages</caption>
 * geodash.log.info("init", ["Layer roads loaded.", "Layer buildings loaded"]);
 */

module.exports = function(name, messages)
{
  if(!Array.isArray(geodash.var.logs[name]))
  {
    geodash.var.logs[name] = [];
  }
  if(Array.isArray(messages))
  {
    for(var i = 0; i < messages.length; i++)
    {
      geodash.var.logs[name].push({level: 'info', message: messages[i]});
    }
  }
  else if(angular.isString(messages))
  {
    geodash.var.logs[name].push({level: 'info', message: messages});
  }

};

},{}],119:[function(require,module,exports){
module.exports = function(name)
{
  if(angular.isDefined(name))
  {
    var log = extract('var.logs.'+name, geodash);
    if(Array.isArray(log))
    {
      console.group('GeoDash Log: '+name);
      for(var i = 0; i < log.length; i++)
      {
        var message = log[i];
        if(message.level == "error")
        {
          console.warn(message.message);
        }
        else
        {
          console.log(message.message);
        }
      }
      console.groupEnd();
    }
  }
  else
  {
    $.each(geodash.var.logs, function(name, log){
      console.group("Printing log "+name+"...");
      for(var i = 0; i < log.length; i++)
      {
        var message = log[i];
        if(message.level == "error")
        {
          console.warn(message.message);
        }
        else
        {
          console.log(message.message);
        }
      }
      console.groupEnd();
    });
  }
};

},{}],120:[function(require,module,exports){
/**
 * Normalizes an OpenLayers 3 or Leaflet feature to internal GeoDash Representation
 *
 * @function feature
 * @param {Object} feature - The original feature
 * @return {Object} Normalized feature
 * @memberof geodash.normalize
 *
 * @example
 * var feature = ...
 * var normalizedFeature = geodash.normalize.feature(feature);
 * normalizedFeature = {'attributes': ..., 'geometry': ...}
 */

module.exports = function(feature, options)
{
  return {
    'attributes': feature.attributes || feature.properties || feature.values_,
    'geometry': geodash.normalize.geometry(feature.geometry || feature.getGeometry(), options),
    'projection': extract("projection.target", options)
  };
};

},{}],121:[function(require,module,exports){
/**
 * Normalizes a representation of a float to a {float}.
 *
 * @function float
 * @param {(string|float)} x - The original values_
 * @param {Object} fallback - If not a {float} or {string}, return this value.
 * @return {float} The value as a {float} object.
 * @memberof geodash.normalize
 *
 * @example
 * var x = "1.0";
 * var y = geodash.normalize.float(x);
 * y == 1.0
 */

module.exports = function(x, fallback)
{
  if(angular.isNumber(x))
  {
    return x;
  }
  else if(angular.isString(x))
  {
    if(x.length > 0)
    {
      return parseFloat(x);
    }
    else
    {
      return fallback;
    }
  }
  else
  {
    return fallback;
  }
};

},{}],122:[function(require,module,exports){
module.exports = function(geometry, options)
{
  var geometryType = undefined;
  try{
    geometryType = geometry.getType();
  }catch(err){}

  if(geometryType == "Polygon")
  {
    return geodash.normalize.polygon(geometry);
  }
  else if(geometryType == "Point")
  {
    return geodash.normalize.point(geometry, options);
  }
  else
  {
    return undefined;
  }
};

},{}],123:[function(require,module,exports){
'use strict';

/**
 * Functions to normalize OpenLayers 3 and Leaflet native objects into GeoDash objects.
 * @namespace normalize
 * @memberof geodash
 */

module.exports = {
  feature: require("./feature"),
  float: require("./float"),
  geometry: require("./geometry"),
  point: require("./point"),
  polygon: require("./polygon")
};

},{"./feature":120,"./float":121,"./geometry":122,"./point":124,"./polygon":125}],124:[function(require,module,exports){
/**
 * Normalizes a representation of an OpenLayers 3 or Leaflet point to a GeoDash point.
 *
 * @function point
 * @param {(ol.geom.Point|L.point)} x - The original value
 * @return {Object} The value as a GeoDash Object
 * @memberof geodash.normalize
 *
 * @see http://openlayers.org/en/latest/apidoc/ol.geom.Point.html
 * @see http://leafletjs.com/reference.html#point
 *
 * @example
 * var x = "1.0";
 * var y = geodash.normalize.point(x);
 * y == {'lat': 0.0, 'lon': 0.0}
 */

module.exports = function(point, options)
{
  if("flatCoordinates" in point)
  {
    var coords = point.flatCoordinates;
    if(extract("projection.target", options))
    {
      coords = ol.proj.transform(coords, options.projection.source || "EPSG:3857", options.projection.target);
      return { 'lat': coords[1], 'lon': coords[0] };
    }
    else
    {
      return { 'lat': coords[1], 'lon': coords[0] };
    }
  }
  else if(Array.isArray(point))
  {
    return {
      'lat': point[1],
      'lon': point[0]
    };
  }
  else
  {
    return {
      'lat': point.lat,
      'lon': (point.lon || point.lng || point.long || 0.0)
    };
  }
};

},{}],125:[function(require,module,exports){
module.exports = function(geometry)
{
  return {
    'ring': geometry.flatCoordinates
  };
};

},{}],126:[function(require,module,exports){
module.exports = function(chart, layer, feature, state)
{
  var html = "";
  html += "<div style=\"text-align:center;\"><b>"+chart.label+"</b></div><br>";
  html += "<div id=\""+chart.id+"\" class=\"geodash-popup-chart\"></div>";
  return html;
};

},{}],127:[function(require,module,exports){
module.exports = function(field, layer, feature, state)
{
  var output = field["output"] || field["attribute"];
  var html = undefined;
  var bInclude = false;
  if(field.when != undefined)
  {
    if(field.when.toLowerCase() == "defined")
    {
      if(feature.attributes[output] != undefined)
      {
        bInclude = true;
      }
    }
    else
    {
      bInclude = true;
    }
  }
  else
  {
    bInclude = true;
  }

  if(bInclude)
  {
    if(field.type == "link")
    {
      var value = field.value != undefined ? field.value : "{{ feature.attributes." + output + " }}";
      html = "<span>";
      if(angular.isString(field.label) && field.label.length > 0)
      {
        html += "<b>"+ field.label +":</b> ";
      }
      html = "<a target=\"_blank\" href=\""+field.url+"\">";
      html += value;
      html += "</a></span>";
    }
    else
    {
      var value = undefined;
      if(field.value != undefined)
      {
        value = field.value;
      }
      else
      {
        if(field.type == "date")
        {
          var format = field.format || "medium";
          value = "feature.attributes." + output + " | date:'"+format+"'"
        }
        else
        {
          value = "feature.attributes." + output
        }
        if(field.fallback)
        {
          value = "("+value+") || '"+field.fallback+"'"
        }
        value = "{{ "+value +" }}";
      }
      if(angular.isString(field.label) && field.label.length > 0)
      {
        html = "<span><b>"+ field.label +":</b> "+value+"</span>";
      }
      else
      {
        html = "<span>"+value+"</span>";
      }
    }
  }
  return html;
};

},{}],128:[function(require,module,exports){
module.exports = function($interpolate, featureLayer, feature, state)
{
  var popupTemplate = geodash.popup.buildPopupTemplate(featureLayer.popup, featureLayer, feature, state);
  var ctx = {
    'layer': featureLayer,
    'feature': feature,
    'state': state
  };
  if(angular.isDefined(extract("config.popup.context", geodash)))
  {
    angular.extend(ctx, extract("config.popup.context", geodash));
  }
  var content = $interpolate(popupTemplate)(ctx);
  var title = angular.isString(featureLayer.popup.title) ? $interpolate(featureLayer.popup.title)(ctx) : "";
  return { 'content': content, 'title': title }
};

},{}],129:[function(require,module,exports){
module.exports = function(popup, layer, feature, state)
{
  var panes = popup.panes;
  var popupTemplate = "";
  //////////////////
  if(geodash.mapping_library == "leaflet" && angular.isString(popup.title))
  {
    popupTemplate += "<h5 style=\"word-wrap:break-word;text-align:center;\">"+popup.title+"</h5>";
  }
  //////////////////
  var paneContents = [];
  if(Array.isArray(panes))
  {
    for(var i = 0; i < panes.length; i++)
    {
      var pane = panes[i];
      var popupFields = [];
      var popupCharts = [];
      if("fields" in pane)
      {
        for(var j = 0; j < pane.fields.length; j++)
        {
          var popupField = geodash.popup.buildField(pane.fields[j], layer, feature, state);
          if(popupField != undefined)
          {
            popupFields.push(popupField);
          }
        }
      }
      if("charts" in pane)
      {
        for(var j = 0; j < pane.charts.length; j++)
        {
          var popupChart = geodash.popup.buildChart(pane.charts[j], layer, feature, state);
          if(popupChart != undefined)
          {
            popupCharts.push(popupChart);
          }
        }
      }
      var paneContent = popupFields.join("<br>");
      if(popupCharts.length > 0)
      {
        paneContent += "<hr>" + popupCharts.join("<br>");
      }
      paneContents.push(paneContent);
    }
    //////////////////
    if(panes.length > 1)
    {
      var tabs = [];
      var pane = panes[0];
      var html_tab ="<li class=\"active\"><a role=\"tab\" data-toggle=\"tab\" href=\"#"+pane.id+"\">"+pane.tab.label+"</a></li>";
      tabs.push(html_tab);
      for(var i = 1; i < panes.length; i++)
      {
        pane = panes[i];
        html_tab = "<li><a role=\"tab\" data-toggle=\"tab\" href=\"#"+pane.id+"\">"+pane.tab.label+"</a></li>"
        tabs.push(html_tab);
      }
      var html_tabs = "<ul class=\"nav nav-tabs nav-justified\">"+tabs.join("")+"</ul>";
      ///////////////
      var paneContentsWithWrapper = [];
      var html_pane = "<div id=\""+panes[0].id+"\" class=\"tab-pane fade in active\" style=\"padding: 4px;height:"+geodash.config.popup.height+";\">"+paneContents[0]+"</div>";
      paneContentsWithWrapper.push(html_pane);
      for(var i = 1; i < panes.length; i++)
      {
        html_pane = "<div id=\""+panes[i].id+"\" class=\"tab-pane fade\" style=\"padding: 4px;height:"+geodash.config.popup.height+";\">"+paneContents[i]+"</div>";
        paneContentsWithWrapper.push(html_pane);
      }
      ///////////////
      popupTemplate += html_tabs + "<div class=\"tab-content\">"+paneContentsWithWrapper.join("")+"</div>";
    }
    else
    {
      popupTemplate += paneContents[0];
    }
  }
  return popupTemplate;
};

},{}],130:[function(require,module,exports){
'use strict';

/**
 * Functions to build popup content and open popups
 * @namespace popup
 * @memberof geodash
 */

module.exports = {
  buildChart: require("./buildChart"),
  buildField: require("./buildField"),
  buildPopupTemplate: require("./buildPopupTemplate"),
  buildPopupContentAndTitle: require("./buildPopupContentAndTitle"),
  openPopup: require("./openPopup")
};

},{"./buildChart":126,"./buildField":127,"./buildPopupContentAndTitle":128,"./buildPopupTemplate":129,"./openPopup":131}],131:[function(require,module,exports){
module.exports = function($interpolate, featureLayer, feature, location, map, state)
{
  var popupContentAndTitle = geodash.popup.buildPopupContentAndTitle($interpolate, featureLayer, feature, state);
  if(geodash.mapping_library = "ol3")
  {
    var popup = map.getOverlays().item(0);
    var view = map.getView();
    var newCenter = ol.proj.fromLonLat([location.lon, location.lat], view.getProjection());
    popup.setPosition(newCenter);
    var element = $("#popup");
    element.popover('destroy');
    element.popover({
      'placement': 'top',
      'animation': false,
      'html': true,
      'content': popupContentAndTitle.content,
      'title': popupContentAndTitle.title
    });

    setTimeout(function(){
      element.popover('show');

      if(angular.isDefined(extract("popup.css.properties", featureLayer)))
      {
        var tip = element.data("bs.popover").$tip;
        var styleMap = geodash.util.arrayToObject(extract("popup.css.properties", featureLayer));
        tip.css(styleMap);
      }

      // Add Listeners for Tabs
      $('.popover').each(function(){
        var popoverElement = $(this);
        $('.nav-tabs', popoverElement).each(function(){
          var tabs = $(this);
          tabs.on('click', '[data-toggle="tab"]', function(e){
            e.preventDefault();

            var target = $(this).attr("href");

            $("li", tabs).removeClass("active");
            $(this).parents("li:first").addClass("active");

            $(".tab-pane", popoverElement).removeClass("in active");
            $(target).addClass("in active");

            return false;
          });
        });
      });

      var listeners = extract("popup.listeners.show", geodash.config);
      if(Array.isArray(listeners))
      {
        for(var i = 0; i < listeners.length; i++)
        {
          listeners[i](featureLayer, feature, location, map, state);
        }
      }

      // Pan to Popup
      var pixel = map.getPixelFromCoordinate(newCenter);
      var offset = Math.floor($(".popover").height() / 2.0);
      pixel[1] = pixel[1] - offset;
      var pan = ol.animation.pan({ duration: 500, source: view.getCenter() });
      map.beforeRender(pan);
      view.setCenter(map.getCoordinateFromPixel(pixel));

    },0);

  }
  else
  {
    var popup = new L.Popup({maxWidth: (featureLayer.popup.maxWidth || 400)}, undefined);
    popup.setLatLng(new L.LatLng(location.lat, location.lon));
    popup.setContent(popupContentAndTitle.content);
    map.openPopup(popup);
  }
};

},{}],132:[function(require,module,exports){
'use strict';
/*global require, window, console, jQuery, $, angular, Bloodhound, location */

/**
 * Functions for building OpenLayes 3 and Leaflet Styles from GeoDash layer configuration.
 * @namespace style
 * @memberof geodash
 */

module.exports = {
  ol3: require("./ol3"),
  leaflet: require("./leaflet"),
  symbolizer: require("./symbolizer"),
  translate: require("./translate")
};

},{"./leaflet":133,"./ol3":134,"./symbolizer":136,"./translate":140}],133:[function(require,module,exports){
module.exports = function(f, layer)
{
  //
  //var state = angular.element(document.body).injector().get('state');
  var $scope = angular.element("#geodash-main").scope();
  var state = $scope.state;
  var dashboard = angular.element(document.body).injector().get('dashboard');
  //
  var style = {};
  var popatrisk = geodash.api.getFeatureLayer("popatrisk", {"$scope": $scope});
  if(angular.isDefined(popatrisk))
  {
    var style_static = extract(["cartography", 0, "styles", "default", "static"], popatrisk);
    $.extend(style, style_static);
    var style_dynamic = extract(["cartography", 0, "styles", "default", "dynamic", "func"], popatrisk);
    var options = extract(["cartography", 0, "styles", "default", "dynamic", "options"], popatrisk);
    var delta = angular.isFunction(geodash[style_dynamic]) ? geodash[style_dynamic](f, state, dashboard, options) : undefined;
    if(delta != undefined)
    {
      $.extend(style, delta);
    }
  }
  return style;
};

},{}],134:[function(require,module,exports){
module.exports = function(options)
{
  var feature = extract("feature", options);
  var resolution = extract("resolution", options);
  var layerID = extract("layerID", options);
  var styleFnWorkspaces = extract("styleFnWorkspaces", options);
  //
  var styles = [];
  //var layerID = this.layerID;
  var mainScope = geodash.util.getScope("geodash-main");
  var fl = geodash.api.getFeatureLayer(layerID);
  if(angular.isDefined(fl))
  {
    var currentStyle = 0;
    var geometryType = feature.getGeometry().getType();
    var symbolizers = extract(["carto", "styles", currentStyle, "symbolizers"], fl, []);
    for(var i = 0; i < symbolizers.length; i++)
    {
      var symbolizer = symbolizers[i];
      var symbolizerType = extract("type", symbolizer);
      var symbolizerFn = extract(symbolizerType || "default", geodash.style.symbolizer);
      var style = symbolizerFn({
        "feature": feature,
        "symbolizer": symbolizer,
        "styleFnWorkspaces": styleFnWorkspaces,
        "state": extract("state", mainScope),
        "dashboard": extract("dashboard", mainScope)
      });
      if(angular.isDefined(style))
      {
        styles.push(new ol.style.Style(style))
      }
    }
  }
  return styles;
};

},{}],135:[function(require,module,exports){
module.exports = function(options)
{
  var symbolizer = options.symbolizer;
  var styleFnWorkspaces = options.styleFnWorkspaces || extract('dynamicStyleFunctionWorkspaces', geodash.config, [geodash.dynamicStyleFn]);
  //
  var style_static = extract(["static", "properties"], symbolizer);
  var style_dynamic_fn_name = extract(["dynamic", "func"], symbolizer);
  var style_dynamic_fn = undefined;
  if(angular.isDefined(style_dynamic_fn_name))
  {
    for(var j = 0; j < styleFnWorkspaces.length; j++)
    {
      style_dynamic_fn = extract(style_dynamic_fn_name, styleFnWorkspaces[j]);
      if(angular.isFunction(style_dynamic_fn))
      {
        break;
      }
    }
  }
  var style = geodash.style.translate.ol3({
    'feature': options.feature,
    'state': options.state,
    'dashboard': options.dashboard,
    'style_static': style_static,
    'style_dynamic_fn': style_dynamic_fn,
    'style_dynamic_options': extract(["dynamic", "options"], symbolizer)
  });

  return style;
};

},{}],136:[function(require,module,exports){
'use strict';
/*global require, window, console, jQuery, $, angular, Bloodhound, location */

/**
 * Symbolizer functions
 * @namespace symbolizer
 * @memberof geodash.style
 */

module.exports = {
  default: require("./default"),
  line: require("./line"),
  point: require("./point"),
  polygon: require("./polygon")
};

},{"./default":135,"./line":137,"./point":138,"./polygon":139}],137:[function(require,module,exports){
module.exports = function(options)
{
  return geodash.style.symbolizer.default(options);
};

},{}],138:[function(require,module,exports){
arguments[4][137][0].apply(exports,arguments)
},{"dup":137}],139:[function(require,module,exports){
arguments[4][137][0].apply(exports,arguments)
},{"dup":137}],140:[function(require,module,exports){
'use strict';
/*global require, window, console, jQuery, $, angular, Bloodhound, location */
module.exports = {
  ol3: require("./ol3")
};

},{"./ol3":141}],141:[function(require,module,exports){
//module.exports = function(f, style_static, style_dynamic_fn, style_dynamic_options)
module.exports = function(options)
{
  var style = {};
  var f = extract('feature', options) || extract('f', options);
  var state = extract('state', options);
  var config = extract('dashboard', options) || extract('config', options);
  var style_static = angular.isArray(extract('style_static', options)) ? geodash.util.arrayToObject(extract('style_static', options)) : extract('style_static', options);
  var style_dynamic_fn = extract('style_dynamic_fn', options);
  var style_dynamic_options = extract('style_dynamic_options', options);
  ////
  var styleStaticAndDynamic = {};
  angular.extend(styleStaticAndDynamic, style_static);
  if(angular.isFunction(style_dynamic_fn))
  {
    var delta = style_dynamic_fn(f, state, config, style_dynamic_options);
    if(angular.isDefined(delta))
    {
      angular.extend(styleStaticAndDynamic, delta);
    }
  }

  var geometryType = f.getGeometry().getType();

  var textContent = extract("textContent", styleStaticAndDynamic);
  var textCode = extract("textCode", styleStaticAndDynamic);
  if(angular.isDefined(textContent) || angular.isDefined(textCode))
  {
    if(! angular.isDefined(textContent))
    {
      textContent = String.fromCharCode(parseInt(textCode, 16));
    }
    var textOptions = {
      textAlign: extract("textAlign", styleStaticAndDynamic, "center"),
      textBaseline: extract("textBaseline", styleStaticAndDynamic, "middle"),
      font: extract("textFont", styleStaticAndDynamic, "normal 10px Verdana"),
      text: textContent,
      fill: new ol.style.Fill({color: extract("textColor", styleStaticAndDynamic, "#000000")}),
      offsetX: 0,
      offsetY: 0,
      rotation: 0
    };
    style["text"] = new ol.style.Text(textOptions);
  }

  if(geometryType == "Point")
  {
    var circleOptions = {
        radius: extractFloat("radius", styleStaticAndDynamic, 5.0)
    };
    if(angular.isDefined(extract("strokeColor", styleStaticAndDynamic)))
    {
      var strokeWidth = extractFloat("strokeWidth", styleStaticAndDynamic, 1.0);
      if(strokeWidth > 0)
      {
        circleOptions["stroke"] = new ol.style.Stroke({
          color: extract("strokeColor", styleStaticAndDynamic),
          width: strokeWidth
        });
      }
    }
    if(angular.isDefined(extract("fillColor", styleStaticAndDynamic)))
    {
      var fillColor = extract("fillColor", styleStaticAndDynamic);
      var fillOpacity = extractFloat("fillOpacity", styleStaticAndDynamic)
      if(angular.isDefined(fillOpacity))
      {
        try{
          var fillColorAsArray = ol.color.asArray(fillColor).slice();
          fillColorAsArray[3] = fillOpacity;
          fillColor = fillColorAsArray;
        }catch(err){}
      }
      circleOptions["fill"] = new ol.style.Fill({ color: fillColor })
    }
    style["image"] = new ol.style.Circle(circleOptions);
  }

  if(geometryType == "Polygon" || geometryType == "MultiLineString" || geometryType == "MultiPolygon")
  {
    if(angular.isDefined(extract("strokeColor", styleStaticAndDynamic)))
    {
      var strokeWidth = extractFloat("strokeWidth", styleStaticAndDynamic, 1.0);
      if(strokeWidth > 0)
      {
        style["stroke"] = new ol.style.Stroke({
          color: extract("strokeColor", styleStaticAndDynamic),
          width: strokeWidth
        });
      }
    }
  }

  if(geometryType == "Polygon" || geometryType == "MultiPolygon")
  {
    if(angular.isDefined(extract("fillColor", styleStaticAndDynamic)))
    {
      var fillColor = extract("fillColor", styleStaticAndDynamic);
      var fillOpacity = extractFloat("fillOpacity", styleStaticAndDynamic)
      if(angular.isDefined(fillOpacity))
      {
        try{
          var fillColorAsArray = ol.color.asArray(fillColor).slice();
          fillColorAsArray[3] = fillOpacity;
          fillColor = fillColorAsArray;
        }catch(err){}
      }
      style["fill"] = new ol.style.Fill({ color: fillColor })
    }
  }

  return style;
};

},{}],142:[function(require,module,exports){
'use strict';

/**
 * Functions for tile math
 * @namespace tilemath
 * @memberof geodash
 */

module.exports = {
  D2R: (Math.PI / 180),
  R2D: (180 / Math.PI),
  point_to_bbox: require("./point_to_bbox"),
  point_to_radius: require("./point_to_radius"),
  tile_to_lat: require("./tile_to_lat"),
  tile_to_lon: require("./tile_to_lon"),
  tms_to_bbox: require("./tms_to_bbox")
};

},{"./point_to_bbox":143,"./point_to_radius":144,"./tile_to_lat":145,"./tile_to_lon":146,"./tms_to_bbox":147}],143:[function(require,module,exports){
/**
 * Converts a point to it's corresponding lat lon bounding box.
 *
 * @function point_to_bbox
 * @param {(int|float)} x - the x coordinate of the point
 * @param {(int|float)} y - the y coordinate of the point
 * @param {(int)} z - the zoom level in web mercator
 * @param {(int)} digits - the zoom level in web mercator
 * @return {Object[]} The bounding box as an array [w, s, e, n].
 * @memberof geodash.tilemath
 *
 * @example
 * var bbox = geodash.tilemath.point_to_bbox(12, 12, 4, 4);
 */

module.exports = function(x, y, z, digits)
{
  var radius = geodash.tilemath.point_to_radius(z);
  var e = x + radius; if(digits != undefined && digits >= 0){e = e.toFixed(digits);}
  var w = x - radius; if(digits != undefined && digits >= 0){w = w.toFixed(digits);}
  var s = y - radius; if(digits != undefined && digits >= 0){s = s.toFixed(digits);}
  var n = y + radius; if(digits != undefined && digits >= 0){n = n.toFixed(digits);}
  return [w, s, e, n];
};

},{}],144:[function(require,module,exports){
/**
 * Gets the click radius for a given point for web mercator maps
 *
 * @function point_to_radius
 * @param {(int)} z - the zoom level in web mercator
 * @return {(float)} The click radius
 * @memberof geodash.tilemath
 *
 * @example
 * var bbox = geodash.tilemath.point_to_radius(4);
 */

module.exports = function(z)
{
  return (geodash.config.click_radius || 4.0) / z;
};

},{}],145:[function(require,module,exports){
/**
 * Converts a tile y-coordinate to its corresponding latitude value.
 *
 * @function tile_to_lat
 * @param {(int)} y - the y coordinate of the tile
 * @param {(int)} z - the zoom level in web mercator
 * @return {(float)} the latitude
 * @memberof geodash.tilemath
 *
 * @example
 * var bbox = geodash.tilemath.tile_to_lat(12, 4);
 */

module.exports = function(y, z)
{
  n = Math.pi - 2 * Math.PI * y / Math.pow(2,z);
  return ( R2D * Math.atan(0.5 * ( Math.exp(n) - Math.exp(-n))));
};

},{}],146:[function(require,module,exports){
/**
 * Converts a tile x-coordinate to its corresponding longitude value.
 *
 * @function tile_to_lon
 * @param {(int)} x - the x coordinate of the tile
 * @param {(int)} z - the zoom level in web mercator
 * @return {(float)} the longitde
 * @memberof geodash.tilemath
 *
 * @example
 * var bbox = geodash.tilemath.tile_to_lon(12, 4);
 */

module.exports = function(x, z)
{
  return x / Math.pow(2, z) * 360-180;
};

},{}],147:[function(require,module,exports){
/**
 * Converts a tile tms coordinate into its corresponding latitude longitude bounding box.
 *
 * @function tms_to_bbox
 * @param {(int)} x - the x coordinate of the tile
 * @param {(int)} y - the y coordinate of the tile
 * @param {(int)} z - the zoom level in web mercator
 * @return {(float)} the bounding box as [w, s, e, n]
 * @memberof geodash.tilemath
 *
 * @example
 * var bbox = geodash.tilemath.tms_to_bbox(12, 12, 4);
 */

module.exports = function(x, y, z)
{
  var e = geodash.tilemath.tile_to_lon(x+1, z);
  var w = geodash.tilemath.tile_to_lon(x, z);
  var s = geodash.tilemath.tile_to_lat(y+1, z);
  var n = geodash.tilemath.tile_to_lat(y, z);
  return [w, s, e, n];
};

},{}],148:[function(require,module,exports){
module.exports = function(element, featurelayers, baselayers, servers, codecs)
{
  var datasets = [];
  var template_suggestion = extract(
    element.data('template-suggestion') || 'GeoDashLayer',
    geodash.typeahead.templates.suggestion);

  var local = geodash.bloodhound.initLocal(
    "featurelayers",
    featurelayers,
    baselayers,
    servers);
  var engine = geodash.bloodhound.engine({ 'local': local });
  var templates = {
    suggestion: template_suggestion
  };
  var dataset = {
    name: "geodash",
    engine: engine,
    minLength: 0,
    limit: 10,
    hint: false,
    highlight: true,
    display: geodash.typeahead.displayFn,
    source: function (query, syncResults, asyncResults)
    {
      // https://github.com/twitter/typeahead.js/pull/719#issuecomment-43083651
      // http://pastebin.com/adWHFupF
      //query == "" ? cb(data) : engine.ttAdapter()(query, cb);
      this.engine.ttAdapter()(query, syncResults, asyncResults);
    },
    templates: templates
  };
  datasets.push(dataset);

  return datasets;
};

},{}],149:[function(require,module,exports){
module.exports = function(element, featurelayers, baselayers, servers, codecs)
{
  var datasets = [];
  var template_suggestion = extract(
    element.data('template-suggestion') || 'GeoDashLayer',
    geodash.typeahead.templates.suggestion);

  var local = geodash.bloodhound.initLocal(
    "featurelayerswithfilters",
    featurelayers,
    baselayers,
    servers);
  var engine = geodash.bloodhound.engine({ 'local': local });
  var templates = {
    suggestion: template_suggestion
  };
  var dataset = {
    name: "geodash",
    engine: engine,
    minLength: 0,
    limit: 10,
    hint: false,
    highlight: true,
    display: geodash.typeahead.displayFn,
    source: function (query, syncResults, asyncResults)
    {
      // https://github.com/twitter/typeahead.js/pull/719#issuecomment-43083651
      // http://pastebin.com/adWHFupF
      //query == "" ? cb(data) : engine.ttAdapter()(query, cb);
      this.engine.ttAdapter()(query, syncResults, asyncResults);
    },
    templates: templates
  };
  datasets.push(dataset);

  return datasets;
};

},{}],150:[function(require,module,exports){
module.exports = function(element, featurelayers, baselayers, servers, codecs)
{
  var datasets = [];
  var template_suggestion = extract(element.data('template-suggestion') || 'default', geodash.typeahead.templates.suggestion);
  var url = geodash.api.getEndpoint("geodash_capabilities_json");
  var local = undefined;
  var prefetchOptions = {
    url: url,
    dataType: 'json',
    codec: "GeoDashCapabilities",
    cache: false,
    codecs: codecs
  };
  var prefetch = geodash.bloodhound.prefetch(prefetchOptions);
  var remoteOptions = {
    url: url,
    dataType: 'json',
    codec: "GeoDashCapabilities",
    rate: 1000,
    codecs: codecs
  };
  var remote = geodash.bloodhound.remote(remoteOptions);
  var engine = geodash.bloodhound.engine({
    'local': local,
    'prefetch': prefetch,
    'remote': remote
  });
  var templates = {
    suggestion: template_suggestion
  };
  var dataset = {
    name: "dashboards",
    engine: engine,
    minLength: 0,
    limit: 10,
    hint: false,
    highlight: true,
    display: geodash.typeahead.displayFn,
    source: function (query, syncResults, asyncResults)
    {
      // https://github.com/twitter/typeahead.js/pull/719#issuecomment-43083651
      // http://pastebin.com/adWHFupF
      //query == "" ? cb(data) : engine.ttAdapter()(query, cb);
      this.engine.ttAdapter()(query, syncResults, asyncResults);
    },
    templates: templates
  };
  datasets.push(dataset);

  return datasets;
};

},{}],151:[function(require,module,exports){
module.exports = function(element, featurelayers, baselayers, servers, codecs)
{
  var datasets = [];
  var template_suggestion = extract(
    element.data('template-suggestion') || 'Image',
    geodash.typeahead.templates.suggestion);

  var local = geodash.bloodhound.initLocal(
    "images",
    featurelayers,
    baselayers,
    servers);
  var engine = geodash.bloodhound.engine({ 'local': local });
  var templates = {
    suggestion: template_suggestion
  };
  var dataset = {
    name: "images",
    engine: engine,
    minLength: 0,
    limit: 10,
    hint: false,
    highlight: true,
    display: geodash.typeahead.displayFn,
    source: function (query, syncResults, asyncResults)
    {
      // https://github.com/twitter/typeahead.js/pull/719#issuecomment-43083651
      // http://pastebin.com/adWHFupF
      //query == "" ? cb(data) : engine.ttAdapter()(query, cb);
      this.engine.ttAdapter()(query, syncResults, asyncResults);
    },
    templates: templates
  };
  datasets.push(dataset);

  return datasets;
};

},{}],152:[function(require,module,exports){
module.exports = function(element, featurelayers, baselayers, servers, codecs)
{
  var datasets = [];
  var template_suggestion = extract(element.data('template-suggestion') || 'default', geodash.typeahead.templates.suggestion);
  var tegolaservers = geodash.api.listTegolaServers();
  for(var i = 0; i < tegolaservers.length; i++)
  {
    var server = wmsservers[i];
    var url = extract('wms.url', server)+'/capabilities';
    var local = undefined;
    var prefetchOptions = {
      url: url,
      dataType: 'json',
      codec: "TegolaCapabilities",
      cache: false,
      codecs: codecs
    };
    var prefetch = geodash.bloodhound.prefetch(prefetchOptions);
    var remoteOptions = {
      url: url,
      dataType: 'json',
      codec: "TegolaCapabilities",
      rate: 1000,
      codecs: codecs
    };
    var remote = geodash.bloodhound.remote(remoteOptions);
    var engine = geodash.bloodhound.engine({
      'local': local,
      'prefetch': prefetch,
      'remote': remote
    });
    var templates = {
      header: '<h3 style="margin: 0 20px 5px 20px; padding: 3px 0; border-bottom: 1px solid #ccc;">'+ extract('title' || 'id', server, "") +'</h3>',
      suggestion: template_suggestion
    };
    var dataset = {
      name: extract('id', server, 'server_'+i),
      engine: engine,
      minLength: 0,
      limit: 10,
      hint: false,
      highlight: true,
      display: geodash.typeahead.displayFn,
      source: function (query, syncResults, asyncResults)
      {
        // https://github.com/twitter/typeahead.js/pull/719#issuecomment-43083651
        // http://pastebin.com/adWHFupF
        //query == "" ? cb(data) : engine.ttAdapter()(query, cb);
        this.engine.ttAdapter()(query, syncResults, asyncResults);
      },
      templates: templates
    };
    datasets.push(dataset);
  }

  return datasets;
};

},{}],153:[function(require,module,exports){
module.exports = function(element, featurelayers, baselayers, servers, codecs)
{
  var datasets = [];
  var template_suggestion = extract(element.data('template-suggestion') || 'default', geodash.typeahead.templates.suggestion);
  var wmsservers = geodash.api.listWMSServers();
  for(var i = 0; i < wmsservers.length; i++)
  {
    var server = wmsservers[i];
    var url = extract('wms.url', server)+'?service=wms&request=GetCapabilities';
    var local = undefined;
    var prefetchOptions = {
      url: url,
      dataType: 'xml',
      codec: "WMSCapabilities",
      cache: false,
      codecs: codecs
    };
    var prefetch = geodash.bloodhound.prefetch(prefetchOptions);
    var remoteOptions = {
      url: url,
      dataType: 'xml',
      codec: "WMSCapabilities",
      rate: 1000,
      codecs: codecs
    };
    var remote = geodash.bloodhound.remote(remoteOptions);
    var engine = geodash.bloodhound.engine({
      'local': local,
      'prefetch': prefetch,
      'remote': remote
    });
    var templates = {
      header: '<h3 style="margin: 0 20px 5px 20px; padding: 3px 0; border-bottom: 1px solid #ccc;">'+ extract('title' || 'id', server, "") +'</h3>',
      suggestion: template_suggestion
    };
    var dataset = {
      name: extract('id', server, 'server_'+i),
      engine: engine,
      minLength: 0,
      limit: 10,
      hint: false,
      highlight: true,
      display: geodash.typeahead.displayFn,
      source: function (query, syncResults, asyncResults)
      {
        // https://github.com/twitter/typeahead.js/pull/719#issuecomment-43083651
        // http://pastebin.com/adWHFupF
        //query == "" ? cb(data) : engine.ttAdapter()(query, cb);
        this.engine.ttAdapter()(query, syncResults, asyncResults);
      },
      templates: templates
    };
    datasets.push(dataset);
  }

  return datasets;
};

},{}],154:[function(require,module,exports){
module.exports = function(element, featurelayers, baselayers, servers, codecOptions)
{
  var datasets = [];
  var local = geodash.bloodhound.initLocal(
    element.data('localData'),
    featurelayers,
    baselayers,
    servers);
  var prefetchOptions = element.data('prefetchData');
  var prefetch = geodash.bloodhound.prefetch(
    prefetchOptions,
    featurelayers,
    baselayers,
    servers,
    codecOptions);
  var remoteOptions = element.data('remoteData');
  var remote = geodash.bloodhound.remote(
    remoteOptions,
    featurelayers,
    baselayers,
    servers,
    codecOptions);

  if((angular.isDefined(local) && local.length > 0) || angular.isDefined(prefetch) || angular.isDefined(remote))
  {
    // Twitter Typeahead with
    //https://github.com/bassjobsen/typeahead.js-bootstrap-css
    var engine = geodash.bloodhound.engine({
      'local': local,
      'prefetch': prefetch,
      'remote': remote
    });

    var templates = {
      empty: element.attr('data-template-empty'),
      suggestion: extract(element.data('template-suggestion') || 'default', geodash.typeahead.templates.suggestion),
      footer: geodash.typeahead.footer
    };
    var dataset = {
      name: element.attr('name'),
      engine: engine,
      minLength: 0,
      limit: 10,
      hint: false,
      highlight: true,
      display: geodash.typeahead.displayFn,
      source: function (query, syncResults, asyncResults)
      {
        // https://github.com/twitter/typeahead.js/pull/719#issuecomment-43083651
        // http://pastebin.com/adWHFupF
        //query == "" ? cb(data) : engine.ttAdapter()(query, cb);
        this.engine.ttAdapter()(query, syncResults, asyncResults);
      },
      templates: templates
    };
    datasets.push(dataset);
  }
  return datasets;
};

},{}],155:[function(require,module,exports){
'use strict';

/**
 * Constructors to return datasets for typeahead
 * @namespace datasets
 * @memberof geodash.typeahead
 */

module.exports = {
  default: require("./default"),
  FeatureLayers: require("./FeatureLayers"),
  FeatureLayersWithFilters: require("./FeatureLayersWithFilters"),
  GeoDashDashboards: require("./GeoDashDashboards"),
  Images: require("./Images"),
  TegolaServers: require("./TegolaServers"),
  WMSServers: require("./WMSServers")
};

},{"./FeatureLayers":148,"./FeatureLayersWithFilters":149,"./GeoDashDashboards":150,"./Images":151,"./TegolaServers":152,"./WMSServers":153,"./default":154}],156:[function(require,module,exports){
module.exports = function(data)
{
  return angular.isString(data) ? data : (data.text || data.id);  // Order is critically important to have dataset.engine.get work
};

},{}],157:[function(require,module,exports){
module.exports = function (data)
{
  if(! angular.isDefined(data.query))
  {
    return "";
  }
  else if(data.query.length == 0)
  {
    return "";
  }
  else
  {
    return '<div>Searched for <strong>' + data.query + '</strong></div>';
  }
};

},{}],158:[function(require,module,exports){
module.exports = function(datasets, value)
{
  var results = [];
  for(var i = 0; i < datasets.length; i++)
  {
    var x = datasets[i].engine.get(value);
    if(Array.isArray(x))
    {
      results = results.concat(x);
    }
  }
  return results;
};

},{}],159:[function(require,module,exports){
'use strict';

/**
 * Functions to initialize Twitter typeahead seach interfaces.
 * @namespace typeahead
 * @memberof geodash
 */

module.exports = {
  datasets: require("./datasets"),
  displayFn: require("./displayFn"),
  footer: require("./footer"),
  templates: require("./templates"),
  listeners: require("./listeners"),
  getResultsFromDatasets: require("./getResultsFromDatasets")
};

},{"./datasets":155,"./displayFn":156,"./footer":157,"./getResultsFromDatasets":158,"./listeners":162,"./templates":166}],160:[function(require,module,exports){
module.exports = function(event)
{
  console.log("Blur Event: ", event);
  if(angular.isDefined($(this).data('datasets')))
  {
    var valueFromInput = $(this).val();
    var datasets = $(this).data('datasets');
    //
    var results = geodash.typeahead.getResultsFromDatasets(datasets, valueFromInput);
    var resultIndex = $(this).attr('data-search-output')|| 'id';
    var newValue = results.length == 1 ? extract(resultIndex, results[0]) : null;

    geodash.ui.saveToInput(this, newValue);
    geodash.ui.saveToScope(this, newValue);
    geodash.ui.changeTab(this, newValue);
  }
};

},{}],161:[function(require,module,exports){
module.exports = function(event, value)
{
  console.log("Change Event: ", event, value);
  if(angular.isDefined($(this).data('datasets')))
  {
    var datasets = $(this).data('datasets');
    //
    var results = geodash.typeahead.getResultsFromDatasets(datasets, value);
    var resultIndex = $(this).attr('data-search-output')|| 'id';
    var newValue = results.length == 1 ? extract(resultIndex, results[0]) : null;

    geodash.ui.saveToInput(this, newValue);
    geodash.ui.saveToScope(this, newValue);
    geodash.ui.changeTab(this, newValue);
  }
};

},{}],162:[function(require,module,exports){
'use strict';
module.exports = {
  blur: require("./blur"),
  change: require("./change"),
  keydown: require("./keydown"),
  keyup: require("./keyup"),
  select: require("./select")
};

},{"./blur":160,"./change":161,"./keydown":163,"./keyup":164,"./select":165}],163:[function(require,module,exports){
module.exports = function(event, value)
{
  console.log("Keydown Event: ", event, value);
  if(event.which == 27)
  {
    if($(this).hasClass("typeahead"))
    {
      event.preventDefault();
      $(this).typeahead('close');
      return false;
    }
  }
};

},{}],164:[function(require,module,exports){
module.exports = function(event, value)
{
  console.log("Keyup Event: ", event, value);
  if(event.which == 40)
  {
    geodash.ui.showOptions(this);
  }
  return true;
};

},{}],165:[function(require,module,exports){
module.exports = function(event, obj) {
  console.log("Select Event: ", event, obj);
  //
  var resultIndex = $(this).attr('data-search-output')|| 'id';
  var newValue = extract(resultIndex, obj, null);

  geodash.ui.saveToInput(this, newValue);
  geodash.ui.saveToScope(this, newValue);
  geodash.ui.changeTab(this, newValue);
};

},{}],166:[function(require,module,exports){
'use strict';
module.exports = {
  suggestion: require("./suggestion")
};

},{"./suggestion":171}],167:[function(require,module,exports){
module.exports = function(data)
{
  if(extract('obj.type', data) == "geojson")
  {
    return '<p><strong>' + (extract('obj.title', data) || extract('obj.id', data)) + '</strong> ('+extract('obj.id', data)+')<br><span style="color:#00C;">' + (extract('obj.type', data) || extract('obj.source.type', data)) + '</span> | <span style="color:#00C;">' + geodash.codec.parseURL(extract('obj.geojson.url', data), 'geojson').domain + '</p>';
  }
  else if(extract('obj.type', data) == "wms")
  {
    return '<p><strong>' + (extract('obj.title', data) || extract('obj.id', data)) + '</strong> ('+extract('obj.id', data)+')<br><span style="color:#00C;"> wms </span> | <span style="color:#00C;">' + geodash.codec.parseURL(extract('obj.wms.url', data), 'wms').domain + '</p>';
  }
  else if(extract('obj.source.type', data) == "tiles")
  {
    return '<p><strong>' + (extract('obj.title', data) || extract('obj.id', data)) + '</strong> ('+extract('obj.id', data)+')<br><span style="color:#00C;"> tiles </span> | <span style="color:#00C;">' + geodash.codec.parseURL(extract('obj.source.tile.url', data), 'tiles').domain + '</p>';
  }
  else
  {
    return '<p><strong>' + (extract('obj.title', data) || extract('obj.id', data)) + '</strong> ('+extract('obj.id', data)+')<br><span style="color:#00C;">' + (extract('obj.type', data) || extract('obj.source.type', data)) + '</span></p>';
  }
};

},{}],168:[function(require,module,exports){
module.exports = function(data)
{
  //"background-image": "linear-gradient(rgba(47, 39, 39, 0.2) 50%, rgba(183, 54, 54, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(90deg, rgba(47, 39, 39, 0.2) 50%, rgba(183, 54, 54, 0) 50%, rgba(0, 0, 0, 0))"
  //var colors = ["#555", "#AAA"];
  var color = ["#000", "transparent"];
  var opacity = [".25", ".75"];
  var tileSize = 10;
  var backgroundImage = [
    "-webkit-gradient(linear, 0 100%, 100% 0, color-stop("+opacity[0]+", "+color[0]+"), color-stop("+opacity[0]+", "+color[1]+"))",
    "-webkit-gradient(linear, 0 0, 100% 100%, color-stop("+opacity[0]+", "+color[0]+"), color-stop("+opacity[0]+", "+color[1]+"))",
    "-webkit-gradient(linear, 0 100%, 100% 0, color-stop("+opacity[1]+", "+color[1]+"), color-stop("+opacity[1]+","+color[0]+"))",
    "-webkit-gradient(linear, 0 0, 100% 100%, color-stop("+opacity[1]+", "+color[1]+"), color-stop("+opacity[1]+", "+color[0]+"))"
  ].join(", ")+";";
  /*var backgroundImage = [
    "-webkit-gradient(linear, 0 100%, 100% 0, color-stop(.25, #000), color-stop(.25, transparent))",
    "-webkit-gradient(linear, 0 0, 100% 100%, color-stop(.25, #000), color-stop(.25, transparent))",
    "-webkit-gradient(linear, 0 100%, 100% 0, color-stop(.75, transparent), color-stop(.75, #000))",
    "-webkit-gradient(linear, 0 0, 100% 100%, color-stop(.75, transparent), color-stop(.75, #000))"
  ].join(",")+";";*/


  var styleMap = {
    "margin-right": "4px",
    "width": "60px",
    "max-height": "60px",
    "border": "2px solid #AAA",
    "box-sizing": "border-box",
    "background-size": tileSize+"px "+tileSize+"px",
    "-webkit-background-size": tileSize+"px "+(tileSize+1)+"px",
    "background-position": "0 0, "+(tileSize/2)+"px 0, "+(tileSize/2)+"px -"+(tileSize/2)+"px, 0px "+(tileSize/2)+"px",
    "background-image": backgroundImage,
    "background-color": "#555",
    "padding": "4px"
  };
  if(data.obj.title == data.obj.id)
  {
    return '<div><img src="'+data.obj.url+'" style="'+geodash.codec.formatCSS(styleMap)+'"><div style="display:inline-block;">' + data.obj.title + '</div></div>';
  }
  else
  {
    return '<div><img src="'+data.obj.url+'" style="'+geodash.codec.formatCSS(styleMap)+'"><div style="display:inline-block;"><b>' + data.obj.title + '</b><br>(' + data.obj.id + ')</div></div>';
  }
};

},{}],169:[function(require,module,exports){
module.exports = function(data)
{
  return '<p><img src="'+data.extra.thumbnail+'" width="40" height="40" style="margin-right: 4px;"><strong>' + data.text + '</strong></p>';
};

},{}],170:[function(require,module,exports){
module.exports = function(data)
{
  if(data.text == data.id)
  {
    if(data.text != undefined)
    {
      return '<p><strong>' + data.text + '</strong></p>';
    }
    else
    {
      return "";
    }
  }
  else
  {
    return '<p><strong>' + data.text + '</strong> (' + data.id + ')</p>';
  }
};

},{}],171:[function(require,module,exports){
'use strict';
module.exports = {
  "default": require("./default"),
  "GeoDashLayer": require("./GeoDashLayer"),
  "Image": require("./Image"),
  "WMSLayer": require("./WMSLayer")
};

},{"./GeoDashLayer":167,"./Image":168,"./WMSLayer":169,"./default":170}],172:[function(require,module,exports){
module.exports = function(element, newValue)
{
  if(angular.isDefined(element))
  {
    var tab_id_template = $(element).attr('data-target-tab-id')
    if(angular.isString(tab_id_template))
    {
      var tab_id = tab_id_template.replace("###value###", newValue);
      if(angular.isString(tab_id))
      {
        var tab_element = $('#'+tab_id);
        var tab_content = tab_element.parents(".tab-content:first");
        $(".tab-pane", tab_content).removeClass("in active");
        tab_element.addClass("in active");
      }
    }
  }
};

},{}],173:[function(require,module,exports){
/**
 * Deletes the value from an Angular scope
 *
 * @function clearFromScope
 * @param {Object} element - The typeahead element
 * @param {(Object|string)} newValue - The new value to be saved
 * @return {Object} object - returns new object
 * @memberof geodash.ui
 */

module.exports = function(element)
{
  if(angular.isDefined(element))
  {
    var scope_id = $(element).attr('data-target-scope-id');
    if(angular.isString(scope_id))
    {
      var $scope = geodash.util.getScope(scope_id);
      if(angular.isDefined($scope))
      {
        if(angular.isString($(element).attr('data-target-scope-path')))
        {
          var targetScopePath = $(element).attr('data-target-scope-path');
          try { targetScopePath = JSON.parse(targetScopePath); }catch(err){}

          var targetScopeChange = $(element).attr('data-target-scope-change');
          try { targetScopeChange = JSON.parse(targetScopePath); }catch(err){}

          var path = undefined;
          var path_array = undefined;
          var path_flat = undefined;
          if(Array.isArray(targetScopePath))
          {
            path_array = targetScopePath;
            path = path_array.join(".");
            path_flat = path_array.join("__");
          }
          else
          {
            path = targetScopePath;
            path_array = path.split(".");
            path_flat = path_array.join("__");
          }

          $scope.$apply(function(){
            $scope.clearValue(path_array, $scope);
            $.each($scope, function(key, value){
              if(key.startsWith(path_flat+"__"))
              {
                delete $scope[key];
              }
            });
          });

          if(Array.isArray(targetScopeChange))
          {
            var changeFn = extract(targetScopeChange[0], $scope);
            if(angular.isFunction(changeFn))
            {
              changeFn.apply(this, targetScopeChange.slice(1));
            }
          }
        }
        else
        {
          $scope.$apply(function(){
            $scope.clearValue($scope.path_array, $scope.workspace);
            $.each($scope.workspace_flat, function(key, value){
              if(key.startsWith($scope.path_flat+"__"))
              {
                delete $scope.workspace_flat[key];
                delete $scope.stack.head.workspace_flat[key];
              }
            });
          });

          if(Array.isArray(targetScopeChange))
          {
            var changeFn = extract(targetScopeChange[0], $scope);
            if(angular.isFunction(changeFn))
            {
              changeFn.apply(this, targetScopeChange.slice(1));
            }
          }
        }
      }
    }
  }
};

},{}],174:[function(require,module,exports){
module.exports = function()
{
  var styleMap = {
    "display": "inline-block",
    "width": "100%",
    "overflow": "hidden",
    "text-overflow": "ellipsis"
  }
  return styleMap;
}

},{}],175:[function(require,module,exports){
'use strict';

/**
 * Functions to build CSS
 * @namespace css
 * @memberof geodash.ui
 */

module.exports = {
  ellipsis: require("./ellipsis"),
  tiledBackground: require("./tiledBackground")
};

},{"./ellipsis":174,"./tiledBackground":176}],176:[function(require,module,exports){
module.exports = function(tileSize, backgroundColor)
{
  tileSize = tileSize || 10;
  backgroundColor = backgroundColor || "#555";

  var color = ["#222", "transparent"];
  var opacity = [".25", ".75"];

  var backgroundImage = [
    "-webkit-gradient(linear, 0 100%, 100% 0, color-stop("+opacity[0]+", "+color[0]+"), color-stop("+opacity[0]+", "+color[1]+"))",
    "-webkit-gradient(linear, 0 0, 100% 100%, color-stop("+opacity[0]+", "+color[0]+"), color-stop("+opacity[0]+", "+color[1]+"))",
    "-webkit-gradient(linear, 0 100%, 100% 0, color-stop("+opacity[1]+", "+color[1]+"), color-stop("+opacity[1]+","+color[0]+"))",
    "-webkit-gradient(linear, 0 0, 100% 100%, color-stop("+opacity[1]+", "+color[1]+"), color-stop("+opacity[1]+", "+color[0]+"))"
  ].join(", ")+";";

  var styleMap = {
    "background-size": tileSize+"px "+tileSize+"px",
    "-webkit-background-size": tileSize+"px "+(tileSize+1)+"px",
    "background-position": "0 0, "+(tileSize/2)+"px 0, "+(tileSize/2)+"px -"+(tileSize/2)+"px, 0px "+(tileSize/2)+"px",
    "background-image": backgroundImage,
    "background-color": backgroundColor
  };
  return styleMap;
};

},{}],177:[function(require,module,exports){
'use strict';

/**
 * Functions to synchronize Bootstrap, jQuery, and Angular.
 * @namespace ui
 * @memberof geodash
 */

module.exports = {
  css: require("./css"),
  changeTab: require("./changeTab"),
  clearFromScope: require("./clearFromScope"),
  toggleOptions: require("./toggleOptions"),
  showOptions: require("./showOptions"),
  init_slider_label: require("./init_slider_label"),
  init_slider_slider: require("./init_slider_slider"),
  update_slider_label: require("./update_slider_label"),
  update_tab: require("./update_tab"),
  update: require("./update"),
  saveToInput: require("./saveToInput"),
  saveToScope: require("./saveToScope")
};

},{"./changeTab":172,"./clearFromScope":173,"./css":175,"./init_slider_label":178,"./init_slider_slider":179,"./saveToInput":180,"./saveToScope":181,"./showOptions":182,"./toggleOptions":183,"./update":184,"./update_slider_label":185,"./update_tab":186}],178:[function(require,module,exports){
module.exports = function($interpolate, that, type, range, value)
{
  if(type=="ordinal")
  {
    var ctx = {"value": value};
    that.data('label').html($interpolate(that.data('label-template'))(ctx));
  }
  else if(type=="continuous")
  {
    if(($.type(range) == "boolean" && range ) || (range.toLowerCase() == "true"))
    {
      var ctx = {"values": [value[0], value[1]]};
      that.data('label').html($interpolate(that.data('label-template'))(ctx));
    }
    else if(range=="min" || range=="max")
    {
      var ctx = {"value": value};
      that.data('label').html($interpolate(that.data('label-template'))(ctx));
    }
  }
};

},{}],179:[function(require,module,exports){
module.exports = function($interpolate, $scope, that, type, range, value, minValue, maxValue, step)
{
  if(type=="ordinal")
  {
    that.slider({
      range: (($.type(range) == "boolean" && range ) || (range.toLowerCase() == "true")) ? true : range,
      value: value,
      min: 0,
      max: maxValue,
      step: 1,
      slide: function(event, ui) {
          geodash.ui.update_slider_label.apply(this, [$interpolate, event, ui]);
          var layer = that.data('layer');
          var output = that.data('output');
          var newValue = that.data('options')[ui.value];
          var filter = {};
          filter[output] = newValue;
          geodash.api.intend("filterChanged", {"layer": layer, "filter":filter}, $scope);
      }
    });
  }
  else if(type=="continuous")
  {
    if(($.type(range) == "boolean" && range ) || (range.toLowerCase() == "true"))
    {
      that.slider({
        range: true,
        values: value,
        min: minValue,
        max: maxValue,
        step: step,
        slide: function(event, ui) {
            geodash.ui.update_slider_label.apply(this, [$interpolate, event, ui]);
            var layer = that.data('layer');
            var output = that.data('output');
            var newValue = ui.values;
            var filter = {};
            filter[output] = newValue;
            geodash.api.intend("filterChanged", {"layer":layer, "filter":filter}, $scope);
        }
      });
    }
    else if(range=="min" || range=="max")
    {
      that.slider({
        range: range,
        value: value,
        min: minValue,
        max: maxValue,
        step: step,
        slide: function(event, ui) {
            geodash.ui.update_slider_label.apply(this, [$interpolate, event, ui]);
            var layer = that.data('layer');
            var output = that.data('output');
            var newValue = ui.value / 100.0;
            var filter = {};
            filter[output] = newValue;
            geodash.api.intend("filterChanged", {"layer":layer, "filter":filter}, $scope);
        }
      });
    }
  }
};

},{}],180:[function(require,module,exports){
module.exports = function(element, newValue)
{
  if(angular.isDefined(element))
  {
    var input_id = $(element).attr('data-target-input-id');
    if(angular.isString(input_id))
    {
      var input_element = $('#'+input_id);
      if(input_element.length > 0)
      {
        if(angular.isDefined(newValue) && newValue != null)
        {
          if(angular.isString(newValue))
          {
            input_element.val(newValue)
              .trigger('input')
              .change();

            if(input_element.hasClass("typeahead"))
            {
              input_element.trigger('typeahead:change');
            }
          }
          else
          {
            input_element.val(JSON.stringify(newValue))
              .trigger('input')
              .change();

            if(input_element.hasClass("typeahead"))
            {
              input_element.trigger('typeahead:change');
            }
          }
        }
        else
        {
          input_element.val(null)
            .trigger('input')
            .change();

          if(input_element.hasClass("typeahead"))
          {
            input_element.trigger('typeahead:change');
          }
        }
      }
    }
  }
};

},{}],181:[function(require,module,exports){
/**
 * Saves the typeahead value to an Angular Scope
 *
 * @function saveToInput
 * @param {Object} element - The input element
 * @param {(Object|string)} newValue - The new value to be saved
 * @memberof geodash.ui
 */

module.exports = function(element, newValue)
{
  if(angular.isDefined(element))
  {
    var scope_id = $(element).attr('data-target-scope-id');
    if(angular.isString(scope_id))
    {
      var $scope = geodash.util.getScope(scope_id);
      if(angular.isDefined($scope))
      {
        if(angular.isString($(element).attr('data-target-scope-path')))
        {
          var targetScopePath = $(element).attr('data-target-scope-path');
          try { targetScopePath = JSON.parse(targetScopePath); }catch(err){}

          var targetScopeChange = $(element).attr('data-target-scope-change');
          try { targetScopeChange = JSON.parse(targetScopePath); }catch(err){}

          var path = undefined;
          var path_array = undefined;
          var path_flat = undefined;
          if(Array.isArray(targetScopePath))
          {
            path_array = targetScopePath;
            path = path_array.join(".");
            path_flat = path_array.join("__");
          }
          else
          {
            path = targetScopePath;
            path_array = path.split(".");
            path_flat = path_array.join("__");
          }

          $scope.$apply(function(){
            $scope.setValue(path_array, newValue, $scope);
            $.each($scope, function(key, value){
              if(key.startsWith(path_flat+"__"))
              {
                $scope[key] = undefined;
              }
            });
            if(angular.isDefined(newValue) && newValue != null)
            {
              if(! angular.isString(newValue))
              {
                $.each(geodash.util.flatten(newValue), function(i, x){
                  $scope[path_flat+"__"+i] = x;
                });
              }
            }
          });

          if(Array.isArray(targetScopeChange))
          {
            var changeFn = extract(targetScopeChange[0], $scope);
            if(angular.isFunction(changeFn))
            {
              changeFn.apply(this, targetScopeChange.slice(1));
            }
          }
        }
        else
        {
          $scope.$apply(function(){
            $scope.setValue($scope.path_array, newValue, $scope.workspace);
            $.each($scope.workspace_flat, function(key, value){
              if(key.startsWith($scope.path_flat+"__"))
              {
                $scope.workspace_flat[key] = $scope.stack.head.workspace_flat[key] = undefined;
              }
            });
            if(angular.isDefined(newValue) && newValue != null)
            {
              $.each(geodash.util.flatten(newValue), function(i, x){
                $scope.workspace_flat[$scope.path_flat+"__"+i] = $scope.stack.head.workspace_flat[$scope.path_flat+"__"+i] = x;
              });
            }
          });

          if(Array.isArray(targetScopeChange))
          {
            var changeFn = extract(targetScopeChange[0], $scope);
            if(angular.isFunction(changeFn))
            {
              changeFn.apply(this, targetScopeChange.slice(1));
            }
          }
        }
      }
    }
  }
};

},{}],182:[function(require,module,exports){
module.exports = function(selector)
{
  try{
    var input = $(selector);
    if(angular.isDefined(extract("ttTypeahead", input.data())))
    {
      if(! input.data('ttTypeahead').isOpen())
      {
        input.typeahead('open');
      }

      //var query = var x = datasets[i].engine.get(value);
      var query = input.val();
      var menu = input.data('ttTypeahead').menu;
      if(menu.getActiveSelectable() == null || menu.getActiveSelectable().length == 0)
      {
        menu.update.apply(menu, [query]);
        //menu will call .source(query, sync, async) for each dataset, so no need to cycle here.
      }
    }
  }catch(err){};
};

},{}],183:[function(require,module,exports){
module.exports = function($event, selector)
{
  //var selector = $(event.currentTarget).attr('data-target');
  //try{ $(selector).typeahead('close'); }catch(err){};
  return geodash.ui.showOptions($event, selector);
};

},{}],184:[function(require,module,exports){
/**
 * Updates the elements user interface
 *
 * @function update
 * @param {(String|Object)} element - The DOM element or it's id
 * @param {(String)} tab - The id of the tab to show, if applicable.
 * @memberof geodash.ui
 */

module.exports = function(element, tab)
{
  var id = angular.isString(element) ? element : $(element).attr("id");
  element = angular.isString(element) ? $("#"+id) : element;

  var $scope = geodash.util.getScope(id);

  $('[data-toggle="tooltip"]', element).tooltip();

  geodash.init.typeahead(
    element,
    extract('workspace.config.featurelayers', $scope),
    extract('workspace.config.baselayers', $scope),
    extract('workspace.config.servers', $scope)
  );

  var tab_element = $('a[href="#'+tab+'"]');
  tab_element.parents("nav-tabs:first").find("li").removeClass("active");
  tab_element.parents("li:first").addClass("active");

  var pane_element = $('#'+tab);
  var tab_content = pane_element.parents(".tab-content:first");
  $(".tab-pane", tab_content).removeClass("in active");
  pane_element.addClass("in active");
};

},{}],185:[function(require,module,exports){
module.exports = function($interpolate, event, ui)
{
  var that = $(this);
  var type = that.data('type');
  var range = that.data('range');

  if(type=="ordinal")
  {
    var ctx = {"value": that.data('options')[ui.value]};
    that.data('label').html($interpolate(that.data('label-template'))(ctx));
  }
  else if(type=="continuous")
  {
    if(($.type(range) == "boolean" && range ) || (range.toLowerCase() == "true"))
    {
      var ctx = {"values": [ui.values[0], ui.values[1]]};
      that.data('label').html($interpolate(that.data('label-template'))(ctx));
    }
    else if(range=="min" || range=="max")
    {
      var ctx = {"value": (ui.value / 100.0)};
      that.data('label').html($interpolate(that.data('label-template'))(ctx));
    }
  }
};

},{}],186:[function(require,module,exports){
module.exports = function(e)
{
  var targetSelector = $(this).attr("href");
  if(angular.isDefined(targetSelector))
  {
    var targetElement = $(targetSelector);
    if(targetElement.length > 0)
    {
      $('[data-toggle="tooltip"]', targetElement).tooltip();

      $(".c3", targetElement).each(function(){
        $(this).data('chart').resize();
      });
    }
  }
};

},{}],187:[function(require,module,exports){
/**
 * Takes an array of objects with values name and value and creates and object.
 *
 * @function arrayToObject
 * @param {Object[]} x - The array to map to an object.
 * @param {string} x[].name - The name of the property.
 * @param {string} x[].value - The value of the property.
 * @return {Object} object - returns new object
 * @memberof geodash.api
 *
 * @example
 * var a = [{'name': 'x', 'value': 'y'}, {'name': 'q', 'value': 'r'}]
 * var b = geodash.util.arrayToObject(a);
 * b == {'x': 'y', 'q': 'r'}
 */

module.exports = function(x)
{
  var y = {};
  if(angular.isArray(x))
  {
    for(var i = 0; i < x.length; i++)
    {
      if("value" in x[i])
      {
        y[x[i].id || x[i].name] = x[i].value;
      }
      else
      {
        y[x[i].id || x[i].name] = x[i];
      }
    }
  }
  return y;
}

},{}],188:[function(require,module,exports){
/**
 * Deletes the property in target at the given location given by keyChain.
 *
 * @function clearValue
 * @param {Object} keyChain - The key chain of the property
 * @param {Object} target - The object
 * @memberof geodash.api
 */

module.exports = function(keyChain, target)
{
  if(angular.isString(keyChain))
  {
    keyChain = keyChain.split("__");
  }

  if(keyChain.length == 1)
  {
    delete target[keyChain[0]];
  }
  else
  {
    for(var j = 0; j < keyChain.length -1 ; j++)
    {
      var newKey = keyChain[j];
      if(!(newKey in target))
      {
        var iTest = -1;
        try{iTest = parseInt(keyChain[j+1], 10);}catch(err){iTest = -1;};
        target[newKey] = iTest >= 0 ? [] : {};
      }
      target = target[newKey];
    }
    var finalKey = keyChain[keyChain.length-1];
    delete target[finalKey];
  }
};

},{}],189:[function(require,module,exports){
/**
 * Returns a deep copy of an object or primitive using jQuery extend when needed.
 *
 * @function deepCopy
 * @param {Object[]|string|yObject} x - object or primitive to copy
 * @return {Object} - a deepy copy version of the original object.
 * @memberof geodash.api
 */

module.exports = function(x)
{
  if(Array.isArray(x))
  {
    return $.extend(true, [], x);
  }
  else if(angular.isString(x) || angular.isNumber(x))
  {
    return x;
  }
  else if(angular.isDefined(x))
  {
    return $.extend(true, {}, x);
  }
};

},{}],190:[function(require,module,exports){
module.exports = function(paths, a, b)
{
  var diff = [];
  if(angular.isDefined(a) && angular.isDefined(b))
  {
    for(var i = 0; i < paths.length; i++)
    {
      var path = paths[i];
      var text_a = JSON.stringify(extract(path, a, ""));
      var text_b = JSON.stringify(extract(path, b, ""));
      if(text_a != text_b)
      {
        diff.push(path);
      }
    }
  }
  else if(angular.isDefined(a) && (! angular.isDefined(b)))
  {
    diff = paths;
  }
  else if((! angular.isDefined(a)) && angular.isDefined(b))
  {
    diff = paths;
  }
  else
  {
    diff = [];
  }
  return diff;
};

},{}],191:[function(require,module,exports){
/**
 * Flattens an object.
 *
 * @function flatten
 * @param {Object} obj - The original object
 * @param {string|undefined} prefix - A prefix, if any, to add to the new object's keys.
 * @return {Object} object - the flattened version of the object
 * @memberof geodash.api
 *
 * @example
 * var a = {'x': {'y': 'z' }}
 * var b = geodash.api.fatten(a);
 * b == {'x__y': 'z'}
 */

module.exports = function(obj, prefix)
{
  var newObject = {};
  $.each(obj, function(key, value){
    var newKey = prefix != undefined ? prefix+"__"+key : key;
    if(
      (value === undefined) ||
      (value === null) ||
      angular.isString(value) ||
      angular.isNumber(value) ||
      (typeof value == "boolean")
    )
    {
      newObject[newKey] = value;
    }
    else if(angular.isArray(value))
    {
      $.each(geodash.util.flatten(value, newKey), function(key2, value2){
        newObject[""+key2] = value2;
      });
    }
    else
    {
      $.each(geodash.util.flatten(value, newKey), function(key2, value2){
        newObject[key2] = value2;
      });
    }
  });
  return newObject;
};

},{}],192:[function(require,module,exports){
module.exports = function(id, arr)
{
  var result = undefined;
  var matches = $.grep(arr, function(x, i){ return x.id == id; });
  if(matches.length == 1)
  {
    result = matches[0];
  }
  return result;
};

},{}],193:[function(require,module,exports){
module.exports = function(keys, type)
{
    var value = undefined;
    if(typeof keys === 'string')
    {
      keys = [keys.toLowerCase()];
    }
    else
    {
      keys = $.map(keys,function(value, i){return value.toLowerCase();});
    }
    var hash_lc = location.hash.toLowerCase();
    for(var i = 0; i < keys.length; i++)
    {
      var key = keys[i];
      var keyAndHash = hash_lc.match(new RegExp(key + '=([^&]*)'));
      if(keyAndHash)
      {
          value = keyAndHash[1];
          if(value != undefined && value != null && value != "")
          {
            break;
          }
      }
    }

    if(type != undefined)
    {
        if(type == "integer")
        {
          value = (value != undefined && value != null && value != "") ? parseInt(value, 10) : undefined;
        }
        else if(type == "stringarray")
        {
          if(value != undefined)
          {
            var newValue = value.split(",");
            value = newValue;
          }
        }
        else if(type == "integerarray")
        {
          if(value != undefined)
          {
            var sValue = value.split(",");
            var newValue = [];
            for(var i = 0; i < sValue.length; i++)
            {
              var v = sValue[i];
              newValue.push((v != undefined && v != null && v != "") ? parseInt(v, 10) : undefined);
            }
            value = newValue;
          }
        }
        else if(type == "float")
        {
          value = (value != undefined && value != null && value != "") ? parseFloat(value) : undefined;
        }
        else if(type == "floatarray")
        {
          if(value !=undefined)
          {
            var sValue = value.split(",");
            var newValue = [];
            for(var i = 0; i < sValue.length; i++)
            {
              var v = sValue[i];
              newValue.push((v != undefined && v != null && v != "") ? parseFloat(v) : undefined);
            }
            value = newValue;
          }
        }
    }
    return value;
};

},{}],194:[function(require,module,exports){
module.exports = function(name, url)
{
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

},{}],195:[function(require,module,exports){
/**
 * Gets an [AngularJS](https://angularjs.org/) [scope](https://docs.angularjs.org/guide/scope) for a given element
 *
 * @function getScope
 * @param {(string)} id - The id of the element for the Angular Controller
 * @return {(Object|undefined)} If the element is found, will try isolateScope and then scope.  If not found, returns undefined.
 * @memberof geodash.api
 *
 * @see https://docs.angularjs.org/guide/scope
 *
 * @example
 * var $scope = geodash.util.getScope('geodash-main');
 * var $scope = geodash.api.getEndpoint('geodash-modal-welcome');
 */

module.exports = function(id)
{
  return angular.element("#"+id).isolateScope() || angular.element("#"+id).scope();
};

},{}],196:[function(require,module,exports){
module.exports = function(keys)
{
    var value = geodash.util.getHashValue(keys);
    return value != undefined && value != null && value != "";
};

},{}],197:[function(require,module,exports){
'use strict';
/*global require, window, console, jQuery, $, angular, Bloodhound, location */

/**
 * Utility functions for GeoDashJS
 *
 * @namespace geodash.util
 */

module.exports = {
  arrayToObject: require("./arrayToObject"),
  clearValue: require("./clearValue"),
  deepCopy: require("./deepCopy"),
  diff: require("./diff"),
  flatten: require("./flatten"),
  getByID: require("./getByID"),
  getHashValue: require("./getHashValue"),
  getParameterByName: require("./getParameterByName"),
  getScope: require("./getScope"),
  hasHashValue: require("./hasHashValue"),
  objectToArray: require("./objectToArray"),
  parseTrue: require("./parseTrue"),
  setValue: require("./setValue"),
  unpack: require("./unpack"),
  updateValue: require("./updateValue")
};

},{"./arrayToObject":187,"./clearValue":188,"./deepCopy":189,"./diff":190,"./flatten":191,"./getByID":192,"./getHashValue":193,"./getParameterByName":194,"./getScope":195,"./hasHashValue":196,"./objectToArray":198,"./parseTrue":199,"./setValue":200,"./unpack":201,"./updateValue":202}],198:[function(require,module,exports){
/**
 * Takes an object and creates an array of keys and values.
 *
 * @function objectToArray
 * @param {Object[]} x - The object to transform to an array
 * @return {Object} object - returns new array
 * @memberof geodash.api
 *
 * @example
 * var a = {'x': 'y', 'q': 'r'};
 * var b = geodash.util.objectToArray(a);
 * b == [{'name': 'x', 'value': 'y'}, {'name': 'q', 'value': 'r'}]
 */

module.exports = function(x)
{
  var y = [];
  if(angular.isDefined(x))
  {
    var keys = Object.keys(x);
    for(var i = 0; i < keys.length; i++)
    {
      y.push({'name': keys[i], 'value': x[keys[i]]});
    }
  }
  return y;
}

},{}],199:[function(require,module,exports){
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

},{}],200:[function(require,module,exports){
module.exports = function(keyChain, value, target)
{
  // Update dashboard
  if(angular.isString(keyChain))
  {
    keyChain = keyChain.split("__");
  }

  if(keyChain.length == 1)
  {
    target[keyChain[0]] = value;
  }
  else
  {
    for(var j = 0; j < keyChain.length -1 ; j++)
    {
      var newKey = keyChain[j];
      if(!(newKey in target))
      {
        var iTest = -1;
        try{iTest = parseInt(keyChain[j+1], 10);}catch(err){iTest = -1;};
        target[newKey] = iTest >= 0 ? [] : {};
      }
      target = target[newKey];
    }
    var finalKey = keyChain[keyChain.length-1];
    if(angular.isArray(target))
    {
      if(finalKey >= target.length)
      {
        var zeros = finalKey - target.length;
        for(var k = 0; k < zeros; k++ )
        {
          target.push({});
        }
        target.push(value);
      }
      else
      {
        target[finalKey] = value;
      }
    }
    else
    {
      target[finalKey] = value;
    }
  }
};

},{}],201:[function(require,module,exports){
module.exports = function(obj)
{
  var newObject = {};
  $.each(obj, function(key, value){
    if(key.indexOf("__") == -1)
    {
      newObject[key] = value;
    }
    else
    {
      var keyChain = key.split("__");
      var target = obj;
      for(var j = 0; j < keyChain.length; j++)
      {
        var newKey = keyChain[j];
        if(!(newKey in target))
        {
          target[newKey] = {};
        }
        target = target[newKey];
      }
      target[keyChain[keyChain.length-1]] = value;
    }
  });
  return newObject;
};

},{}],202:[function(require,module,exports){
module.exports = function(field_flat, source, target)
{
  if(field_flat.indexOf("__") == -1)
  {
    target[field_flat] = source[field_flat];
  }
  else
  {
    var keyChain = field_flat.split("__");
    for(var j = 0; j < keyChain.length -1 ; j++)
    {
      var newKey = keyChain[j];
      if(!(newKey in target))
      {
        var iTest = -1;
        try{iTest = parseInt(keyChain[j+1], 10);}catch(err){iTest = -1;};
        target[newKey] = iTest >= 0 ? [] : {};
      }
      target = target[newKey];
    }
    var finalKey = keyChain[keyChain.length-1];
    if(angular.isArray(target))
    {
      if(finalKey >= target.length)
      {
        var zeros = finalKey - target.length;
        for(var k = 0; k < zeros; k++ )
        {
          target.push({});
        }
        target.push(source[field_flat]);
      }
      else
      {
        target[finalKey] = source[field_flat];
      }
    }
    else
    {
      target[finalKey] = source[field_flat];
    }
  }
};

},{}],203:[function(require,module,exports){
/**
 * Find the closest location in b to a
 *
 * @name arrayToObject
 * @param {Object} a
 * @param {Object} b
 * @return {Object} point
 * @memberof geodash.vecmath
 */

module.exports = function(a, b)
{
  if(b.toString != undefined && b.toString().startsWith('LatLng'))
  {
    return b;
  }
  else if(b.getType != undefined && b.getType() == 'Point')
  {
    return b;
  }
  else
  {
    if(typeof L != "undefined")
    {
      var p = L.Projection.SphericalMercator;
      var minDistance = undefined;
      var closestPoint = undefined;
      $.each(b._layers, function(id, layer)
      {
        var rings = [];
        if(layer.feature.geometry.type == "MultiPolygon")
        {
          for(var i = 0; i < layer._latlngs.length; i++)
          {
            for(var j = 0; j < layer._latlngs[i].length; j++)
            {
              rings.push(layer._latlngs[i][j]);
            }
          }
        }
        else
        {
          rings.push(layer._latlngs);
        }
        for(var r = 0; r < rings.length; r++)
        {
          var verticies = rings[r];
          var i = 0;
          if(minDistance == undefined)
          {
            minDistance = L.LineUtil.pointToSegmentDistance(
              p.project(a),
              p.project(verticies[i]),
              p.project(verticies[i+1]));
            closestPoint = L.LineUtil.closestPointOnSegment(
              p.project(a),
              p.project(verticies[i]),
              p.project(verticies[i+1]));
            i++;
          }
          for(; i < verticies.length -1; i++)
          {
            var d = L.LineUtil.pointToSegmentDistance(
              p.project(a),
              p.project(verticies[i]),
              p.project(verticies[i+1]));
            if(d < minDistance)
            {
              minDistance = d;
              closestPoint = L.LineUtil.closestPointOnSegment(
                p.project(a),
                p.project(verticies[i]),
                p.project(verticies[i+1]));
            }
          }
        }
      });
      return p.unproject(closestPoint);
    }
    else
    {
      return undefined;
    }
  }
};

},{}],204:[function(require,module,exports){
module.exports = function(a, b)
{
  var minDistance = undefined;
  if(b.toString != undefined && b.toString().startsWith('LatLng'))
  {
    var p = L.Projection.SphericalMercator;
    minDistance = (p.project(a)).distanceTo(p.project(b));
  }
  else if(b.getType != undefined && b.getType() == 'Point')
  {
    minDistance = ol.sphere.WGS84.haversineDistance([a.lon, a.lat], b.flatCoordinates);
  }
  else
  {
    if(typeof L != "undefined")
    {
      $.each(b._layers, function(id, layer)
      {
        var rings = [];
        if(layer.feature.geometry.type == "MultiPolygon")
        {
          for(var i = 0; i < layer._latlngs.length; i++)
          {
            for(var j = 0; j < layer._latlngs[i].length; j++)
            {
              rings.push(layer._latlngs[i][j]);
            }
          }
        }
        else
        {
          rings.push(layer._latlngs);
        }
        for(var r = 0; r < rings.length; r++)
        {
          var verticies = rings[r];
          var i = 0;
          if(minDistance == undefined)
          {
            minDistance = L.LineUtil.pointToSegmentDistance(
              p.project(a),
              p.project(verticies[i]),
              p.project(verticies[i+1]));
            i++;
          }
          for(; i < verticies.length -1; i++)
          {
            var d = L.LineUtil.pointToSegmentDistance(
              p.project(a),
              p.project(verticies[i]),
              p.project(verticies[i+1]));
            if(d < minDistance)
            {
              minDistance = d;
            }
          }
        }
      });
    }
    else if(typeof ol != "undefined")
    {
      minDistance = undefined;
    }
  }
  return minDistance;
};

},{}],205:[function(require,module,exports){
module.exports = function(nearbyFeatures, target)
{
  var closestFeature = undefined;
  var closestDistance = 0;
  var closestLocation = undefined;
  if(nearbyFeatures != undefined)
  {
    if(nearbyFeatures.length > 0)
    {
      closestFeature = nearbyFeatures[0];
      closestDistance = geodash.vecmath.distance(target, nearbyFeatures[0].geometry);
      closestLocation = geodash.vecmath.closestLocation(target, nearbyFeatures[0].geometry);
      for(var i = 1; i < nearbyFeatures.length ;i++)
      {
        var f = nearbyFeatures[i];
        if(geodash.vecmath.distance(target, f.geometry) < closestDistance)
        {
          closestFeature = f;
          closestDistance = geodash.vecmath.distance(target, f.geometry);
          closestLocation = geodash.vecmath.closestLocation(target, f.geometry);
        }
      }
    }
  }
  return {'feature': closestFeature, 'location': closestLocation};
};

},{}],206:[function(require,module,exports){
'use strict';

/**
 * Contains vector math functions
 * @namespace vecmath
 * @memberof geodash
 */

module.exports = {
  closestLocation: require("./closestLocation"),
  distance: require("./distance"),
  getClosestFeatureAndLocation: require("./getClosestFeatureAndLocation")
};

},{"./closestLocation":203,"./distance":204,"./getClosestFeatureAndLocation":205}],207:[function(require,module,exports){
'use strict';
/*global require, window, console, jQuery, $, angular, Bloodhound, location */

var buildPageURL = function($interpolate, dashboard, state)
{
  var template = geodash.api.getPage(extract("page", state));
  if(angular.isDefined(template))
  {
    //
    var url = $interpolate(template)(state);

    var hash_args = [];
    var view = state["view"];
    if(view != undefined && view["z"] != undefined && view["lat"] != undefined && view["lon"] != undefined)
    {
      hash_args.push("z="+view["z"]);
      hash_args.push("lat="+view["lat"].toFixed(4));
      hash_args.push("lon="+view["lon"].toFixed(4));
    }
    var filters = state["filters"];
    if(filters)
    {
        $.each(state["filters"], function(layer_id, layer_filters)
        {
          $.each(layer_filters, function(filter_id, filter_value)
          {
              hash_args.push(layer_id+":"+filter_id+"="+filter_value);
          });
        });
    }
    if(hash_args.length > 0)
    {
      url += "#"+hash_args.join("&");
    }
    return url;
  }
  else
  {
    return undefined;
  }
};

var expand = function(x)
{
  var newArray = [];
  if(Array.isArray(x))
  {
    for(var i = 0; i < x.length; i++)
    {
      var value = x[i];
      if(angular.isString(value))
      {
        if(value.indexOf(".") != -1)
        {
          newArray = newArray.concat(value.split("."));
        }
        else
        {
          newArray.push(value);
        }
      }
      else
      {
        newArray.push(value);
      }
    }
  }
  else if(angular.isString(x))
  {
    newArray = x.split(".");
  }
  return newArray;
};

var extract = function(keyChain, node, fallback)
{
  if(angular.isString(keyChain))
  {
    keyChain = keyChain.split(".");
  }

  var obj = undefined;

  if(node != undefined && node != null)
  {
    if(keyChain.length==0)
    {
      obj = node;
    }
    else
    {
      var newKeyChain = keyChain.slice(1);
      if(newKeyChain.length == 0)
      {
        if(angular.isString(keyChain[0]) && keyChain[0].toLowerCase() == "length")
        {
          if(Array.isArray(node))
          {
            obj = node.length;
          }
          else if(angular.isDefined(node))
          {
            obj = node["length"];
          }
          else
          {
            obj = 0;
          }
        }
      }

      if(obj == undefined && angular.isDefined(node))
      {
        if(Array.isArray(node))
        {
          var index = angular.isString(keyChain[0]) ?
            parseInt(keyChain[0], 10) :
            keyChain[0];
          obj = extract(newKeyChain, node[index], fallback);
        }
        else
        {
          obj = extract(newKeyChain, node[""+keyChain[0]], fallback);
        }
      }
  	}
  }
  else
  {
    obj = fallback;
  }
	return obj;
};

var extractFloat = function(keyChain, node, fallback)
{
  return geodash.normalize.float(extract(keyChain, node, fallback));
};

var extractArrayLength = function(keyChain, node, fallback)
{
  var value = extract(keyChain, node, undefined);
  return Array.isArray(value) ? value.length : fallback;
};
var getHashValueAsStringArray = function(keys)
{
  return geodash.util.getHashValue(keys, "stringarray");
};
var getHashValueAsInteger = function(keys)
{
  return geodash.util.getHashValue(keys, "integer");
};
var getHashValueAsIntegerArray = function(keys)
{
  return geodash.util.getHashValue(keys, "integerarray");
};
var getHashValueAsFloat = function(keys)
{
  return geodash.util.getHashValue(keys, "float");
};
var sortLayers = function(layers, reverse)
{
  var renderLayers = $.isArray(layers) ? layers : $.map(layers, function(layer){return layer;});
  renderLayers = renderLayers.sort(function(a, b){ return a.get('zIndex') - b.get('zIndex'); });
  if(reverse === true)
    renderLayers.reverse();
  return renderLayers;
};
var updateRenderOrder = function(layers)
{
  if(geodash.mapping_library == "ol3")
  {

  }
  else if(geodash.mapping_library == "leaflet")
  {
    for(var i = 0; i < layers.length; i++)
    {
        layers[i].bringToFront();
    }
  }
};
var layersAsArray = function(layers)
{
  return $.map(layers, function(layer, id){return {'id':id, 'layer':layer};});
};


window.buildPageURL = buildPageURL;
window.expand = expand;
window.extract = extract;
window.extractFloat = extractFloat;
window.extractArrayLength = extractArrayLength;
window.getHashValueAsStringArray = getHashValueAsStringArray;
window.getHashValueAsInteger = getHashValueAsInteger;
window.getHashValueAsIntegerArray = getHashValueAsIntegerArray;
window.getHashValueAsFloat = getHashValueAsFloat;
window.sortLayers = sortLayers;
window.updateRenderOrder = updateRenderOrder;
window.layersAsArray = layersAsArray;
window.geodash = require("./geodash");

},{"./geodash":76}]},{},[207]);
