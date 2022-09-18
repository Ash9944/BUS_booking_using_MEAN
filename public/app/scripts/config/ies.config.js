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
                url: "/user/:custid/:departure/:arrival",
                templateUrl: 'app/modules/buses.html',
                controller: 'userctrl',
            })
            .state('adminhome', {
                url: "/adminhome",
                templateUrl: 'app/modules/adminhomepage.html',
                //controller: 'custctrl',
            })
            .state('customer', {
                url: "/admin",
                templateUrl: 'app/modules/busdbadmin.html',
                controller: 'custctrl',
            })
            .state('customeradmin', {
                url: "/custadmin",
                templateUrl: 'app/modules/custdbadmin.html',
                controller: 'adminctrl',
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
                        $state.go("adminhome")
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
                custid : $stateParams.id,
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
        var time = new Date()
        //var dates = {timed : time}
       // console.log(dates)
        $scope.dates = new Date().toISOString()
        var request = {
            url: `v1/api/bus/${$stateParams.departure}/${$stateParams.arrival}`,
            method: 'GET',
            timeout: 2 * 60 * 1000,
            headers: { 'Content-type': 'application/json' ,'data': time.toISOString()},
        };
        var dats = $http(request)
        dats.then((res) => {
            $scope.users = res.data
        })
            .catch((err) => {
                alert(err)
            })
        $scope.book = (info) => {
            info.time_of_booking = new Date().toString()
            var datas = {id:$stateParams.custid ,query:info}
            var request = {
                url: `/v1/api/addcustomers`,
                method: 'POST',
                data : datas,
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' ,'data': time.toISOString()},
            };
            var dats = $http(request)
            dats.then((res)=>{
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
                if (info1[key] === null || info1[key]=="") {
                  delete info1[key];
            }})
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
    myApp.controller("custctrl",custctrl)
    custctrl.inject = ['$scope', '$rootScope', '$state', '$window', '$filter', '$timeout','$http','$stateParams']
    function custctrl($scope, $rootScope, $state, $window, $filter, $timeout,$http,$stateParams) {
        $scope.success0 = true
        $scope.success1 = false
        $scope.value =new Date();
        function getAlluser() {
            var request = {
                url: "/v1/api/allbus",
                method: 'POST',
                timeout: 2 * 60 * 1000,
                headers: {'Content-type': 'application/json' }
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
           info.departureTime = new Date($scope.timed)
           info.arrivalTime = new Date($scope.timed2)
            console.log(info)
            var form = document.getElementById('edituser');
            var check = form.checkValidity();
            info.cost = parseInt(info.cost)
            if (check === true) {
                //var query = { "_id": $scope.employeeId };
                var details = { "query": $scope.employeeId , "detailsToUpdate": info }
                //console.log(details)
                var request = {
                    url: "/v1/api/updbus",
                    method: 'POST',
                    data : details,
                    timeout: 2 * 60 * 1000,
                    headers: {'Content-type': 'application/json' }
                };
                var dats = $http(request)
                dats.then((res) =>{
                        $('#edit_user').modal('hide');
                        getAlluser();
                        $("html").stop().animate({ scrollTop: 0 }, 200);
                        $scope.success = true;
                        $scope.successMsg = "Successfully updated the user infomation" ;
                        $timeout(function () {
                            $scope.success = false;
                            $scope.successMsg = "";
                        }, 2000);
                    })
                    .catch((err)=>{
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
                data : details,
                timeout: 2 * 60 * 1000,
                headers: {'Content-type': 'application/json' }
            };
            var dats = $http(request)
            dats.then((res)=>{
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
                .catch((err)=> {
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
                    data : $scope.create,
                    timeout: 2 * 60 * 1000,
                    headers: { 'Content-type': 'application/json' }
                };
                var dats = $http(request)
                dats.then((res)=>{
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
                .catch((err)=>{
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
                    if (info1[key] === null || info1[key]=="") {
                      delete info1[key];
                }})
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
            
        };
        myApp.controller("adminctrl",adminctrl)
        adminctrl.inject = ['$scope', '$rootScope', '$state', '$window', '$filter', '$timeout','$http','$stateParams']
        function adminctrl($scope, $rootScope, $state, $window, $filter, $timeout,$http,$stateParams) {
            $scope.success0 = true
        $scope.success1 = false
        function getAlluser() {
            var request = {
                url: "/v1/api/customers",
                method: 'GET',
                timeout: 2 * 60 * 1000,
                headers: {'Content-type': 'application/json' }
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
            info.dateOfBirth = new Date($scope.date)
            
            if (check === true) {
                //var query = { "_id": $scope.employeeId };
                var details = { "query": $scope.employeeId , "detailsToUpdate": info }
                //console.log(details)
                var request = {
                    url: "/v1/api/updcust",
                    method: 'POST',
                    data : details,
                    timeout: 2 * 60 * 1000,
                    headers: {'Content-type': 'application/json' }
                };
                var dats = $http(request)
                dats.then((res) =>{
                        $('#edit_user').modal('hide');
                        getAlluser();
                        $("html").stop().animate({ scrollTop: 0 }, 200);
                        $scope.success = true;
                        $scope.successMsg = "Successfully updated the user infomation" ;
                        $timeout(function () {
                            $scope.success = false;
                            $scope.successMsg = "";
                        }, 2000);
                    })
                    .catch((err)=>{
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
                data : details,
                timeout: 2 * 60 * 1000,
                headers: {'Content-type': 'application/json' }
            };
            var dats = $http(request)
            dats.then((res)=>{
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
                .catch((err)=> {
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
                    data : $scope.create,
                    timeout: 2 * 60 * 1000,
                    headers: { 'Content-type': 'application/json' }
                };
                var dats = $http(request)
                dats.then((res)=>{
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
                .catch((err)=>{
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