var fs = require('fs');
var request = require('request');
var DOMParser = require('xmldom').DOMParser;
var xpath = require('xpath');
var sanitize = require("sanitize-filename");
var mkdirp = require('mkdirp');

var useCounterInName = true;
var maxAmount = 50;
var counter = 0;

var getInfo = function(url) {
    counter++;
    if (counter<=maxAmount) {
        var parser = new DOMParser({
            errorHandler: {
                warning: null,
                error: null,
                fatalError: null
            }
        });

        request.get(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {

                var doc = parser.parseFromString(body);

                var imgUrl = xpath.select(config.xpathImg, doc)[0].nodeValue;
                var nextUrl = xpath.select(config.xpathNext, doc)[0].nodeValue;
                var name = xpath.select(config.xpathNaming, doc)[0].nodeValue;

                console.log(counter + " - Started.");

                mkdirp('img/'+config.name, function(err) {
                    if(err) console.log("Error during folder creation: " + err);
                });

                if(imgUrl.indexOf("http:") === -1){
                    imgUrl = "http:" + imgUrl;
                }

                var fileName;
                if(useCounterInName){
                    fileName = "img/" + config.name + "/" + counter + " - " + sanitize(name);
                } else {
                    fileName = "img/" + config.name + "/" + sanitize(name);
                }

                downloadPicture(imgUrl, fileName, counter, function(counter, uri){
                    console.log(counter + " - Done.");
                })

                //if nextUrl is a link that does not include the base (e.g. /blub instead of http://comic.com/blub) get the base part from the startUrl and prepend it
                if(nextUrl.indexOf("http://") === -1 && nextUrl.indexOf("www") === -1){
                    nextUrl = "http://www." + config.startUrl.split("/")[2] + nextUrl;

                }

                getInfo(nextUrl);

            } else {
                console.log("An error occured. - URL:" + url);
                console.log(error);
            }
        });
    }
};

var downloadPicture = function(uri, filename, counter, callback) {
    request.head(uri, function(err, res, body) {
        var ending = res.headers['content-type'].split("/")[1];
        request(uri).pipe(fs.createWriteStream(filename + "." + ending)).on('close', function() {
            callback(counter, uri);
        });
    });
};

var outputInfo = function(config){
    console.log("WCD - Web Comic Downloader");
    console.log("--------------------------");
    console.log("Config file loaded:");
    console.log("Name: " + config.name);
    console.log("Starting at URL: " + config.startUrl);
    console.log("XPath for Image: " + config.xpathImg);
    console.log("XPath for Next: " + config.xpathNext);
    console.log("XPath for Naming: " + config.xpathNaming);
    console.log("--------------------------");

}

var start = function(config){
    outputInfo(config);
    getInfo(config.startUrl);
};

//path to your config file goes in here
var config = require('./config_files/xkcd.json');
start(config);