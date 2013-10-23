module.controller('AppCtrl', ['$scope', '$window', '$http', 'config', function ($scope, $window, $http, config) {
  $scope.config = config;

  $scope.linetips = {
    chest: {
      titleText: 'Chest',
      position: [200, 200],
      direction: 'top-left',
      angle: 20,
      seg1Len: 50,
      seg2Len: 150,
      value: 50,
      oldValue: 60
    },
    wrist: {
      titleText: 'Wrist',
      position: [300, 250],
      direction: 'top-left',
      angle: 20,
      seg1Len: 50,
      seg2Len: 150,
      value: 50,
      oldValue: 60
    },
    neck: {
      titleText: 'Neck',
      position: [500, 200],
      direction: 'top-right',
      angle: 45,
      seg1Len: 50,
      seg2Len: 200,
      value: 70,
      oldValue: 80
    },
    arm: {
      titleText: 'Upper Arm',
      position: [500, 300],
      direction: 'top-right',
      angle: 30,
      seg1Len: 50,
      seg2Len: 200,
      value: 70,
      oldValue: 80
    },
    hip: {
      titleText: 'Hip',
      position: [500, 200],
      direction: 'top-left',
      angle: 30,
      seg1Len: 50,
      seg2Len: 200,
      value: 70,
      oldValue: 80
    },
    thigh: {
      titleText: 'Thigh',
      position: [500, 250],
      direction: 'top-right',
      angle: 30,
      seg1Len: 50,
      seg2Len: 200,
      value: 70,
      oldValue: 80
    },
    calf: {
      titleText: 'Calf',
      position: [500, 400],
      direction: 'top-right',
      angle: 30,
      seg1Len: 50,
      seg2Len: 200,
      value: 70,
      oldValue: 80
    },
  };

  $scope.progress = 70;

  // $http({ method: 'GET', url: '/rest/user/fuq/record'}).
  //   success(function (data) {
  //     console.log(data);
  //   }).
  //   error(function () {
  //     console.log('error');
  //   });

  $scope.chartData = [[3,7,9,1,4,6,8,2,5]];
  $scope.chartOptions = {
    seriesDefaults: {
      // Make this a pie chart.
      // renderer: jQuery.jqplot.CanvasAxisLabelRenderer,
      rendererOptions: {
        // Put data labels on the pie slices.
        // By default, labels show the percentage of the slice.
        showDataLabels: true
      }
    },
    legend: { show: true, location: 'e' }
  };

}]);
