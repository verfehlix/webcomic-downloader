# wcd-nodejs 

## Easily download webcomics with this tool using ```cool``` and absolutely ```webscale``` ```state-of-the-art``` webcomic-downloading techniques such as:

- [x] Node.js :new:
- [x] Recursion (just like in CS101) :cool:
- [x] XPath :top:
- [x] Yeah!!! :sunglasses:

## Currently, the steps for configuring are hacky as fuck:
(maybe will become better in the future, depending on my motivation)

- Copy the URL of the website you want to start downloading at, put it into ```var startUrl = ...```
- Put the name of the comic into ```var nameOfComic = ...``` (for naming the files)
- Get Familiar with XPath and put some XPath Queries (or whatever they are called) into 
   - ```img``` :arrow_right: shoud point to the src attribute of the image you want to download
   - ```next``` :arrow_right: should point to the href attribute of the next-comic-link on the website
   - ```naming``` :arrow_right: should lead to a link that contains the name of the current comic/chapter/page/whatever
- set ```var counter``` to 0
- set ```var maxAmount``` to how many pages/chapters/etc. you want to download


**wcd** will now visit the provided starting page, extract & download the image, visit the next page, extract & download the image, visit the next page, extract & download the image, visit the next page, extract & download the image, visit the next page, extract & download the image, visit the next page, ... , until it has done this maxAmount of times, then it will stop.
