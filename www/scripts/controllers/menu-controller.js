(function (angular) {
    'use strict';

    angular
        .module('ADApp.Controllers')
        .controller('MenuController', MenuController);

    function MenuController($log) {

        $log.debug("Menu Controller");
    }

})(window.angular);