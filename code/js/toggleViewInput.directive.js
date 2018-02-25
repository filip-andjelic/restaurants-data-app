angular.module('archApp')
    .directive('toggleViewInput', [function() {
        return {
            restrict: 'E',
            templateUrl: 'html/toggle-view-input.html',
            replace: true,
            scope: false
        }
    }]);