/// <reference path="../../bower_components/adaptiveme/adaptive.d.ts" />
/// <reference path="../angular.d.ts" />
'use strict';
var time;
app.controller('MethodController', ['$rootScope', '$scope', function ($rootScope, $scope) {
    $scope.response = {
        name: "",
        version: "",
        vendor: ""
    };
    var tempScope = $scope;
    $scope.inputTextParam = "";
    $scope.sendRequestMethod = function sendRequestMethod(method) {
        console.log("sendRequestMethod: " + method);
        switch (method) {
            case 'getOSInfo':
                var os = Adaptive.AppRegistryBridge.getInstance().getOSBridge();
                var osInfo = os.getOSInfo();
                console.log(osInfo);
                $scope.response.name = osInfo.getName().valueOf();
                $scope.response.version = osInfo.getVersion();
                $scope.response.vendor = osInfo.getVendor();
                $scope.paramResponseOk = "OK";
                break;
            case 'DeviceOrientationListener':
                $scope.paramResponse = "Orientation listener activated";
                console.log("case DeviceOrientationListener");
                var device = Adaptive.AppRegistryBridge.getInstance().getDeviceBridge();
                var orientationListener = new Adaptive.DeviceOrientationListener(function onError(error) {
                }, function onResult(event) {
                    $scope.printDeviceOrientationEvents(event);
                    /*var text = "printDeviceOrientationEvents:" + ': ' + event.getOrigin() + ' > ' + event.getDestination() + ' [' + event.getState() + ']\n' ;
                    console.log(" ---->> rotationEvent :"+text);
                    console.log(" ---->> rotationEvent :"+$rootScope.paramResponse);
                    $rootScope.paramResponse = text ;
                    $rootScope.paramResponseOk = "OK" ;*/
                }, function onWarning(event, warning) {
                });
                device.addDeviceOrientationListener(orientationListener);
                break;
            case 'getContactsForFields':
                var contact = Adaptive.AppRegistryBridge.getInstance().getContactBridge();
                time = new Date();
                contact.getContactsForFields(callback, [Adaptive.IContactFieldGroup.PersonalInfo, Adaptive.IContactFieldGroup.ProfessionalInfo, Adaptive.IContactFieldGroup.Addresses, Adaptive.IContactFieldGroup.Emails, Adaptive.IContactFieldGroup.Phones, Adaptive.IContactFieldGroup.Socials, Adaptive.IContactFieldGroup.Tags, Adaptive.IContactFieldGroup.Websites]);
                break;
            case 'getResourceLiteral':
                var globalization = Adaptive.AppRegistryBridge.getInstance().getGlobalizationBridge();
                // Synchronous Method with Parameters (getResourceLiteral)
                var locale = globalization.getDefaultLocale();
                var i18nResource = globalization.getResourceLiteral($scope.inputTextParam, locale);
                //$('#i18n-resource').html("<b>String from Adaptive Core</b>: " + i18nResource);
                console.log("String from Adaptive Core: " + i18nResource);
                if (i18nResource == undefined || i18nResource === null) {
                    $scope.paramResponse = i18nResource;
                    $scope.paramResponseOk = "ERROR";
                }
                else {
                    $scope.paramResponse = i18nResource;
                    $scope.paramResponseOk = "OK";
                    console.log("..." + $scope.paramResponse + "...");
                }
                break;
        }
    };
    $scope.printDeviceOrientationEvents = function printDeviceOrientationEvents(event) {
        var text = "printDeviceOrientationEvents:" + ': ' + event.getOrigin() + ' > ' + event.getDestination() + ' [' + event.getState() + ']\n';
        console.log(" ---->> rotationEvent :" + text);
        console.log(" ---->> rotationEvent :" + $scope.paramResponse);
        $scope.paramResponse = "text";
        $scope.paramResponseOk = "OK";
        var $textArea = $('#textarea-1');
        $textArea.html("printDeviceOrientationEvents:" + ': ' + event.getOrigin() + ' > ' + event.getDestination() + ' [' + event.getState() + ']\n');
    };
}]);
function parseContacts(contacts) {
    for (var i = 0; i < contacts.length; i++) {
        var per = contacts[i].getPersonalInfo();
        var pro = contacts[i].getProfessionalInfo();
    }
}
//# sourceMappingURL=method-controller.js.map