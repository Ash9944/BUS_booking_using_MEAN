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
})();