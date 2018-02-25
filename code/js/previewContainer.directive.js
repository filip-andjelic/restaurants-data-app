angular.module('archApp')
    .directive('previewContainer', [function() {
        return {
            restrict: 'E',
            templateUrl: 'html/preview-container.html',
            replace: true,
            scope: {
                contentModel: '=contentModel',
                containerClass: '@containerClass',
                iconClass: '@iconClass'
            },
            link: function(scope) {
                scope.getMainTitle = function() {
                    var title = '';

                    if (scope.contentModel.status) {
                        title = scope.contentModel.name;
                    } else {
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
            }
        }
    }]);