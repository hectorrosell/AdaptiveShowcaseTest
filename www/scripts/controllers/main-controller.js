app.controller('MainController', function ($rootScope, $scope, $log, $state) {

    $log.debug("MainController");
    $scope.scrollItems = dataInfo;
    $scope.unit_list = unitList;
    $scope.method_list = methodList;
    $scope.detail_list = detailList;

    $scope.main_list = dataInfo;

    $scope.itemMainListSelected = function (id) {
        $log.debug("itemMainListSelected");
        var lengthList = dataInfo.length;
        for (var i = 0; i < lengthList; i++) {
            if (id === $scope.main_list[i].id) {
                unitList = $scope.main_list[i];
                console.log(unitList);
                $state.transitionTo('units-list');
            }
        }
    };

    $scope.itemUnitListSelected = function (id) {
        $log.debug("itemUnitListSelected");
        var lengthList2 = unitList.list.length;
        for (var i2 = 0; i2 < lengthList2; i2++) {

            if (id === unitList.list[i2].id) {
                methodList = unitList.list[i2];
                console.log(methodList);
                $state.transitionTo('methods-list');
            }
        }
    };

    $scope.itemMethodListSelected = function (id) {
        $log.debug("itemMethodListSelected");
        var lengthList3 = methodList.list.length;
        for (var i3 = 0; i3 < lengthList3; i3++) {

            if (id === methodList.list[i3].id) {
                detailList = methodList.list[i3];
                console.log(detailList);
                $state.transitionTo('form-submit');
            }
        }
    };

});

/*(function (angular) {
    'use strict';

    angular
        .module('ADApp', [
                'ngRoute',
                'mobile-angular-ui',
                'mobile-angular-ui.gestures'
        ])
        .controller('MainController', MainController);

    function MainController($scope, $log, $state, $rootScope) {

        $log.debug("MainController");

        $scope.unit_list = unitList;
        $scope.method_list = methodList;
        $scope.detail_list = detailList;

        $scope.main_list = dataInfo;

        $scope.itemMainListSelected = function (id) {
            $log.debug("itemMainListSelected");
            var lengthList = dataInfo.length;
            for (var i = 0; i < lengthList; i++) {
                if (id === $scope.main_list[i].id) {
                    unitList = $scope.main_list[i];
                    console.log(unitList);
                    $state.go('main-page.units-list');
                }
            }
        };

        $scope.itemUnitListSelected = function (id) {
            $log.debug("itemUnitListSelected");
            var lengthList2 = unitList.list.length;
            for (var i2 = 0; i2 < lengthList2; i2++) {

                if (id === unitList.list[i2].id) {
                    methodList = unitList.list[i2];
                    console.log("Test: " + methodList);
                    $state.go('main-page.methods-list');
                }
            }
        };

        $scope.itemMethodListSelected = function (id) {
            $log.debug("itemMethodListSelected");
            var lengthList2 = methodList.list.length;
            for (var i2 = 0; i2 < lengthList2; i2++) {

                if (id === methodList.list[i2].id) {
                    detailList = methodList.list[i2];
                    console.log("Test: " + detailList);
                    $state.go('main-page.detail-list');
                }
            }
        };

        $scope.scrollItems = dataInfo;

    }

})(window.angular);*/