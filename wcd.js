var fs = require('fs');
var request = require('request');
var DOMParser = require('xmldom').DOMParser;
var xpath = require('xpath');
var sanitize = require("sanitize-filename");

//xpath queries
var img = '//div[@id="cc"]/a/img/@src';
var next = '//a[@id="cndnext"]/@href';
var naming = '//div[@id="ical"]/a';

var nameOfComic = "Menage A Trois";
var startUrl = "http://www.ma3comic.com/strips-ma3/wing*girl*";

var maxAmount = 500;
var counter = 72;

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

                var imgUrl = xpath.select(img, doc)[0].nodeValue;
                var nextUrl = xpath.select(next, doc)[0].nodeValue;
                var name = xpath.select(naming, doc)[0].firstChild.data;

                console.log(counter + " - Started.");

                var fileName = "img/" + nameOfComic + "/" + counter + " - " + sanitize(name);

                downloadPicture(imgUrl, fileName, counter, function(counter, uri){
                    console.log(counter + " - Done.");
                })

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

getInfo(startUrl);