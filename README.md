# Sprite sheet splitter
CLI tools for export sprites from sprite sheet.  
You need to have data file and image for sprite sheet witch will be exported.  
___
## Features
Supported local files and can download files use http or https.  
Supported json data files formats:
<ul>  
<li>json - supported</li>  
<li>atlas - supported</li>  
<li>xml - in development</li>  
<li>xml bitmap font - in development</li> 
</ul>  

## Parameters
<ul>  
<li>--data - path to data file of sprite sheet</li>   
<li>--out - path to folder where will be saved exported sprites</li>
</ul>  

## How to use
Use sprite sheet local files for split  
```
spritesheet-splitter --data ./spritesheet.json --out ./
```
Use sprite sheet files downloaded using http or https for split 
```
spritesheet-splitter --data http://testSite.com/spritesheet.json --out ./
```
___
### Contacts
Telegram [@rocket_ua](https://t.me/rocket_ua)
