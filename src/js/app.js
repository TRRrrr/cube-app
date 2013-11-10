module.controller('AppCtrl', ['$scope', '$window', '$http', 'config', function ($scope, $window, $http, config) {
  var username = 'fuq';

  $scope.config = config;

  $scope.linetips = {
    chest: {
      titleText: 'Chest',
      position: [440, 250],
      direction: 'top-left',
      angle: 20,
      seg1Len: 50,
      seg2Len: 150,
      value: "",
      oldValue: ""
    },
    waist: {
      titleText: 'Waist',
      position: [350, 350],
      direction: 'top-left',
      angle: 20,
      seg1Len: 50,
      seg2Len: 150,
      value: "",
      oldValue: ""
    },
    neck: {
      titleText: 'Neck',
      position: [540, 182],
      direction: 'top-right',
      angle: 45,
      seg1Len: 50,
      seg2Len: 200,
      value: "",
      oldValue: ""
    },
    upperarm: {
      titleText: 'Upper Arm',
      position: [590, 250],
      direction: 'top-right',
      angle: 30,
      seg1Len: 50,
      seg2Len: 200,
      value: "",
      oldValue: ""
    },
    hip: {
      titleText: 'Hip',
      position: [430, 400],
      direction: 'top-left',
      angle: 30,
      seg1Len: 50,
      seg2Len: 200,
      value: "",
      oldValue: ""
    },
    thigh: {
      titleText: 'Thigh',
      position: [572, 420],
      direction: 'top-right',
      angle: 30,
      seg1Len: 50,
      seg2Len: 200,
      value: "",
      oldValue: ""
    },
    calf: {
      titleText: 'Calf',
      position: [566, 520],
      direction: 'top-right',
      angle: 30,
      seg1Len: 50,
      seg2Len: 200,
      value: "",
      oldValue: ""
    },
  };

  $scope.cameraStatus = "";


  $http({ method: 'GET', url: '/rest/user/' + username + '/progress' }).
    success(function (data) {
      if (data) {
        $scope.progress = data.progress;
      }
    }).
    error(function () {
      $scope.progress = 0;
    });

  var parts = ['calf', 'chest', 'hip', 'neck', 'thigh', 'upperarm', 'waist'];

  function recordsToHistory(records) {
    var history = {};

    $.each(parts, function (i, part) {
      history[part] = [];
      $.each(records, function (j, record) {
        history[part].unshift([new Date(record.scantime), record[part]]);
      });
    });

    return history;
  }

  function recordsToTips(records) {
    var tips = $scope.linetips;

    if (records[0]) {
      $.each(parts, function (i, part) {
        tips[part].value = records[0][part];
      });
    }

    if (records[1]) {
      $.each(parts, function (i, part) {
        tips[part].oldValue = records[1][part];
      });
    }

    return tips;
  }


  $http({ method: 'GET', url: '/rest/user/' + username + '/record' }).
    success(function (data) {
      if (angular.isArray(data)) {
        // convert data to history
        $scope.historyData = recordsToHistory(data);
        console.log('history', $scope.historyData);

        $scope.chartData = [$scope.historyData.calf];


        // load 3dmodel
        if (data.length > 0) {
          $scope.modelUrl = '/3dmodel/' + data[0].modelAddrs;
        }

        // convert data to tips
        $scope.linetips = recordsToTips(data);
      }
    }).
    error(function () {
      alert('no record');
    });

  $scope.showTrend = function (id){
    $scope.chartData = [$scope.historyData[id]];
  };

  $scope.chartOptions = {
    animate: true,
    seriesDefaults: {
      rendererOptions: {
        animation: {
          speed: 800
        },
        showDataLabels: true
      }
    },
    axes: {
      xaxis: {
        renderer: $.jqplot.DateAxisRenderer,
        tickOptions: { formatString: '%b %#d, %y' },
        tickInterval: '1 week'
      }
    },
    legend: { show: false },
    grid: {
      background: 'rgb(224, 239, 244)',
      shadow: false,
      borderColor: 'rgb(163, 227, 238)'
    }
  };


  $scope.advices = [
    "10 crunches a day",
    "30 push-ups a day"
  ];

  var $controlBtns = $('#control-btns');
  $controlBtns.css('margin-left', $controlBtns.width() / -2);

  $scope.onTurn = function (dir) {
    console.log('turn', dir);
    if(dir!="reset"){
      config.hideTip = true;
    }
    $scope.cameraStatus = dir;
    console.log("$scope" + $scope.cameraStatus);
  };

  $scope.onReset = function () {
    console.log('reset');
    // TODO reset model
    config.hideTip = false;
  };

}]);
