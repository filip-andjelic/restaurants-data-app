angular.module('archApp')
    .directive('defaultEmptyState', ['$state',
        function($state) {
            return {
                restrict: 'E',
                templateUrl: 'html/default-empty-state.html',
                replace: true,
                scope: {
                    content: '=content'
                },
                link: function (scope) {
                    scope.openNewEntry = function(link) {
                      $state.go(link.sref, link.params);
                    };
                }
            };
}]);