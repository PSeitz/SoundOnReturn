SoundOnReturn
=============

Plays sound on a yamaha receiver, when mobile phone connects with wlan

## Prerequisite/Inall
- [Install Nodejs](http://nodejs.org/)
- Execute `npm install soundonreturn`

## Available Options

- ip 
- mac_adresses - Whitelist of mac-adresses, all accepted if empty
- volume
- selectSongNumberFromUsb
- selectWebRadioFavoriteChannel


## Usage
##### Start From The CommandLine

Create a config file, e.g. conf.json with selected options. Then start it with:
    
    node sor-starter.js -c /path/to/conf.json

```json
{
    "ip":"Yamaha Ip-Adress",
	"mac_adresses":["FF:FF:FF:FF:FF:FF","AA:AA:AA:AA:AA:AA"], // Whitelist of mac-adresses, all if empty
	"selectWebRadioFavoriteChannel":1
	"activationHours": "12-24"
}
```


  

##### Usage From Other Node Modules
```javascript
    var SoundOnReturn = require('soundonreturn');
new SoundOnReturn({
    ip:"192.168.0.25",
    selectWebRadioFavoriteChannel:1,
    mac_adresses:["90:72:40:6c:e1:bc"] // Whitelist of mac-adresses, all accepted if empty,
    activationHours: "12-24"
});
```
