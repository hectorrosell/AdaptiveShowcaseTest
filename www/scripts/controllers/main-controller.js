'use strict';

app.controller('MainController', ['$rootScope', '$scope', '$log', '$state', '$location', '$route', '$timeout', function ($rootScope, $scope, $log, $state, $location, $route, $timeout) {

    $log.debug("MainController");

    $scope.isSlideBack = false;

    $scope.status = statusNextSlice;

    $scope.isHomePage = function () {
        // console.log("******************************");
        //console.log("Home Page: " + $state.is("home"));
        if ($state.is("home") || $state.is("units-list") || $state.is("methods-list")) {
            return false;
        } else {
            return true;
        }
    };
    
    $scope.setBackTransitionServices = function () {
        $log.debug("myFuction1");
        //$scope.isSlideBack = true;
        $state.transitionTo("home");

    };
    
    $scope.setBackTransitionUnits = function () {
        $log.debug("myFuction2");
        //$scope.isSlideBack = true;
        $state.transitionTo("units-list");
    };
    
    $scope.setBackTransitionMethods = function () {
        $log.debug("myFuction3");
        // $scope.isSlideBack = true;
        $state.transitionTo("methods-list");
    };
 
    if (isFirstState) {
        oldLocation = "home";
        isFirstState = false;
        $log.debug("isFirstState: " + isFirstState);
    }

    //$rootScope.isHomePage = isHomePage;

    $scope.status = statusNextSlice;

    /*$scope.isHomePage = function () {
        console.log("******************************");
        console.log("Home Page: " + $state.is("home"));
        if ($state.is("home") || $state.is("units-list") || $state.is("methods-list")) {
            return false;
        } else {
            return true;
        }
    };*/

    $scope.scrollItems = dataInfo;
    //$scope.unit_list = unitList;
    //$scope.method_list = methodList;
    //$scope.detail_list = detailList;

    $scope.main_list = dataInfo;

    $scope.itemMainListSelected = function (id) {
        //$scope.isSlideBack = false;
        $log.debug("itemMainListSelected");
        var lengthList = dataInfo.length;
        //$('.slide').addClass('move');
        for (var i = 0; i < lengthList; i++) {

            if (id === $scope.main_list[i].id) {
                unitList = $scope.main_list[i];
                $scope.unit_list = unitList;
                console.log(unitList);
                $state.transitionTo('units-list');
            }
        }
    };

    $scope.itemUnitListSelected = function (id) {
        $scope.isSlideBack = false;
        statusNextSlice = false;
        $log.debug("itemUnitListSelected");
        var lengthList2 = unitList.list.length;
        for (var i2 = 0; i2 < lengthList2; i2++) {

            if (id === unitList.list[i2].id) {
                methodList = unitList.list[i2];
                $scope.method_list = methodList;
                console.log(methodList);
                $state.transitionTo('methods-list');
            }
        }
    };

    $scope.itemMethodListSelected = function (id) {
        $scope.isSlideBack = false;
        $log.debug("itemMethodListSelected");
        var lengthList3 = methodList.list.length;
        for (var i3 = 0; i3 < lengthList3; i3++) {

            if (id === methodList.list[i3].id) {
                detailList = methodList.list[i3];
                $scope.detail_list = detailList;
                console.log(detailList);
                $state.transitionTo('form-submit');
            }
        }
    };

    // Transitions animation

    $scope.$on('$locationChangeStart', function (angularEvent, next, location) {

        console.log("locationChangeStart " +
            " , " + angularEvent +
            " , " + location +
            " , " + next

        );

        var isDownwaids = false;

        if (next) {

            var newLocation = next;

            if (newLocation.indexOf(oldLocation) !== -1) {
                //isDownwaids = true;
                $log.debug("Is equal state, " + "isDownwards: " + $scope.isSlideBack);
                //$log.debug("Is equal state, " + "isDownwards: " + $scope.isSlideBack);

            } else {
                $log.debug("Is no equal state, " + "isDownwards: " + $scope.isSlideBack);
                //$log.debug("Is equal state, " + "isDownwards: " + $scope.isSlideBack);
            }
            /*$scope.isDownwards = isDownwards;*/

            /* if (counterStates == 0) {
                $log.debug("counterStates 1: " + counterStates);
                counterStates++;

            } else {
                $log.debug("counterStates 2: " + counterStates);
                oldLocation = newLocation;
                counterStates = 0;
            }
*/
            // oldLocation = newLocation;

        }

        //$rootScope.isSlideBack = false;
        //$scope.isSlideBack = false;
        //$rootScope.isDownwards = isDownwaids;

    });

}]);