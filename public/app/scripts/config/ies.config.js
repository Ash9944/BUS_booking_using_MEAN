(function () {
    'use strict'
    var myApp = angular.module("ies",['ui.router'])
    myApp.config(configuration)
    configuration.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']
    function configuration($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(false)
        $urlRouterProvider.otherwise('/customer')
        $stateProvider
            .state('customers', {
                url: "/customer",
                templateUrl: 'app/modules/user.html',
                controller: 'userCtrl',
            })
            .state('buses', {
                url: "/bus",
                templateUrl: 'app/modules/buses.html',
                //controller: 'userCtrl',
            });
        }})();

(function () {
    'use strict';
    var myApp = angular.module('ies');
    myApp.controller('userCtrl', userCtrl);
    userCtrl.$inject = ['$scope', '$rootScope', '$state', '$window', '$filter', '$timeout','$http'];
    function userCtrl($scope, $rootScope, $state, $window, $filter, $timeout,$http) {
        var request = {
            url: "/v1/api/customers",
            method: 'GET',
            timeout: 2 * 60 * 1000,
            headers: { 'Content-type': 'application/json' }
        };
        var dats = $http(request)
        $scope.check = (info)=>{
            dats.then((res)=>{
                var datslen = res.data.data.length
                for(var i =0;i<=datslen;i++){
                    if(info.email == res.data.data[i].email){
                       $state.go("buses")
                    }
                }
            }) 
        }
    }})();