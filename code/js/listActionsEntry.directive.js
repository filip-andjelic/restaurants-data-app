angular.module('archApp')
    .directive('listActionsEntry', ['$rootScope', 'Categories',
        function($rootScope, Categories) {
            return {
                restrict: 'E',
                templateUrl: 'html/list-actions-entry.html',
                replace: true,
                scope: {
                    contentModel: '=contentModel',
                    containerClass: '@containerClass',
                    iconClass: '@iconClass'
                },
                link: function(scope) {
                    scope.isFavorite = false;
                    scope.descriptionExpanded = false;

                    scope.getEntryClassType = Categories.getCategoryIcon;
                    scope.triggerEntityAction = function(actionName) {
                        scope.triggerActionsToggle(false);

                        $rootScope.$broadcast('Action.Entry.' + actionName, {
                            entry: scope.contentModel
                        });
                    };
                    scope.triggerActionsToggle = function(show) {
                        scope.showActions = show;
                    };
                    scope.toggleExpandDescription = function(show) {
                        scope.descriptionExpanded = show;
                    };
                    scope.getMainTitle = function() {
                        var title = '';

                        switch (scope.contentModel.entryType) {
                            case 'user':
                                title = scope.contentModel.name;
                                break;
                            case 'car':
                                title = scope.contentModel.model + ' - ' + scope.contentModel.serie;
                                break;
                            case 'file':
                                title = scope.contentModel.name;
                                break;
                        }

                        return title;
                    };
                    scope.getSubTitle = function() {
                        var title = '';

                        switch (scope.contentModel.entryType) {
                            case 'user':
                                title = scope.contentModel.role;
                                break;
                            case 'car':
                                title = scope.contentModel.price ? scope.contentModel.price + ' $' : null;
                                break;
                            case 'file':
                                title = scope.contentModel.type ? '*.' + scope.contentModel.type : null;
                                break;
                        }

                        return title;
                    };

                    scope.$watchCollection('contentModel', function(newModel) {
                        if (newModel) {
                            scope.isFavorite = newModel.favorite;
                        }
                    });
                }
            }
        }]);