angular.module('archApp')
    .directive('filterSortInput', [
        function() {
            return {
                restrict: 'E',
                templateUrl: 'html/filter-sort-input.html',
                replace: true,
                scope: {
                    onSort: "&onSort",
                    onFilter: "&onFilter",
                    existingTypes: "=existingTypes"
                },
                link: function(scope) {
                    scope.sortType = "initial";

                    scope.handleSort = function(type) {
                        scope.onSort({ property: type });
                    };
                    scope.handleFilter = function(input) {
                        scope.onFilter({ input: input });
                    };
                }
            };
        }]);