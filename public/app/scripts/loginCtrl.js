(function () {
    'use strict';
    var myApp = angular.module('bus-booking');

    myApp.controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$scope', '$state', 'loginCtrlService'];

    function loginCtrl($scope, $state, loginCtrlService) {

        $scope.check = (info) => {
            loginCtrlService.usercheck((err, res) => {
                if (!err) {
                    var datslen = res.data.data.length
                    for (var i = 0; i <= datslen; i++) {
                        if (info.email == res.data.data[i].email) {
                            //console.log(info.email,res.data.data[i].email)
                            $state.go("busSearch", {
                                id: res.data.data[i]._id
                            })
                        }
                        if (info.email.toString() == "Admin@admin") {
                            $state.go("adminHome")
                        }
                    }
                }
                else {
                    res.status(500).send({ error: err.name, message: err.message })
                }
            })
        }
    }

    myApp.service("loginCtrlService", loginCtrlService)
    loginCtrlService.$inject = ['$http']
    function loginCtrlService($http) {
        this.usercheck = function (callback) {

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
    }
})();