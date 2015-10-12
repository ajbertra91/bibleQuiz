import gulp from 'gulp';

/*
  * WHAT IF WE TOOK OUR FONTS. AND PUT THEM SOMEWHERE ELSE?
  * just moves fonts from app to dist. nothing special
*/

export default () => {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('build/fonts'));
}