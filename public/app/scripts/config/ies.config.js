(function () {
    'use strict'
    var myApp = angular.module("ies", ['ui.router'])
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
            .state('customer', {
                url: "/admin",
                templateUrl: 'app/modules/admin.html',
                controller: 'custctrl',
            })

    }
})();

(function () {
    'use strict';
    var myApp = angular.module('ies');

    myApp.controller('userCtrl', userCtrl);
    userCtrl.$inject = ['$scope', '$rootScope', '$state', '$window', '$filter', '$timeout', '$http'];

    function userCtrl($scope, $rootScope, $state, $window, $filter, $timeout, $http) {
        var request = {
            url: "/v1/api/customers",
            method: 'GET',
            timeout: 2 * 60 * 1000,
            headers: { 'Content-type': 'application/json' }
        };
        var dats = $http(request)
        $scope.check = (info) => {
            dats.then((res) => {
                var datslen = res.data.data.length
                for (var i = 0; i <= datslen; i++) {
                    if (info.email == res.data.data[i].email) {
                        //console.log(info.email,res.data.data[i].email)
                        $state.go("buses", {
                            id: res.data.data[i]._id
                        })
                    }
                    if (info.email.toString() == "Admin@admin") {
                        $state.go("customer")
                    }


                }
            })
        }
    }

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
                departure: x,
                arrival: y
            })
        }
    }

    myApp.controller("userctrl", userctrl)
    userctrl.inject = ['$scope', '$rootScope', '$state', '$window', '$filter', '$timeout', '$http', '$stateParams']
    function userctrl($scope, $rootScope, $state, $window, $filter, $timeout, $http, $stateParams) {
        $scope.success0 = true
        $scope.success1 = false
        var request = {
            url: `v1/api/bus/${$stateParams.departure}/${$stateParams.arrival}`,
            method: 'GET',
            timeout: 2 * 60 * 1000,
            headers: { 'Content-type': 'application/json' },
        };
        var dats = $http(request)
        dats.then((res) => {
            $scope.users = res.data
        })
            .catch((err) => {
                alert(err)
            })
        $scope.book = (info) => {
            console.log(info)
        }
        $scope.filters = (info1) => {
            $scope.success0 = false
            $scope.success1 = true
            console.log(info1)
            info1.dept = $stateParams.departure
            info1.arr = $stateParams.arrival
            var request = {
                url: `v1/api/bus/`,
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
<<<<<<< HEAD
    myApp.controller("custctrl",custctrl)
    custctrl.inject = ['$scope', '$rootScope', '$state', '$window', '$filter', '$timeout','$http','$stateParams']
    function custctrl($scope, $rootScope, $state, $window, $filter, $timeout,$http,$stateParams) {
=======

    myApp.controller("custctrl", custctrl)
    custctrl.inject = ['$scope', '$rootScope', '$state', '$window', '$filter', '$timeout', '$http', '$stateParams']
    function custctrl($scope, $rootScope, $state, $window, $filter, $timeout, $http, $stateParams) {
        $scope.Math = window.Math;
        $scope.page = {};
        $scope.page.currentPage = 0;
        $scope.page.pageSize = 5;
        $scope.page.searchBox = '';
        $scope.hideErrors = function (id) {
            $scope.incharge = {};
            bootstrapError.hideErrors(id);
        }
        $scope.closeModal = function (model, form) {
            $scope.hideErrors(form);
            $('#' + model).modal('hide');
        }
>>>>>>> b702b7b1d94af3b8ebffd1fa6e635fa0e9719060
        function getAlluser() {
            var request = {
                url: "/v1/api/bus",
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
            delete info._id;
            var form = document.getElementById('edituser');
            var check = form.checkValidity();
            if (check === true) {
                info.employeeId = (info.employeeId).toUpperCase();
                info.name = (info.name).toUpperCase();
                info.email = (info.email).toLowerCase();
                var query = { "employeeId": $scope.employeeId };
                var details = { "query": query, "detailsToUpdate": info }
                userServices.updateuser(details, function (err, res) {
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
                });
            }
            else {
                bootstrapError.showErrors('edituser')
            }
        };

        $scope.delete = function (info) {
            userServices.deleteuser({ "employeeId": info.employeeId }, function (err, res) {
                if (!err) {
                    $("html").stop().animate({ scrollTop: 0 }, 200);
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
            });
        };

        $scope.add = function () {
            var form = document.getElementById('adduser');
            var check = form.checkValidity();
            if (check === true) {
                $scope.incharge.employeeId = ($scope.incharge.employeeId).toUpperCase();
                $scope.incharge.name = ($scope.incharge.name).toUpperCase();
                $scope.incharge.email = ($scope.incharge.email).toLowerCase();
                userServices.adduser($scope.incharge, function (err, res) {
                    if (!err) {
                        $("html").stop().animate({ scrollTop: 0 }, 200);
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
                });
            }
            else {
                bootstrapError.showErrors('adduser')
            }
        };
    }

})();