# wcd-nodejs 

## Easily download webcomics with this tool using **cool** **webscale** **state-of-the-art** techniques like:

- [x] Node.js :new:
- [x] Recursion :cool:
- [x] XPath :top:
- [x] JSON :sunglasses:

## What wcd does
wcd will visit the provided starting page, extract & download the image, visit the next page, extract & download the image, visit the next page, extract & download the image, visit the next page, ... , until a certain threshold is reached, then it will stop.

## Usage
```
λ node wcd.js -h                                                                                               
                                                                                                               
  Usage: wcd [options]                                                                                         
                                                                                                               
  Options:                                                                                                     
                                                                                                               
    -h, --help                        output usage information                                                 
    -V, --version                     output the version number                                                
    -p, --path [path-to-config-file]  Specify the (relative) path to your config file for your webcomic.       
    -m, --max [number]                How many pages you want to download. Default: 0                          
    -c, --counter [number]            The initial value of the counter. Default: 0                             
    -n, --name                        If flag is set, the value of the counter will be used in the file name.  
```

For example: 
```
node wcd.js -p config_files/my_supercomic.json -m 750
```

| Attribute    	| Description                                                                                                                                                                                 	|
|--------------	|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| -m --max     	| Sets how many pages/chapters/images etc. you want to download                                                                                                                               	|
| -c --counter 	| Set it to a different number than 0 (default), if you for example paused the downloading and changed the startUrl (changing the counter makes the numbers for the fileNames match up again) 	|
| -n --name    	| Sets if the counter should be included in the filename (e.g. don't use when there is already a number in the titles of the comics)                                                          	|


## Config file

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

| Attribute   	| Description                                                                             	|
|-------------	|-----------------------------------------------------------------------------------------	|
| name        	| The name of the webcomic (used for creating the folder)                                 	|
| startUrl    	| Where the downloader should start                                                       	|
| xpathImg    	| Shoud point to the src attribute of the image you want to download                      	|
| xpathNext   	| Should point to the href attribute of the next-comic-link on the website                	|
| xpathNaming 	| should lead to a link that contains the name of the current comic/chapter/page/whatever 	|
