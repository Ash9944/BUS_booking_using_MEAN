
(function () {
    'use strict';
    var myApp = angular.module('bus-booking')
    myApp.controller("userctrl", userctrl)
    userctrl.inject = ['$scope', '$rootScope', '$state', '$window', '$filter', '$timeout', '$http', '$stateParams', 'userctrlservice']
    function userctrl($scope, $rootScope, $state, $window, $filter, $timeout, $http, $stateParams, userctrlservice) {
        $scope.success0 = true
        $scope.success1 = false

        $scope.dates = new Date().toISOString()
        userctrlservice.busfind((err, res) => {
            if (!err) {
                $scope.users = res.data
            }
            else {
                res.status(500).send({ error: err.name, message: err.message })
            }
        })
        $scope.loadInfo = (info) => {
            //console.log(info)
            $scope.edit = JSON.parse(JSON.stringify(info));
            console.log($scope.edit);
        }
        $scope.book = (info) => {
            console.log(info)
            info.time_of_booking = new Date()
            var datas = { id: $stateParams.custid, query: info }
            userctrlservice.addbooking(datas, (err, res) => {
                if (!err) {
                    $scope.success = true;
                    $scope.successMsg = "Successfully Booked Your Bus"
                    $timeout(function () {
                        $scope.success = false;
                        $scope.successMsg = "";
                    }, 2000);
                }
                else {
                    res.status(500).send({ error: err.name, message: err.message })
                }
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
            userctrlservice.filters(info1, (err, res) => {
                if (!err) {
                    console.log(res)
                    $scope.data = res.data
                }
                else {
                    res.status(500).send({ error: err.name, message: err.message })
                }

            })
        }
    }

    myApp.service("userctrlservice", userctrlservice)
    userctrlservice.$inject = ['$http', '$stateParams']
    function userctrlservice($http, $stateParams) {
        var time = new Date()
        this.busfind = function (callback) {
            var request = {
                url: `v1/api/bus/${$stateParams.departure}/${$stateParams.arrival}`,
                method: 'GET',
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json', 'data': time.toISOString() },
            };
            $http(request).then((response) => {
                callback(null, response),
                    (error) => {
                        callback(error, null)
                    }
            })
        }
        this.addbooking = function (datas, callback) {
            var request = {
                url: `/v1/api/addcustomers`,
                method: 'POST',
                data: datas,
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json', 'data': time.toISOString() },
            };
            $http(request).then((response) => {
                callback(null, response),
                    (error) => {
                        callback(error, null)
                    }
            })
        }
        this.filters = function (datas, callback) {
            var request = {
                url: `v1/api/bus`,
                method: 'POST',
                data: datas,
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' },
            };
            $http(request).then((response) => {
                callback(null, response),
                    (error) => {
                        callback(error, null)
                    }
            })
        }
    }
})();