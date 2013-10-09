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
      position: '=?',
      onClick: '=?',
      selected: '=?'
    },
    link: function (scope, el, attrs) {
      scope.direction = scope.direction || 'top-right';
      scope.titleLength = scope.titleLength || 100;
      scope.contentLength = scope.contentLength || 100;
      scope.titleAngle = scope.titleAngle || 30;
      scope.titleText = scope.titleText || '';
      scope.position = scope.position || [0, 0];
      scope.onClick = scope.onClick || angular.noop;

      var calculatePos = function (dir, angle, w, h, w2) {
        var curve = Math.abs(angle) * 2 * Math.PI / 360;
        var offsetX = 0;
        var offsetY = 0;

        offsetX = 0.5 * w * (1 - Math.cos(curve)) + 0.5 * h * Math.sin(curve);
        offsetY = 0.5 * w * Math.sin(curve) + 0.5 * h * (1 + Math.cos(curve));

        if (dir === 'top-left' || dir === 'bottom-left') {
          offsetX += w * Math.cos(curve) + w2 - h * Math.sin(curve);
        }

        if (dir === 'top-right' || dir === 'top-left') {
          offsetY = -offsetY;
        }
        if (dir === 'top-right' || dir === 'bottom-left') {
          angle = -angle;
        }

        offsetX = -offsetX;

        return {
          offsetX: offsetX,
          offsetY: offsetY,
          angle: angle
        };
      };

      scope.titleStyle = {
        width: scope.titleLength
      };

      scope.contentStyle = {
        width: scope.contentLength
      };

      var posInfo = calculatePos(scope.direction, scope.titleAngle, scope.titleLength,
                                 el.find('.tip-title').height(), scope.contentLength);
      scope.titleStyle['-webkit-transform'] = 'rotate(' + posInfo.angle + 'deg)';
      scope.contentStyle['-webkit-transform'] = 'translate(' + posInfo.offsetX + 'px, ' + posInfo.offsetY + 'px)';

      scope.tipStyle = {
        left: scope.position[0],
        top: scope.position[1]
      };

      scope.onMouseEnter = function () {
        scope.highlight = 'highlight';
      };

      scope.onMouseLeave = function () {
        scope.highlight = '';
      };

      scope.$watch('selected', function (value) {
        if (value) {
          scope.selected = 'selected';
        } else {
          scope.selected = '';
        }
      });
    }
  };
});