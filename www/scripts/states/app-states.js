//////////////////////////////////////////////////
// The main module configuration section shows  //
// how to define when (redirects) and otherwise //
// (invalid urls) to arrange site navigation    //
// using ui-router.                             //
//////////////////////////////////////////////////

'use strict';

angular.module('ADApp.States')
    .config(
        function ($stateProvider, $urlRouterProvider) {
            // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
            $urlRouterProvider.otherwise('/main-list');

            //////////////////////////
            // State Configurations //
            //////////////////////////

            $stateProvider
                .state("main-page", {
                    abstract: true,
                    templateUrl: 'views/main-page/main-page.html',
                })
                .state("main-page.home", {
                    url: "/home",
                    templateUrl: 'views/main-page/home/home.html',
                    controller: 'HomeController'
                })
                .state("main-page.main-list", {
                    url: "/main-list",
                    templateUrl: 'views/main-page/main-list/main-list.html',
                    controller: 'ListController'
                })
                .state("main-page.units-list", {
                    url: "/units-list",
                    templateUrl: 'views/main-page/units-list/units-list.html',
                    controller: 'ListController'
                })
                .state("main-page.methods-list", {
                    url: "/methods-list",
                    templateUrl: 'views/main-page/methods-list/methods-list.html',
                    controller: 'ListController'
                })
                .state("main-page.detail-list", {
                    url: "/detail-list",
                    templateUrl: 'views/main-page/detail-list/detail-list.html',
                    controller: 'ListController'
                })
        });