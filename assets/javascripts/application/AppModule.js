import 'angular-ui-router'
import { default as AppCtrl } from '../controllers/appCtrl'
import layout from '../../templates/layout.html!'

console.log('AppCtrl: ', AppCtrl);
console.log('layout: ', layout);

const AppModule = angular.module('AppModule', ['ui.router'])
  .config(($stateProvider) => {

    $stateProvider.state('app', {
      url: '/',
      views: {
        application: {
          template: layout,
          controller: AppCtrl,
          controllerAs: 'appCtrl'
        }
      }
    });

  })
  .controller('AppCtrl', AppCtrl);