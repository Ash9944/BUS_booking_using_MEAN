(function () {
    'use strict';
    var myApp = angular.module('bus-booking');

    myApp.controller('indexCtrl', indexCtrl);
    indexCtrl.$inject = ['$scope', '$rootScope', '$state', '$window', '$filter', '$timeout', '$http', 'indexCtrlservice'];

    function indexCtrl($scope, $rootScope, $state, $window, $filter, $timeout, $http, indexCtrlservice) {

        $scope.check = (info) => {
            indexCtrlservice.usercheck((err, res) => {
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

    myApp.service("indexCtrlservice", indexCtrlservice)
    indexCtrlservice.$inject = ['$http']
    function indexCtrlservice($http) {
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