/*
  * This task just wraps other tasks. 
  * The build task runs scripts, css, fonts, and images in tandem, and then does the HTML last.
  * The runSequence plugin is used to run certain tasks before others, and to run certain tasks at the same time
*/

import gulp from 'gulp';
let {plugins} = gulp;

export default () => {
  return plugins.runSequence(
    ['clean']
    ,[
    'scripts',
    'css',
    'fonts',
    'images'
    ]
    ,['html']);
}