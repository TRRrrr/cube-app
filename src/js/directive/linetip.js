module.directive('linetip', function () {
  return {
    restrict: 'EACM',
    templateUrl: 'template/linetip.html',
    replace: true,
    transclude: false,
    scope: {
      position: '=',
      titleLength: '=',
      titleAngle: '=',
      contentLength: '=',
      titleText: '=',
      content: '=',
      onClick: '&'
    },
    link: function (scope, el, attrs) {
      var $title = el.find('.tip-title');
      var $content = el.find('.tip-content');

      var calculateOffset = function (angle, w, h) {
        var curve = Math.abs(angle) * 2 * Math.PI / 360;

        var offsetX = 0.5 * w * (1 - Math.cos(curve)) + 0.5 * h * Math.sin(curve);
        var offsetY = 0.5 * w * Math.sin(curve) + 0.5 * h * (1 + Math.cos(curve));

        return {
          x: offsetX,
          y: offsetY
        };
      };

      $title.width(scope.titleLength);
      $content.width(scope.contentLength);

      $title.css({ '-webkit-transform': 'rotate(' + scope.titleAngle + 'deg)' });

      var offset = calculateOffset(scope.titleAngle, scope.titleLength, 21);
      $content.css({ '-webkit-transform': 'translate(-' + offset.x + 'px, -' + offset.y + 'px)' });
    }
  };
});
