angular.module('archApp')
    .controller('ListEntriesCtrl', [
        '$scope',
        '$state',
        'DatabaseEntryCache',
        function($scope, $state, DatabaseEntryCache) {
            function fetchItems() {
                DatabaseEntryCache.getExistingEntries().then(function(response) {
                    $scope.existingEntries = [];
                    initialEntries = _.cloneDeep(response);
                });
            }
            var initialEntries = [];
            var maxListIndex = 6;

            $scope.onFilter = function(input) {
                var filteredEntries = [];

                if (!input) {
                    $scope.existingEntries = [];
                    $scope.selectedItem = null;

                    return;
                }

                filteredEntries = initialEntries.filter(function(entry) {
                    if (entry.name.toLowerCase().includes(input.toLowerCase())) {
                        return entry;
                    }
                });
                filteredEntries.sort(function (a, b) {
                    return b.rating - a.rating;
                });

                $scope.existingEntries = filteredEntries.slice(0, maxListIndex);
            };
            $scope.onItemSelect = function(item) {
                $scope.selectedItem = item;
            };

            fetchItems();
        }
    ]);