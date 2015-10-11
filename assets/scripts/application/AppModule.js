import 'angular-ui-router'
import { AppCtrl } from '../controllers/appCtrl'
import layout from '../../views/layout.html!'

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
  .controller('appCtrl', AppCtrl);