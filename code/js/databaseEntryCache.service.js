angular.module('archApp')
    .service('DatabaseEntryCache', ['Utility', '$rootScope', '$http', 'API_BASE', '$q', 'Categories',
        function(Utility, $rootScope, $http, API_BASE, $q, Categories) {
        function getUserEmptyModel() {
            return {
                name: '',
                id: '0',
                role: '',
                description: '',
                entryType: 'user'
            };
        }
        function getCarEmptyModel() {
            return {
                model: '',
                id: '0',
                serie: '',
                price: '',
                description: '',
                entryType: 'car'
            };
        }
        function getFileEmptyModel() {
            return {
                name: '',
                id: '0',
                type: '',
                description: '',
                entryType: 'file'
            };
        }
        function getDefaultUserEntries() {
            return $http.get(API_BASE + '/users').then(function(response) {
               if (response && response.data) {
                   existingUsersCache = response.data;
               }
            });
        }
        function getDefaultCarEntries() {
            return $http.get(API_BASE + '/cars').then(function(response) {
                if (response && response.data) {
                    existingCarsCache = response.data;
                }
            });
        }
        function getDefaultFileEntries() {
            return $http.get(API_BASE + '/files').then(function(response) {
                if (response && response.data) {
                    existingFilesCache = response.data;
                }
            });
        }

        var promise = $q.defer();
        var existingUsersCache = [];
        var existingCarsCache = [];
        var existingFilesCache = [];
        var DatabaseEntryCache = {};

        DatabaseEntryCache.getExistingEntries = function(type) {
            switch (type) {
                case 'users':
                    if (!_.isEmpty(existingUsersCache)) {
                        promise.resolve(_.cloneDeep(existingUsersCache));

                        return promise.promise;
                    }

                    return getDefaultUserEntries().then(function() {
                        var users = existingUsersCache;

                        _.each(users, function(user) {
                           user.entryType = 'user';
                           user.specialIcon =  Categories.getClassSuffix(user);
                        });

                        return _.cloneDeep(users);
                    });
                    break;
                case 'cars':
                    if (!_.isEmpty(existingCarsCache)) {
                        promise.resolve(existingCarsCache);

                        return promise.promise;
                    }

                    return getDefaultCarEntries().then(function() {
                        var cars = existingCarsCache;

                        _.each(cars, function(car) {
                            car.entryType = 'car';
                        });

                        return _.cloneDeep(cars);
                    });
                    break;
                case 'files':
                    if (!_.isEmpty(existingFilesCache)) {
                        promise.resolve(_.cloneDeep(existingFilesCache));

                        return promise.promise;
                    }

                    return getDefaultFileEntries().then(function() {
                        var files = existingFilesCache;

                        _.each(files, function(file) {
                            file.entryType = 'file';
                            file.specialIcon =  Categories.getClassSuffix(file);
                        });

                        return _.cloneDeep(files);
                    });
                    break;
            }
        };
        DatabaseEntryCache.getEmptyEntryModel = function(entryType) {
            var emptyModel = getCarEmptyModel();

            if (entryType === 'user') {
                emptyModel = getUserEmptyModel();
            } else if (entryType === 'file') {
                emptyModel = getFileEmptyModel();
            }

            return emptyModel;
        };
        DatabaseEntryCache.addNewEntry = function(entry) {
            var newEntry = {};
            var cache = [];

            if (entry.entryType === 'car') {
                newEntry = getCarEmptyModel();
                cache = existingCarsCache;
            } else if (entry.entryType === 'user') {
                newEntry = getUserEmptyModel();
                cache = existingUsersCache;
            } else if (entry.entryType === 'file') {
                newEntry = getFileEmptyModel();
                cache = existingFilesCache;
            }

            _.each(newEntry, function(value, property) {
                if (entry[property] !== undefined || entry[property] !== null) {
                    newEntry[property] = entry[property];
                }
            });

            if (newEntry.id === '0' || !newEntry.id) {
                newEntry.id = Utility.generateRandomString(9);
                cache.unshift(newEntry);
            } else {
                 _.each(cache, function(item) {
                    if (item.id === newEntry.id) {
                        _.each(item, function(value, property) {
                            if (newEntry[property] !== undefined || newEntry[property] !== null) {
                                item[property] = newEntry[property];
                            }
                        });
                    }
                });
            }

        };
        DatabaseEntryCache.destroyEntry = function(entry) {
            switch (entry.entryType) {
                case 'car':
                    existingCarsCache = _.filter(existingCarsCache, function(cachedEntry) {
                       return entry.id !==  cachedEntry.id;
                    });
                    break;
                case 'user':
                    existingUsersCache = _.filter(existingUsersCache, function(cachedEntry) {
                        return entry.id !==  cachedEntry.id;
                    });
                    break;
                case 'file':
                    existingFilesCache = _.filter(existingFilesCache, function(cachedEntry) {
                        return entry.id !==  cachedEntry.id;
                    });
                    break;
            }

            $rootScope.$broadcast('Action.Entry.reload-items');
        };

        return DatabaseEntryCache;
    }]);
