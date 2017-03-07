import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './map.routes';


export class MapController {
  /*@ngInject*/
  constructor($http) {

    this.allRemcis = [];
    this.newRemci = [];

    this.message = 'Hello';
    this.test = 'Remci';
  }
}

export default angular.module('tableApp.map', [uiRouter])
  .config(routing)
  .component('map', {
    template: require('./map.html'),
    controller: MapController
  })
  .name;
