(function () {
    'use strict';
    var myApp = angular.module('bus-booking');
    myApp.controller("busSearchCtrl", busSearchCtrl)
    busSearchCtrl.inject = ['$scope', '$state', '$stateParams', 'busSearchCtrlService']
    function busSearchCtrl($scope, $state, $stateParams, busSearchCtrlService) {
        busSearchCtrlService.busroutesfind((err, resp) => {
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

    myApp.service("busSearchCtrlService", busSearchCtrlService)
    busSearchCtrlService.$inject = ['$http', '$stateParams']
    function busSearchCtrlService($http, $stateParams) {
        this.busroutesfind = function (callback) {
            var request = {
                url: `/user/${$stateParams.id}`,
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