'use strict'

const AppCtrl = ($scope) => {
  this.name = 'Adam'
  console.log('from inside the appCtrl')
}

console.log('AppCtrl: ', AppCtrl)

export default AppCtrl