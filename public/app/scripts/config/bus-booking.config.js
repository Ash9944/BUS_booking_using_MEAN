(function () {
    'use strict'
    var myApp = angular.module("bus-booking", ['ui.router'])
    myApp.config(configuration)
    configuration.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']
    function configuration($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(false)
        $urlRouterProvider.otherwise('/index')
        $stateProvider
            .state('index', {
                url: "/index",
                templateUrl: 'app/modules/index.html',
                controller: 'indexCtrl',
            })
            .state('busSearch', {
                url: "/busSearch/:id",
                templateUrl: 'app/modules/busSearch.html',
                controller: 'busSearchCtrl',
            })
            .state('availableBus', {
                url: "/availableBus/:custid/:departure/:arrival",
                templateUrl: 'app/modules/availableBus.html',
                controller: 'availableBusCtrl',
            })
            .state('adminHome', {
                url: "/adminHome",
                templateUrl: 'app/modules/adminHome.html'
            })
            .state('busDetails', {
                url: "/busDetails",
                templateUrl: 'app/modules/busDetails.html',
                controller: 'busDetailsCtrl',
            })
            .state('userDetails', {
                url: "/userDetails",
                templateUrl: 'app/modules/userDetails.html',
                controller: 'userDetailsCtrl',
            })

    }
})();