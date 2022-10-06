(function () {
    'use strict';
    var myApp = angular.module('bus-booking');
    myApp.controller("busSearchCtrl", busSearchCtrl)
    busSearchCtrl.inject = ['$scope', '$rootScope', '$state', '$window', '$filter', '$timeout', '$http', '$stateParams', 'busSearchCtrlservice']
    function busSearchCtrl($scope, $rootScope, $state, $window, $filter, $timeout, $http, $stateParams, busSearchCtrlservice) {
        busSearchCtrlservice.busroutesfind((err, resp) => {
            if (!err) {
                $scope.Users = resp.data
            }
            else {
                resp.status(500).send({ error: err.name, message: err.message })
            }
        })

        $scope.give = (x, y) => {
            $state.go("availableBus", {
                custid: $stateParams.id,
                departure: x,
                arrival: y
            })
        }
    }

    myApp.service("busSearchCtrlservice", busSearchCtrlservice)
    busSearchCtrlservice.$inject = ['$http', '$stateParams']
    function busSearchCtrlservice($http, $stateParams) {
        this.busroutesfind = function (callback) {
            var request = {
                url: `v1/api/customers/${$stateParams.id}`,
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
}
)();