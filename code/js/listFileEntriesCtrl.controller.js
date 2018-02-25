angular.module('archApp')
    .controller('ListFileEntriesCtrl', [
        '$scope',
        '$state',
        'Categories',
        'DatabaseEntryCache',
        function($scope, $state, Categories, DatabaseEntryCache) {
            function fetchItems() {
                DatabaseEntryCache.getExistingEntries('files').then(function(response) {
                    $scope.existingEntries = response;
                    initialEntries = _.cloneDeep($scope.existingEntries);
                });
            }
            var initialEntries = [];

            $scope.existingTypes = [{
                value: "name",
                name: "File name"
            }, {
                value: "extension",
                name: "File type"
            }];
            $scope.title = 'List of all File Entries';
            $scope.activeViewType = 'breadcrumb';
            $scope.getClassSuffix = Categories.getClassSuffix;
            $scope.getEntryClassType = Categories.getCategoryIcon;
            $scope.emptyStateModel = {
                title: 'No Files in our App!',
                description: 'Yeah, right... Why would anyone even want to have some files in his Application? You did a right thing if you cleaned them up! But, if you ever want to create a new file...',
                link: {
                    text: 'Click here to add it!',
                    sref: 'create_new',
                    params: {
                        entityType: 'file'
                    }
                }
            };

            $scope.getContainerClass = function(entry) {
                return 'type-background-' + entry.type.toLowerCase();
            };
            $scope.hasEntriesToShow = function() {
                return $scope.existingEntries ? Object.keys($scope.existingEntries).length : false;
            };
            $scope.toggleView = function(type) {
                $scope.activeViewType = type;
            };
            $scope.onSort = function(property) {
                if (property === 'initial') {
                    $scope.existingEntries = _.cloneDeep(initialEntries);

                    return;
                }

                $scope.existingEntries = _.sortBy($scope.existingEntries, property);
            };
            $scope.onFilter = function(input) {
                if (!input) {
                    $scope.existingEntries = _.cloneDeep(initialEntries);

                    return;
                }

                $scope.existingEntries = _.filter(initialEntries, function(entry) {
                    if (_.contains(entry.name.toLowerCase(), input.toLowerCase()) ||
                        _.contains(entry.type.toLowerCase(), input.toLowerCase())) {
                        return entry;
                    }
                });
            };

            fetchItems();

            $scope.$on('Action.Entry.reload-items', function() {
                fetchItems();
            });
        }
    ]);