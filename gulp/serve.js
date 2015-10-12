/*
  * This task runs the server but only after running the watch task
  * open: whether or not it opens a new tab for you
  * port: changes the port which you want to run it on
  * livereload: whether you want live reloading
  * fallback: if build/ doesnt have an index, it will take the blank one from the app
*/

import gulp from 'gulp';
let {plugins, buildOpts} = gulp;

export default [['watch'], function () {
  return gulp.src('build')
    .pipe(plugins.webserver({
      open: buildOpts.open,
      port: buildOpts.port,
      livereload: buildOpts.liveReload,
      fallback: 'app/index.html'
    }));
}];