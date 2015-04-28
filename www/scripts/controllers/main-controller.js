(function (angular) {
    'use strict';

    angular
        .module('ADApp.Controllers')
        .controller('MainController', MainController);

    function MainController($scope, $log, $state, $rootScope) {

        $log.debug("Main Controller");

        $rootScope.isHomePage = isHomePage;

        function isHomePage() {
            if ($state.is("main-page.home")) {
                return true;
            } else {
                return false;
            }
        }

    }
})(window.angular);