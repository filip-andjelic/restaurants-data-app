angular.module('archApp')
    .controller('ListCarEntriesCtrl', [
        '$scope',
        '$state',
        'Categories',
        'DatabaseEntryCache',
        function($scope, $state, Categories, DatabaseEntryCache) {
            function fetchItems() {
                 DatabaseEntryCache.getExistingEntries('cars').then(function(response) {
                     $scope.existingEntries = response;
                     initialEntries = _.cloneDeep($scope.existingEntries);
                 });
            }
            var initialEntries = [];

            $scope.existingTypes = [{
                value: "model",
                name: "Model"
            }, {
                value: "price",
                name: "Price"
            }];
            $scope.title = 'List of all Cars';
            $scope.activeViewType = 'breadcrumb';
            $scope.getClassSuffix = Categories.getClassSuffix;
            $scope.getEntryClassType = Categories.getCategoryIcon;
            $scope.emptyStateModel = {
                title: 'No Cars in our App!',
                description: 'Did you sold all the Cars ?! Or maybe your search input is incorrect? Oh, that\'s right, customer can\'t be wrong. It must be our fault... ',
                link: {
                    text: 'Click to add a new Car!',
                    sref: 'create_new',
                    params: {
                        entityType: 'car'
                    }
                }
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
                if (property === 'price') {
                    $scope.existingEntries = $scope.existingEntries.sort(function(a, b) {
                        return parseInt(a.price) - parseInt(b.price);
                    });

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
                    if (_.contains(entry.model.toLowerCase(), input.toLowerCase()) ||
                        _.contains(entry.serie.toLowerCase(), input.toLowerCase())) {
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