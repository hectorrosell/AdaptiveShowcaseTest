//////////////////////////////////////////////////
// The main module configuration section shows  //
// how to define when (redirects) and otherwise //
// (invalid urls) to arrange site navigation    //
// using ui-router.                             //
//////////////////////////////////////////////////

'use strict';

app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/home');

    /*$routeProvider.when('/units-list', {
        templateUrl: 'views/units-list.html',
        reloadOnSearch: false
    });*/

    /*$urlRouterProvider.otherwise('/');*/

    $stateProvider
    /* .state('/', {
         url: "/home",
         templateUrl: 'views/home.html',
         //controller: 'MainController',
         //resolve: resolve
     })*/
        .state("home", {
            url: "/home",
            templateUrl: 'views/home.html',
            //controller: 'MainController',
            //resolve: resolve
        })
        .state("units-list", {
            url: "/units-list",
            templateUrl: 'views/units-list.html',
            //controller: 'MainController',
            //resolve: resolve
        })
        .state("methods-list", {
            url: "/methods-list",
            templateUrl: 'views/methods-list.html',
            controller: 'MainController',
            //resolve: resolve
        })
        .state("form-submit", {
            url: "/form-submit",
            templateUrl: 'views/form-submit.html',
            //controller: 'MainController',
            //resolve: resolve
        })
        .state("contact", {
            url: "/contact",
            templateUrl: 'views/menu/contact.html',
            //controller: 'MainController',
            //resolve: resolve
        })
        .state("license", {
            url: "/license",
            templateUrl: 'views/menu/license.html',
            //controller: 'MainController',
            //resolve: resolve
        })
        .state("favorites", {
            url: "/favorites",
            templateUrl: 'views/menu/favorites.html',
            //controller: 'MainController',
            //resolve: resolve
        })
        .state("services", {
            url: "/services",
            templateUrl: 'views/menu/services.html',
            //controller: 'MainController',
            //resolve: resolve
        })
        .state("home-page", {
            url: "/home-page",
            templateUrl: 'views/menu/home-page.html',
            //controller: 'MainController',
            //resolve: resolve
        })
        .state("method-getContactsForFields", {
            url: "/method-getContactsForFields",
            templateUrl: 'views/methods/method-getContactsForFields.html',
            //controller: 'MainController',
            //resolve: resolve
        })
        .state("method-getOSInfo", {
            url: "/method-getOSInfo",
            templateUrl: 'views/methods/method-getOSInfo.html',
            controller: 'MethodController'
            //resolve: resolve
        }).state("method-getResourceLiteral", {
            url: "/method-getResourceLiteral",
            templateUrl: 'views/methods/method-getResourceLiteral.html',
            //controller: 'MainController',
            //resolve: resolve
        }).state("method-ButtonListener", {
            url: "/method-ButtonListener",
            templateUrl: 'views/methods/method-ButtonListener.html',
            //controller: 'MainController',
            //resolve: resolve
        }).state("descriptor-method", {
            url: "/descriptor-method",
            templateUrl: 'views/methods/descriptor-method.html',
            //controller: 'MainController',
            //resolve: resolve
        });

}]);

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