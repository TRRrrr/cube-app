module.directive('menu', function () {
  return {
    restrict: 'EACM',
    templateUrl: 'template/menu.html',
    replace: true,
    transclude: false,
    scope: {
      menus: '=',
      brand: '=',
      active: '=',
      onChange: '='
    },
    link: function (scope, el, attrs) {
      scope.onChange = scope.onChange || angular.noop;
      scope.brand = scope.brand || '';
      scope.menus = scope.menus || [];

      scope.onChangeMenu = function (obj) {
        if (angular.isString(obj)) {
          scope.activeMenuId = obj;
        } else if (angular.isNumber(obj)) {
          scope.activeMenuId = scope.menus[obj].id;
        }

        scope.onChange(scope.activeMenuId);
      };

      scope.$watch('active', function (value) {
        if (value != null) {
          scope.onChangeMenu(value);
        }
      });

      if (angular.isString(scope.active)) {
        scope.activeMenuId = scope.active;
      } else if (scope.menus && scope.menus.length) {
        scope.activeMenuId = scope.menus[0].id;
      } else {
        scope.activeMenuId = '';
      }

      if (scope.activeMenuId) {
        scope.onChange(scope.activeMenuId);
      }
    }
  };
});
