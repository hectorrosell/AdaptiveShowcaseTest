//////////////////////////////////////////////////
// The main module configuration section shows  //
// how to define when (redirects) and otherwise //
// (invalid urls) to arrange site navigation    //
// using ui-router.                             //
//////////////////////////////////////////////////

app.config(function ($urlRouterProvider, $routeProvider, $stateProvider) {

    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        reloadOnSearch: false
    });

    $routeProvider.when('/units-list', {
        templateUrl: 'views/units-list.html',
        reloadOnSearch: false,
        controller: 'MainController'
    });

    $routeProvider.when('/methods-list', {
        templateUrl: 'views/methods-list.html',
        reloadOnSearch: false,
        controller: 'MainController'
    });

    /*$routeProvider.when('/units-list', {
        templateUrl: 'views/units-list.html',
        reloadOnSearch: false
    });*/

    /*$urlRouterProvider.otherwise('/');*/

    $stateProvider
        .state("home", {
            url: "/",
            templateUrl: 'views/home.html'
        })
        .state("units-list", {
            url: "/units-list",
            templateUrl: 'views/units-list.html',
            controller: 'MainController'
        })
        .state("methods-list", {
            url: "/methods-list",
            templateUrl: 'views/methods-list.html',
            controller: 'MainController'
        })
});

/*'use strict';
angular.module('ADApp', [
  'ngRoute',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures'
])
    .config(
        function ($stateProvider, $urlRouterProvider, $routeProvider) {

            $routeProvider.when('/', {
                templateUrl: 'views/home.html',
                reloadOnSearch: false
            });

        });*/