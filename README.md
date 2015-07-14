# Eta

Eta-2 Actis-class interceptor, sometimes referred to as the Jedi interceptor due to its popularity with Jedi pilots, was a Clone Wars-era Republic starfighter.

Think of Eta as a set of well crafted tasks that you can add to your Gulp workflow and help speed up your development.

For 40Digits, Eta serves as our build script for internal projects. The build script took much inspiration from [graypants'](https://github.com/greypants/gulp-starter) & [Chris Davies'](https://github.com/chrisdavies/gulp_starter_kit) starter kits. It was modified to work within the needs and requirements of 40Digits development.

Eta includes the following tools, tasks, and workflows:

- [Browserify](http://browserify.org/)
- [Sass](http://sass-lang.com/) (libsass with [source maps](https://github.com/sindresorhus/gulp-ruby-sass#sourcemap), and [autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer))
- [Image optimization](https://www.npmjs.com/package/gulp-imagemin)
- [Sprite generation](https://www.npmjs.com/package/sprity)
- [Custom Icon Font generation](https://www.npmjs.com/package/gulp-iconfont)
- Error handling in the console [and in Notification Center](https://github.com/mikaelbr/gulp-notify)
- Compression task for production builds (CSS + JS)
- [BrowserSync](http://www.browsersync.io/)

## Requirements

- [Node.js](https://nodejs.org/download/)
- [Gulp](https://github.com/gulpjs/gulp)

***

Eta is made to work inside of any framework. Start your project however you'd like; Rails, Express, Wordpress, etc. Then follow these steps.

### 1. Install Gulp

Eta can't do anything without Gulp. From the command line, navigate to the directory where you would like to run your gulp tasks.

```bash
npm install --save-dev gulp
```

### 2. Install Eta

```bash
npm install --save-dev gulp-eta
```

This adds Eta to your `node_modules` directory along with all of its dependencies. See [troubleshooting](https://github.com/40Digits/eta#troubleshooting) section if you run into errors.

### 3. Create `gulpfile.js`

In your current working directory, create a file called `gulpfile.js` which serves as the configuration file for Gulp. Here is where you link up Eta. Eta adds tasks to your Gulp module.

One great thing is that you aren't limited to what Eta provides! You can declare your own custom tasks, too.

Your `gulpfile` should look something like this:

```javascript
// dependencies
var gulp = require('gulp');
var eta = require('gulp-eta');

// instantiate eta passing in `gulp` as the first arg
// and then your configuration object as the second arg
eta(gulp, {
  // your options
});

// add some custom tasks if you want
gulp.task('mytask', function() {
  // blah blah blah
});
```

Checkout the [examples](/examples) for some common configurations.

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
    styles:   '/',
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
│   └───fonts
│       └───symbols
├───gulpfile.js
├───style.css // styles go to app root by default
├───index.html // created from the static task
└───node_modules
```

**Examples:**

Checkout the [examples](/examples) for some common configurations.

If you need your assets folder to live in a `/public` folder:

```javascript
options.scaffold.assets.root = 'public/assets';
```

If you want to rename your source folder:

```javascript
options.scaffold.source.root = 'source';
```

If you want your CSS files in the assets folder:

```javascript
options.scaffold.assets.styles = 'css';
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
  // for all available options: https://github.com/sass/node-sass#options
  settings: {
    indentedSyntax: true,
    outputStyle: 'nested'
  },
  globbing: {
    extensions: ['.scss', '.sass']
  }
};

// for all available options: https://www.npmjs.com/package/gulp-autoprefixer#api
options.autoprefixer = {
  browsers: [
    'last 2 versions',
    'safari 5',
    'ie 8',
    'ie 9',
    'android 4'
  ],
  cascade: true
};
```

### `images`

Moves image copies from a source folder, performs optimizations, then outputs them into the assets folder.

**Options:**
```javascript
options.images = {
  // for all available options: https://www.npmjs.com/package/gulp-imagemin#api
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
  // for all available options: https://www.npmjs.com/package/sprity#options
  settings: {
    retina: true,
    dimension: [
      {
        ratio: 1, dpi: 72
      }, {
        ratio: 2, dpi: 192
      }
    ],
    margin: 0,
    split: true, // to create multiple sprites by putting images in subdirectories
    name: 'sprite', // for split. ex: sprite-main.png, sprite-blog.png
    style: '_sprites.scss',
    cssPath: p.join(config.scaffold.assets.root, config.scaffold.assets.styles),
    template: p.join(config.scaffold.source.root, config.scaffold.source.sprites, '/template/scss.hbs'),
    processor: 'sass',
    orientation: 'binary-tree',
    prefix: 'sprite' // for sass
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
  // For all available settings: https://www.npmjs.com/package/gulp-file-include
  settings: {
    prefix: '@@',
    basepath: '@file'
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
  sprites:  'sprites',
  static:   'static'
};
```

**To add a new dir to watch:**

1. Add it to `scaffold.source`
3. Add a new glob for the files in that folder
2. Add the folder in the `watch` config along with the task you want to run when changes are made.

*Example:*
```javascript
eta(gulp, {
  scaffold: {
    source: {
      custom: 'my-custom-dir'
    }
  },
  globs: {
    custom: '**/*.+(txt)'
  },
  watch: {
    custom: 'my-custom-task'
  }
});

gulp.task('my-custom-task', function() {
  console.log('this task is super awesome');
});
```

### `browserSync`

Starts Browser Sync and runs `watch` in tandem.

**Options:**
```javascript
config.browserSync = {
  useBrowserSync: true,
  // For all available settings: http://www.browsersync.io/docs/options/
  settings: {
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
