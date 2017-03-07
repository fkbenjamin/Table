import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './map.routes';


export class MapController {
  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    this.allRemcis = [];
    this.newRemci = '';

    this.message = 'Hello';
    this.test = 'Remci';

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('remci');
    });
  }
  $onInit() {
    this.$http.get('/api/remcis')
      .then(response => {
      this.allRemcis = response.data;
    this.socket.syncUpdates('remci', this.allRemcis);
  });
}

addRemci() {
  if(this.newRemci) {
    this.$http.post('/api/remcis', {
      name: this.newRemci
    });
    this.newRemci = '';
  }
}

deleteRemci(remci){
  this.$http.delete(`/api/remcis/${remci._id}`);
}
}


export default angular.module('tableApp.map', [uiRouter])
  .config(routing)
  .component('map', {
    template: require('./map.html'),
    controller: MapController
  })
  .name;
