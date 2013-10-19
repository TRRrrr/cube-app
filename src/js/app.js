module.controller('AppCtrl', ['$scope', '$window', '$http', function ($scope, $window, $http) {
  // $scope.bodyParts = [
  // ]

  $scope.linetips = [
    // {
    //   id: 'wrist',
    //   titleText: 'Wrist',
    //   position: [300, 250],
    //   direction: 'top-left',
    //   titleAngle: 45,
    //   titleLength: 50,
    //   contentLength: 150,
    //   value: 20,
    //   oldValue: 30
    // },
    {
      id: 'neck',
      titleText: 'Neck',
      position: [550, 300],
      direction: 'top-right',
      titleAngle: 45,
      titleLength: 50,
      contentLength: 200,
      value: 70,
      oldValue: 80
    }
  ];

  setTimeout(function () {
    $scope.progress = 70;
  }, 1);

  // $http({ method: 'GET', url: '/rest/user/fuq/record'}).
  //   success(function (data) {
  //     console.log(data);
  //   }).
  //   error(function () {
  //     console.log('error');
  //   });

}]);
