/// <reference path="../../bower_components/adaptiveme/adaptive.d.ts" />
/// <reference path="../angular.d.ts" />
'use strict';
var time:Date;
app.controller('MethodController', [ '$rootScope','$scope',function ($rootScope, $scope) {

    $scope.response ={
        name: "" ,
        version: "",
        vendor: ""
    };

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
        }, {
            group: Adaptive.IContactFieldGroup.Emails,
            selected: false
        }, {
            group: Adaptive.IContactFieldGroup.Phones,
            selected: false
        }, {
            group: Adaptive.IContactFieldGroup.Socials,
            selected: false
        }, {
            group: Adaptive.IContactFieldGroup.Tags,
            selected: false
        }, {
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
    $scope.selectedBoxes = ["none","none","none"];

    var tempScope = $scope;

    $scope.inputTextParam ="";

    // Activate the Device Orientation Listener listener

    //$scope.paramResponse = "Orientation listener activated";
    var device:Adaptive.IDevice = Adaptive.AppRegistryBridge.getInstance().getDeviceBridge();
    console.log("case DeviceOrientationListener");
    var orientationListener:Adaptive.IDeviceOrientationListener = new Adaptive.DeviceOrientationListener(
        function onError(error:Adaptive.IDeviceOrientationListenerError){},
        function onResult(event:Adaptive.RotationEvent){
            $scope.printDeviceOrientationEvents(event);
            $scope.paramResponseOk = "OK";
        },
        function onWarning(event:Adaptive.RotationEvent, warning:Adaptive.IDeviceOrientationListenerWarning){}
    );
    device.addDeviceOrientationListener(orientationListener);

    //

    $scope.sendRequestMethod = function sendRequestMethod(method){
       // console.log("sendRequestMethod: "+method);
        switch(method){

            case 'getOSInfo':
                var os:Adaptive.IOS = Adaptive.AppRegistryBridge.getInstance().getOSBridge();
                var osInfo:Adaptive.OSInfo = os.getOSInfo();
                console.log(osInfo);
                $scope.response.name = osInfo.getName().valueOf() ;
                $scope.response.version = osInfo.getVersion();
                $scope.response.vendor = osInfo.getVendor();
                $scope.paramResponseOk = "OK";

                break;

            case 'DeviceOrientationListener':
                $scope.paramResponse = "Orientation listener activated";
                var device:Adaptive.IDevice = Adaptive.AppRegistryBridge.getInstance().getDeviceBridge();
                console.log("case DeviceOrientationListener");
                var orientationListener:Adaptive.IDeviceOrientationListener = new Adaptive.DeviceOrientationListener(
                    function onError(error:Adaptive.IDeviceOrientationListenerError){},
                    function onResult(event:Adaptive.RotationEvent){
                        $scope.printDeviceOrientationEvents(event);
                        $scope.paramResponseOk = "OK";
                    },
                    function onWarning(event:Adaptive.RotationEvent, warning:Adaptive.IDeviceOrientationListenerWarning){}
                );
                device.addDeviceOrientationListener(orientationListener);
                //device.removeDeviceOrientationListener(orientationListener);

                break;

            case 'getContactsForFields':

                console.log("$scope.selectedBoxes lenght: "+$scope.selectedBoxes);

                var newFields = [];

                angular.forEach( $scope.fields , function( value, key){
                    //console.log("value of selected options: " + value);

                    var arraycontainsgroup = ($scope.selectedBoxes.indexOf(value) > -1);

                    //console.log("current selectBoxes arraycontainsgroup value: " + value);
                    //console.log("fields.value: " + $scope.fields);

                    if (arraycontainsgroup){
                        newFields.push(value);
                        console.log("newFields value: " + value);
                    }

                });

               // console.log("case getContactsForFields");
                var contact:Adaptive.IContact = Adaptive.AppRegistryBridge.getInstance().getContactBridge();
                // Asynchronous Method (callback) (getContacts)
                var callback:Adaptive.IContactResultCallback = new Adaptive.ContactResultCallback(
                    function onError(error:Adaptive.IContactResultCallbackError) {
                        //console.log(JSON.stringify(error));
                        //log(Adaptive.ILoggingLogLevel.Error, error.toString());
                        console.log("case onError getContactsForFields");
                        //$('#contacts-error').html("ERROR: " + error.toString()).show();
                        //$("#contacts-lists").listview('refresh');
                    },
                    function onResult(contacts:Adaptive.Contact[]) {


                        console.log("case onResult getContactsForFields, contacts: "+contacts.length);
                        $scope.parseContacts(contacts);
                        //$("#contacts-lists").listview('refresh');

                    },
                    function onWarning(contacts:Adaptive.Contact[], warning:Adaptive.IContactResultCallbackWarning) {
                        //console.log(JSON.stringify(warning));
                        // log(Adaptive.ILoggingLogLevel.Warn,JSON.stringify(contacts));
                        // $('#contacts-warning').html("WARNING: " + warning.toString()).show();
                        console.log("case onWarning getContactsForFields");
                        $scope.parseContacts(contacts);
                        // $("#contacts-lists").listview('refresh');
                    }
                );
                time = new Date();

                //contact.getContact(new Adaptive.ContactUid(),callback);

                //Filter the array of

                //contact.getContactsForFields(callback, $scope.fields ) ;
                contact.getContactsForFields(callback, newFields ) ;
                //contact.getContactsForFields(callback, [ Adaptive.IContactFieldGroup.PersonalInfo, Adaptive.IContactFieldGroup.ProfessionalInfo, Adaptive.IContactFieldGroup.Addresses, Adaptive.IContactFieldGroup.Emails, Adaptive.IContactFieldGroup.Phones, Adaptive.IContactFieldGroup.Socials, Adaptive.IContactFieldGroup.Tags, Adaptive.IContactFieldGroup.Websites ] );
                break;

            case 'getResourceLiteral' :

                var globalization:Adaptive.IGlobalization = Adaptive.AppRegistryBridge.getInstance().getGlobalizationBridge();
                // Synchronous Method with Parameters (getResourceLiteral)
                var locale:Adaptive.Locale = globalization.getDefaultLocale();
                var i18nResource:string = globalization.getResourceLiteral($scope.inputTextParam, locale);
                //$('#i18n-resource').html("<b>String from Adaptive Core</b>: " + i18nResource);
                console.log("String from Adaptive Core: "+i18nResource);

                if( i18nResource == undefined || i18nResource===null){
                    $scope.paramResponse = i18nResource;
                    $scope.paramResponseOk = "ERROR";
                }else{
                    $scope.paramResponse = i18nResource;
                    $scope.paramResponseOk = "OK";
                    console.log("..."+$scope.paramResponse+"...");
                }

                break;

            case 'createDatabase' :

                var database:Adaptive.IDatabase = Adaptive.AppRegistryBridge.getInstance().getDatabaseBridge();
                var newDatabase = new Adaptive.Database($scope.inputTextParam,false) ;
                var database2:Adaptive.Database = new Adaptive.Database();

                console.log("inputTextParam: "+$scope.inputTextParam );

                //newDatabase.setName($scope.inputTextParam );
                // Asynchronous Method (callback) (getContacts)

                var callbackDatabase:Adaptive.IDatabaseResultCallback = new Adaptive.DatabaseResultCallback (
                    function onError(error:Adaptive.IDatabaseResultCallbackError) {
                        console.log("case onError createDatabase");
                    },
                    function onResult(databases:Adaptive.Database ) {
                        console.log("case onResult createDatabases: " + databases);
                    },
                    function onWarning(databases:Adaptive.Database, warning:Adaptive.IContactPhotoResultCallbackWarning) {
                        console.log("case onWarning createDatabase");
                    }
                );

                database.createDatabase( newDatabase , callbackDatabase );
                break;

            case 'capabilitiesDelegate':

                break;

            default :
                break;

        }
    };

    $scope.printDeviceOrientationEvents = function printDeviceOrientationEvents(event:Adaptive.RotationEvent) : void {
        var text = "printDeviceOrientationEvents:" + ': ' + event.getOrigin() + ' > ' + event.getDestination() + ' [' + event.getState() + ']\n' ;
        console.log(" ---->> rotationEvent :"+text);
        console.log(" ---->> rotationEvent :"+$scope.paramResponse);
        $scope.paramResponse = "text" ;
        $scope.paramResponseOk = "OK";

        var $textArea = $('#textarea-1');
        $textArea.html("printDeviceOrientationEvents:" + ': ' + event.getOrigin() + ' > ' + event.getDestination() + ' [' + event.getState() + ']\n');
    };

    $scope.parseContacts = function parseContacts(contacts:Adaptive.Contact[]):void {

        //console.log("case parseContacts");
        $('#contacts-info').html("tooks "+(new Date().getTime()-time.getTime())+" ms ["+contacts.length+"]").show();
        $('#contacts-lists').html("");

        for (var i = 0; i < contacts.length; i++) {

            var per:Adaptive.ContactPersonalInfo = contacts[i].getPersonalInfo();
            var pro:Adaptive.ContactProfessionalInfo = contacts[i].getProfessionalInfo();
            var addresses:Array<Adaptive.ContactAddress> = contacts[i].getContactAddresses();
            var addr:Adaptive.ContactAddress = addresses[0];
            if(addresses.length == 0) {
                 addresses =null;
            }

            var phones:Array<Adaptive.ContactPhone> = contacts[i].getContactPhones();
            var phone:Adaptive.ContactPhone = phones[0];
            if(phones.length == 0) {
                phones =null;
            }

            var tags:Array<Adaptive.ContactTag> = contacts[i].getContactTags();
            var tag:Adaptive.ContactTag = tags[0];
            if(tags.length == 0) {
                tags =null;
            }

            var webs:Array<Adaptive.ContactWebsite> = contacts[i].getContactWebsites();
            var web:Adaptive.ContactWebsite = webs[0];
            if(webs.length == 0) {
                webs =null;
            }

            var socials:Array<Adaptive.ContactSocial> = contacts[i].getContactSocials();
            var social:Adaptive.ContactSocial = socials[0];
            if(socials.length == 0) {
                socials =null;
            }

            $('#contacts-lists').append('<li><span>' +
                (   per. getName() ? per.getName()    .substr(0, 15)+' ' : "") + '' +
                (per.getLastName() ? per.getLastName().substr(0, 15)+', ' : "") + ''+
                (pro.getCompany() ? pro.getCompany().substr(0,15)+', ' : "") + '' +
                (addresses ? addr.getAddress().substr(0,15)+', ' : "")+ '' +
                (phones ? phone.getPhone().substr(0,15)+', ' : "")+ '' +
                (tags ? tag.getTagName().substr(0,15)+', ' : "")+ '' +
                (webs ? web.getUrl().substr(0,15)+', ' : "")+ ' ' +
                (socials ? social.getProfileUrl().substr(0,15)+', ' : "" )+'' +

                '</span></li>');
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