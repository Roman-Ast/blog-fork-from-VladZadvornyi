/* eslint-disable node/no-unpublished-require */
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
/* eslint-enable node/no-unpublished-require */

function scripts() {
  return (
    gulp
      .src([
        'dev/js/auth.js',
        'dev/js/post.js',
        'dev/js/comment.js',
        'node_modules/medium-editor/dist/js/medium-editor.min.js'
      ])
      .pipe(concat('scripts.js'))
      // .pipe(uglify())
      .pipe(gulp.dest('public/javascripts'))
  );
}

function styles() {
  return (
    gulp
      .src('dev/scss/**/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(
        autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
          cascade: true
        })
      )
      //.pipe(cleanCss())
      .pipe(gulp.dest('public/stylesheets'))
  );
}

function watch() {
  gulp.watch('dev/scss/**/*.scss', styles);
  gulp.watch('dev/js/**/*.js', scripts);
}

var build = gulp.series(watch, styles, scripts);
module.exports.default = build;
