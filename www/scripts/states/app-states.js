//////////////////////////////////////////////////
// The main module configuration section shows  //
// how to define when (redirects) and otherwise //
// (invalid urls) to arrange site navigation    //
// using ui-router.                             //
//////////////////////////////////////////////////

'use strict';

app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider.state("home", {
            url: "/home",
            templateUrl: 'views/home.html'
        })
        .state("units-list", {
            url: "/units-list",
            templateUrl: 'views/units-list.html'
        })
        .state("methods-list", {
            url: "/methods-list",
            templateUrl: 'views/methods-list.html',
            controller: 'MainController'
        })
        .state("form-submit", {
            url: "/form-submit",
            templateUrl: 'views/form-submit.html'
        })
        .state("contact", {
            url: "/contact",
            templateUrl: 'views/menu/contact.html'
        })
        .state("license", {
            url: "/license",
            templateUrl: 'views/menu/license.html'
        })
        .state("favorites", {
            url: "/favorites",
            templateUrl: 'views/menu/favorites.html'
        })
        .state("services", {
            url: "/services",
            templateUrl: 'views/menu/services.html'
        })
        .state("home-page", {
            url: "/home-page",
            templateUrl: 'views/menu/home-page.html'
        })

        /* METHODS */

        .state("method-getContactsForFields", {
            url: "/method-getContactsForFields",
            templateUrl: 'views/methods/method-getContactsForFields.html',
            controller: 'MethodController'
        })
        .state("method-getOSInfo", {
            url: "/method-getOSInfo",
            templateUrl: 'views/methods/method-getOSInfo.html',
            controller: 'MethodController'
        }).state("method-getResourceLiteral", {
            url: "/method-getResourceLiteral",
            templateUrl: 'views/methods/method-getResourceLiteral.html',
            controller: 'MethodController'

        }).state("method-DeviceOrientationListener", {
            url: "/method-DeviceOrientationListener",
            templateUrl: 'views/methods/method-DeviceOrientationListener.html',
            controller: 'MethodController'

        }).state("descriptor-method", {
            url: "/descriptor-method",
            templateUrl: 'views/methods/descriptor-method.html'

        }).state("method-createDatabase", {
            url: "/method-createDatabase",
            templateUrl: 'views/methods/method-createDatabase.html',
            controller: 'MethodController'

        }).state("method-getOrientationDefault", {
            url: "/method-getOrientationDefault",
            templateUrl: 'views/methods/method-getOrientationDefault.html',
            controller: 'MethodController'

        })

        .state("method-createTable", {
            url: "/method-createTable",
            templateUrl: 'views/methods/method-createTable.html',
            controller: 'MethodController'

        }).state("method-deleteDatabase", {
            url: "/method-deleteDatabase",
            templateUrl: 'views/methods/method-deleteDatabase.html',
            controller: 'MethodController'

        }).state("method-deleteTable", {
            url: "/method-deleteTable",
            templateUrl: 'views/methods/method-deleteTable.html',
            controller: 'MethodController'

        }).state("method-existsDatabase", {
            url: "/method-existsDatabase",
            templateUrl: 'views/methods/method-existsDatabase.html',
            controller: 'MethodController'

        }).state("method-existsTable", {
            url: "/method-existsTable",
            templateUrl: 'views/methods/method-existsTable.html',
            controller: 'MethodController'

        })
    ;
}]);
