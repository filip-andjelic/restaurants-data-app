angular.module('archApp')
    .service('DatabaseEntryCache', ['$http', 'API_BASE',
        function($http, API_BASE) {
            function getDefaultUserEntries() {
                return $http.get(API_BASE + '/results').then(function(response) {
                    if (response && response.data) {
                        existingDataCache = response.data;
                    }
                });
            }

            var DatabaseEntryCache = {};
            var existingDataCache = [];

            DatabaseEntryCache.getExistingEntries = function() {
                return getDefaultUserEntries().then(function() {
                    return existingDataCache;
                }, function() {
                    return [];
                });
            };

            return DatabaseEntryCache;
        }]);
