angular.module('archApp')
    .directive('displayWindow', ['IMAGES_BASE', function(IMAGES_BASE) {
        return {
            restrict: 'E',
            templateUrl: 'html/data-display-window.html',
            replace: true,
            scope: {
                data: '=data',
            },
            link: function(scope) {
                scope.getImageUrl = function() {
                  var imageUrl = '';

                  if (scope.data.images && scope.data.images.original && scope.data.images.original[0]) {
                      imageUrl = scope.data.images.original[0];
                  } else {
                      imageUrl = IMAGES_BASE + 'empty.gif';
                  }

                  return imageUrl;
                };
                scope.getRatingClass = function(value) {
                    if (value < 60) {
                        return 'bad';
                    }
                    if (value < 80) {
                      return 'middle';
                    }

                    return 'good';
                };
            }
        }
    }]);