module.directive('linetip', function () {
  return {
    restrict: 'EACM',
    templateUrl: 'template/linetip.html',
    replace: true,
    transclude: true,
    scope: {
      direction: '=?',
      titleLength: '=?',
      titleAngle: '=?',
      contentLength: '=?',
      titleText: '=?',
      position: '=?'
    },
    link: function (scope, el, attrs) {
      scope.direction = scope.direction || 'top-right';
      scope.titleLength = scope.titleLength || 100;
      scope.contentLength = scope.contentLength || 100;
      scope.titleAngle = scope.titleAngle || 30;
      scope.titleText = scope.titleText || '';
      scope.position = scope.position || [0, 0];

      var calculatePos = function (dir, angle, w1, h2, w2) {
        // debugger;
        var curve = Math.abs(angle) * 2 * Math.PI / 360;
        var offsetX = 0;
        var offsetY = 0;

        if (dir === 'top-right') {
          angle = -angle;

          offsetX = -(0.5 * w1 * (1 - Math.cos(curve)));
          offsetY = 0.5 * (2 * h2 - w1 * Math.sin(curve));
        } else if (dir === 'top-left') {
          offsetX = -(0.5 * w1 * (1 + Math.cos(curve)) + w2)
          offsetY = 0.5 * (2 * h2 - w1 * Math.sin(curve));
        }

        return {
          offsetX: offsetX,
          offsetY: offsetY,
          angle: angle
        };
      };


      // var posInfo = calculatePos(scope.direction, scope.titleAngle, scope.titleLength,
      //                            30, scope.contentLength);

      scope.seg1Style = {
        // width: scope.titleLength,
        width: 0
      //   '-webkit-transform': 'rotate(' + posInfo.angle + 'deg)'
      };

      scope.seg2Style = {
        width: scope.contentLength,
      //   '-webkit-transform': 'translate(' + posInfo.offsetX + 'px, ' + posInfo.offsetY + 'px)'
      };

      scope.tipStyle = {
        left: scope.position[0],
        top: scope.position[1]
      };
    }
  };
});
