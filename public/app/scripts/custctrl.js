(function () {
    'use strict';
    var myApp = angular.module('ies')
    myApp.controller("custctrl", custctrl)
    custctrl.inject = ['$scope', '$rootScope', '$state', '$window', '$filter', '$timeout', '$http', '$stateParams']
    function custctrl($scope, $rootScope, $state, $window, $filter, $timeout, $http, $stateParams) {
        $scope.success0 = true
        $scope.success1 = false
        $scope.value = new Date();
        function getAlluser() {
            var request = {
                url: "/v1/api/allbus",
                method: 'POST',
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
            var dats = $http(request)
            dats.then((res) => {
                console.log(res)
                $scope.users = res.data.data
            })

        }
        getAlluser();

        $scope.loadInfo = function (info) {
            $scope.edit = JSON.parse(JSON.stringify(info));
            console.log($scope.edit)
            $scope.employeeId = info._id;

        };

        $scope.updateuser = function (info) {
            delete info.$$hashKey;
            //$scope.arrt = $scope.edit.departureTime
            info.departureTime = new Date(info.departureTime)
            info.arrivalTime = new Date(info.arrivalTime)
            console.log(info)
            var form = document.getElementById('edituser');
            var check = form.checkValidity();
            info.cost = parseInt(info.cost)
            if (check === true) {
                //var query = { "_id": $scope.employeeId };
                var details = { "query": $scope.employeeId, "detailsToUpdate": info }
                //console.log(details)
                var request = {
                    url: "/v1/api/updbus",
                    method: 'POST',
                    data: details,
                    timeout: 2 * 60 * 1000,
                    headers: { 'Content-type': 'application/json' }
                };
                var dats = $http(request)
                dats.then((res) => {
                    $('#edit_user').modal('hide');
                    getAlluser();
                    $("html").stop().animate({ scrollTop: 0 }, 200);
                    $scope.success = true;
                    $scope.successMsg = "Successfully updated the user infomation";
                    $timeout(function () {
                        $scope.success = false;
                        $scope.successMsg = "";
                    }, 2000);
                })
                    .catch((err) => {
                        $("html").stop().animate({ scrollTop: 0 }, 200);
                        $scope.error = true;
                        $scope.errorMsg = (err.data && err.data.message) ? err.data.message : err.statusText;
                        $timeout(function () {
                            $scope.error = false;
                            $scope.errorMsg = "";
                        }, 2000);

                    }
                    );
            }
            else {
                bootstrapError.showErrors('edituser')
            }
        };

        $scope.delete = function (info) {
            var details = { "employeeId": info._id }
            console.log(details)
            var request = {
                url: "/v1/api/delbus",
                method: 'DELETE',
                data: details,
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
            var dats = $http(request)
            dats.then((res) => {
                $("html").stop().animate({ scrollTop: 0 }, 200);
                getAlluser();
                var index = $scope.users.findIndex(function (obj) { return obj._id == info._id });
                $scope.users.splice(index, 1);
                $scope.success = true;
                $scope.successMsg = "Successfully deleted the user infomation";
                $timeout(function () {
                    $scope.success = false;
                    $scope.successMsg = "";
                }, 2000);
            })
                .catch((err) => {
                    $("html").stop().animate({ scrollTop: 0 }, 200);
                    $scope.error = true;
                    $scope.errorMsg = (err.data && err.data.message) ? err.data.message : err.statusText;
                    $timeout(function () {
                        $scope.error = false;
                        $scope.errorMsg = "";
                    }, 2000);
                })
        }

        $scope.add = function () {
            var form = document.getElementById('adduser');
            var check = form.checkValidity();
            // $scope.create.departureTime =$scope.create.departureTime)
            // $scope.create.arrivalTime = new ISODate($scope.create.arrivalTime)
            $scope.create.cost = parseInt($scope.create.cost)
            console.log($scope.create)
            var request = {
                url: "/v1/api/adddbus",
                method: 'POST',
                data: $scope.create,
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
            var dats = $http(request)
            dats.then((res) => {
                $("html").stop().animate({ scrollTop: 0 }, 200);
                getAlluser();
                $scope.success = true;
                $scope.successMsg = "Successfully added the user infomation";
                $scope.users.push($scope.incharge);
                $('#add_user').modal("hide");
                $timeout(function () {
                    $scope.success = false;
                    $scope.successMsg = "";
                }, 2000);
            })
                .catch((err) => {
                    $("html").stop().animate({ scrollTop: 0 }, 200);
                    $scope.error = true;
                    $scope.errorMsg = (err.data && err.data.message) ? err.data.message : err.statusText;
                    $timeout(function () {
                        $scope.error = false;
                        $scope.errorMsg = "";
                    }, 2000);
                })

        }
        $scope.filters = (info1) => {
            $scope.success0 = false
            $scope.success1 = true
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
                console.log(res.data)
                $scope.data = res.data
            }
            )
        }

    }
})();