# Eta

Eta-2 Actis-class interceptor, sometimes referred to as the Jedi interceptor due to its popularity with Jedi pilots, was a Clone Wars-era Republic starfighter.

Think of Eta as a set of well crafted tasks that you can add to your Gulp workflow and help speed up your development.

For 40Digits, Eta serves as our build script for internal projects. The build script took much inspiration from [graypants'](https://github.com/greypants/gulp-starter) & [Chris Davies'](https://github.com/chrisdavies/gulp_starter_kit) starter kits. It was modified to work within the needs and requirements of 40Digits development.

Eta includes the following tools, tasks, and workflows:

- [Browserify](http://browserify.org/)
- [SASS](http://sass-lang.com/) (libsass with [source maps](https://github.com/sindresorhus/gulp-ruby-sass#sourcemap), [autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer), and [combine media-queries](https://www.npmjs.com/package/gulp-combine-mq))
- [Image optimization](https://www.npmjs.com/package/gulp-imagemin)
- [Sprite generation](https://www.npmjs.com/package/css-sprite)
- [Custom Icon Font generation](https://www.npmjs.com/package/gulp-iconfont)
- Error handling in the console [and in Notification Center](https://github.com/mikaelbr/gulp-notify)
- Compression task for production builds (CSS + JS)
- [BrowserSync](http://www.browsersync.io/)

## Requirements

- [Node.js](https://nodejs.org/download/)
- [Gulp](https://github.com/gulpjs/gulp)
- [Cairo](https://github.com/Automattic/node-canvas/wiki/installation---osx)
- [Canvas](https://github.com/Automattic/node-canvas/wiki/installation---osx)

***

Eta is made to work inside of any framework. Start your project however you'd like; Rails, Express, Wordpress, etc. Then follow these steps.

### 1. Install Eta

From the command line, navigate to the directory where you would like to run your gulp tasks.

```bash
npm install --save-dev gulp-eta
```
This adds Eta to your `node_modules` directory along with all of its dependencies. See [troubleshooting](https://github.com/40Digits/eta#troubleshooting) section if you run into errors.

### 2. Install Gulp
```bash
npm install --save-dev gulp
```
In order to use `gulp` in the root of your app, you need to have a copy of Gulp installed.

### 3. Create `gulpfile.js`

In your current working directory, create a file called `gulpfile.js` which serves as the configuration file for Gulp. Here is where you link up Eta. Eta returns an object of Gulp tasks which you can set on `gulp.tasks`. One great thing is that you aren't limited to what Eta provides! You can declare your own custom tasks, too.

Your `gulpfile` should look something like this:

```javascript
// dependencies
var gulp = require('gulp');
var eta = require('gulp-eta');

// instantiate eta with some options
gulp.tasks = eta({
  // your options
});

// add some custom tasks if you want
gulp.task('mytask', function() {
  // blah blah blah
});
```

Checkout the [examples](/examples) for some common configuration.

### 4. Your choice

At this point you have three options.

1) You can either go ahead and run `gulp init` to use Eta's default configuration to setup your source files and install the necessary depencies.

2) You can pass in your own configuration to the Eta instance in `gulpfile.js` to meet your needs, then run `gulp init` to set up all of the source files where you need them.

3) You can skip `gulp init` and set up your project however you want. If you elect to go this route make sure to let Eta know where all of your source files are and where you want the compiled assets to be created using the `scaffold` option. Or else the Eta `gulp` tasks won't work.

### 5. Run the tasks

```bash
gulp
```
This will run the `default` gulp task, which has the following task dependencies: `['browserSync', 'symbols', 'sass', 'sprites', 'images', 'browserify']`.

[View all available tasks](#tasks)

***

## Scaffold

Eta uses the scaffold object to handle paths. Below is the default configuration. Override them to meet your needs. `source.root` and `assets.root` are relative to directory of your `gulpfile`, and all subsequent directories are respectively relative to `source.root` and `assets.root`.

If you want an `asset` to be in the root of your app (where your gulpfile lives) then set it to `'/'`.

*Note:* Make sure you set up your scaffold before you run `gulp init`.

**Defaults:**
```javascript
config.scaffold = {
  source: {
    root:     '_src',
    images:   'images',
    scripts:  'js',
    sprites:  'sprites',
    styles:   'sass',
    symbols:  'symbols',
    static:   'static'
  },
  assets: {
    root:     'assets',
    images:   'images',
    sprites:  'images/sprites',
    scripts:  'js',
    styles:   'css',
    symbols:  'fonts/symbols',
    static:   '/'
  }
}
```

The folder stucture looks like this:
```
├───_src
│   ├───images
│   ├───js
│   ├───sprites
│   ├───sass
│   ├───symbols
│   └───static
├───assets
│   ├───images
│   │   └───sprites
│   ├───js
│   ├───css
│   └───fonts
│       └───symbols
├───gulpfile.js
├───index.html // created from the static task
└───node_modules
```

**Examples:**

If you need your assets folder to live in a `/public` folder:

```javascript
options.scaffold.assets.root = 'public/assets';
```

If you want to rename your source folder:

```javascript
options.scaffold.source.root = 'source';
```

If you want your CSS files in the root of your app:

```javascript
options.scaffold.assets.styles = '/';
```

***

## Tasks

### `default`

Runs the specified default tasks.

**Options:**
```javascript
config.default = {
  tasks: ['browserSync', 'symbols', 'sass', 'sprites', 'images', 'browserify']
}
```

### `init`

Creates a `_src` directory and installs some starter modules. If you run this a second time it will abort if the `_src` directory has already been created.

*Note:* [Make sure your scaffold is configured](#scaffold) before you run this.

### `symbols`

Generates your icon font, preview file, and sass file.

**Options:**
```javascript
options.symbols = {
  settings: {
    fontName: 'symbols',
    appendCodepoints: false,
    centerHorizontally: true,
    normalize: true,
    fontHeight: false
  },
  renameSass: {
    basename: '_symbols',
    extname: '.scss'
  }
}
```

### `sass`

Compiles your sass files.

**Options:**
```javascript
options.sass = {
  settings: {
    indentedSyntax: true,
    errLogToConsole: true,
    style: 'nested'
  },
  globbing: {
    extensions: ['.scss', '.sass']
  }
}
```

### `images`

Moves image copies from a source folder, performs optimizations, then outputs them into the assets folder.

**Options:**
```javascript
options.images = {
  settings: {
    progressive: true,
    optimizationLevel: 4
  }
}
```

### `sprites`

Compiles sprite assets into a sprite sheet, and generates a sass file for mixins & variable use.

**Options:**
```javascript
options.sprites = {
  settings: {
    retina: true,
    style: '_sprites.scss',
    cssPath: assets.sprites,
    processor: 'scss',
    orientation: 'binary-tree',
    prefix: 'sprite'
  }
}
```

### `browserify`

Compiles all of your CommonJS modules into bundles. Make sure you have configured your bundles.

**Options:**
```javascript
options.browserify = {
  debug: false,
  // add objects as items in this array
  // to make multiple bundles
  bundles: [{
    outputName: 'main.js',
    entries: [] // declare the entries for each bundle here
  }],
  transform: ['browserify-shim', 'browserify-ejs'],
  aliases: { "waitFor": p.join(source.scripts, "/lib/waitFor.js") },
  shim: { "jquery": "global:$" }
}
```

### `static`

Creates static HTML files from HTML partials

**Options:**
```javascript
options.static = {
  extension: ".html",
  settings: {
    prefix: '@@',
    basepath: '/'
  }
}
```

### `watch`

Watches for changes on source files, and when a file is added, removed, or edited, it runs the necessary task.

**Options:**
```javascript
// key: the source folder to watch for changes on
// value: the task to run when a change happens
config.watch = {
  scripts:  'browserify', 
  styles:   'sass',
  symbols:  'symbols',
  images:   'images',
  sprites:  'sprites'
};
```

### `browserSync`

Starts Browser Sync and runs `watch` in tandem.

**Options:**
```javascript
config.browserSync = {
  useBrowserSync: true,
  // See http://www.browsersync.io/docs/options/ for a complete list of configuration options
  config: {
    server: appDir,
    open: true,
    notify: false,
    reloadOnRestart: true,
    files: [
      p.join(assets.root, '**/*'),
      p.join(appDir, '**/*.php'),
    ]
  }
}
```

### `minifyCss`

Minifies your compiled stylesheets

### `minifyJs`

Minifies your compiled JavaScript files

### `production`

Re-builds optimized, compressed css and js files to the assets folder, as well as output their file sizes to the console. It's a shortcut for running the following tasks: `['minifyCss', 'uglifyJs']`.

***

## Documentation
Visit our wiki for [detailed documentation on features and support](https://github.com/40Digits/gulp-starter/wiki).

## Troubleshooting
If you are running into canvas errors, please review the [installation guide](https://github.com/Automattic/node-canvas/wiki/installation---osx) for canvas. 

If you are receiving `Package xcb-shm was not found`, please run the following commands:
- If you are using Fish `set -xU PKG_CONFIG_PATH /usr/local/lib/pkgconfig:/opt/X11/lib/pkgconfig`
- If you are using s/iTerm/general sh `export PKG_CONFIG_PATH /usr/local/lib/pkgconfig:/opt/X11/lib/pkgconfig:$PKG_CONFIG_PATH` or `export PKG_CONFIG_PATH=/opt/X11/lib/pkgconfig`

For additional install help, [view the installation guide](https://github.com/Automattic/node-canvas/wiki/installation---osx).
