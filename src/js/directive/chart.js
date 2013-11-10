module.directive('uiChart', function () {
  return {
    restrict: 'EACM',
    template: '<div></div>',
    replace: true,
    link: function (scope, elem, attrs) {
      var height = scope.$eval(attrs.height);
      elem.height(height);

      var renderChart = function () {
        var data = scope.$eval(attrs.data);
        elem.html('');
        if (!angular.isArray(data)) {
          return;
        }

        var opts = {};
        if (!angular.isUndefined(attrs.options)) {
          opts = scope.$eval(attrs.options);
          if (!angular.isObject(opts)) {
            throw 'Invalid ui.chart options attribute';
          }
        }

        elem.jqplot(data, opts);
      };

      scope.$watch(attrs.data, function () {
        renderChart();
      }, true);

      scope.$watch(attrs.options, function () {
        renderChart();
      });
    }
  };
});
