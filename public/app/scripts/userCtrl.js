(function () {
    'use strict';
    var myApp = angular.module('bus-booking');

    myApp.controller('userCtrl', userCtrl);
    userCtrl.$inject = ['$scope', '$rootScope', '$state', '$window', '$filter', '$timeout', '$http', 'userCtrlservice'];

    function userCtrl($scope, $rootScope, $state, $window, $filter, $timeout, $http, userCtrlservice) {

        $scope.check = (info) => {
            userCtrlservice.usercheck((err,res)=>{
                if(!err){
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
                }
                else{
                    res.status(500).send({ error: err.name, message: err.message })
                }
            })
        }
    }

    myApp.service("userCtrlservice", userCtrlservice)
    userCtrlservice.$inject = ['$http']
    function userCtrlservice($http) {
        this.usercheck = function (callback) {

            var request = {
                url: "/v1/api/customers",
                method: 'GET',
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
            $http(request).then((response)=>{
                callback(null,response),
                (error)=>{
                    callback(error,null)
                }
            })
        }
    }
})();