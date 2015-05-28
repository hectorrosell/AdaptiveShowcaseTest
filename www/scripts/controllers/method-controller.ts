/// <reference path="../../bower_components/adaptiveme/adaptive.d.ts" />
/// <reference path="../angular.d.ts" />

'use strict';

app.controller('MethodController', [ '$scope',function ($scope) {

    $scope.response ={
         name: "" ,
        version: "",
        vendor: ""
    };

    $scope.sendRequestMethod = function sendRequestMethod(){
        console.log("sendRequestMethod");
        var os:Adaptive.IOS = Adaptive.AppRegistryBridge.getInstance().getOSBridge();
        var osInfo:Adaptive.OSInfo = os.getOSInfo();
        console.log( osInfo );

        $scope.response.name = osInfo.getName().valueOf() ;
        $scope.response.version = osInfo.getVersion();
        $scope.response.vendor = osInfo.getVendor();

    };

}]);
