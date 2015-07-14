## Overall

* Convert to NPM. You can find the package on [NPM](https://www.npmjs.com/package/gulp-eta)
* Added in BrowserSync support & removed LiveReload
* Sass globbing does not work due to bug in libsass update
* Updated sprite generation to a new package. Crisp sprites now!
* Updated `index.html` sample with wysiwyg, symbols, & sprite usage
* Removed Media Query Combine as it wasn't combining media queries correctly
* Broke out the config file into individual modules for better organization

## Browserify

**Changes**
* Item

**Added**
* Item

**Removed**
* Item

## Sass

**Changes**
* Converted remaining px values to rem
* `/app/` is now `/pages/`
* `/helpers/` is now `/util/`
* Moved clearfix helpers from `/base/reset.scss` to `/utils/utilities.scss`

**Added**
* Mixin to manage font-size & line-height `/util/mixins/type.scss`
* `/components/` folder to handle smaller widget style modules
* Added in additional defaults for print styles

**Removed**
* Removed wysiwyg styles export to WP admin. (styling & admin CP issues)
* `/vendor/` should only contain a sample file now
* Removed all mentions of fontello as we have our own symbol font
* Removed `/layout/sidebar.scss` as it wasn't being utilizied

## Sprites

**Changes**
* You can have multiple sprite sets now. Simply organize sprites through folders in `/_src/sprites/`
* New file names would be `sprite-folder_name`
* You still have to `@extend .sprite-folder_name` to pull in correct sprite
