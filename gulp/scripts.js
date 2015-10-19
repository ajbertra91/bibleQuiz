/*
  * This task takes All the javascripts in the app and concatenates/minifies them all into one file
  * This task also takes All of the HTML and puts it into Javascript as well.
  * Also runs the concatenated script through uglify if the --minify flag is passed
*/ 

import gulp from 'gulp';
import jspm from 'jspm';
let {plugins, buildOpts} = gulp;

export default () => {

  jspm.bundleSFX('app/init', `build/${buildOpts.platform}.js`, {
    minify: buildOpts.minify
    // ,sourceMaps: buildOpts.debug
  }).then((res) => {
    console.log('JSPM bundleSFX ran without issue.');
  }, (err) => {
    console.log('JSPM bundleSFX encountered an error.');
    console.log(err);
  });
}