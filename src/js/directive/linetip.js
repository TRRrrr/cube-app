module.directive('linetip', function () {
  return {
    restrict: 'EACM',
    templateUrl: 'template/linetip.html',
    replace: true,
    transclude: true,
    scope: {
      seg1Len: '=?',
      seg2Len: '=?',
      seg1Angle: '=?',
      pos: '=?',
      direction: '=?'
    },
    link: function (scope, el, attrs) {
      var calculatePos = function (direction, angle, s1, s2) {
        var curve = Math.abs(angle) * 2 * Math.PI / 360;
        var offsetX = 0;
        var offsetY = 0;

        if (direction === 'top-right') {
          angle = -angle;
          offsetX = 0.5 * s1 + 0.5 * s1 * Math.cos(curve);
          offsetY = -0.5 * s1 * Math.sin(curve) - 1;
        } else if (direction === 'top-left') {
          offsetX = -(s2 - 0.5 * s1 * (1 - Math.cos(curve)));
          offsetY = -0.5 * s1 * Math.sin(curve) - 1;
        }

        return {
          offsetX: offsetX,
          offsetY: offsetY,
          angle: angle
        };
      };

      var posInfo = calculatePos(scope.direction, scope.seg1Angle, scope.seg1Len, scope.seg2Len);

      scope.seg1Style = {
        width: scope.seg1Len,
        '-webkit-transform': 'rotate(' + posInfo.angle + 'deg)'
      };

      scope.seg2Style = {
        width: scope.seg2Len,
        '-webkit-transform': 'translate(' + posInfo.offsetX + 'px, ' + posInfo.offsetY + 'px)'
      };

      scope.tipStyle = {
        left: scope.pos[0],
        top: scope.pos[1]
      };

      setTimeout(function () {
        var $seg2 = el.find('.tip-seg2');
        var offset = $seg2.offset();

        el.find('.tip-content').css({
          position: 'relative',
          left: posInfo.offsetX,
          top: posInfo.offsetY - 1,
          width: $seg2.width()
        });
      }, 1);
    }
  };
});
