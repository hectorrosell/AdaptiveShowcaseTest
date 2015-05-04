//////////////////////////////////////////////////
// The main module configuration section shows  //
// how to define when (redirects) and otherwise //
// (invalid urls) to arrange site navigation    //
// using ui-router.                             //
//////////////////////////////////////////////////

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        reloadOnSearch: false
    });

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