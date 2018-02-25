angular.module('archApp')
    .controller('CreateNewEntryCtrl', [
        '$scope',
        '$state',
        'Categories',
        'Validator',
        'DatabaseEntryCache',
        '$stateParams',
        function($scope, $state, Categories, Validator, DatabaseEntryCache, $stateParams) {
            function loadDefaultInput(type) {
                switch (type) {
                    case 'car':
                        loadDefaultCarInputData();
                        break;
                    case 'user':
                        loadDefaultUserInputData();
                        break;
                    case 'file':
                        loadDefaultFileInputData();
                        break;
                }
            }
            function loadDefaultCarInputData() {
                $scope.newEntryModel = DatabaseEntryCache.getEmptyEntryModel('car');
                $scope.newEntryModel.model = 'BMW';
                $scope.newEntryModel.serie = '320d';

                $scope.existingModels = Categories.getExistingCarModels();
                $scope.existingSeries = Categories.getExistingCarSeries($scope.newEntryModel.model);
            }
            function loadDefaultUserInputData() {
                $scope.newEntryModel = DatabaseEntryCache.getEmptyEntryModel('user');
                $scope.newEntryModel.role = 'admin';

                $scope.existingTypes = Categories.getExistingUserRoles();
                $scope.entryTypeProperty = 'role';
            }
            function loadDefaultFileInputData() {
                $scope.newEntryModel = DatabaseEntryCache.getEmptyEntryModel('file');
                $scope.newEntryModel.type = 'txt';

                $scope.existingTypes = Categories.getExistingFileTypes();
                $scope.entryTypeProperty = 'type';
            }
            $scope.existingCategories = Categories.getExistingCategories();
            $scope.afterSavingData = {};
            $scope.title = "Create New Entry";

            $scope.getClassSuffix = Categories.getClassSuffix;
            $scope.getEntryClassType = Categories.getCategoryIcon;
            $scope.createNewEntry = function() {
                var validationResult = Validator.checkObjectProperties($scope.newEntryModel, true);

                if (validationResult && validationResult.ok) {
                    if ($scope.newEntryModel.entryType !== 'car') {
                        $scope.newEntryModel.specialIcon =  Categories.getClassSuffix($scope.newEntryModel);
                    }

                    DatabaseEntryCache.addNewEntry($scope.newEntryModel);
                    $scope.afterSavingData = {
                        name: 'Entry saved',
                        description: 'Nice to have one more Entry! Go to List of Entries to check everything we got!',
                        backgroundClass: "category-background-success",
                        iconClass: "fa-check",
                        status: 'success'
                    };
                } else if (validationResult && validationResult.message) {
                    $scope.afterSavingData = {
                        name: 'Error occurred',
                        description: validationResult.message,
                        backgroundClass: "category-background-error",
                        iconClass: "fa-exclamation",
                        status: 'fail'
                    };
                }
            };
            $scope.afterSavingDataExists = function() {
               return Object.keys($scope.afterSavingData).length > 0;
            };
            $scope.getContainerClass = function() {
              if ($scope.newEntryModel.entryType !== 'car' && $scope.entryTypeProperty) {
                  return 'type-background-' + $scope.newEntryModel[$scope.entryTypeProperty].toLowerCase();
              }

              return $scope.getClassSuffix($scope.newEntryModel);
            };

            if ($stateParams && !_.isEmpty($stateParams.data)) {
                loadDefaultInput($stateParams.data.entryType);
                $scope.newEntryModel = $stateParams.data;
                $scope.editEntryMode = true;
            } else if ($stateParams && $stateParams.entityType) {
                loadDefaultInput($stateParams.entityType);
            } else {
                loadDefaultCarInputData();
            }

            $scope.$watchCollection('newEntryModel', function(newValue) {
               if (newValue && !_.isEmpty($scope.afterSavingData)) {
                   var validationResult = Validator.checkObjectProperties(newValue, true);

                   if (validationResult && validationResult.ok || $scope.afterSavingData.status === 'success') {
                       $scope.afterSavingData = {};
                   } else if (validationResult && validationResult.message) {
                       $scope.afterSavingData = {
                           name: 'Error occurred',
                           description: validationResult.message,
                           backgroundClass: "category-background-error",
                           iconClass: "fa-exclamation"
                       };
                   }
               }
            });
            $scope.$watch('newEntryModel.entryType', function(newEntryType) {
                if ($scope.newEntryModel.id !== '0') {
                    return;
                }
                switch(newEntryType) {
                    case 'car':
                        loadDefaultCarInputData();
                        break;
                    case 'user':
                        loadDefaultUserInputData();
                        break;
                    case 'file':
                        loadDefaultFileInputData();
                        break;
                }
            });
            $scope.$watch('newEntryModel.model', function(newEntryModel) {
                if (newEntryModel) {
                    $scope.existingSeries = Categories.getExistingCarSeries(newEntryModel);
                    $scope.newEntryModel.serie = $scope.existingSeries[0];
                }
            });
        }
    ]);