angular.module('archApp')
    .service('Categories', function() {
        function getCategoryEmptyModel() {
            return {
                name: '',
                value: '',
                containingItemsNum: 0
            };
        }
        function setDefaultCategories() {
            var categoryNames = ['Users', 'Cars', 'Files'];
            var categoryValues = ['user', 'car', 'file'];

            _.each(categoryNames, function(name, index) {
               var newCategoryObject = getCategoryEmptyModel();

               newCategoryObject.name = name;
               newCategoryObject.value = categoryValues[index];

               existingItemsCache[newCategoryObject.value] = newCategoryObject;
            });
        }
        function getUserClassSuffix(entry) {
            if (entry.role) {
                if (entry.role === 'admin') {
                    return 'fa-lock';
                }

                return 'fa-user-o';
            } else {
                return 'fa-exclamation';
            }
        }
        function getCarClassSuffix(entry) {
            if (entry.model) {
                if (entry.model === 'BMW') {
                    return 'type-background-bmw';
                }
                if (entry.model === 'Maserati') {
                    return 'type-background-maserati';
                }

                return 'type-background-bentley';
            } else {
                return 'fa-exclamation';
            }
        }
        function getFileClassSuffix(entry) {
            var classIcon = "fa-exclamation";

            if (entry.type) {
                switch (entry.type) {
                    case "txt":
                        classIcon = 'fa-font';
                        break;
                    case "html":
                        classIcon = 'fa-html5';
                        break;
                    case "js":
                        classIcon = 'fa-jsfiddle';
                        break;
                    case "css":
                        classIcon = 'fa-css3';
                        break;
                    case "pdf":
                        classIcon = 'fa-pdf-o';
                        break;
                }
            }

            return classIcon;
        }

        var existingItemsCache = {};
        var existingCarModels = ['BMW', 'Bentley', 'Maserati'];
        var existingCarSeries = {
            'BMW': ['330d', '320d', 'M3', 'X5'],
            'Bentley': ['Continental', 'Bentayga'],
            'Maserati': ['Bi-Turbo', 'Quattroporte']
        };
        var existingUserRoles = ['admin', 'assistant'];
        var existingFileTypes = ['txt', 'pdf', 'js', 'html', 'css'];
        var Categories = {};

        Categories.getClassSuffix = function(entry) {
            var classType = '';

            switch (entry.entryType) {
                case 'user':
                    classType = getUserClassSuffix(entry);
                    break;
                case 'car':
                    classType = getCarClassSuffix(entry);
                    break;
                case 'file':
                    classType = getFileClassSuffix(entry);
                    break;
            }

            return classType;
        };
        Categories.getExistingCategories = function() {
            return _.cloneDeep(existingItemsCache);
        };
        Categories.getExistingCarModels = function() {
            return _.cloneDeep(existingCarModels);
        };
        Categories.getExistingCarSeries = function(model) {
            return _.cloneDeep(existingCarSeries[model]);
        };
        Categories.getExistingUserRoles = function() {
            return _.cloneDeep(existingUserRoles);
        };
        Categories.getExistingFileTypes = function() {
            return _.cloneDeep(existingFileTypes);
        };
        Categories.getCategoryIcon = function(category) {
            var classType = '';

            switch (category) {
                case 'user':
                    classType = 'fa-user-circle';
                    break;
                case 'car':
                    classType = 'fa-car';
                    break;
                case 'file':
                    classType = 'fa-files-o';
                    break;
            }

            return classType;
        };

        setDefaultCategories();

        return Categories;
    });
