/// <reference path="../../bower_components/adaptiveme/adaptive.d.ts" />
/// <reference path="../angular.d.ts" />
'use strict';
var time;
app.controller('MethodController', ['$scope', function ($scope) {
    $scope.response = {
        name: "",
        version: "",
        vendor: ""
    };
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
                break;
            case 'ButtonListener':
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
                $scope.paramResponse = i18nResource;
                break;
        }
    };
}]);
function parseContacts(contacts) {
    for (var i = 0; i < contacts.length; i++) {
        var per = contacts[i].getPersonalInfo();
        var pro = contacts[i].getProfessionalInfo();
    }
}
//# sourceMappingURL=method-controller.js.map