# GeoDashJS (geodash.js)

Low-level Javascript API for GeoDash.  This API includes a variety of low-level functions used through the broader GeoDash framework.  GeoDashJS is a dependency of geodash-project-base.

## GeoDash

GeoDash is a modern web framework and approach for quickly producing visualizations of geospatial data. The name comes from "geospatial dashboard".

The framework is built to be extremely extensible. You can use GeoDash server (an implementation), the front-end framework, backend code, or just the Gulp pipeline. Have fun!

# Building

Before you build, you'll need to install [browserify](http://browserify.org/), [uglify-js](https://www.npmjs.com/package/uglify-js), and [jshint](https://www.npmjs.com/package/jshint).

```
sudo npm install -g browserify
sudo npm install -g uglify-js
sudo npm install -g jshint
```

To run the build, which creates `dist/geodash.js` and `dist/geodash.min.js` just run the following command.

```
npm run build
```

# Tests

Only `jshint` support right now.  Run tests with the following command.

```
npm run tests
```

# Contributing

Happy to accept pull requests!

# License

See `LICENSE` file.
