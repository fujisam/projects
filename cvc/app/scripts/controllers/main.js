'use strict';

/**
 * @ngdoc function
 * @name cvcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cvcApp
 */
angular.module('cvcApp')
    .controller(
        'MainCtrl', ['$scope', '$timeout', '$q', '$http', '$location', '$log', '$filter', 'myService',
            function ($scope, $timeout, $q, $http, $location, $log, $filter, myService) {
                // $scope.getData = function (url) {
                //     var defer = $q.defer();
                //     $http
                //         .get(url)
                //         .then(function (response) {
                //             var data = response.data;
                //             var status = response.status;
                //             var statusText = response.statusText;
                //             var headers = response.headers;
                //             var config = response.config;
                //
                //             $scope.carData = data;
                //             $scope.carDataMoreData = data.moreData;
                //             console.log(data);
                //             console.log($scope.carData.length);
                //         });
                // };
                // $scope.getData("scripts/data.json");

                $scope.currency = "0";
                $scope.priceOrder = "0";
                $scope.rentalPlace = "1";
                $scope.returnPlace = "1";


                $scope.carService = function () {
                    myService.async().then(function (d) {
                        $scope.dataTemp = d;
                        $scope.data = d;
                    });
                };
                $scope.carService();


                var maintScript = function () {
                    $scope.setItemsPerPage = function (num) {
                        var lgtData = ($scope.data).length;

                        $scope.viewby = num.toString();
                        $scope.currentPage = 1;
                        $scope.totalItems = (lgtData / $scope.viewby) * 10;
                        $scope.itemsPerPage = $scope.viewby;
                    };
                    $scope.setItemsPerPage(3);


                    $scope.setPage = function (pageNo) {
                        $scope.currentPage = pageNo;
                    };


                    $scope.pageChanged = function () {
                        console.log('Page changed to: ' + $scope.currentPage);
                    };


                    $scope.filterCurrency = function () {
                        if ($scope.currency != "0") {
                            $scope.data = $filter('filter')($scope.dataTemp, {currency: $scope.currency});
                        } else {
                            $scope.data = $scope.dataTemp;
                        }
                        $scope.setItemsPerPage($scope.viewby);
                    };


                    $scope.filterPriceOrder = function () {
                        if ($scope.priceOrder == "0") {
                            $scope.data = $scope.dataTemp;
                        }
                        if ($scope.priceOrder == "1") {
                            $scope.data = $filter('orderBy')($scope.dataTemp, 'price');
                        }
                        if ($scope.priceOrder == "2") {
                            $scope.data = $filter('orderBy')($scope.dataTemp, 'price');
                            ($scope.data).reverse();
                        }
                        $scope.setItemsPerPage($scope.viewby);
                    };


                    $scope.findCarsByPlaces = function () {
                        $scope.carService();
                        var filterCar = function () {
                            $scope.data = $filter('filter')($scope.data, {rentalPlace: $scope.rentalPlace});
                            $scope.data = $filter('filter')($scope.data, {returnPlace: $scope.returnPlace});
                            $scope.dataTemp = $scope.data;
                            $scope.setItemsPerPage($scope.viewby);
                        };
                        $timeout(filterCar, 10);
                    };


                    $scope.favorite = function (param) {
                        var sClass = angular.element(param).attr('class');
                        if (sClass.indexOf("not-make-favorite") == -1) {
                            angular.element(param).addClass("not-make-favorite");
                        } else {
                            angular.element(param).removeClass("not-make-favorite");
                        }
                    };
                };
                $timeout(maintScript, 10);
            }]);





