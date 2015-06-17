/// <reference path="../../bower_components/adaptiveme/adaptive.d.ts" />
/// <reference path="../angular.d.ts" />
'use strict';
var time:Date;
app.controller('MethodController', [ '$rootScope','$scope',function ($rootScope, $scope) {

    // Set text in some cases
    $scope.response ={
        name: "" ,
        version: "",
        vendor: ""
    };

    //Data for some select input

    $scope.itemSelectForContactFieldGroup = [
        {
            group: Adaptive.IContactFieldGroup.PersonalInfo,
            selected: false
        }, {
            group: Adaptive.IContactFieldGroup.ProfessionalInfo,
            selected: false
        }, {
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
    $scope.inputTextParam2 ="";
    // Activate the Device Orientation Listener listener

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

    // button 'Submit' is clicked

    $scope.sendRequestMethod = function sendRequestMethod(method){

        switch(method){

            // Methods for testing Adaptive methods

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
                    var arraycontainsgroup = ($scope.selectedBoxes.indexOf(value) > -1);
                    if (arraycontainsgroup){
                        newFields.push(value);
                        console.log("newFields value: " + value);
                    }
                });

                var contact:Adaptive.IContact = Adaptive.AppRegistryBridge.getInstance().getContactBridge();
                // Asynchronous Method (callback) (getContacts)
                var callback:Adaptive.IContactResultCallback = new Adaptive.ContactResultCallback(
                    function onError(error:Adaptive.IContactResultCallbackError) {
                        console.log("case onError getContactsForFields");
                    },
                    function onResult(contacts:Adaptive.Contact[]) {
                        console.log("case onResult getContactsForFields, contacts: "+contacts.length);
                        $scope.parseContacts(contacts);
                    },
                    function onWarning(contacts:Adaptive.Contact[], warning:Adaptive.IContactResultCallbackWarning) {
                        console.log("case onWarning getContactsForFields");
                        $scope.parseContacts(contacts);
                    }
                );
                time = new Date();
                contact.getContactsForFields(callback, newFields ) ;
                break;

            case 'getResourceLiteral' :

                var globalization:Adaptive.IGlobalization = Adaptive.AppRegistryBridge.getInstance().getGlobalizationBridge();
                // Synchronous Method with Parameters (getResourceLiteral)
                var locale:Adaptive.Locale = globalization.getDefaultLocale();

                locale.setCountry( $scope.country) ;
                locale.setLanguage( $scope.language) ;

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
                var newDatabase = new Adaptive.Database($scope.databaseName,false) ;
                //var database2:Adaptive.Database = new Adaptive.Database();

                var callbackDatabase:Adaptive.IDatabaseResultCallback = new Adaptive.DatabaseResultCallback (

                    function onError(error:Adaptive.IDatabaseResultCallbackError) {
                        console.log("case onError createDatabase ");
                    },
                    function onResult(databases:Adaptive.Database ) {
                        $('#response').html ( 'Created Database: ' + databases.getName() + '.'  );
                    },
                    function onWarning(databases:Adaptive.Database, warning:Adaptive.IDatabaseResultCallbackWarning) {
                        console.log("case onWarning createDatabase");
                    }

                );

                console.log("inputTextParam:" + typeof ( $('#inputTextParam').val() ) +"." );

                if (  ($('#inputTextParam').val() === '') )
                    console.log("testing inputTextParam: " + $('#inputTextParam').val());

                if ( ($('#inputTextParam').val() === '') || ($('#inputTextParam')).val() === ' ' ) {
                    $('#response').html('Error.');
                }else
                    database.createDatabase( newDatabase , callbackDatabase );
                break;

            case 'getOrientationDefault' :

                var device2:Adaptive.ICapabilities =  Adaptive.AppRegistryBridge.getInstance().getCapabilitiesBridge();
                var orientation:Adaptive.ICapabilitiesOrientation = device2.getOrientationDefault() ;
                console.log("getOrientationDefault: "+ orientation);
                $scope.response.name = orientation.value ;
                $scope.paramResponseOk = "OK";
                break;

            case 'createTable' :

                var database:Adaptive.IDatabase = Adaptive.AppRegistryBridge.getInstance().getDatabaseBridge();

                console.log("createTable $scope.inputTextParam : "+$scope.inputTextParam);
                console.log("createTable $scope.inputTextParam2 : "+$scope.inputTextParam2);

                var newDatabase  = new Adaptive.Database  ($scope.inputTextParam2 ,false) ;

                //constructor(name: dstring, columnCount: number, rowCount: number, databaseColumns: Array<DatabaseColumn>, databaseRows: Array<DatabaseRow>);

                var arr1:Adaptive.DatabaseColumn[] = [new Adaptive.DatabaseColumn("test")];
                var arr2:Adaptive.DatabaseRow[] = [];
                var newDatabaseTable = new Adaptive.DatabaseTable ($scope.inputTextParam, 1, 0, arr1, arr2) ;

                var callbackDatabaseTable:Adaptive.IDatabaseTableResultCallback = new Adaptive.DatabaseTableResultCallback (

                    function onError(error:Adaptive.IDatabaseTableResultCallbackError) {
                        console.log("case onError createTable");
                    },
                    function onResult( databaseTableResult:Adaptive.DatabaseTable ) {
                        console.log("createTable -> onResult");
                        //$('#response').html ( 'Created DatabaseTable: '+databaseTable.getName()+'.'  );
                    },
                    function onWarning(databaseTable:Adaptive.DatabaseTable, warning:Adaptive.IDatabaseTableResultCallbackWarning ) {
                        console.log("case onWarning createTable");
                    }
                );

                console.log("inputTextParam:" + typeof ( $('#inputTextParam').val() ) +"." );
                if (  ($('#inputTextParam').val() === '') )
                    console.log("testing inputTextParam: " + $('#inputTextParam').val());

                if ( ($('#inputTextParam').val() === '') || ($('#inputTextParam')).val() === ' ' ) {
                    $('#response').html('Error.');
                }else{
                    database.createTable ( newDatabase ,newDatabaseTable ,callbackDatabaseTable) ;
                }
                break;

            case 'deleteTable' :
                break;

            case 'deleteDatabase' :

                var databaseIns:Adaptive.IDatabase = Adaptive.AppRegistryBridge.getInstance().getDatabaseBridge();
                var db = new Adaptive.Database( $scope.databaseName , false) ;

                var callbackDatabase:Adaptive.IDatabaseResultCallback = new Adaptive.DatabaseResultCallback (

                    function onError(error:Adaptive.IDatabaseResultCallbackError) {
                        console.log("case onError createDatabase ");
                        $('#response').html ( 'Error database: ' + $scope.databaseName + ' NOT DELETED!'  );
                        //deleteDatabase: database.getName() NOT Deleted!
                    },
                    function onResult(database:Adaptive.Database ) {
                        $('#response').html ( 'Deleted database: ' + database.getName() + '.'  );
                    },
                    function onWarning(databases:Adaptive.Database, warning:Adaptive.IDatabaseResultCallbackWarning) {
                        console.log("case onWarning createDatabase");
                    }

                );

                databaseIns.deleteDatabase ( db , callbackDatabase ) ;

                break;

            case 'existsDatabase' :

                var databaseIns:Adaptive.IDatabase = Adaptive.AppRegistryBridge.getInstance().getDatabaseBridge();
                var db  = new Adaptive.Database  ($scope.databaseName ,false) ;

                console.log("The database "+db.getName()+" exists: " + databaseIns.existsDatabase(db));

                if(databaseIns.existsDatabase(db)){
                    $('#response').html ( 'The DatabaseTable: '+db.getName()+' exists.'  );
                }else
                    $('#response').html ( 'The DatabaseTable: '+db.getName()+' don\'t exists.'  );
                break;

            case 'existsTable' :
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

            //Evaluate what kind of type is selected by the user.

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

    $scope.databaseTableDatabaseColumns = [];
    $scope.addDatabaseTableDatabaseColumn = function () {
        console.log("databaseTableDatabaseColumns: "+$scope.databaseTableDatabaseColumnName);
        if (typeof $scope.databaseTableDatabaseColumnName === "undefined" || $scope.databaseTableDatabaseColumns.indexOf($scope.databaseTableDatabaseColumnName) > -1){
            console.log("Invalid text");
        }else {
            if ( $scope.databaseTableDatabaseColumnName.length > 0 )
                $scope.databaseTableDatabaseColumns.push( $scope.databaseTableDatabaseColumnName );
        }
    };
    $scope.deleteDatabaseTableDatabaseColumn = function (index) {
        $scope.databaseTableDatabaseColumns.splice(index, 1);
    };

    $scope.databaseTableDatabaseRows = [];
    $scope.addDatabaseTableDatabaseRow = function () {
        console.log("databaseTableDatabaseRows: "+$scope.databaseTableDatabaseRowName);
        if (typeof $scope.databaseTableDatabaseRowName === "undefined" || $scope.databaseTableDatabaseRows.indexOf($scope.databaseTableDatabaseRowName) > -1){
            console.log("Invalid text");
        }else {
            if ( $scope.databaseTableDatabaseRowName.length > 0 )
                $scope.databaseTableDatabaseRows.push( $scope.databaseTableDatabaseRowName );
        }
    };
    $scope.deleteDatabaseTableDatabaseRow = function (index) {
        $scope.databaseTableDatabaseRows.splice(index, 1);
    };

}]);