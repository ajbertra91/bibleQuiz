/*
  * This task takes All the javascripts in the app and concatenates/minifies them all into one file
  * This task also takes All of the HTML and puts it into Javascript as well.
  * Also runs the concatenated script through uglify if the --minify flag is passed
*/ 

import gulp from 'gulp';
let {plugins, buildOpts} = gulp;

export default () => {

  // takes all javascript dependencies and preprocesses them
  let dependencies = gulp.src('app/javascripts/dependencies.js')
    .pipe(plugins.preprocess({context: buildOpts}))
    ;

  // takes all javascripts and runs through preprocessing
  var javascripts = gulp.src(['app/javascripts/**/*.js', '!app/javascripts/dependencies.js'])
    .pipe(plugins.preprocess({context: buildOpts}))
    .pipe(plugins.babel())
    .pipe(plugins.ngAnnotate())
    ;

  // takes all templates and runs them through ng-html2js, turning the HTML into JS for angular
  var templates = gulp.src('app/templates/**/*.html')
    .pipe(plugins.preprocess({context: buildOpts}))
    .pipe(plugins.ngHtml2js({
      moduleName: 'templates'
    }));

  // concatenate all the dependencies.js templates.js and the scripts.js into one js
  return plugins.merge(dependencies, templates, javascripts)
    .pipe(plugins.concat(buildOpts.platform+'.js'))
    .pipe(plugins.if(buildOpts.minify, plugins.uglify()))
    .pipe(gulp.dest('build/'));
};
