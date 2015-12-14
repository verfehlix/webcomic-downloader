# wcd-nodejs 

## Easily download webcomics with this tool using ```cool``` and absolutely ```webscale``` ```state-of-the-art``` webcomic-downloading techniques such as:

- [x] Node.js :new:
- [x] Recursion (just like in CS101) :cool:
- [x] XPath :top:
- [x] JSON !YEAH!SPECIAL!SUPER! :sunglasses:


## You need to provide an config file in json format

Can look like this:
```json
{
	"name": "Menage A Trois",
	"startUrl": "http://www.ma3comic.com/strips-ma3/room_for_two_more_%28vol1%29",
	"xpathImg": "//div[@id='cc']/a/img/@src",
	"xpathNext": "//a[@id='cndnext']/@href",
	"xpathNaming": "id('navjump')/option[1]/text()"
}
```

- ```name``` :arrow_right: The name of the webcomic (duh)
- ```startUrl``` :arrow_right: Where the downloader should start
- XPath Queries:
   - ```img``` :arrow_right: shoud point to the src attribute of the image you want to download
   - ```next``` :arrow_right: should point to the href attribute of the next-comic-link on the website
   - ```naming``` :arrow_right: should lead to a link that contains the name of the current comic/chapter/page/whatever
   - **Important Note: The Xpath queries must lead to such an element that element[0].nodeValue points to the actual textual value of the urls/name !!!**


You need to include this config file in ```wcd.js```, like this
```javascript
var config = require('./config_files/myConfig.json');
```

Also, you can set 
- ```var useCounterInName``` sets if the counter should be included in the filename (e.g. don't use when there is already a number in the titles of the comics)
- ```var maxAmount``` to how many pages/chapters/etc. you want to download
- ```var counter``` to a different number than 0, if you for example paused the downloading and changed the startUrl (changing the counter makes the numbers for the fileNames match up again)


**wcd** will now visit the provided starting page, extract & download the image, visit the next page, extract & download the image, visit the next page, extract & download the image, visit the next page, extract & download the image, visit the next page, extract & download the image, visit the next page, ... , until it has done this maxAmount of times, then it will stop.
