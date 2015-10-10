import 'angular-ui-router'
import { appCtrl } from './controllers/appCtrl'
import layout from 'modules/application/views/layout.html!'

angular.module('AppModule', ['ui.router'])
  .config(($stateProvider) => {

    $stateProvider.state('app', {
      url: '/',
      views: {
        application: {
          template: layout,
          controller: appCtrl,
          controllerAs: 'appCtrl'
        }
      }
    });

  })
  .controller('appCtrl', appCtrl);