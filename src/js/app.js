module.controller('AppCtrl', ['$scope', '$window', function ($scope, $window) {
  $scope.a = 'this is cool!';
  $scope.showTip = false;

  $scope.advicePanel = {
    title: 'Advice',
    advice: 'workind hard!'
  };

  var onClickTip = function (index) {
    return function () {
      $.each($scope.linetips, function (i, el) {
        el.selected = false;
      });

      $scope.linetips[index].selected = true;
      $scope.advicePanel.title = 'Advice for ' + $scope.linetips[index].titleText;
      $scope.advicePanel.advice = 'work hard on your ' + $scope.linetips[index].titleText;
    };
  };

  $scope.linetips = [
    {
      id: 'wrist',
      titleText: 'wrist',
      content: '30->40',
      position: [300, 400],
      direction: 'top-left',
      titleAngle: 30,
      titleLength: 100,
      contentLength: 120,
      onClick: onClickTip(0)
    },
    {
      id: 'neck',
      titleText: 'neck',
      content: '70->80',
      position: [550, 300],
      direction: 'top-right',
      titleAngle: 45,
      titleLength: 100,
      contentLength: 120,
      onClick: onClickTip(1)
    }
  ];

}]);
