# GeoDashJS (geodash.js)

Low-level Javascript API for [GeoDash](http://geodash.io).  This API includes a variety of low-level functions used throughout the GeoDash framework.  GeoDashJS is added at [/lib/geodashjs/0.0.1/](https://github.com/geodashio/geodash-base/tree/master/lib/geodashjs/0.0.1) to the [geodash-base](https://github.com/geodashio/geodash-base) project.

## GeoDash

GeoDash is a modern web framework and approach for quickly producing visualizations of geospatial data. The name comes from "geospatial dashboard".

The framework is built to be extremely extensible. You can use GeoDash Server (an implementation), the front-end framework, backend code, or just the Gulp pipeline. Have fun!

See [http://geodash.io](http://geodash.io) for more details.

# Building

Before you build, you'll need to install [browserify](http://browserify.org/), [uglify-js](https://www.npmjs.com/package/uglify-js), and [jshint](https://www.npmjs.com/package/jshint).  You should install globally with:

```
sudo npm install -g browserify
sudo npm install -g uglify-js
sudo npm install -g jshint
```

To run the build, which creates `dist/geodash.js`, `dist/geodash.min.js`, and the docs just run:

```
npm run build
```

## code

To just build the distributable code (`dist/geodash.js`, `dist/geodash.min.js`), run:

```
npm run build:code
```

## docs

To build the custom docs template used in the website, you'll need to install a custom version of docstrap.git on top of the default version.  The below command will install the custom version.

```
npm install git+https://git@github.com/geodashio/docstrap.git\#geodash # Install custom docs template with font awesome
```

You can just build docs with:
```
npm run build:docs # or gulp docs since run the same thing
```

# Tests

This repo includes syntax tests via [jshint](http://jshint.com/about/) and unit tests via [Karma](https://karma-runner.github.io/) - [Browserify](http://browserify.org/) - [Mocha](http://mochajs.org/).  Run all tests with:

```
npm run tests
```

You can run the unit tests only via:

```
gulp tests
```

# Contributing

Happy to accept pull requests!

# License

See `LICENSE` file.
