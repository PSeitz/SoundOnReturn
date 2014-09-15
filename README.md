SoundOnReturn
=============

Plays sound on a yamaha receiver, when mobile phone connects with wlan

## Prerequisite/Inall
- [Install Nodejs](http://nodejs.org/)
- Execute `npm install soundonreturn`

## Available Options

- ip 
- mac_adresses
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
	"mac_adresses":["FF:FF:FF:FF:FF:FF","AA:AA:AA:AA:AA:AA"],
	"selectWebRadioFavoriteChannel":1
}
```


  

##### Usage From Other Node Modules
```javascript
    var SoundOnReturn = require('./SoundOnReturn.js');
    new SoundOnReturn({
      yamaha_ip:"192.168.0.100",
      mac_adresses:"FF:FF:FF:FF:FF:FF" // Whitelist of mac-adresses
    });
```
