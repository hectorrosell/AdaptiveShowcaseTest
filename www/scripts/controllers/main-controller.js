/// <reference path="../../bower_components/adaptiveme/adaptive.d.ts" />
/// <reference path="../angular.d.ts" />
'use strict';
app.controller('MainController', ['$rootScope', '$scope', '$log', '$state', '$location', '$route', '$timeout', function ($rootScope, $scope, $log, $state, $location, $route, $timeout) {
    $log.debug("MainController");
    var isSearchState = false;
    //Set data of Adaptive methods in localstorage
    if (localStorage.getItem("firstTime") === null) {
        localStorage.setItem("data", JSON.stringify(dataInfo));
        localStorage.setItem("firstTime", false);
    }
    else if (!localStorage.getItem("firstTime")) {
        localStorage.setItem("data", JSON.stringify(dataInfo));
        localStorage.setItem("firstTime", false);
    }
    else {
        var retrieveData = localStorage.getItem("data");
        dataInfo = JSON.parse(retrieveData);
    }
    $scope.items = items;
    var currentLocation;
    $scope.title = "Adaptive Showcase";
    $scope.status = statusNextSlice;
    $scope.isSlideBack = false;
    $scope.isChecked = false;
    var isAddToFavorites = false;
    $scope.inputTextSearch = false;
    $scope.status = statusNextSlice;
    $scope.scrollItems = dataInfo;
    $scope.newArray2 = [];
    $scope.newArray = [];
    for (var i = 0; i < $scope.scrollItems.length; i++) {
        for (var j = 0; j < $scope.scrollItems[i].list.length; j++) {
            for (var y = 0; y < $scope.scrollItems[i].list[j].size; y++) {
                $scope.newArray.push($scope.scrollItems[i].list[j].list[y]);
            }
        }
    }
    $scope.main_list = dataInfo;
    $scope.go = function (location) {
        $state.transitionTo(location);
        if ($state.is("favorites")) {
            isFavoriteState = true;
        }
        else {
            isFavoriteState = false;
        }
        $scope.favoritesMethods = [];
        var retrieveData = localStorage.getItem("data");
        dataInfo = JSON.parse(retrieveData);
        for (var i = 0; i < dataInfo.length; i++) {
            for (var j = 0; j < dataInfo[i].list.length; j++) {
                for (var y = 0; y < dataInfo[i].list[j].size; y++) {
                    if (dataInfo[i].list[j].list[y].favorite) {
                        $scope.favoritesMethods.push(dataInfo[i].list[j].list[y]);
                    }
                }
            }
        }
        console.log("stateChageSucces, $scope.searchBar: " + $scope.Ui.active('searchBar'));
        if ($scope.Ui.active('searchBar'))
            isSearchState = true;
        else
            isSearchState = false;
    };
    // isHomePage returns true in case that the option of the menu is Services
    $scope.isHomePage = function () {
        // The height of response-content class of css is adapted dynamically
        var heightMethodContent = $('.method-content').innerHeight();
        var heightFormMethodContent = $('.form-method-content').innerHeight();
        var offSetY = 10;
        if ((heightFormMethodContent - heightMethodContent - offSetY) > 75)
            $('.response-content').css({
                //        'height': (($(window).height()) - heightMethodContent) + 'px'
                'height': (heightFormMethodContent - heightMethodContent) + 'px'
            });
        if ($state.is("home") || $state.is("units-list") || $state.is("methods-list")) {
            return false;
        }
        else {
            return true;
        }
    };
    $scope.focusSearchBar = function () {
        $scope.inputTextSearch = true;
        console.log("focusSearchBar:" + $scope.inputTextSearch);
    };
    // Ng-click functions, manage the previous state when the back button is pressed
    $scope.setBackTransitionServices = function () {
        $state.transitionTo("home");
    };
    $scope.setBackTransitionUnits = function () {
        $state.transitionTo("units-list");
    };
    $scope.setBackTransitionMethods = function () {
        console.log("isSearchState: " + isSearchState);
        if (isSearchState)
            $state.transitionTo("home");
        else if (isFavoriteState)
            $state.transitionTo("favorites");
        else
            $state.transitionTo("methods-list");
    };
    $scope.setBackTransitionForm = function () {
        $state.transitionTo("form-submit");
    };
    /*if (isFirstState) {
     oldLocation = "home";
     isFirstState = false;
     }*/
    //
    $scope.itemMainListSelected = function (id) {
        currentServiceId = id;
        //reload the
        var retrieveData = localStorage.getItem("data");
        var var1 = JSON.parse(retrieveData);
        $scope.main_list = var1;
        console.log("$scope.main_list[id].list.length: " + $scope.main_list[id].list.length);
        for (var j = 0; j < $scope.main_list[id].list.length; j++) {
            for (var y = 0; y < $scope.main_list[id].list[j].size; y++) {
                $scope.newArray2.push($scope.main_list[id].list[j].list[y]);
            }
        }
        // When the side bar is open the other visible elements are not clickable.
        if (currentLocation.indexOf("uiSidebarLeft") !== -1) {
        }
        else {
            $log.debug("itemMainListSelected");
            var lengthList = dataInfo.length;
            for (var i = 0; i < lengthList; i++) {
                if (id === $scope.main_list[i].id) {
                    unitList = $scope.main_list[i];
                    $scope.unit_list = unitList;
                    $state.transitionTo('units-list');
                }
            }
        }
    };
    $scope.itemUnitListSelected = function (id) {
        currentUnitId = id;
        if (currentLocation.indexOf("uiSidebarLeft") !== -1) {
        }
        else {
            $scope.isSlideBack = false;
            statusNextSlice = false;
            var lengthList2 = unitList.list.length;
            for (var i2 = 0; i2 < lengthList2; i2++) {
                if (id === unitList.list[i2].id) {
                    methodList = unitList.list[i2];
                    $scope.method_list = methodList;
                    $state.transitionTo('methods-list');
                }
            }
        }
    };
    $scope.searchItemMethodListSelected = function (id, location) {
        isSearchState = true;
        console.log("isSearchState: " + isSearchState);
        console.log("id: " + id);
        // When the side bar is open the other visible elements are not clickable.
        if (currentLocation.indexOf("uiSidebarLeft") !== -1 || isAddToFavorites) {
            isAddToFavorites = false;
        }
        // Transitions in favorite methods
        isFavoriteState = true;
        $scope.isSlideBack = false;
        if (id.indexOf("getOSInfo") !== -1) {
            $state.transitionTo('method-getOSInfo');
        }
        else if (id.indexOf("getResourceLiteral") !== -1) {
            $state.transitionTo('method-getResourceLiteral');
        }
        else if (id.indexOf("getContactsForFields") !== -1) {
            $state.transitionTo('method-getContactsForFields');
        }
        else if (id.indexOf("DeviceOrientationListener") !== -1) {
            $state.transitionTo('method-DeviceOrientationListener');
        }
        else if (id.indexOf("createDatabase") !== -1) {
            $state.transitionTo('method-createDatabase');
        }
        else if (id.indexOf("getOrientationDefault") !== -1) {
            $state.transitionTo('method-getOrientationDefault');
        }
        else if (id.indexOf("createTable") !== -1) {
            $state.transitionTo('method-createTable');
        }
        else if (id.indexOf("deleteDatabase") !== -1) {
            $state.transitionTo('method-deleteDatabase');
        }
        else if (id.indexOf("deleteDatabase") !== -1) {
            $state.transitionTo('method-deleteDatabase');
        }
        else if (id.indexOf("existsDatabase") !== -1) {
            $state.transitionTo('method-existsDatabase');
        }
        else if (id.indexOf("existsTable") !== -1) {
            $state.transitionTo('method-existsTable');
        }
        else {
        }
    };
    $scope.itemMethodListSelected = function (id, location) {
        isSearchState = false;
        console.log("id: " + id);
        // When the side bar is open the other visible elements are not clickable.
        if (currentLocation.indexOf("uiSidebarLeft") !== -1 || isAddToFavorites) {
            isAddToFavorites = false;
        }
        else if ($state.is("favorites") || $state.is("home")) {
            isFavoriteState = true;
            $scope.isSlideBack = false;
            if (id.indexOf("getOSInfo") !== -1) {
                $state.transitionTo('method-getOSInfo');
            }
            else if (id.indexOf("getResourceLiteral") !== -1) {
                $state.transitionTo('method-getResourceLiteral');
            }
            else if (id.indexOf("getContactsForFields") !== -1) {
                $state.transitionTo('method-getContactsForFields');
            }
            else if (id.indexOf("DeviceOrientationListener") !== -1) {
                $state.transitionTo('method-DeviceOrientationListener');
            }
            else if (id.indexOf("createDatabase") !== -1) {
                $state.transitionTo('method-createDatabase');
            }
            else if (id.indexOf("getOrientationDefault") !== -1) {
                $state.transitionTo('method-getOrientationDefault');
            }
            else if (id.indexOf("createTable") !== -1) {
                $state.transitionTo('method-createTable');
            }
            else if (id.indexOf("deleteDatabase") !== -1) {
                $state.transitionTo('method-deleteDatabase');
            }
            else if (id.indexOf("deleteTable") !== -1) {
                $state.transitionTo('method-deleteTable');
            }
            else if (id.indexOf("existsDatabase") !== -1) {
                $state.transitionTo('method-existsDatabase');
            }
            else if (id.indexOf("existsTable") !== -1) {
                $state.transitionTo('method-existsTable');
            }
            else {
            }
        }
        else {
            isFavoriteState = false;
            currentMethodId = id;
            $scope.isSlideBack = false;
            var lengthList3 = methodList.list.length;
            for (var i3 = 0; i3 < lengthList3; i3++) {
                if (id === methodList.list[i3].id) {
                    detailList = methodList.list[i3];
                    $scope.detail_list = detailList;
                    if (detailList.name.indexOf("getOSInfo") !== -1) {
                        $state.transitionTo('method-getOSInfo');
                    }
                    else if (detailList.name.indexOf("getResourceLiteral") !== -1) {
                        $state.transitionTo('method-getResourceLiteral');
                    }
                    else if (detailList.name.indexOf("getContactsForFields") !== -1) {
                        $state.transitionTo('method-getContactsForFields');
                    }
                    else if (detailList.name.indexOf("DeviceOrientationListener") !== -1) {
                        $state.transitionTo('method-DeviceOrientationListener');
                    }
                    else if (detailList.name.indexOf("createDatabase") !== -1) {
                        $state.transitionTo('method-createDatabase');
                    }
                    else if (detailList.name.indexOf("getOrientationDefault") !== -1) {
                        $state.transitionTo('method-getOrientationDefault');
                    }
                    else if (detailList.name.indexOf("createTable") !== -1) {
                        $state.transitionTo('method-createTable');
                    }
                    else if (detailList.name.indexOf("deleteDatabase") !== -1) {
                        $state.transitionTo('method-deleteDatabase');
                    }
                    else if (detailList.name.indexOf("deleteTable") !== -1) {
                        $state.transitionTo('method-deleteTable');
                    }
                    else if (detailList.name.indexOf("existsDatabase") !== -1) {
                        $state.transitionTo('method-existsDatabase');
                    }
                    else if (detailList.name.indexOf("existsTable") !== -1) {
                        $state.transitionTo('method-existsTable');
                    }
                    else {
                        console.log("id: " + id);
                    }
                }
            }
        }
    };
    $scope.returnToMethodPage = function () {
        if (detailList.name.indexOf("getOSInfo") !== -1) {
            $state.transitionTo('method-getOSInfo');
        }
        else if (detailList.name.indexOf("getResourceLiteral") !== -1) {
            $state.transitionTo('method-getResourceLiteral');
        }
        else if (detailList.name.indexOf("getContactsForFields") !== -1) {
            $state.transitionTo('method-getContactsForFields');
        }
        else if (detailList.name.indexOf("DeviceOrientationListener") !== -1) {
            $state.transitionTo('method-DeviceOrientationListener');
        }
        else {
        }
    };
    $scope.$on('$stateChangeSuccess', function () {
        if ($state.is("contact")) {
            $scope.title = "Contact";
        }
        else if ($state.is("favorites")) {
            $scope.title = "Favorites";
        }
        else if ($state.is("license")) {
            $scope.title = "License";
        }
        else if ($state.is("services")) {
            $scope.title = "Services";
        }
        else {
            $scope.title = "Adaptive Showcase";
        }
    });
    $scope.$on('$locationChangeStart', function (angularEvent, next, location) {
        var isDownwaids = false;
        if (next) {
            currentLocation = next;
            var newLocation = next;
            if (newLocation.indexOf(oldLocation) !== -1) {
            }
            else {
            }
        }
    });
    $scope.addFavorites = function (id) {
        currentMethodId = id;
        isAddToFavorites = true;
        var data;
        if ($state.is("favorites")) {
            console.log("addFavorites -> state favorites");
            if ($scope.favoritesMethods[id].favorite) {
                if (localStorage.getItem("data") !== null) {
                    var retrieveData = localStorage.getItem("data");
                    data = JSON.parse(retrieveData);
                    if ($scope.favoritesMethods[id].name.indexOf("getOSInfo") !== -1) {
                        data[11].list[1].list[0].favorite = false;
                    }
                    else if ($scope.favoritesMethods[id].name.indexOf("getResourceLiteral") !== -1) {
                        data[0].list[0].list[0].favorite = false;
                    }
                    else if ($scope.favoritesMethods[id].name.indexOf("getContactsForFields") !== -1) {
                        data[6].list[0].list[0].favorite = false;
                    }
                    else if ($scope.favoritesMethods[id].name.indexOf("DeviceOrientationListener") !== -1) {
                        data[11].list[0].list[0].favorite = false;
                    }
                    else if ($scope.favoritesMethods[id].name.indexOf("createDatabase") !== -1) {
                        data[3].list[0].list[0].favorite = false;
                    }
                    else if ($scope.favoritesMethods[id].name.indexOf("getOrientationDefault") !== -1) {
                        data[11].list[0].list[0].favorite = false;
                    }
                    else {
                    }
                    localStorage.setItem("data", JSON.stringify(data));
                    $scope.favoritesMethods[id].favorite = false;
                }
            }
            else {
                if (localStorage.getItem("data") !== null) {
                    var retrieveData = localStorage.getItem("data");
                    data = JSON.parse(retrieveData);
                    if ($scope.favoritesMethods[id].name.indexOf("getOSInfo") !== -1) {
                        data[11].list[1].list[0].favorite = true;
                    }
                    else if ($scope.favoritesMethods[id].name.indexOf("getResourceLiteral") !== -1) {
                        data[0].list[0].list[0].favorite = true;
                    }
                    else if ($scope.favoritesMethods[id].name.indexOf("getContactsForFields") !== -1) {
                        data[6].list[0].list[0].favorite = true;
                    }
                    else if ($scope.favoritesMethods[id].name.indexOf("DeviceOrientationListener") !== -1) {
                        data[11].list[0].list[0].favorite = true;
                    }
                    else if ($scope.favoritesMethods[id].name.indexOf("createDatabase") !== -1) {
                        data[3].list[0].list[0].favorite = true;
                    }
                    else if ($scope.favoritesMethods[id].name.indexOf("getOrientationDefault") !== -1) {
                        data[11].list[0].list[0].favorite = true;
                    }
                    else {
                    }
                    localStorage.setItem("data", JSON.stringify(data));
                    $scope.favoritesMethods[id].favorite = true;
                }
            }
        }
        else {
            console.log("addFavorites -> state no favorites");
            if (typeof $scope.method_list === "undefined") {
            }
            else if ($scope.method_list.list[id].favorite) {
                if (localStorage.getItem("data") !== null) {
                    var retrieveData = localStorage.getItem("data");
                    data = JSON.parse(retrieveData);
                    data[currentServiceId].list[currentUnitId].list[currentMethodId].favorite = false;
                    localStorage.setItem("data", JSON.stringify(data));
                }
                console.log("delete to Favorites");
                $scope.method_list.list[id].favorite = false;
            }
            else {
                if (localStorage.getItem("data") !== null) {
                    var retrieveData = localStorage.getItem("data");
                    data = JSON.parse(retrieveData);
                    data[currentServiceId].list[currentUnitId].list[currentMethodId].favorite = true;
                    localStorage.setItem("data", JSON.stringify(data));
                }
                console.log("add to Favorites");
                $scope.method_list.list[id].favorite = true;
            }
        }
    };
    $scope.$watch('isChecked', function (newV) {
        var countUp = function () {
            newV && $('#name').trigger("focus");
            newV && $('#name').trigger("click");
        };
        $timeout(countUp, 300);
    }, true);
    $scope.setFocus = function () {
        if ($scope.isChecked)
            $scope.isChecked = false;
        else
            $scope.isChecked = true;
    };
    $scope.$watch(function () {
        return window.innerWidth;
    }, function (value) {
        // The height of response-content class of css is adapted dynamically.
        var heightMethodContent = $('.method-content').innerHeight();
        var heightFormMethodContent = $('.form-method-content').innerHeight();
        var offSetY = 10;
        if ((heightFormMethodContent - heightMethodContent - offSetY) > 85)
            $('.response-content').css({
                'height': (heightFormMethodContent - heightMethodContent - offSetY) + 'px'
            });
    });
}]);
//# sourceMappingURL=main-controller.js.map