'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './map.routes';

export class MapComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('tableApp.map', [uiRouter])
  .config(routes)
  .component('map', {
    template: require('./map.html'),
    controller: MapComponent,
    controllerAs: 'mapCtrl'
  })
  .name;
