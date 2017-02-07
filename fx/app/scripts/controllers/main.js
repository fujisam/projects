'use strict';

/**
 * @ngdoc function
 * @name fxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fxApp
 */

angular.module('fxApp')
    .controller('MainCtrl', ['$scope', 'realtyService',
        function ($scope, realtyService) {
            $scope.callRealtyService = function () {
                realtyService
                    .async()
                    .then(function (data) {
                        $scope.data = data.result;
                    });
            };
            $scope.callRealtyService();
        }]
    );


