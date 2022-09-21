(function () {
    'use strict';
    var myApp = angular.module('ies');
    myApp.controller("busctrl", busctrl)
    busctrl.inject = ['$scope', '$rootScope', '$state', '$window', '$filter', '$timeout', '$http', '$stateParams']
    function busctrl($scope, $rootScope, $state, $window, $filter, $timeout, $http, $stateParams) {
        var request = {
            url: `v1/api/customers/${$stateParams.id}`,
            method: 'GET',
            timeout: 2 * 60 * 1000,
            headers: { 'Content-type': 'application/json' }
        };
        var dats = $http(request)
        dats.then((res) => {
            $scope.Users = res.data
        })
        $scope.give = (x, y) => {
            $state.go("userbus", {
                custid: $stateParams.id,
                departure: x,
                arrival: y
            })
        }
    }})();