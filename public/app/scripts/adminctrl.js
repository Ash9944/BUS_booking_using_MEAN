(function () {
    'use strict';
    var myApp = angular.module('ies')
    myApp.controller("adminctrl", adminctrl)
    adminctrl.inject = ['$scope', '$rootScope', '$state', '$window', '$filter', '$timeout', '$http', '$stateParams']
    function adminctrl($scope, $rootScope, $state, $window, $filter, $timeout, $http, $stateParams) {
        $scope.success0 = true
        $scope.success1 = false
        function getAlluser() {
            var request = {
                url: "/v1/api/customers",
                method: 'GET',
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
                //var query = { "_id": $scope.employeeId };
                var details = { "query": $scope.employeeId, "detailsToUpdate": info }
                //console.log(details)
                var request = {
                    url: "/v1/api/updcust",
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
                url: "/v1/api/delcust",
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
            $scope.create.age = parseInt($scope.create.age)
            console.log($scope.create)
            var request = {
                url: "/v1/api/insertcustomers",
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

}

)();