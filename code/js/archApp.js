angular.module('archApp', ['ui.router'])
    .constant('API_BASE', 'http://localhost:3000')
    .config(function($urlRouterProvider){
        $urlRouterProvider.when('', '/list-car-entries');
        $urlRouterProvider.otherwise('/list-car-entries');
    });