(function () {
    'use strict';
    var myApp = angular.module('ies')
    myApp.controller("userctrl",userctrl)
    function userctrl($scope, $rootScope, $state, $window, $filter, $timeout, $http, $stateParams) {
        $scope.success0 = true
        $scope.success1 = false
        var time = new Date()
        //var dates = {timed : time}
        // console.log(dates)
        $scope.dates = new Date().toISOString()
        var request = {
            url: `v1/api/bus/${$stateParams.departure}/${$stateParams.arrival}`,
            method: 'GET',
            timeout: 2 * 60 * 1000,
            headers: { 'Content-type': 'application/json', 'data': time.toISOString() },
        };
        var dats = $http(request)
        dats.then((res) => {
            $scope.users = res.data
        })
            .catch((err) => {
                alert(err)
            })
        $scope.book = (info) => {
            info.time_of_booking = new Date()
            var datas = { id: $stateParams.custid, query: info }
            var request = {
                url: `/v1/api/addcustomers`,
                method: 'POST',
                data: datas,
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json', 'data': time.toISOString() },
            };
            var dats = $http(request)
            dats.then((res) => {
                $scope.success = true;
                $scope.successMsg = "Successfully Booked Your Bus";
                $timeout(function () {
                    $scope.success = false;
                    $scope.successMsg = "";
                }, 2000);
            })
        }
        $scope.filters = (info1) => {
            $scope.success0 = false
            $scope.success1 = true
            //console.log(info1)
            info1.dep = $stateParams.departure
            info1.arr = $stateParams.arrival
            Object.keys(info1).forEach(key => {
                if (info1[key] === null || info1[key] == "") {
                    delete info1[key];
                }
            })
            console.log(info1)
            var request = {
                url: `v1/api/bus`,
                method: 'POST',
                data: info1,
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' },
            };
            var dats = $http(request)
            dats.then((res) => {
                console.log(res)
                $scope.data = res.data
            }
            )
        }

    }
})();