'use strict';

/**
 * @ngdoc overview
 * @name fxApp
 * @description
 * # fxApp
 *
 * Main module of the application.
 */
angular
    .module('fxApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.mask'
    ])


    .constant("STRING_CONSTANT", {
        "url": "http://fakeUrlForImages.com/images/",
        "postGetUrl": "http://demo1183916.mockable.io/anuncio",
        "auth": "egeniusfounders2016"
    })


    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterCtrl',
                controllerAs: 'register'
            })
            .otherwise({
                redirectTo: '/'
            });
    })


    .factory('realtyService', function ($http, $location, STRING_CONSTANT) {
        var myService = {
            async: function () {
                //var url = '/json/data.json';//mock
                var url = STRING_CONSTANT.postGetUrl;
                var promise = $http.get(url).then(function (response) {
                    return response.data;
                });
                return promise;
            }
        };
        return myService;
    })


    .service('methodUrl', ['$http', '$q', '$injector', 'messageService',
            function ($http, $q, $injector, messageService) {
                this.postResponse = function (dataObject, $scope) {
                    var temp = {},
                        defer = $q.defer();

                    $http.post(dataObject.url, dataObject.data, dataObject.header)
                        .then(
                            function (response) {
                                // success callback
                                //console.log(response);
                                temp = response;
                                defer.resolve(response);
                            },
                            function (response) {
                                // failure callback
                                console.log("failure callback");
                                console.log(response);
                            }
                        );
                    return defer.promise;
                };
            }
        ]
    )


    .service(
        'messageService', ['$resource', function ($resource) {
            var self = this;
            self.getSuccessMessage = function ($scope, msg) {
                $scope.messageInfo = {};
                $scope.messageInfo.messages = [];
                $scope.messageInfo.class = 'alert-success';
                $scope.messageInfo.show = true;
                $scope.messageInfo.messages.push({
                    description: msg
                })
            }
        }]
    )


    .service('fileUpload', [
        function () {
            this.imageUpload = function ($scope, element) {
                $scope.$apply(function (scope) {
                    var imageFile = element.files[0],
                        index = angular.element(element).attr("data-file-index");
                    $scope.form.image[index] = element.files[0].name;

                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var imageToSave = e.target.result,
                            dataURL = reader.result,
                            output = document.getElementById('output' + index);
                        output.src = dataURL;
                    };
                    reader.readAsDataURL(imageFile);
                });
            }
        }
    ])


    .run(function ($rootScope, $location) {
        $rootScope.location = $location;
    })


    .controller(
        'realityFormCtrl', ['$scope',
            function ($scope) {
                $scope.braStates = [
                    {"description": "Acre", "id": "AC"},
                    {"description": "Alagoas", "id": "AL"},
                    {"description": "Amapá", "id": "AP"},
                    {"description": "Amazonas", "id": "AM"},
                    {"description": "Bahia", "id": "BA"},
                    {"description": "Ceará", "id": "CE"},
                    {"description": "Distrito Federal", "id": "DF"},
                    {"description": "Espírito Santo", "id": "ES"},
                    {"description": "Goiás", "id": "GO"},
                    {"description": "Maranhão", "id": "MA"},
                    {"description": "Mato Grosso", "id": "MT"},
                    {"description": "Mato Grosso do Sul", "id": "MS"},
                    {"description": "Minas Gerais", "id": "MG"},
                    {"description": "Pará", "id": "PA"},
                    {"description": "Paraíba", "id": "PB"},
                    {"description": "Paraná", "id": "PR"},
                    {"description": "Pernambuco", "id": "PE"},
                    {"description": "Piauí", "id": "PI"},
                    {"description": "Rio de Janeiro", "id": "RJ"},
                    {"description": "Rio Grande do Norte", "id": "RN"},
                    {"description": "Rio Grande do Sul", "id": "RS"},
                    {"description": "Rondônia", "id": "RO"},
                    {"description": "Roraima", "id": "RR"},
                    {"description": "Santa Catarina", "id": "SC"},
                    {"description": "São Paulo", "id": "SP"},
                    {"description": "Sergipe", "id": "SE"},
                    {"description": "Tocantins", "id": "TO"}
                ];
            }
        ]
    );


