module.controller('AppCtrl', ['$scope', '$window', '$http', 'config', function ($scope, $window, $http, config) {
  $scope.config = config;

  $scope.linetips = {
    chest: {
      titleText: 'Chest',
      position: [200, 200],
      direction: 'top-left',
      angle: 20,
      seg1Len: 50,
      seg2Len: 150,
      value: 50,
      oldValue: 60
    },
    wrist: {
      titleText: 'Wrist',
      position: [300, 250],
      direction: 'top-left',
      angle: 20,
      seg1Len: 50,
      seg2Len: 150,
      value: 50,
      oldValue: 60
    },
    neck: {
      titleText: 'Neck',
      position: [500, 200],
      direction: 'top-right',
      angle: 45,
      seg1Len: 50,
      seg2Len: 200,
      value: 70,
      oldValue: 80
    },
    arm: {
      titleText: 'Upper Arm',
      position: [500, 300],
      direction: 'top-right',
      angle: 30,
      seg1Len: 50,
      seg2Len: 200,
      value: 70,
      oldValue: 80
    },
    hip: {
      titleText: 'Hip',
      position: [500, 200],
      direction: 'top-left',
      angle: 30,
      seg1Len: 50,
      seg2Len: 200,
      value: 70,
      oldValue: 80
    },
    thigh: {
      titleText: 'Thigh',
      position: [500, 250],
      direction: 'top-right',
      angle: 30,
      seg1Len: 50,
      seg2Len: 200,
      value: 70,
      oldValue: 80
    },
    calf: {
      titleText: 'Calf',
      position: [500, 400],
      direction: 'top-right',
      angle: 30,
      seg1Len: 50,
      seg2Len: 200,
      value: 70,
      oldValue: 80
    },
  };
$scope.showTrend = function (){
  alert();
}
$scope.setLineTipValue = function(currentArry, lastArry){
      var currentValues = currentArry;
      var lastValues = lastArry;
      var that = this.linetips;
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
      }
    },

$scope.bodyMesureHistory ={
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
  }

 /*  $http({ method: 'GET', url: '/rest/user/fuq/record'}).
     success(function (data) {
       console.log(data);
       $scope.setLineTipValue(data[data.length-1],data[data.length-2])();
       $scope.bodyMesureHistory = {}; //clean up.
       for( var i = 0; i < data.length){
          var counter = 1;
          //key = 1: skip userid.
          for( var key = 1 in $scope.bodyMesureHistory){
            var obj = $scope.bodyMesureHistory[key];
            var dt = data[i];
            if(dt[counter]){
              obj.push(dt[counter]);
              counter++;
            }else{
              console.log("Input error");
              return false;
            }
          }
       }
     }).
     error(function () {
       console.log('error');
     });
*/
//fake data input.
  var currentArry = [40,40,30,40,40,40,40]; //fake data of: data[data.length-1]
  var lastArry = [10,50,50,60,50,50,50]; //fack data of: data[data.length-2]
  $scope.setLineTipValue(currentArry,lastArry)();
//
  $scope.progress = 70;
  
  $scope.chartData;
  $scope.setChartData = function(a){
    this.chartData = this.bodyMesureHistory[a];
  };
  $scope.setChartData("hip");

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

}]);
