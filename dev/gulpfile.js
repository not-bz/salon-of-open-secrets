var gulp              = require('gulp');
var sass              = require('gulp-sass')(require('sass'));
var header            = require('gulp-header');
var uglify            = require('gulp-uglify');
var autoprefixer      = require('gulp-autoprefixer');
var rename            = require('gulp-rename');
var concat            = require('gulp-concat');
var nunjucksRender    = require('gulp-nunjucks-render');
var browserSync       = require('browser-sync').create();
var data              = require('gulp-data');
var fs                = require('fs');

var outputFolder      = '../web/';

// -----------------------------------------------------------------------------
// Banner setup
// -----------------------------------------------------------------------------

var banner = [
  '/***',
  '   * developed by Beatriz Lacerda',
  '   * not-bz.com',
  '   ***',
  ' ***/',
  ''].join('\n');


// -----------------------------------------------------------------------------
// SASS
// -----------------------------------------------------------------------------

gulp.task('sass', function () {
  return gulp
    .src('./scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(header(banner))
    .pipe(gulp.dest(outputFolder+'css'))
});

// -----------------------------------------------------------------------------
// SASS minified
// -----------------------------------------------------------------------------

gulp.task('sass-min', function () {
  return gulp
    .src('./scss/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(header(banner))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(outputFolder+'css'))
    .pipe(browserSync.stream())
});

// -----------------------------------------------------------------------------
// Javascript
// -----------------------------------------------------------------------------

gulp.task('js', function () {
  return gulp
    .src('./js/script.js')
    .pipe(concat('script.js'))
    .pipe(header(banner))
    .pipe(gulp.dest(outputFolder+'js'))
    .pipe(browserSync.stream())
});


// -----------------------------------------------------------------------------
// Javascript minified
// -----------------------------------------------------------------------------

gulp.task('js-min', function () {
  return gulp
    .src([outputFolder+'js/script.js'])
    .pipe(uglify())
    .pipe(header(banner))
    .pipe(rename({basename:'script.min'}))
    .pipe(gulp.dest(outputFolder+'js'))
    .pipe(browserSync.stream())
});

// -----------------------------------------------------------------------------
// Templating
// -----------------------------------------------------------------------------


gulp.task('nunjucks', function () {
  return gulp.src('templates/default.html')
    .pipe(data(function() {
      return JSON.parse(fs.readFileSync('data.json'))
    }))
    .pipe(nunjucksRender({
      path: ['templates/partials/'] // String or Array
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(outputFolder));
});


// -----------------------------------------------------------------------------
// Watch
// -----------------------------------------------------------------------------

gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: outputFolder
    },
    //port: 8080
  })
  gulp.watch('./scss/**/*.scss', gulp.series('sass','sass-min'));
  gulp.watch('data-css.json').on('change', browserSync.reload);
  gulp.watch(outputFolder+'index.html').on('change', browserSync.reload);
  gulp.watch('./js/**/*.js', gulp.series('js','js-min'));
  gulp.watch(['./templates/*.html','./templates/partials/', 'data.json'], gulp.parallel('nunjucks')).on('change', browserSync.reload);

});

function reload(done) {
  browserSync.reload();
  done();
}


gulp.task('default', gulp.series('sass','sass-min','nunjucks','js','js-min','watch'));
//gulp.task('default', gulp.series('sass','sass-min','js','js-min','watch'));
