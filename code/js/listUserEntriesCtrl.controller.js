angular.module('archApp')
    .controller('ListUserEntriesCtrl', [
        '$scope',
        '$state',
        'Categories',
        'DatabaseEntryCache',
        function($scope, $state, Categories, DatabaseEntryCache) {
            function fetchItems() {
                DatabaseEntryCache.getExistingEntries('users').then(function(response) {
                    $scope.existingEntries = response;
                    initialEntries = _.cloneDeep($scope.existingEntries);
                });
            }
            var initialEntries = [];

            $scope.existingTypes = [{
                value: "name",
                name: "User name"
            }, {
                value: "role",
                name: "User role"
            }];
            $scope.title = 'List of all User Profiles';
            $scope.activeViewType = 'breadcrumb';
            $scope.getClassSuffix = Categories.getClassSuffix;
            $scope.getEntryClassType = Categories.getCategoryIcon;
            $scope.emptyStateModel = {
                title: 'No Users in our App!',
                description: 'You must be joking, right ? How could you fire all of your men! Or you just forgot their names, and searched for wrong one?',
                link: {
                    text: 'Click to add new employee Profile!',
                    sref: 'create_new',
                    params: {
                        entityType: 'user'
                    }
                }
            };

            $scope.getContainerClass = function(entry) {
                return 'type-background-' + entry.role.toLowerCase();
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
                        _.contains(entry.role.toLowerCase(), input.toLowerCase())) {
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