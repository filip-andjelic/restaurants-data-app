angular.module('archApp')
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('list_items', {
                url: '/list-items',
                controller: 'ListEntriesCtrl',
                templateUrl: 'html/list-entries-page.html'
            });
    }]);