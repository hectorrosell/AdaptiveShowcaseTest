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
            $urlRouterProvider.otherwise('/home');

            //////////////////////////
            // State Configurations //
            //////////////////////////

            $stateProvider
                .state("home", {
                    url: "/home",
                    templateUrl: 'views/main-page/home/home.html',
                    controller: 'HomeController'
                });
        });