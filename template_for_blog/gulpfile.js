const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minifyCss = require('gulp-minify-css');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');

function css() {
  return (
    gulp
      .src('./dev/scss/**/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(
        autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
          cascade: true
        })
      )
      //.pipe(minifyCss())
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream())
  );
}

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    host: 'localhost',
    port: 3000,
    notify: false
  });

  gulp.watch('dev/scss/**/*.scss', css);
  gulp.watch('dist/*.html').on('change', browserSync.reload);
}
module.exports.default = gulp.series(serve, css);
