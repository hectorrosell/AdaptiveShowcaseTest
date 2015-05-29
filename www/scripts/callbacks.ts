/// <reference path="../bower_components/adaptiveme/adaptive.d.ts" />

// Asynchronous Method (callback) (getContacts)
var callback:Adaptive.IContactResultCallback = new Adaptive.ContactResultCallback(
    function onError(error:Adaptive.IContactResultCallbackError) {
        //console.log(JSON.stringify(error));
        //log(Adaptive.ILoggingLogLevel.Error, error.toString());
        //$('#contacts-error').html("ERROR: " + error.toString()).show();
        //$("#contacts-lists").listview('refresh');
    },
    function onResult(contacts:Adaptive.Contact[]) {
        //log(Adaptive.ILoggingLogLevel.Debug,JSON.stringify(contacts));
        parseContacts(contacts);
        //$("#contacts-lists").listview('refresh');


    },
    function onWarning(contacts:Adaptive.Contact[], warning:Adaptive.IContactResultCallbackWarning) {
        //console.log(JSON.stringify(warning));
        //log(Adaptive.ILoggingLogLevel.Warn,JSON.stringify(contacts));
        //$('#contacts-warning').html("WARNING: " + warning.toString()).show();
        parseContacts(contacts);
        //$("#contacts-lists").listview('refresh');
    }
);