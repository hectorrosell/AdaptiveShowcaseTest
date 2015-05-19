'use strict';

app.controller('MainController', ['$rootScope', '$scope', '$log', '$state', '$location', '$route', '$timeout', function ($rootScope, $scope, $log, $state, $location, $route, $timeout) {

    $log.debug("MainController");
    var currentLocation;
    $scope.isSlideBack = false;
    $scope.title = "Adaptive Showcase";
    $scope.status = statusNextSlice;
    var isAddToFavorites = false;

    $scope.go = function (location) {
        $state.transitionTo(location);
    };

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
        $state.transitionTo("home");
    };

    $scope.setBackTransitionUnits = function () {
        $state.transitionTo("units-list");
    };

    $scope.setBackTransitionMethods = function () {
        $state.transitionTo("methods-list");
    };

    if (isFirstState) {
        oldLocation = "home";
        isFirstState = false;
    }

    $scope.status = statusNextSlice;
    $scope.scrollItems = dataInfo;

    $scope.main_list = dataInfo;
    $scope.itemMainListSelected = function (id, location) {

        if (currentLocation.indexOf("uiSidebarLeft") !== -1) {

        } else {
            $log.debug("itemMainListSelected");
            var lengthList = dataInfo.length;
            for (var i = 0; i < lengthList; i++) {

                if (id === $scope.main_list[i].id) {
                    unitList = $scope.main_list[i];
                    $scope.unit_list = unitList;
                    console.log(unitList);
                    $state.transitionTo('units-list');
                }
            }
        }
    };

    $scope.itemUnitListSelected = function (id) {

        if (currentLocation.indexOf("uiSidebarLeft") !== -1) {

        } else {
            console.log('else');
            $scope.isSlideBack = false;
            statusNextSlice = false;
            var lengthList2 = unitList.list.length;

            for (var i2 = 0; i2 < lengthList2; i2++) {

                if (id === unitList.list[i2].id) {
                    methodList = unitList.list[i2];
                    $scope.method_list = methodList;
                    console.log(methodList);
                    $state.transitionTo('methods-list');
                }
            }
        }
    };

    /*$scope.itemUnitListSelected = function (item) {
        console.log('test: ' + item);
    }*/

    $scope.itemMethodListSelected = function (id) {

        if (currentLocation.indexOf("uiSidebarLeft") !== -1 || isAddToFavorites) {
            isAddToFavorites = false;

        } else {

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
        }

        console.log("isAddToFavorites: " + isAddToFavorites);

    };

    $scope.$on('$stateChangeSuccess', function () {

        if ($state.is("contact")) {
            $scope.title = "Contact";
        } else if ($state.is("favorites")) {
            $scope.title = "Favorites";
        } else if ($state.is("license")) {
            $scope.title = "License";
        } else if ($state.is("services")) {
            $scope.title = "Services";
        } else {
            $scope.title = "Adaptive Showcase";
        }

    });

    $scope.$on('$locationChangeStart', function (angularEvent, next, location) {

        var isDownwaids = false;

        if (next) {

            currentLocation = next;

            var newLocation = next;

            if (newLocation.indexOf(oldLocation) !== -1) {
                //isDownwaids = true;
                //$log.debug("Is equal state, " + "isDownwards: " + $scope.isSlideBack);
                //$log.debug("Is equal state, " + "isDownwards: " + $scope.isSlideBack);

            } else {
                //$log.debug("Is no equal state, " + "isDownwards: " + $scope.isSlideBack);
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

    $scope.addFavorites = function (id) {

        console.log("add favorites");
        isAddToFavorites = true;

        console.log($scope.method_list.list[id]);
        console.log($scope.method_list.list[id]);

        if ($scope.method_list.list[id].favorite)
            $scope.method_list.list[id].favorite = false;
        else
            $scope.method_list.list[id].favorite = true;
    }

}]);