'use strict'

import angular from 'angular'
import './application/AppModule'

angular.element(document).ready(
  () => angular.bootstrap(document, ['AppModule'])
);

