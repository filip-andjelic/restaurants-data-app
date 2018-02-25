angular.module('archApp')
    .directive('textSearchBox', [function() {
        return {
            restrict: 'E',
            templateUrl: 'html/text-search-box.html',
            replace: true,
            scope: {
                onChange: '&onChange',
                onSelect: '&onSelect',
                list: '=list'
            },
            link: function(scope) {
                scope.select = function(item) {
                  scope.onSelect({
                      item: item
                  });
                };
                scope.onFilter = function(input) {
                    scope.onChange({
                        input: input
                    });
                };
            }
        }
    }]);