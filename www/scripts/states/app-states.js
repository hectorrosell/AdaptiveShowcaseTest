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

    $routeProvider.when('/home', {
        templateUrl: 'views/home.html',
        reloadOnSearch: false,
        controller: 'MainController'
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

    $routeProvider.when('/form-submit', {
        templateUrl: 'views/form-submit.html',
        reloadOnSearch: false,
        controller: 'MainController'
    });

    $routeProvider.when('/contact', {
        templateUrl: 'views/menu/contact.html',
        reloadOnSearch: false,
        controller: 'MainController'
    });

    $routeProvider.when('/license', {
        templateUrl: 'views/menu/license.html',
        reloadOnSearch: false,
        controller: 'MainController'
    });

    $routeProvider.when('/services', {
        templateUrl: 'views/menu/services.html',
        reloadOnSearch: false,
        controller: 'MainController'
    });

    $routeProvider.when('/favorites', {
        templateUrl: 'views/menu/favorites.html',
        reloadOnSearch: false,
        controller: 'MainController'
    });

    $routeProvider.when('/home-page', {
        templateUrl: 'views/menu/home-page.html',
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
            templateUrl: 'views/home.html',
            controller: 'MainController'
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
        .state("form-submit", {
            url: "/form-submit",
            templateUrl: 'views/form-submit.html',
            controller: 'MainController'
        })
        .state("contact", {
            url: "/contact",
            templateUrl: 'views/menu/contact.html',
            controller: 'MainController'
        })
        .state("license", {
            url: "/license",
            templateUrl: 'views/menu/license.html',
            controller: 'MainController'
        })
        .state("favorites", {
            url: "/favorites",
            templateUrl: 'views/menu/favorites.html',
            controller: 'MainController'
        })
        .state("services", {
            url: "/services",
            templateUrl: 'views/menu/services.html',
            controller: 'MainController'
        })
        .state("home-page", {
            url: "/home-page",
            templateUrl: 'views/menu/home-page.html',
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