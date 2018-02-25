angular.module('archApp')
    .controller('ArchController', ['$scope', '$state', 'DatabaseEntryCache',
        function($scope, $state, DatabaseEntryCache) {
            function openNewView(item) {
                $state.go(item.view);
            }
            function setItemsToClose() {
                _.each($scope.sidebarItems, function(item) {
                    item.open = false;
                });
            }

            $scope.goToSettingsView = function() {};
            $scope.goToCreateNewView = function() {
                setItemsToClose();
                $state.go('create_new');
            };
            $scope.sidebarItems = [{
                iconClass: 'fa-user-circle',
                view: 'list_users',
                open: false
            }, {
                iconClass: 'fa-car',
                view: 'list_cars',
                open: true
            }, {
                iconClass: 'fa-files-o',
                view: 'list_files',
                open: false
            }];

            $scope.changePageView = function(item) {
                setItemsToClose();
                item.open = true;
                openNewView(item);
            };

            $scope.$on('Action.Entry.edit-entry', function(event, params) {
                var editedEntry = params.entry;

                if (editedEntry) {
                    $state.go('create_new', { data: editedEntry });
                }
            });
            $scope.$on('Action.Entry.destroy-entry', function(event, params) {
                var editedEntry = params.entry;

                if (editedEntry) {
                    DatabaseEntryCache.destroyEntry(editedEntry);
                }
            });
        }]);