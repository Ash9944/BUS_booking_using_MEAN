(function () {
    'use strict';
    var myApp = angular.module('bus-booking')
    myApp.controller("userDetailsCtrl", userDetailsCtrl)
    userDetailsCtrl.inject = ['$scope', '$rootScope', '$state', '$window', '$filter', '$timeout', '$http', '$stateParams', 'userDetailsCtrlService']
    function userDetailsCtrl($scope, $rootScope, $state, $window, $filter, $timeout, $http, $stateParams, userDetailsCtrlService) {
        $scope.success0 = true
        $scope.success1 = false
        function getAlluser() {
            userDetailsCtrlService.allcustfind((err, resp) => {
                if (!err) {
                    console.log(resp)
                    $scope.users = resp.data.data
                }
                else {
                    resp.status(500).send({ error: err.name, message: err.message })
                }
            })
        }
        getAlluser();

        $scope.loadInfo = function (info) {
            console.log(info)
            $scope.edit = JSON.parse(JSON.stringify(info));
            $scope.employeeId = info._id;
        };

        $scope.updateuser = function (info) {
            delete info.$$hashKey;
            var form = document.getElementById('edituser');
            var check = form.checkValidity();
            info.age = parseInt(info.age)
            info.dateOfBirth = new Date(info.dateOfBirth)

            if (check === true) {
                var details = { "query": $scope.employeeId, "detailsToUpdate": info }
                //console.log(details)

                userDetailsCtrlService.updatecust(details, (err, resp) => {
                    if (!err) {
                        $('#edit_user').modal('hide');
                        getAlluser();
                        $("html").stop().animate({ scrollTop: 0 }, 200);
                        $scope.success = true;
                        $scope.successMsg = "Successfully updated the user infomation";
                        $timeout(function () {
                            $scope.success = false;
                            $scope.successMsg = "";
                        }, 2000);
                    }
                    else {
                        $("html").stop().animate({ scrollTop: 0 }, 200);
                        $scope.error = true;
                        $scope.errorMsg = (err.data && err.data.message) ? err.data.message : err.statusText;
                        $timeout(function () {
                            $scope.error = false;
                            $scope.errorMsg = "";
                        }, 2000);
                    }
                })
            }
        };

        $scope.delete = function (info) {
            var details = { "employeeId": info._id }
            console.log(details)

            userDetailsCtrlService.deletecust(details, (err, resp) => {
                if (!err) {
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
                }
                else {
                    $("html").stop().animate({ scrollTop: 0 }, 200);
                    $scope.error = true;
                    $scope.errorMsg = (err.data && err.data.message) ? err.data.message : err.statusText;
                    $timeout(function () {
                        $scope.error = false;
                        $scope.errorMsg = "";
                    }, 2000);
                }
            })
        }

        $scope.add = function () {
            var form = document.getElementById('adduser');
            var check = form.checkValidity();
            $scope.create.age = parseInt($scope.create.age)
            console.log($scope.create)

            userDetailsCtrlService.addcust($scope.create, (err, resp) => {
                if (!err) {
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
                }
                else {
                    $("html").stop().animate({ scrollTop: 0 }, 200);
                    $scope.error = true;
                    $scope.errorMsg = (err.data && err.data.message) ? err.data.message : err.statusText;
                    $timeout(function () {
                        $scope.error = false;
                        $scope.errorMsg = "";
                    }, 2000);
                }
            })

        }

        $scope.filters = (info1) => {
            $scope.success0 = false
            $scope.success1 = true
            console.log(info1)
            userDetailsCtrlService.filters(info1, (err, res) => {
                if (!err) {
                    console.log(res.data)
                    $scope.data = res.data
                }
                else {
                    res.status(500).send({ error: err.name, message: err.message })
                }
            })
        }
    }

    myApp.service("userDetailsCtrlService", userDetailsCtrlService)
    userDetailsCtrlService.$inject = ['$http', '$stateParams']
    function userDetailsCtrlService($http, $stateParams) {
        this.allcustfind = function (callback) {
            var request = {
                url: "/user/",
                method: 'GET',
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
            $http(request).then(function (response) {
                callback(null, response)
            }, function (error) {
                callback(error, null)
            })
        }
        this.updatecust = function (details, callback) {
            var request = {
                url: "/user/update",
                method: 'POST',
                data: details,
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
            $http(request).then(function (response) {
                callback(null, response)
            }, function (error) {
                callback(error, null)
            })
        }
        this.deletecust = function (details, callback) {
            var request = {
                url: "/user/delete",
                method: 'DELETE',
                data: details,
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
            $http(request).then(function (response) {
                callback(null, response)
            }, function (error) {
                callback(error, null)
            })
        }
        this.addcust = function (details, callback) {
            var request = {
                url: "/user/add",
                method: 'POST',
                data: details,
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
            $http(request).then(function (response) {
                callback(null, response)
            }, function (error) {
                callback(error, null)
            })
        }
        this.filters = function (details, callback) {
            var request = {
                url: `/user/filter`,
                method: 'POST',
                data: details,
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' },
            };
            $http(request).then(function (response) {
                callback(null, response)
            }, function (error) {
                callback(error, null)
            })
        }
    }
}
)();