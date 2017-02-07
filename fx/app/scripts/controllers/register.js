'use strict';

/**
 * @ngdoc function
 * @name fxApp.controller:AboutCtrl
 * @description
 * # RegisterCtrl
 * Controller of the fxApp
 */

angular.module('fxApp')
    .controller('RegisterCtrl', ['$scope', 'STRING_CONSTANT', 'fileUpload', 'methodUrl', 'messageService',
        function ($scope, STRING_CONSTANT, fileUpload, methodUrl, messageService) {
            //default
            $scope.form = {};
            $scope.form.id = 0;
            $scope.form.type = "Appartment";
            $scope.form.image = [];


            $scope.setFileUpload = function (element) {
                fileUpload.imageUpload($scope, element);
            };


            $scope.submitData = function () {
                $scope.formTemp = $scope.form;//prevent changes in form view
                var place = {};
                place.address = $scope.formTemp.street + ", " +
                    $scope.formTemp.streetNumber + ", " +
                    $scope.formTemp.district + ", " +
                    $scope.formTemp.city + ", " +
                    $scope.formTemp.brState;
                $scope.formTemp.place = place;
                Reflect.deleteProperty($scope.formTemp, 'street');
                Reflect.deleteProperty($scope.formTemp, 'streetNumber');
                Reflect.deleteProperty($scope.formTemp, 'district');
                Reflect.deleteProperty($scope.formTemp, 'city');
                Reflect.deleteProperty($scope.formTemp, 'brState');

                var images = [];
                for (var i = 0; i < ($scope.formTemp.image).length; i++) {
                    var imageDataTemp = {};
                    imageDataTemp.desc = $scope.formTemp.imgDesc[i];
                    imageDataTemp.url = STRING_CONSTANT.url + $scope.formTemp.image[i];
                    images.push(imageDataTemp);
                }
                $scope.formTemp.images = images;
                Reflect.deleteProperty($scope.formTemp, 'image');
                Reflect.deleteProperty($scope.formTemp, 'imgDesc');


                var dataObject = {
                    url: STRING_CONSTANT.postGetUrl,
                    data: $scope.formTemp,
                    header: {
                        'Authorization': STRING_CONSTANT.auth
                    }
                };
                //console.log('post url: ' + dataObject.url);
                //console.log('sent data: ' + JSON.stringify(dataObject.data));

                methodUrl.postResponse(dataObject, $scope).then(function (data) {
                    $scope.form = {};//reset
                    $(".form").css("display", "none");
                    messageService.getSuccessMessage($scope, "Imóvel cadastrado com sucesso.");
                });
            }
        }]
    );


