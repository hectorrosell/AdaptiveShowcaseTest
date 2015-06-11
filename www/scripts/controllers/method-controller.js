/// <reference path="../../bower_components/adaptiveme/adaptive.d.ts" />
/// <reference path="../angular.d.ts" />
'use strict';
var time;
app.controller('MethodController', ['$rootScope', '$scope', function ($rootScope, $scope) {
    // Set text in some cases
    $scope.response = {
        name: "",
        version: "",
        vendor: ""
    };
    //Data for some select input
    $scope.itemSelectForContactFieldGroup = [
        {
            group: Adaptive.IContactFieldGroup.PersonalInfo,
            selected: false
        },
        {
            group: Adaptive.IContactFieldGroup.ProfessionalInfo,
            selected: false
        },
        {
            group: Adaptive.IContactFieldGroup.Addresses,
            selected: false
        },
        {
            group: Adaptive.IContactFieldGroup.Emails,
            selected: false
        },
        {
            group: Adaptive.IContactFieldGroup.Phones,
            selected: false
        },
        {
            group: Adaptive.IContactFieldGroup.Socials,
            selected: false
        },
        {
            group: Adaptive.IContactFieldGroup.Tags,
            selected: false
        },
        {
            group: Adaptive.IContactFieldGroup.Websites,
            selected: false
        }
    ];
    $scope.fields = [
        Adaptive.IContactFieldGroup.PersonalInfo,
        Adaptive.IContactFieldGroup.ProfessionalInfo,
        Adaptive.IContactFieldGroup.Addresses,
        Adaptive.IContactFieldGroup.Emails,
        Adaptive.IContactFieldGroup.Phones,
        Adaptive.IContactFieldGroup.Socials,
        Adaptive.IContactFieldGroup.Tags,
        Adaptive.IContactFieldGroup.Websites
    ];
    $scope.selectedBoxes = ["none", "none", "none"];
    var tempScope = $scope;
    $scope.inputTextParam = "";
    // Activate the Device Orientation Listener listener
    var device = Adaptive.AppRegistryBridge.getInstance().getDeviceBridge();
    console.log("case DeviceOrientationListener");
    var orientationListener = new Adaptive.DeviceOrientationListener(function onError(error) {
    }, function onResult(event) {
        $scope.printDeviceOrientationEvents(event);
        $scope.paramResponseOk = "OK";
    }, function onWarning(event, warning) {
    });
    device.addDeviceOrientationListener(orientationListener);
    // button 'Submit' is clicked
    $scope.sendRequestMethod = function sendRequestMethod(method) {
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
                var device = Adaptive.AppRegistryBridge.getInstance().getDeviceBridge();
                console.log("case DeviceOrientationListener");
                var orientationListener = new Adaptive.DeviceOrientationListener(function onError(error) {
                }, function onResult(event) {
                    $scope.printDeviceOrientationEvents(event);
                    $scope.paramResponseOk = "OK";
                }, function onWarning(event, warning) {
                });
                device.addDeviceOrientationListener(orientationListener);
                break;
            case 'getContactsForFields':
                console.log("$scope.selectedBoxes lenght: " + $scope.selectedBoxes);
                var newFields = [];
                angular.forEach($scope.fields, function (value, key) {
                    var arraycontainsgroup = ($scope.selectedBoxes.indexOf(value) > -1);
                    if (arraycontainsgroup) {
                        newFields.push(value);
                        console.log("newFields value: " + value);
                    }
                });
                var contact = Adaptive.AppRegistryBridge.getInstance().getContactBridge();
                // Asynchronous Method (callback) (getContacts)
                var callback = new Adaptive.ContactResultCallback(function onError(error) {
                    console.log("case onError getContactsForFields");
                }, function onResult(contacts) {
                    console.log("case onResult getContactsForFields, contacts: " + contacts.length);
                    $scope.parseContacts(contacts);
                }, function onWarning(contacts, warning) {
                    console.log("case onWarning getContactsForFields");
                    $scope.parseContacts(contacts);
                });
                time = new Date();
                contact.getContactsForFields(callback, newFields);
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
            case 'createDatabase':
                var database = Adaptive.AppRegistryBridge.getInstance().getDatabaseBridge();
                var newDatabase = new Adaptive.Database($scope.inputTextParam, false);
                var database2 = new Adaptive.Database();
                var callbackDatabase = new Adaptive.DatabaseResultCallback(function onError(error) {
                    console.log("case onError createDatabase");
                }, function onResult(databases) {
                    $('#response').html('Created Database: ' + databases.getName() + '.');
                }, function onWarning(databases, warning) {
                    console.log("case onWarning createDatabase");
                });
                console.log("inputTextParam:" + typeof ($('#inputTextParam').val()) + ".");
                if (($('#inputTextParam').val() === ''))
                    console.log("testing inputTextParam: " + $('#inputTextParam').val());
                if (($('#inputTextParam').val() === '') || ($('#inputTextParam')).val() === ' ') {
                    $('#response').html('Error.');
                }
                else
                    database.createDatabase(newDatabase, callbackDatabase);
                break;
            case 'getOrientationDefault':
                var device2 = Adaptive.AppRegistryBridge.getInstance().getCapabilitiesBridge();
                var orientation = device2.getOrientationDefault();
                console.log("getOrientationDefault: " + orientation);
                $scope.response.name = orientation.value;
                $scope.paramResponseOk = "OK";
                break;
            default:
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
    $scope.parseContacts = function parseContacts(contacts) {
        //console.log("case parseContacts");
        $('#contacts-info').html("tooks " + (new Date().getTime() - time.getTime()) + " ms [" + contacts.length + "]").show();
        $('#contacts-lists').html("");
        for (var i = 0; i < contacts.length; i++) {
            //Evaluate what kind of type is selected by the user.
            var per = contacts[i].getPersonalInfo();
            var pro = contacts[i].getProfessionalInfo();
            var addresses = contacts[i].getContactAddresses();
            var addr = addresses[0];
            if (addresses.length == 0) {
                addresses = null;
            }
            var phones = contacts[i].getContactPhones();
            var phone = phones[0];
            if (phones.length == 0) {
                phones = null;
            }
            var tags = contacts[i].getContactTags();
            var tag = tags[0];
            if (tags.length == 0) {
                tags = null;
            }
            var webs = contacts[i].getContactWebsites();
            var web = webs[0];
            if (webs.length == 0) {
                webs = null;
            }
            var socials = contacts[i].getContactSocials();
            var social = socials[0];
            if (socials.length == 0) {
                socials = null;
            }
            $('#contacts-lists').append('<li><span>' + (per.getName() ? per.getName().substr(0, 15) + ' ' : "") + '' + (per.getLastName() ? per.getLastName().substr(0, 15) + ', ' : "") + '' + (pro.getCompany() ? pro.getCompany().substr(0, 15) + ', ' : "") + '' + (addresses ? addr.getAddress().substr(0, 15) + ', ' : "") + '' + (phones ? phone.getPhone().substr(0, 15) + ', ' : "") + '' + (tags ? tag.getTagName().substr(0, 15) + ', ' : "") + '' + (webs ? web.getUrl().substr(0, 15) + ', ' : "") + ' ' + (socials ? social.getProfileUrl().substr(0, 15) + ', ' : "") + '' + '</span></li>');
        }
    };
    $scope.items = items;
    $scope.deleteItem = function (index) {
        items.data.splice(index, 1);
        $scope.selectedBoxes.splice(index, 1);
    };
    $scope.addItem = function (index) {
        items.data.push({
            id: $scope.items.data.length + 1,
            title: "New Listener"
        });
    };
    $scope.deleteAllItems = function () {
        for (var i = 0; i < items.data.length; i++) {
            items.data.splice(i);
        }
    };
}]);
//# sourceMappingURL=method-controller.js.map