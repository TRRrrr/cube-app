module.directive('linetip', function () {
  return {
    restrict: 'EACM',
    templateUrl: 'template/linetip.html',
    replace: true,
    transclude: false,
    scope: {
      direction: '=?',
      titleLength: '=?',
      titleAngle: '=?',
      contentLength: '=?',
      titleText: '=?',
      content: '=?',
      position: '=?',
      onClick: '=?'
    },
    link: function (scope, el, attrs) {
      scope.direction = scope.direction || 'top-right';
      scope.titleLength = scope.titleLength || 100;
      scope.contentLength = scope.contentLength || 100;
      scope.titleAngle = scope.titleAngle || 30;
      scope.titleText = scope.titleText || '';
      scope.content = scope.content || '';
      scope.position = scope.position || [0, 0];
      scope.onClick = scope.onClick || angular.noop;


      var $title = el.find('.tip-title');
      var $content = el.find('.tip-content');

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

      $title.width(scope.titleLength);
      $content.width(scope.contentLength);

      var posInfo = calculatePos(scope.direction, scope.titleAngle, scope.titleLength,
                                 $title.height(), scope.contentLength);
      $title.css({ '-webkit-transform': 'rotate(' + posInfo.angle + 'deg)' });
      $content.css({ '-webkit-transform': 'translate(' + posInfo.offsetX + 'px, ' + posInfo.offsetY + 'px)' });

      el.css({ left: scope.position[0], top: scope.position[1] });

      el.find('span').hover(function () {
        el.addClass('highlight');
      }, function () {
        el.removeClass('highlight');
      });
    }
  };
});
