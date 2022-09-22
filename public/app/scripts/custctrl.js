(function () {
    'use strict';
    var myApp = angular.module('ies')
    myApp.controller("custctrl", custctrl)
    custctrl.inject = ['$scope', '$rootScope', '$state', '$window', '$filter', '$timeout', '$http', '$stateParams','custctrlservice']
    function custctrl($scope, $rootScope, $state, $window, $filter, $timeout, $http, $stateParams,custctrlservice) {
        $scope.success0 = true
        $scope.success1 = false
        $scope.value = new Date();
        function getAllbus() {
            custctrlservice.allbusfind().then((res) => {
                console.log(res)
                $scope.users = res.data.data
            })

        }
        getAll();
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
                custctrlservice.updatebus(details).then((res) => {
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
            custctrlservice.deletebus(details).then((res) => {
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
            custctrlservice.addbus($scope.create).then((res) => {
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
            custctrlservice.filters(info1).then((res) => {
                console.log(res.data)
                $scope.data = res.data
            }
            )
        }

    }
    myApp.service("custctrlservice",custctrlservice)
    custctrlservice.$inject = ['$http','$stateParams']
    function custctrlservice($http,$stateParams){
        this.allbusfind = function(){
            var request = {
                url: "/v1/api/allbus",
                method: 'POST',
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
                return $http(request)
        }
        this.updatebus = function(datas){
            var request = {
                url: "/v1/api/updbus",
                method: 'POST',
                data: datas,
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
                return $http(request)
        }
        this.deletebus = function(datas){
            var request = {
                url: "/v1/api/delbus",
                method: 'DELETE',
                data: datas,
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
                return $http(request)
        }
        this.addbus = function(datas){
            var request = {
                url: "/v1/api/adddbus",
                method: 'POST',
                data: datas,
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
                return $http(request)
        }
        this.filters = function(datas){
            var request = {
                url: `v1/api/bus`,
                method: 'POST',
                data: datas,
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' },
            };
                return $http(request)
        }
}
})();