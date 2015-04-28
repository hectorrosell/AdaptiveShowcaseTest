'use strict';
var https   = require('https');
var fs      = require('fs');
var Promise = require('promise');

/**
 * Downloads the mobile dist file from the builder server
 */
module.exports =  function(request) {
    return new MobileDistDownloader(request);
};

function MobileDistDownloader(request) {

    this.downloadAs = function(downloadPath) {
        return new Promise(function (fulfill, reject) {
            https.get(request, receiveResponse)
                .on('error', reject);

            function receiveResponse(res) {
                var file = fs.createWriteStream(downloadPath);
                res.pipe(file);
                res.on('end', fulfill);
            }
        });
    };
}










