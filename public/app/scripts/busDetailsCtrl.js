
(function () {
    'use strict';
    var myApp = angular.module('bus-booking')
    myApp.controller("busDetailsCtrl", busDetailsCtrl)
    busDetailsCtrl.inject = ['$scope', '$timeout', 'busDetailsCtrlService']
    function busDetailsCtrl($scope, $timeout, busDetailsCtrlService) {
        $scope.success0 = true
        $scope.success1 = false
        $scope.value = new Date();
        function getAllbus() {
            busDetailsCtrlService.allbusfind((err, res) => {
                if (!err) {
                    console.log(res)
                    $scope.users = res.data.data
                }
                else {
                    res.status(500).send({ error: err.name, message: err.message })
                }
            })

        }
        getAllbus();

        $scope.loadInfo = function (info) {
            $scope.edit = JSON.parse(JSON.stringify(info));
            console.log($scope.edit)
            $scope.employeeId = info._id;

        };

        $scope.updateuser = function (info) {
            delete info.$$hashKey;
            info.departureTime = new Date(info.departureTime)
            info.arrivalTime = new Date(info.arrivalTime)
            console.log(info)
            var form = document.getElementById('edituser');
            var check = form.checkValidity();
            info.cost = parseInt(info.cost)
            if (check === true) {
                var details = { "query": $scope.employeeId, "detailsToUpdate": info }
                console.log(details)
                busDetailsCtrlService.updatebus(details, (err, res) => {
                    if (!err) {
                        $('#edit_user').modal('hide');
                        getAllbus();
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
            busDetailsCtrlService.deletebus(details, (err, resp) => {
                if (!err) {
                    $("html").stop().animate({ scrollTop: 0 }, 200);
                    getAllbus();
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
            $scope.create.dep_city = $scope.create.dep_city.toLowerCase()
            $scope.create.arr_city = $scope.create.arr_city.toLowerCase()
            $scope.create.cost = parseInt($scope.create.cost)
            console.log($scope.create)
            busDetailsCtrlService.addbus($scope.create, (err, res) => {
                if (!err) {
                    $("html").stop().animate({ scrollTop: 0 }, 200);
                    getAllbus();
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
            Object.keys(info1).forEach(key => {
                if (info1[key] === null || info1[key] == "") {
                    delete info1[key];
                }
            })
            console.log(info1)
            busDetailsCtrlService.filters(info1, (err, res) => {
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

    myApp.service("busDetailsCtrlService", busDetailsCtrlService)
    busDetailsCtrlService.$inject = ['$http', '$stateParams']
    function busDetailsCtrlService($http, $stateParams) {
        this.allbusfind = function (callback) {
            var request = {
                url: "/bus/",
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
        this.updatebus = function (details, callback) {
            var request = {
                url: "/bus/update",
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
        this.deletebus = function (details, callback) {
            var request = {
                url: "/bus/delete",
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
        this.addbus = function (details, callback) {
            var request = {
                url: "/bus/add",
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
                url: `/bus/filter`,
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
})();