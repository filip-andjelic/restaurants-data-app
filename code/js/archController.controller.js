angular.module('archApp')
    .controller('ArchController', ['$scope', 'IMAGES_BASE',
        function($scope, IMAGES_BASE) {
            $scope.sidebarTypeItems = [{
                title: 'Restorani prema tipu kuhinje',
                className: 'type-item-title'
            }, {
                iconClass: 'fa-chevron-right',
                title: 'Domaca',
                className: 'type-item-sub'
            }, {
                iconClass: 'fa-chevron-right',
                title: 'Kineska',
                className: 'type-item-sub'
            }, {
                iconClass: 'fa-chevron-right',
                title: 'Meksicka',
                className: 'type-item-sub'
            }, {
                iconClass: 'fa-chevron-right',
                title: 'Indijska',
                className: 'type-item-sub'
            }, {
                iconClass: 'fa-chevron-right',
                title: 'Italijanska',
                className: 'type-item-sub'
            }];

            $scope.sidebarTopItems = [{
                title: 'Top 5 restorana',
                className: 'type-item-title'
            }, {
                iconClass: 'fa-heart',
                title: 'Prvi restoran',
                className: 'type-item-sub',
                backgroundUrl: IMAGES_BASE + 'prvi.jpg',
                likeCount: 120
            }, {
                iconClass: 'fa-heart',
                title: 'Sad ide drugi restoran',
                className: 'type-item-sub',
                backgroundUrl: IMAGES_BASE + 'drugi.jpg',
                likeCount: 234
            }, {
                iconClass: 'fa-heart',
                title: 'Treci je najgori restoran',
                className: 'type-item-sub',
                backgroundUrl: IMAGES_BASE + 'treci.jpg',
                likeCount: 5
            }, {
                iconClass: 'fa-heart',
                title: 'Cetvrti restoran',
                className: 'type-item-sub',
                backgroundUrl: IMAGES_BASE + 'cetvrti.jpg',
                likeCount: 7787
            }, {
                iconClass: 'fa-heart',
                title: 'Prvi otpozadi',
                className: 'type-item-sub',
                backgroundUrl: IMAGES_BASE + 'peti.jpg',
                likeCount: 622
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