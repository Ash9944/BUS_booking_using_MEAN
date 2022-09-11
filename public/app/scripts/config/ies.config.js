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
                url: "/bus/:id",
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
                        //console.log(info.email,res.data.data[i].email)
                       $state.go("buses",{
                        id:res.data.data[i]._id
                       })
                    }

                    
                }
            }) 
        }
    }
    myApp.controller("busctrl",busctrl)
    busctrl.inject = ['$scope', '$rootScope', '$state', '$window', '$filter', '$timeout','$http','$stateParams']
    function busctrl($scope, $rootScope, $state, $window, $filter, $timeout,$http,$stateParams) {
        var request = {
            url: `v1/api/customers/${$stateParams.id}`,
            method: 'GET',
            timeout: 2 * 60 * 1000,
            headers: { 'Content-type': 'application/json' }
        };
        var dats = $http(request)
        dats.then((res)=>{
            $scope.Users = res.data
        })
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
        .catch((err)=>{
            alert(err)
        })
        $scope.price_slider = {
            start: [180, 1400],
            connect: true,
            step: 1,
            range: {
                min: 10,
                max: 2500
            }
        }
        $scope.priceFiltering = function(){
            $scope.minPrice = $scope.price_slider.start[0];
            $scope.maxPrice = $scope.price_slider.start[1];
        
            $scope.pricefilter = function (product) {
                if ((product <= $scope.maxPrice) && (product >= $scope.minPrice)){
                    return product;
                }
            };
        } 
    }
    })();