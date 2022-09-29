(function () {
    'use strict';
    var myApp = angular.module('bus-booking');
    myApp.controller("busctrl", busctrl)
    busctrl.inject = ['$scope', '$rootScope', '$state', '$window', '$filter', '$timeout', '$http', '$stateParams', 'busctrlservice']
    function busctrl($scope, $rootScope, $state, $window, $filter, $timeout, $http, $stateParams, busctrlservice) {
        busctrlservice.busroutesfind()
            .then((res) => {
                //console.log(res.data)
                $scope.Users = res.data
            })
            .catch((err) => res.status(500).send({ error: err.name, message: err.message }))
        $scope.give = (x, y) => {
            $state.go("userbus", {
                custid: $stateParams.id,
                departure: x,
                arrival: y
            })
        }
    }

    myApp.service("busctrlservice", busctrlservice)
    busctrlservice.$inject = ['$http', '$stateParams']
    function busctrlservice($http, $stateParams) {
        this.busroutesfind = function () {
            var request = {
                url: `v1/api/customers/${$stateParams.id}`,
                method: 'GET',
                timeout: 2 * 60 * 1000,
                headers: { 'Content-type': 'application/json' }
            };
            return $http(request)
        }
    }
}
)();