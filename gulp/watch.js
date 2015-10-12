/*
  * This task just runs certain tasks if it detects any changes in certain places
  * runs the scripts task if it detects any changes in app/javascripts or app/templates
  * runs the css task if anything changes in stylesheets
*/ 

import gulp from 'gulp';

export default [['build'], function(){
  gulp.watch('app/javascripts/**/*', ['scripts']);
  gulp.watch('app/templates/**/*', ['scripts']);
  gulp.watch('app/stylesheets/**/*', ['css']);
}];