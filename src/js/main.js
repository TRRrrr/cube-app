module.controller('MainCtrl', ['$scope', 'config', function ($scope, config) {
  $scope.companyName = config.companyName;
  $scope.menus = config.menus;

  $scope.pages = {};
  $.each($scope.menus, function (index, menu) {
    $scope.pages[menu.id] = menu.url;
  });

  $scope.onChangeMenu = function (id) {
    $scope.activePageId = id;
  };


}]);
