angular.module('archApp')
    .directive('pageMainHeader', [
        function() {
            return {
                restrict: 'E',
                templateUrl: 'html/page-main-header.html',
                replace: true,
                scope: {
                    filterInput: "=filterInput",
                    onSort: "=onSort",
                    onFilter: "=onFilter",
                    title: "=title",
                    toggleInput: "=toggleInput",
                    toggle: "&toggle",
                    activeViewType: "=activeViewType",
                    existingTypes: "=existingTypes",
                    createNewEntry: "=createNewEntry"
                },
                link: function(scope) {
                    scope.toggleView = function(type) {
                      scope.toggle({ type: type });
                    };
                    scope.create = function() {
                      scope.createNewEntry();
                    };
                }
            };
    }]);