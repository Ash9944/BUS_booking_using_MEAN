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
                templateUrl: 'app/modules/bussearch.html',
                controller: 'busctrl',
            })
            .state('userbus', {
                url: "/user/:departure/:arrival",
                templateUrl: 'app/modules/buses.html',
                controller: 'userctrl',
            })
            
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
    }
    myApp.controller("busctrl",busctrl)
    busctrl.inject = ['$scope', '$rootScope', '$state', '$window', '$filter', '$timeout','$http']
    function busctrl($scope, $rootScope, $state, $window, $filter, $timeout,$http) {
      $scope.give = (x,y)=>{
        $state.go("userbus",{
            departure :x,
            arrival :y
        })
      }
    }

    myApp.controller("userctrl",userctrl)
    userctrl.inject = ['$scope', '$rootScope', '$state', '$window', '$filter', '$timeout','$http','$stateParams']
    function userctrl($scope, $rootScope, $state, $window, $filter, $timeout,$http,$stateParams) {
        var request = {
            url: `v1/api/bus/${$stateParams.departure}/${$stateParams.arrival}`,
            method: 'GET',
            timeout: 2 * 60 * 1000,
            headers: { 'Content-type': 'application/json' }
        };
        var dats = $http(request)
        dats.then((res)=>{
            $scope.users = res.data
        })
    }
    })();