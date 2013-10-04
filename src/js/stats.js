module.controller('StatsCtrl', ['$scope', function ($scope) {
  var options = {
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

  $scope.chartData = [[3,7,9,1,4,6,8,2,5]];

  $scope.chartOptions = options;

  $scope.changeType = function (chartType) {
    debugger;
    if (chartType === 'bar') {
      options.seriesDefaults.renderer = jQuery.jqplot.BarRenderer;
    } else if (chartType === 'line') {
      options.seriesDefaults.renderer = undefined;
    }

    $scope.chartOptions = angular.copy(options);
  };
}]);
