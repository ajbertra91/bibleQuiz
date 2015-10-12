import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import yargs from 'yargs';
import runSequence from 'run-sequence';
import buildOverridesJson from './buildOverrides';
import merge from 'merge-stream';

let 
  plugins = gulp.plugins = loadPlugins({lazy: false})
  ,argv = yargs.argv
  ,buildOverrides = buildOverridesJson || {}
;

gulp.plugins.runSequence = runSequence;
gulp.plugins.merge = merge;

gulp.buildOpts = {
  siteTitle: argv.siteTitle ? argv.siteTitle : buildOverrides.siteTitle ? buildOverrides.siteTitle : 'Sports Technologies Inc',
  platform: argv.platform ? argv.platform : buildOverrides.platform ? buildOverrides.platform : 'desktop',
  environment: argv.environment ? argv.environment : buildOverrides.environment ? buildOverrides.environment : 'development',
  debug: argv.debug == 'false' ? false : buildOverrides.debug == false ? false : true,
  minify: argv.minify ? true : buildOverrides.minify ? true : false,
  liveReload: argv.liveReload == 'false' ? false : buildOverrides.liveReload == false ? false : true,
  open: argv.open == 'false' ? false : buildOverrides.open == false ? false : true,
  port: argv.port ? argv.port : buildOverrides.port ? buildOverrides.port : 8000,
  appConstants: buildOverrides.appConstants ? buildOverrides.appConstants : null
}

if(buildOverrides.environment && buildOverrides[buildOverrides.environment]){
  gulp.buildOpts.domain = buildOverrides[buildOverrides.environment].domain;
  gulp.buildOpts.apiRoot = buildOverrides[buildOverrides.environment].apiRoot;
  gulp.buildOpts.assetsRoot = buildOverrides[buildOverrides.environment].assetsRoot;
  gulp.buildOpts.socketUrl = buildOverrides[buildOverrides.environment].socketUrl;
  gulp.buildOpts.protocol = buildOverrides[buildOverrides.environment].protocol;
}

// console.log('\n');
// console.log(' _____ _____ _____    _____ _____ __    _____ ');
// console.log('|   __|_   _|     |  |   __|  |  |  |  |  _  |');
// console.log('|__   | | | |-   -|  |  |  |  |  |  |__|   __|');
// console.log('|_____| |_| |_____|  |_____|_____|_____|__| ');

// console.log('\n');
// console.log('|-----------------------|');
// console.log('| STI GULP RUNNING WITH |');
// console.log('|-----------------------|');
console.log('\n');
console.log(JSON.stringify(gulp.buildOpts, null, 2));
console.log('\n');

plugins.loadTasks('gulp');