angular.module('archApp')
    .directive('listFooterSummary', [function() {
        return {
            restrict: 'E',
            templateUrl: 'html/list-footer-summary.html',
            replace: true,
            scope: false
        }
    }]);