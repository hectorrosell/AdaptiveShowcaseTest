'use strict';

app.controller('MainController', ['$rootScope', '$scope', '$log', '$state', '$location', '$route', '$timeout', function ($rootScope, $scope, $log, $state, $location, $route, $timeout) {

    $scope.favoritesMethods = [];

    $log.debug("MainController");

    console.log("firstTime: " + localStorage.getItem("firstTime"));

    if (localStorage.getItem("firstTime") === null) {
        localStorage.setItem("data", JSON.stringify(dataInfo));
        localStorage.setItem("firstTime", false);
        console.log("firstTime 2 test");

    } else if (!localStorage.getItem("firstTime")) {
        localStorage.setItem("data", JSON.stringify(dataInfo));
        localStorage.setItem("firstTime", false);
        console.log("firstTime test");

    } else {
        var retrieveData = localStorage.getItem("data");
        dataInfo = JSON.parse(retrieveData);
        console.log("no firstTime");
    }

    $scope.isChecked = false;
    var currentLocation;
    $scope.isSlideBack = false;
    $scope.title = "Adaptive Showcase";
    $scope.status = statusNextSlice;
    var isAddToFavorites = false;

    $scope.go = function (location) {

        $scope.favoritesMethods = [];

        for (var i = 0; i < dataInfo.length; i++) {

            console.log("test 1: " + dataInfo.length);

            for (var j = 0; j < dataInfo[i].list.length; j++) {

                console.log("test 2: " + dataInfo[i].list.length);
                console.log("test 22: " + dataInfo[i].list[j].name);

                for (var y = 0; y < dataInfo[i].list[j].size; y++) {

                    //for (var x = 0; x < dataInfo[i].list[j].list[y].length; x++) {

                    console.log("test 3: " + dataInfo[i].list[j].list[y].name);
                    console.log("test 33: " + dataInfo[i].list[j].list[y].favorite);

                    if (dataInfo[i].list[j].list[y].favorite)
                        $scope.favoritesMethods.push(dataInfo[i].list[j].list[y]);

                    // }
                }
            }
        }

        $state.transitionTo(location);
    };

    $scope.isHomePage = function () {
        // console.log("******************************");
        //console.log("Home Page: " + $state.is("home"));

        var heightMethodContent = $('.method-content').innerHeight();
        var heightFormMethodContent = $('.form-method-content').innerHeight();
        var offSetY = 10;

        /*
                console.log("win: " + $(window).height() + ", meth: " + heightMethodContent + ", Final height: " + (($(window).height()) - heightMethodContent));
        */

        if ((heightFormMethodContent - heightMethodContent - offSetY) > 75)

            $('.response-content').css({
            //        'height': (($(window).height()) - heightMethodContent) + 'px'
            'height': (heightFormMethodContent - heightMethodContent) + 'px'

        });

        if ($state.is("home") || $state.is("units-list") || $state.is("methods-list")) {
            return false;
        } else {
            return true;
        }
    };

    $scope.inputTextSearch = false;

    $scope.focusSearchBar = function () {
        $scope.inputTextSearch = true;
        console.log("focusSearchBar:" + $scope.inputTextSearch);
    }

    $scope.setBackTransitionServices = function () {
        $state.transitionTo("home");
    };

    $scope.setBackTransitionUnits = function () {
        $state.transitionTo("units-list");
    };

    $scope.setBackTransitionMethods = function () {
        $state.transitionTo("methods-list");
    };

    $scope.setBackTransitionForm = function () {
        $state.transitionTo("form-submit");
    };

    if (isFirstState) {
        oldLocation = "home";
        isFirstState = false;
    }

    $scope.status = statusNextSlice;
    $scope.scrollItems = dataInfo;
    $scope.main_list = dataInfo;

    $scope.itemMainListSelected = function (id) {

        currentServiceId = id;

        $log.debug("test test currentServiceId: " + currentServiceId);

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

        currentUnitId = id;

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

    $scope.itemMethodListSelected = function (id, location) {

        currentMethodId = id;

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
                    // console.log(detailList);

                    //console.log("detailList.name: " + detailList.name);

                    if (detailList.name.indexOf("getOSInfo") !== -1) {
                        $state.transitionTo('method-getOSInfo');
                    } else if (detailList.name.indexOf("getResourceLiteral") !== -1) {
                        $state.transitionTo('method-getResourceLiteral');
                    } else if (detailList.name.indexOf("getContactsForFields") !== -1) {
                        $state.transitionTo('method-getContactsForFields');
                    } else if (detailList.name.indexOf("ButtonListener") !== -1) {
                        $state.transitionTo('method-ButtonListener');
                    } else {}

                }
            }
        }

        /* console.log("isAddToFavorites: " + isAddToFavorites);*/

    };

    $scope.returnToMethodPage = function () {

        if (detailList.name.indexOf("getOSInfo") !== -1) {
            $state.transitionTo('method-getOSInfo');
        } else if (detailList.name.indexOf("getResourceLiteral") !== -1) {
            $state.transitionTo('method-getResourceLiteral');
        } else if (detailList.name.indexOf("getContactsForFields") !== -1) {
            $state.transitionTo('method-getContactsForFields');
        } else if (detailList.name.indexOf("ButtonListener") !== -1) {
            $state.transitionTo('method-ButtonListener');
        } else {}

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

            if (newLocation.indexOf(oldLocation) !== -1) {} else {}
        }
    });

    // add method to favorites
    $scope.addFavorites = function (id) {

        currentMethodId = id;

        isAddToFavorites = true;

        var data;

        if ($scope.method_list.list[id].favorite) {
            if (localStorage.getItem("data") !== null) {

                var retrieveData = localStorage.getItem("data");
                data = JSON.parse(retrieveData);

                data[currentServiceId].list[currentUnitId].list[currentMethodId].favorite = false;
                localStorage.setItem("data", JSON.stringify(data));

            }
            console.log("delete to Favorites");
            $scope.method_list.list[id].favorite = false;

        } else {

            if (localStorage.getItem("data") !== null) {

                var retrieveData = localStorage.getItem("data");
                data = JSON.parse(retrieveData);

                console.log("testing 1: " + data);

                console.log("testing 2: " + data[currentServiceId].name);

                console.log("testing 2: " + currentServiceId);

                console.log("testing 3: " + data[currentServiceId].list[currentUnitId]);

                data[currentServiceId].list[currentUnitId].list[currentMethodId].favorite = true;
                localStorage.setItem("data", JSON.stringify(data));

            }

            console.log("add to Favorites");
            $scope.method_list.list[id].favorite = true;
        }
    }

    $scope.$watch('isChecked', function (newV) {

        var countUp = function () {
            console.log("isChecked with timeout");
            newV && $('#name').trigger("focus");
            newV && $('#name').trigger("click");
        }

        $timeout(countUp, 300);
    }, true);

    $scope.setFocus = function () {
        if ($scope.isChecked)
            $scope.isChecked = false;
        else
            $scope.isChecked = true;
    };

    $scope.items = items;

    $scope.deleteItem = function (index) {
        items.data.splice(index, 1);
    };

    $scope.addItem = function (index) {
        items.data.push({
            id: $scope.items.data.length + 1,
            title: "New Listener"
        });
    };

    $scope.deleteAllItems = function () {

        //console.log("delete");
        for (var i = 0; i < items.data.length; i++) {
            items.data.splice(i);
        }
    };

    $scope.$watch(function () {
        return window.innerWidth;
    }, function (value) {
        //console.log(value);

        var heightMethodContent = $('.method-content').innerHeight();
        var heightFormMethodContent = $('.form-method-content').innerHeight();
        var offSetY = 10;

        if ((heightFormMethodContent - heightMethodContent - offSetY) > 85)

            $('.response-content').css({
            'height': (heightFormMethodContent - heightMethodContent - offSetY) + 'px'

        });

    });

}]);