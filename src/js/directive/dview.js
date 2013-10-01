angular.module('perfetch').
  directive('dview', function () {
    return {
      restrict: 'EACM',
      templateUrl: 'template/dview.html',
      replace: true,
      transclude: false,
      scope: {
        pages: '=',
        active: '=',
        onChangePage: '&'
      },
      link: function (scope, el, attrs) {
        // pages that are loaded in browser
        scope.loadedPages = {};

        scope.$watch('active', function (id) {
          if (scope.loadedPages[id]) {
            return;
          }

          // load page
          if (scope.pages && scope.pages[id]) {
            scope.loadedPages[id] = scope.pages[id];
          }


        });
      }
    };
  });
