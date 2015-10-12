/*
  * This task simply takes the main sass file (diff for each build) desktop.sass/tablet.sass/handheld.sass
  * Then runs it through gulp-sass and outputs to css
  * All the lines are just there for minification and debug.
  * So if build is ran with --debug="false" there would be no sourcemaps
  * and if build is ran with --minify the gulp-sass would be run with {outputStyle: 'compressed'}
*/

import gulp from 'gulp';
let {plugins, buildOpts} = gulp;

export default () => {
  return gulp.src('app/stylesheets/'+buildOpts.platform+'.sass')
    .pipe(plugins.if(buildOpts.debug, plugins.sourcemaps.init())) //enable sourcemaps
    .pipe(plugins.if(buildOpts.minify, plugins.sass({outputStyle: 'compressed'}).on('error', plugins.sass.logError))) //minify
    .pipe(plugins.if(!buildOpts.minify, plugins.sass().on('error', plugins.sass.logError))) // no minify
    .pipe(plugins.if(buildOpts.debug, plugins.sourcemaps.write())) //enable sourcemaps
    .pipe(plugins.rename(buildOpts.platform + '.css'))
    .pipe(gulp.dest('build/'));
}
