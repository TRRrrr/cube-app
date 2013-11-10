module.controller('AppCtrl', ['$scope', '$window', '$http', 'config', function ($scope, $window, $http, config) {
  $scope.config = config;

  $scope.linetips = {
    chest: {
      titleText: 'Chest',
      position: [440, 250],
      direction: 'top-left',
      angle: 20,
      seg1Len: 50,
      seg2Len: 150,
      value: 50,
      oldValue: 60,
      history: [[8,7,6,5,6,4,5,64,6]]
    },
    wrist: {
      titleText: 'Wrist',
      position: [350, 350],
      direction: 'top-left',
      angle: 20,
      seg1Len: 50,
      seg2Len: 150,
      value: 50,
      oldValue: 60,
      history: [[80,32,432,42,2,3,1,2,3]]
    },
    neck: {
      titleText: 'Neck',
      position: [540, 182],
      direction: 'top-right',
      angle: 45,
      seg1Len: 50,
      seg2Len: 200,
      value: 70,
      oldValue: 80,
      history: [0]
    },
    arm: {
      titleText: 'Upper Arm',
      position: [590, 250],
      direction: 'top-right',
      angle: 30,
      seg1Len: 50,
      seg2Len: 200,
      value: 70,
      oldValue: 80,
      history: [0]
    },
    hip: {
      titleText: 'Hip',
      position: [430, 400],
      direction: 'top-left',
      angle: 30,
      seg1Len: 50,
      seg2Len: 200,
      value: 70,
      oldValue: 80,
      history: [0]
    },
    thigh: {
      titleText: 'Thigh',
      position: [572, 420],
      direction: 'top-right',
      angle: 30,
      seg1Len: 50,
      seg2Len: 200,
      value: 70,
      oldValue: 80,
      history: [0]
    },
    calf: {
      titleText: 'Calf',
      position: [566, 520],
      direction: 'top-right',
      angle: 30,
      seg1Len: 50,
      seg2Len: 200,
      value: 70,
      oldValue: 80,
      history: [0]
    },
  };
$scope.cameraStatus = "";
$scope.showTrend = function (tip){
  this.setChartData(tip);
};
$scope.setLineTipValue = function(data){
      var that = $scope.linetips;
      var currentValues, lastValues;
      if(data != 0){
        currentValues = data[data.length-1];
        lastValues = data.length != 1 ? data[data.length-2] : 0;
        console.log(currentValues + " " + lastValues + " ; " + data.length);
      }else{
        currentValues = [0];
        lastValues = [0];
      }
      /*if( toType(currentValues)!="array" || toType(lastValues)!="array"){
        console.log("data input error");
        return false;
      }*/  //Defined toType in config.js as a globle. why couldn`t call it here.
      function applyValue(a,b){
        that[a].value = currentValues[b];
        that[a].oldValue = lastValues[b];
      }
      
      return function(){
        var body = ["wrist","neck","chest","arm","thigh","calf","hip"];
        for(var i = 0; i < body.length;i++){
         applyValue(body[i],i);
        }
        for(var i = 0; i < 2; i++ ){console.log("hi");}//history part todo
      }
    };

  $scope.modelUrl = '3dmodel/zhengXian.stl';

  $scope.bodyMesureHistory = {
    wrist:[[3,7,9,1,4,6,8,2,5]],
    neck:[[3,7,9,1,4,6,8,2,5]],
    chest:[[3,7,9,1,4,6,8,2,5]],
    arm:[[3,7,9,1,4,6,8,2,5]],
    thigh:[[3,7,9,1,4,6,8,2,5]],
    calf:[[3,7,9,1,4,6,8,2,5]],
    hip:[[5,7,9,1,4,6,8,2,5]],
    scantime:[[3,7,9,1,4,6,8,2,5]],
    snapShotAddrs:[[3,7,9,1,4,6,8,2,5]],
    modelAddrs: [[3,7,9,1,4,6,8,2,5]]
  };

//fake data input.
  var currentArry = [40,40,30,40,40,40,40]; //fake data of: data[data.length-1]
  var lastArry = [10,50,50,60,50,50,50]; //fack data of: data[data.length-2]
  $scope.setLineTipValue([currentArry,lastArry])();
//
/*  $http({ method: 'GET', url: '/rest/user/fuq/record'}).
      success(function (data) {
        console.log(data);
        if(data.length == 1){$scope.setLineTipValue(0)()}
        $scope.setLineTipValue(data)();
      }).
      error(function () {
       console.log('error');
      });
*/
  $scope.progress = 70;

  $scope.chartData;
  $scope.setChartData = function(a){
    if(typeof a ==="string"){
      if(!this.linetips[a].history){
        console.log("error: incorrect string input");
      }else{
        this.chartData = this.linetips[a].history;
      }
    }
    if(typeof a ==="object"){
      if(!a.history){
        console.log("error: incorrect object input");
      }else{ 
        this.chartData = a.history;
        alert(a.history);
      }
    }
  };
  $scope.setChartData("chest");

  $scope.chartOptions = {
    seriesDefaults: {
      // Make this a pie chart.
      // renderer: jQuery.jqplot.CanvasAxisLabelRenderer,
      rendererOptions: {
        // Put data labels on the pie slices.
        // By default, labels show the percentage of the slice.
        showDataLabels: true
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
    }debugger;
    $scope.cameraStatus = dir;
    console.log("$scope" + $scope.cameraStatus);
  };

  $scope.onReset = function () {
    console.log('reset');
    // TODO reset model
    config.hideTip = false;
  };

}]);
