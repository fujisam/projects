'use strict';

/**
 * @ngdoc overview
 * @name cvcApp
 * @description
 * # cvcApp
 *
 * Main module of the application.
 */
angular
    .module('cvcApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap'
    ])


    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .otherwise({
                redirectTo: '/'
            });
    })


    .factory('myService', function ($http) {
        var myService = {
            async: function () {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get('../data.json').then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            }
        };
        return myService;
    })


