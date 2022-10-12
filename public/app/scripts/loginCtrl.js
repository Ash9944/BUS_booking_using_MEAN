(function () {
    'use strict';
    var myApp = angular.module('bus-booking');

    myApp.controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$scope', '$state', 'loginCtrlService'];

    function loginCtrl($scope, $state, loginCtrlService) {

        $scope.check = (info) => {
            loginCtrlService.usercheck((err, res) => {
                if (!err) {

                    if (info.email.includes("Admin@admin")) {
                        $state.go("adminHome");
                        return;
                    }

                    var currentUser = res.data.data.find(function (userDetails) {
                        return userDetails.email == info.email;
                    });



                    if (currentUser) {
                        $state.go("busSearch", {
                            id: currentUser._id
                        })
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
                url: "user/",
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