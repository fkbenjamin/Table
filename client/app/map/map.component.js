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

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('remci');
    });

    $scope.range = function (min, max) {
      var input = [];
      for (var i = min; i <= max; i++) input.push(i);
      return input;
    };
  }

  $onInit() {
    this.setupCanvas();
    this.$http.get('/api/remcis')
      .then(response => {
      this.allRemcis = response.data;
    this.socket.syncUpdates('remci', this.allRemcis);
  }

)
}

setupCanvas()
{
  var sel = "#E6E153";
  var width = 1000;
  var height = 800;
  var gridSize = 50;
  var s1;
  s1 = Snap(width, gridSize * 4);
  var red = s1.rect(0,0, gridSize, gridSize);
  red.attr({
    fill: "#E65353"
  });
  red.click(function() {
    sel =  "#E65353"
  });
  var blue = s1.rect(0,50, gridSize, gridSize);
  blue.attr({
    fill: "#5353E6"
  });
  blue.click(function() {
    sel =  "#5353E6";
  });
  var green = s1.rect(0,100, gridSize, gridSize);
  green.attr({
    fill: "#53E653"
  });
  green.click(function() {
    sel =  "#53E653"
  });
  var yellow = s1.rect(0,150, gridSize, gridSize);
  yellow.attr({
    fill: "#E6E153"
  });
  yellow.click(function() {
    sel =  "#E6E153"
  });
  var s2 = Snap(width, height);
  var bg = s2.rect(0,0,width,height);
  bg.attr({
    fill: "#abcd"
  });
  for (var h = 0; h <= height - gridSize; h += gridSize) {
    for (var i = 0; i <= width - gridSize; i += gridSize) {
      var tile = s2.rect(i, h, gridSize, gridSize);
      tile.attr({
        fill: "#E65353",
        stroke: "#000",
        strokeWidth: 3
      });
      tile.click(function () {
        this.attr({
          fill: sel
        });
      });
    }
  }
  }

addRemci()
{
  if (this.newRemci) {
    this.$http.post('/api/remcis', {
      name: this.newRemci
    });
    this.newRemci = '';
  }
};

deleteRemci(remci)
{
  this.$http.delete('/api/remcis/${remci._id}')
};
}


export default angular.module('tableApp.map', [uiRouter])
  .config(routing)
  .component('map', {
    template: require('./map.html'),
    controller: MapController
  })
  .name;
