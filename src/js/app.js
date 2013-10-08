module.controller('AppCtrl', ['$scope', '$window', function ($scope, $window) {
  $scope.a = 'this is cool!';
  $scope.showTip = false;

  $scope.advicePanel = {
    title: 'Advice',
    advice: 'workind hard!'
  };

  var onClickTip = function (part) {
    return function () {
      $scope.advicePanel.title = 'Advice for ' + part;
    };
  };

  $scope.linetips = [
    {
      titleText: 'wrist',
      content: '30->40',
      position: [300, 400],
      direction: 'top-left',
      titleAngle: 30,
      titleLength: 100,
      contentLength: 120,
      onClick: onClickTip('wrist')
    },
    {
      titleText: 'neck',
      content: '70->80',
      position: [550, 300],
      direction: 'top-right',
      titleAngle: 45,
      titleLength: 100,
      contentLength: 120,
      onClick: onClickTip('neck')
    }
  ];

}]);
