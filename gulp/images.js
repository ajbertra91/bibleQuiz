/*
  * This task just takes the images and puts them out to the build
  * Also put them through image minification if the build is ran with --minify
*/ 

import gulp from 'gulp';
let {plugins, buildOpts} = gulp;

export default () => {
  return gulp.src('app/images/**/*')
    .pipe(plugins.if(buildOpts.minify, plugins.imagemin()))
    .pipe(gulp.dest('build/images'));
};