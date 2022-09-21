(function () {
    'use strict'
    var myApp = angular.module("ies", ['ui.router'])
    myApp.config(configuration)
    configuration.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']
    function configuration($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(false)
        $urlRouterProvider.otherwise('/customer')
        $stateProvider
            .state('customers', {
                url: "/customer",
                templateUrl: 'app/modules/user.html',
                controller: 'userCtrl',
            })
            .state('buses', {
                url: "/bus/:id",
                templateUrl: 'app/modules/bussearch.html',
                controller: 'busctrl',
            })
            .state('userbus', {
                url: "/user/:custid/:departure/:arrival",
                templateUrl: 'app/modules/buses.html',
                controller: 'userctrl',
            })
            .state('adminhome', {
                url: "/adminhome",
                templateUrl: 'app/modules/adminhomepage.html',
                //controller: 'custctrl',
            })
            .state('customer', {
                url: "/admin",
                templateUrl: 'app/modules/busdbadmin.html',
                controller: 'custctrl',
            })
            .state('customeradmin', {
                url: "/custadmin",
                templateUrl: 'app/modules/custdbadmin.html',
                controller: 'adminctrl',
            })

    }
})();

