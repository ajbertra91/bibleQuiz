var gulp = require('gulp'),
    browserSync = require('browser-sync');

gulp.task('browser-sync', function () {
  var files = [
    './assets/views/*.html',
    './assets/styles/**/*.css',
    './assets/images/**/*.png',
    './assets/scripts/**/*.js'
  ];
  browserSync.init(files, {
    server: {
      baseDir: './assets'
    }
  });
})

// gulp.task('watch', function () {
//    gulp.watch('templates/*.tmpl.html', ['build']);
// });