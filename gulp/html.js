/*
  * This task just takes the index and preprocesses it so it can insert the <link> and <script> tags for the js and css
  * And then minifies the index file. The other html templates are put into javascript so they get minified through js minification
*/

import gulp from 'gulp';
let {plugins, buildOpts} = gulp;

export default () => {
  return gulp.src('app/index.html')
    .pipe(plugins.preprocess({context: buildOpts}))
    .pipe(plugins.if(buildOpts.minify ,plugins.minifyHtml()))
    .pipe(gulp.dest('build/'));
};