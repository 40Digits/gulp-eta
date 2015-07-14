## Overall

* Convert to NPM. You can find the package on [NPM](https://www.npmjs.com/package/gulp-eta)
* Added in BrowserSync support & removed LiveReload
* Sass globbing does not work due to bug in libsass update
* Updated sprite generation to a new package. Crisp sprites now!
* Updated `index.html` with wysiwyg, styles, & sprite usage
* Removed Media Query Combine as it wasn't combining media queries correctly

## Browserify

**Changes**
* Change Item

**Added**
* Added Item

**Removed**
* Removed Item

## Sass

**Changes**
* Converted remaining px values to rem
* Moved clearfix helpers from `/base/reset.scss` to `/utils/utilities.scss`
* Added in additional default for print styles.

**Added**
* Mixin to manage font-size & line-height through mixin. `/util/mixins/type.scss`
* `/components/` folder to handle smaller widget style modules

**Removed**
* Wysiwyg styles export to WP admin. (styling & admin CP issues)
* `/vendor/` should only contain a sample file now
* Removed all mentions of fontello as we have our own symbol font now