'use strict';

app.controller('MainController', ['$rootScope', '$scope', '$log', '$state', '$location', '$route', function ($rootScope, $scope, $log, $state, $location, $route) {

    $log.debug("MainController");


    if (isFirstState) {

        oldLocation = "/#/home";
        isFirstState = false;
        $log.debug("isFirstState: " + isFirstState);

    }



    //$rootScope.isHomePage = isHomePage;

    $scope.status = statusNextSlice;

    $scope.isHomePage = function () {
        console.log("******************************");
        console.log("Home Page: " + $state.is("home"));
        if ($state.is("home") || $state.is("units-list") || $state.is("methods-list")) {
            return false;
        } else {
            return true;
        }
    };

    $scope.scrollItems = dataInfo;
    $scope.unit_list = unitList;
    $scope.method_list = methodList;
    $scope.detail_list = detailList;

    $scope.main_list = dataInfo;

    $scope.itemMainListSelected = function (id) {
        $log.debug("itemMainListSelected");
        var lengthList = dataInfo.length;
        $('.slide').addClass('move');
        for (var i = 0; i < lengthList; i++) {

            if (id === $scope.main_list[i].id) {
                unitList = $scope.main_list[i];
                console.log(unitList);
                $state.transitionTo('units-list');
            }
        }
    };

    $scope.itemUnitListSelected = function (id) {
        statusNextSlice = false;
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

    // Transitions animation

    $scope.$on('$locationChangeStart', function (angularEvent, next, location) {
        console.log("locationChangeStart ");
        var isDownwards = true;


        $log.debug("next: " + next);
        $log.debug("next: " + next.$$route);
        if (next) {
            var newLocation = next;
            $log.debug("oldLocation: " + oldLocation + ", newLocation:  " + newLocation);


            //if (oldLocation !== newLocation && oldLocation.indexOf(newLocation) !== -1) {
            if (newLocation.indexOf(oldLocation) !== -1) {
                console.log("igual ");
                isDownwards = false;
            } else {
                console.log("diferent ");

            }

            if (counterStates == 0) {
                $log.debug("counterStates 1: " + counterStates);
                counterStates++;

            } else {
                $log.debug("counterStates 2: " + counterStates);
                oldLocation = newLocation;
                counterStates = 0;
            }

        }

        $log.debug("isDownwards: " + isDownwards);
        /*$scope.isDownwards = isDownwards;*/
        $scope.isDownwards = false;
    });

    /* $scope.$on('$locationChangeEnd', function (angularEvent, next, location) {

     });*/

    /* $scope.$on('$routeChangeStart', function (angularEvent, next) {
         console.log("routeChangeStart");
         var isDownwards = true;
         if (next && next.$$route) {
             var newLocation = next.$$route.originalPath;

             $log.debug("oldLocation: " + oldLocation + "newLocation:  " + newLocation);

             if (oldLocation !== newLocation && oldLocation.indexOf(newLocation) !== -1) {
                 isDownwards = false;
             }
             oldLocation = newLocation;
         }

         $scope.isDownwards = isDownwards;
     });*/


}]);

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