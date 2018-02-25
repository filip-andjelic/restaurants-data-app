angular.module('archApp')
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('list_users', {
                url: '/list-user-entries',
                controller: 'ListUserEntriesCtrl',
                templateUrl: 'html/list-user-entries-page.html'
            })
            .state('create_new', {
                url: '/create-new-entry',
                controller: 'CreateNewEntryCtrl',
                templateUrl: 'html/create-new-entry-page.html',
                params: {
                    entityType: 'car',
                    data: {}
                }
            })
            .state('list_cars', {
                url: '/list-car-entries',
                controller: 'ListCarEntriesCtrl',
                templateUrl: 'html/list-car-entries-page.html'
            })
            .state('list_files', {
                url: '/list-file-entries',
                controller: 'ListFileEntriesCtrl',
                templateUrl: 'html/list-file-entries-page.html'
            });
    }]);