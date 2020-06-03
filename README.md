# Sprite sheet splitter
CLI tools for export sprites from sprite sheet.  
You need to have data file and image for sprite sheet witch will be exported.  
___
## Features
Supported local files and can download files use http or https.  
Supported data files formats and sprite sheets for engines:
<ul>  
<li>JSON (Array)</li>
<li>JSON (Hash)</li>
<li>Spine atlas</li>
<li>Godot 3 Sprite Sheet</li>
<li>Godot 3 Tile Set</li>
<li>Godot 3 Tile Set</li>
<li>libGDX</li>
<li>Panda 2</li>
<li>Phaser3</li>
<li>Spark AR Studio</li>
<li>Unity JSON data</li>
<li>UnrealEngine</li>
</ul>  
  
#### More data formats and file types coming soon.  

## Parameters
<ul>  
<li>--data - path to data file of sprite sheet</li>   
<li>--out - path to folder where will be saved exported sprites</li>
</ul>  

## How to use
Use sprite sheet local files for split  
```
spritesheet-splitter --data ./spritesheet.json --out ./splitted/
```
Use sprite sheet files downloaded using http or https for split 
```
spritesheet-splitter --data http://testSite.com/spritesheet.json --out ./splitted/
```
___
### Contacts
Telegram [@rocket_ua](https://t.me/rocket_ua)
