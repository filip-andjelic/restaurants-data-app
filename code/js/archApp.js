angular.module('archApp', ['ui.router'])
    .constant('API_BASE', 'http://localhost:7171')
    .constant('IMAGES_BASE', 'assets/images/')
    .config(function($urlRouterProvider){
        $urlRouterProvider.when('', '/list-car-entries');
        $urlRouterProvider.otherwise('/list-car-entries');
    });