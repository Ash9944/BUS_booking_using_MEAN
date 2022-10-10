(function () {
    'use strict'
    var myApp = angular.module("bus-booking", ['ui.router', 'angular-flatpickr'])
    myApp.config(configuration)
    configuration.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']
    function configuration($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(false)
        $urlRouterProvider.otherwise('/login')
        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: 'app/modules/login.html',
                controller: 'loginCtrl',
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