module.directive('goalDashboard', function () {
  return {
    restrict: 'EACM',
    templateUrl: 'template/goal-dashboard.html',
    replace: true,
    transclude: false,
    scope: {
      percentage: '='
    },
    link: function (scope, el, attrs) {
    }
  };
});
