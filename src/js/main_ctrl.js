function MainCtrl($scope, config) {
  $scope.companyName = config.companyName;
  $scope.menus = config.menus;
  $scope.pages = {};

  $.each($scope.menus, function (index, menu) {
    $scope.pages[menu.title] = menu.url;
  });

  $scope.activePageId = 'App';


  $scope.onChangeMenu = function (activeIndex) {
    $.each($scope.menus, function (index, menu) {
      menu.active = (index === activeIndex);
    });
  };

  $scope.onChangePage = function (activeIndex) {
    $scope.activePageId = $scope.menus[activeIndex].title;
  };

}

MainCtrl.$inject = ['$scope', 'config'];
